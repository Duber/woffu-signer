import axios from 'axios';
import jwt from 'jsonwebtoken'

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
            let loginResponse = await axios.post(`${URL}/token`, `grant_type=password&username=${username}&password=${password}`);
            tokens[username] = loginResponse.data.access_token
            return tokens[username];
        }
        catch (e) {
            let errorMessage = `${e.message}: ${e.response.data.error}`;
            throw new Error(errorMessage);
        }
    }
}

export default new Woffu()
