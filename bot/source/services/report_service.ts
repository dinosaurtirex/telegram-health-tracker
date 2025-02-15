import {CallbackQueryContext, CommandContext, Context} from "grammy";
import { InlineKeyboard } from "grammy";
import {CALLBACKS_REPORT_KEYS, HEADACHE_KEYS} from "../data/callbacks";


export async function reportService(ctx: CommandContext<Context>) {
    const keyboard = new InlineKeyboard()
        .text("Головная Боль", CALLBACKS_REPORT_KEYS.HEADACHE)
        .row()
        .text("Иные Недуги", CALLBACKS_REPORT_KEYS.OTHER_ILLNESSES)
        .row()
        .text("Ментальное Состояние", CALLBACKS_REPORT_KEYS.MENTAL_STATE);

    await ctx.reply("Выберите категорию:", { reply_markup: keyboard });
}

export async function HeadacheCallbackQuery(ctx: CallbackQueryContext<Context>) {
    await ctx.answerCallbackQuery();
    const keyboard = new InlineKeyboard()
        .text("Сильная головная боль", HEADACHE_KEYS.STRONG)
        .row()
        .text("Средняя головная боль", HEADACHE_KEYS.MEDIUM)
        .row()
        .text("Слабая головная боль", HEADACHE_KEYS.LOW)
        .row()
        .text("Головная боль отсутствует", HEADACHE_KEYS.CLEAR);
    await ctx.reply("Выберите степень головной боли:", { reply_markup: keyboard });
}

export async function HeadacheCallbackWrite(ctx: CallbackQueryContext<Context>, degree: string) {
    await ctx.answerCallbackQuery();
    console.log("Write headache: " + degree);
}