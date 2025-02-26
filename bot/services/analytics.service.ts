import {CommandContext, Context} from "grammy";
import {
    chooseCategoryText
} from "../data/texts";
import {_createChooseKeyboardLayout} from "./utils";
import {getGraphicHeadache} from "../../database/services/analytics.service";
import {getOrCreateChat} from "../../database/services/report.service";


export async function analyticsService(ctx: CommandContext<Context>) {
    const currentChat = await getOrCreateChat(ctx.chatId);
    const graph: { date: Date; headache_status: string }[] = await getGraphicHeadache(currentChat);

    const graphString = graph.map((entry) => `${entry.date.toISOString()}: ${entry.headache_status}`).join("\n");

    await ctx.reply(graphString || "Нет данных");
}
