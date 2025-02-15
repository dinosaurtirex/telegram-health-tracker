import telegramMainBot from "./bot/source/bot";

async function main(): Promise<void> {
    await telegramMainBot.start();
    return;
}

main().catch(console.error);
