import {Api, Bot, Context, RawApi} from 'grammy';
import {Prisma, PrismaClient} from "@prisma/client";
import {DefaultArgs} from "@prisma/client/runtime/client";
import {everydayNotification} from "../bot/data/texts";
import telegramMainBot from "../bot/bot";
import getPrismaInstance from "../database/postgres";
import schedule from 'node-schedule';


export async function sendNotifications(bot: Bot<Context, Api<RawApi>>, database:  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    const chats = await database.chat.findMany();
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    console.log("Запускаем рассылку")
    for (const chat of chats) {
        console.log("Отсылаем в чат инфу. " + chat)
        const sixHours = 6 * 60 * 60 * 1000
        const chatCreationDate = new Date(chat.added_at).getTime()
        const isNewUser = chatCreationDate + sixHours <= chatCreationDate;

        const notificationExists = await database.telegramNotification.findFirst({
            where: {
                chat_id: chat.id,
                sent_at: {
                    gte: todayStart,
                    lte: todayEnd
                }
            }
        });

        const reportExists = await database.report.findFirst({
            where: {
                chat_id: chat.id,
                added_at: {
                    gte: todayStart,
                    lte: todayEnd
                }
            },
            include: {
                chat: true
            }
        })

        if (!notificationExists && !reportExists && !isNewUser) {
            try {
                await bot.api.sendMessage(chat.chat_id, everydayNotification);
                await database.telegramNotification.create({
                    data: {
                        chat_id: chat.id,
                        sent_at: new Date()
                    }
                });
            } catch (error) {
                console.error(`Ошибка при отправке в чат ${chat.chat_id}:`, error);
            }
        }
    }
}

sendNotifications(telegramMainBot, getPrismaInstance()).catch(console.error)

schedule.scheduleJob('*/5 * * * *', async () => {
    await sendNotifications(telegramMainBot, getPrismaInstance()).catch(console.error);
});
