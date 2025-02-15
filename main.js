import { getEnv } from "./utils/getEnv";
async function main() {
    const env = getEnv();
    console.log(env.TelegramBotToken);
    return;
}
main().catch(console.error);
