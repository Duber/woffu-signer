import axios from 'axios';
import jwt from 'jsonwebtoken'

const ONE_MINUTE_MILLISECONDS = 60000
const URL = process.env.WOFFU_URL
let tokens = {}

class Woffu {
    signout(token: any) {
        throw new Error("Method not implemented.");
    }
    signin(token: any) {
        throw new Error("Method not implemented.");
    }
    async login(username: string, password: string){
        try {
            if (tokens.hasOwnProperty(username)){
                let token = tokens[username]
                if ((Date.now() - jwt.decode(token).exp) > ONE_MINUTE_MILLISECONDS)
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
}

export default new Woffu()
