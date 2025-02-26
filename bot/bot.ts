import { Bot } from "grammy";
import {getEnv} from "../utils/getEnv";
import {startService} from "./services/start.service";
import {CALLBACKS_REPORT_KEYS, HEADACHE_KEYS, MENTAL_STATE_KEYS} from "./data/keys";
import {otherMentalStateText, startServiceMessageText} from "./data/texts";
import {reportService} from "./services/report.service";
import {otherService} from "./services/other.service";
import {headacheCallbackQuery} from "./services/headache/base.callbacks";
import {headacheCallbackWrite} from "./services/headache/write.callbacks";
import {mentalStateCallbackQuery} from "./services/mentalState/base.callbacks";
import {mentalStateCallbackWrite} from "./services/mentalState/write.callbacks";
import {analyticsService} from "./services/analytics.service";

const telegramMainBot = new Bot(getEnv().TG_BOT_TOKEN);

telegramMainBot.command("start", (ctx) => startService(ctx));
telegramMainBot.command("report", (ctx) => reportService(ctx));
telegramMainBot.command("other", (ctx) => otherService(ctx));

telegramMainBot.command("analytics", (ctx) => analyticsService(ctx));

// back to start screen
telegramMainBot.callbackQuery(CALLBACKS_REPORT_KEYS.START_SCREEN, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(startServiceMessageText);
});

// headache
telegramMainBot.callbackQuery(CALLBACKS_REPORT_KEYS.HEADACHE, (ctx) => headacheCallbackQuery(ctx));

telegramMainBot.callbackQuery(HEADACHE_KEYS.STRONG, (ctx) => headacheCallbackWrite(ctx, HEADACHE_KEYS.STRONG));
telegramMainBot.callbackQuery(HEADACHE_KEYS.MEDIUM, (ctx) => headacheCallbackWrite(ctx, HEADACHE_KEYS.MEDIUM));
telegramMainBot.callbackQuery(HEADACHE_KEYS.LOW, (ctx) => headacheCallbackWrite(ctx, HEADACHE_KEYS.LOW));
telegramMainBot.callbackQuery(HEADACHE_KEYS.CLEAR, (ctx) => headacheCallbackWrite(ctx, HEADACHE_KEYS.CLEAR));

// mental states
telegramMainBot.callbackQuery(CALLBACKS_REPORT_KEYS.MENTAL_STATE, (ctx) => mentalStateCallbackQuery(ctx));

telegramMainBot.callbackQuery(MENTAL_STATE_KEYS.PERFECT, (ctx) => mentalStateCallbackWrite(ctx, MENTAL_STATE_KEYS.PERFECT));
telegramMainBot.callbackQuery(MENTAL_STATE_KEYS.GOOD, (ctx) => mentalStateCallbackWrite(ctx, MENTAL_STATE_KEYS.GOOD));
telegramMainBot.callbackQuery(MENTAL_STATE_KEYS.BAD, (ctx) => mentalStateCallbackWrite(ctx, MENTAL_STATE_KEYS.BAD));
telegramMainBot.callbackQuery(MENTAL_STATE_KEYS.DEPRESSION, (ctx) => mentalStateCallbackWrite(ctx, MENTAL_STATE_KEYS.DEPRESSION));

// other
telegramMainBot.callbackQuery(CALLBACKS_REPORT_KEYS.OTHER_ILLNESSES, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(otherMentalStateText);
});


export default telegramMainBot;