import axios from 'axios';
import * as jwt from 'jsonwebtoken'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });
const URL = process.env.WOFFU_URL
let tokens = {}

class Woffu {
    async signout(token: any) {
        let data = {
            "TimezoneOffset": new Date().getTimezoneOffset(),
            "UserId": this.getUserIdFromToken(token)
        }
        if (!await this.isCurrentlySigned(token)) {
            console.log(`Skipping signout because user ${this.getUsernameFromToken(token)} is not signed.`)
            return
        }
        let response = await axios.post(`${URL}/api/signs`, data, this.buildAxiosOptionsWithToken(token))
        if (response.status != 201) {
            throw new Error(`signin for user ${this.getUsernameFromToken(token)} failed with status ${response.status}`)
        }
    }
    async signin(token: any) {
        let data = {
            "TimezoneOffset": new Date().getTimezoneOffset(),
            "UserId": this.getUserIdFromToken(token)
        }
        if (await this.isCurrentlySigned(token)) {
            console.log(`Skipping signin for user ${this.getUsernameFromToken(token)} because is already signed.`)
            return
        }

        if (await this.isHoliday(token)) {
            console.log(`Skipping signin for user ${this.getUsernameFromToken(token)} because today is weekend or holiday.`)
            return
        }

        let response = await axios.post(`${URL}/api/signs`, data, this.buildAxiosOptionsWithToken(token))
        if (response.status != 201) {
            throw new Error(`signin for user ${this.getUsernameFromToken(token)} failed with status ${response.status}`)
        }
    }
    async login(username: string, password: string) {
        try {
            if (tokens.hasOwnProperty(username)) {
                let token = tokens[username]
                if (this.isValidToken(token))
                    return token
            }
            let loginResponse = await axios.post(`${URL}/token`, `grant_type=password&username=${username}&password=${password}`);
            let token = loginResponse.data.access_token
            tokens[username] = token
            return token;
        }
        catch (e) {
            let errorMessage = `${e.message}: ${e.response.data.error}`;
            throw new Error(errorMessage);
        }
    }

    private buildAxiosOptionsWithToken(token: string) {
        return {
            headers: {
                'Authorization': `bearer ${token}`,
                'content-type': 'application/json'
            }
        }
    }

    private async isCurrentlySigned(token: string) {
        let signs = await axios.get(`${URL}/api/signs`, this.buildAxiosOptionsWithToken(token))
        return signs.status == 200 && signs.data.length > 0 && signs.data[signs.data.length - 1].SignIn
    }

    private async isHoliday(token: string) {
        let today = new Date().toISOString().substring(0, 10)
        let response = await axios.get(`${URL}/api/users/${this.getUserIdFromToken(token)}/diaries/absence/single_events?fromDate=${today}&presence=false&toDate=${today}`, this.buildAxiosOptionsWithToken(token))
        return response.status == 200 && response.data.Events.length > 0 && response.data.Events[0].isDisabled
    }

    private isValidToken(token: string) {
        try {
            jwt.verify(token)
            return true
        } catch {
            return false
        }
    }

    private getUserIdFromToken(token: string) {
        return jwt.decode(token).UserId;
    }

    private getUsernameFromToken(token: string) {
        return jwt.decode(token).unique_name
    }
}

export default new Woffu()
