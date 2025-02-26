import { CommandContext, Context, InputFile } from "grammy";
import { chooseCategoryText } from "../../data/texts";
import { _createChooseKeyboardLayout } from "../utils";
import {getGraphicHeadache, getGraphicMentalState} from "../../../database/services/analytics.service";
import { getOrCreateChat } from "../../../database/services/report.service";
import { generateCanvasGraph } from "../../../canvas/canvas.service";

function mapMessage(message: string): number {
    const mapping: Record<string, number> = {
        headache: 1,
        mental: 2,
        other: 0
    };

    return mapping[message.toLowerCase()] ?? 0;
}

export async function analyticsService(ctx: CommandContext<Context>) {
    const currentChat = await getOrCreateChat(ctx.chatId);
    const args = ctx.message.text?.split(" ").slice(1) || [];

    const analyticsType = args[0] || ""; // Тип (headache, mentalstate, other)
    const days = parseInt(args[1], 10) || 7; // Количество дней (по умолчанию 7)

    const mappedStatus = mapMessage(analyticsType);

    console.log(`Received status: ${analyticsType}, Mapped to: ${mappedStatus}`);

    const mapStatus = mapMessage(analyticsType);

    if (mapStatus == 1) {
        const graph: { date: Date; status: string }[] = await getGraphicHeadache(currentChat, days);
        const buffer = await generateCanvasGraph(graph, "headache");
        await ctx.replyWithDocument(new InputFile(buffer, "headache_graph.png"));
    }

    if (mapStatus == 2) {
        const graph: { date: Date; status: string }[] = await getGraphicMentalState(currentChat, days);
        const buffer = await generateCanvasGraph(graph, "mental");
        await ctx.replyWithDocument(new InputFile(buffer, "mental_graph.png"));
    }

    if (mapStatus == 0) {
        await ctx.reply("В разработке")
    }
}
