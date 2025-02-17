import {CallbackQueryContext, Context, InlineKeyboard} from "grammy";
import {headacheCategoryTexts, headacheDegreeText} from "../../data/texts";
import {HEADACHE_KEYS} from "../../data/keys";

export async function headacheCallbackQuery(ctx: CallbackQueryContext<Context>) {
    await ctx.answerCallbackQuery();
    const keyboard = new InlineKeyboard()
        .text(headacheCategoryTexts[HEADACHE_KEYS.STRONG], HEADACHE_KEYS.STRONG)
        .row()
        .text(headacheCategoryTexts[HEADACHE_KEYS.MEDIUM], HEADACHE_KEYS.MEDIUM)
        .row()
        .text(headacheCategoryTexts[HEADACHE_KEYS.LOW], HEADACHE_KEYS.LOW)
        .row()
        .text(headacheCategoryTexts[HEADACHE_KEYS.CLEAR], HEADACHE_KEYS.CLEAR);
    await ctx.reply(headacheDegreeText, {reply_markup: keyboard});
}