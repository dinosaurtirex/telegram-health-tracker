import {CallbackQueryContext, CommandContext, Context, InlineKeyboard} from "grammy";
import {dataWriteSuccessText, reportCategoriesTexts} from "../data/texts";
import {CALLBACKS_REPORT_KEYS} from "../data/keys";

export async function _createAndSendSuccessRecordMessage(ctx: CallbackQueryContext<Context> | CommandContext<Context>) {
    await ctx.reply(dataWriteSuccessText);
}

export function _createChooseKeyboardLayout(): InlineKeyboard {
    return new InlineKeyboard()
        .text(reportCategoriesTexts[CALLBACKS_REPORT_KEYS.HEADACHE], CALLBACKS_REPORT_KEYS.HEADACHE)
        .row()
        .text(reportCategoriesTexts[CALLBACKS_REPORT_KEYS.OTHER_ILLNESSES], CALLBACKS_REPORT_KEYS.OTHER_ILLNESSES)
        .row()
        .text(reportCategoriesTexts[CALLBACKS_REPORT_KEYS.MENTAL_STATE], CALLBACKS_REPORT_KEYS.MENTAL_STATE)
        .row()
        .text(reportCategoriesTexts[CALLBACKS_REPORT_KEYS.START_SCREEN], CALLBACKS_REPORT_KEYS.START_SCREEN)
}