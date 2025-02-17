import {CallbackQueryContext, Context, InlineKeyboard} from "grammy";
import {mentalStateCategoryTexts, mentalStateDegreeText} from "../../data/texts";
import {MENTAL_STATE_KEYS} from "../../data/keys";

export async function mentalStateCallbackQuery(ctx: CallbackQueryContext<Context>) {
    await ctx.answerCallbackQuery();
    const keyboard = new InlineKeyboard()
        .text(mentalStateCategoryTexts[MENTAL_STATE_KEYS.PERFECT], MENTAL_STATE_KEYS.PERFECT)
        .row()
        .text(mentalStateCategoryTexts[MENTAL_STATE_KEYS.GOOD], MENTAL_STATE_KEYS.GOOD)
        .row()
        .text(mentalStateCategoryTexts[MENTAL_STATE_KEYS.BAD], MENTAL_STATE_KEYS.BAD)
        .row()
        .text(mentalStateCategoryTexts[MENTAL_STATE_KEYS.DEPRESSION], MENTAL_STATE_KEYS.DEPRESSION);
    await ctx.reply(mentalStateDegreeText, {reply_markup: keyboard});
}
