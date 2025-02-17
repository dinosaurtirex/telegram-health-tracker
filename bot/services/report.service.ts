import {CommandContext, Context} from "grammy";
import {
    chooseCategoryText
} from "../data/texts";
import {_createChooseKeyboardLayout} from "./utils";


export async function reportService(ctx: CommandContext<Context>) {
    await ctx.reply(chooseCategoryText, {reply_markup: _createChooseKeyboardLayout()});
}

