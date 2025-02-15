import { Bot } from "grammy";
import {getEnv} from "../../utils/getEnv";
import {startService} from "./services/start_service";
import {HeadacheCallbackWrite, reportService} from "./services/report_service";
import {HeadacheCallbackQuery} from "./services/report_service";
import {CALLBACKS_REPORT_KEYS, HEADACHE_KEYS} from "./data/callbacks";

const telegramMainBot = new Bot(getEnv().TG_BOT_TOKEN);

telegramMainBot.command("start", (ctx) => startService(ctx));
telegramMainBot.command("report", (ctx) => reportService(ctx));

// HEADACHE
telegramMainBot.callbackQuery(CALLBACKS_REPORT_KEYS.HEADACHE, (ctx) => HeadacheCallbackQuery(ctx));
telegramMainBot.callbackQuery(HEADACHE_KEYS.STRONG, (ctx) => HeadacheCallbackWrite(ctx, HEADACHE_KEYS.STRONG));
telegramMainBot.callbackQuery(HEADACHE_KEYS.MEDIUM, (ctx) => HeadacheCallbackWrite(ctx, HEADACHE_KEYS.MEDIUM));
telegramMainBot.callbackQuery(HEADACHE_KEYS.LOW, (ctx) => HeadacheCallbackWrite(ctx, HEADACHE_KEYS.LOW));
telegramMainBot.callbackQuery(HEADACHE_KEYS.CLEAR, (ctx) => HeadacheCallbackWrite(ctx, HEADACHE_KEYS.CLEAR));


export default telegramMainBot;