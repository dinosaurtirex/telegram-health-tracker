import {CallbackQueryContext, CommandContext, Context} from "grammy";
import {createOtherStateReport, getOrCreateChat, getOrCreateReport} from "../../database/services/report.service";
import {_createAndSendSuccessRecordMessage} from "./utils";

export async function otherService(ctx: CommandContext<Context> | CallbackQueryContext<Context>) {
    const currentChat = await getOrCreateChat(ctx.chatId);
    const currentReport = await getOrCreateReport(currentChat.id);
    const text = "message" in ctx && ctx.message?.text ? ctx.message.text : "";
    await createOtherStateReport(currentReport, text);
    await _createAndSendSuccessRecordMessage(ctx)
}
