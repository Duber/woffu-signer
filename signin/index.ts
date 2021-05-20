import { AzureFunction, Context } from "@azure/functions";
import timer from "../lib/timer";
import woffu from "../lib/woffu";

const username = process.env.WOFFU_USERNAME
const password = process.env.WOFFU_PASSWORD

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    let token = await woffu.login(username, password)
    await timer.randomDelay();
    await woffu.signin(token)
};

export default timerTrigger;
