import {CallbackQueryContext, Context} from "grammy";
import {createHeadacheReport, getOrCreateChat, getOrCreateReport} from "../../../database/services/report.service";
import {_createAndSendSuccessRecordMessage} from "../utils"

export async function headacheCallbackWrite(ctx: CallbackQueryContext<Context>, degree: string) {
    await ctx.answerCallbackQuery();
    const currentChat = await getOrCreateChat(ctx.chatId);
    const currentReport = await getOrCreateReport(currentChat.id);
    await createHeadacheReport(currentReport, degree);
    await _createAndSendSuccessRecordMessage(ctx);
}
