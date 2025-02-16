import { CommandContext, Context } from "grammy";
import {getOrCreateChat} from "../../database/services/report.service";

export async function startService(ctx: CommandContext<Context>) {
    await getOrCreateChat(ctx.chatId);
    await ctx.reply(
        "Добро пожаловать!\n\n" +
        "Что умеет этот бот?\n\n" +
        "\u2022 Сохранять информацию по ментальному состоянию\n" +
        "\u2022 Сохранять информацию по головной боли\n" +
        "\u2022 Сохранять информацию по иным недугам\n\n" +
        "Также этот бот каждый день уведомляет вас о том, что нужно сделать запись.\n\n" +
        "Как записать данные в бот?\n\n" +
        "Введите команду /report"
    );
}