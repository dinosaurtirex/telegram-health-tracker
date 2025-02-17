import {CallbackQueryContext, CommandContext, Context} from "grammy";
import {getOrCreateChat} from "../../database/services/report.service";
import {startServiceMessageText} from "../data/texts";

export async function startService(ctx: CommandContext<Context> | CallbackQueryContext<Context>) {
    await getOrCreateChat(ctx.chatId);
    await ctx.reply(
        startServiceMessageText
    );
}