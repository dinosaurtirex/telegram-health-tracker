import telegramMainBot from "./bot/bot";
import {sleep} from "./utils/sleep";

async function main(): Promise<void> {
    try {
        await telegramMainBot.start();
    } catch (error) {
        console.log(error)
        await telegramMainBot.start();
        await sleep(10000);
    }
    return;
}

main().catch(console.error);