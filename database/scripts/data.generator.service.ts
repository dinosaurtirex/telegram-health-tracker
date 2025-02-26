import { PrismaClient } from "@prisma/client";
import {HEADACHE_KEYS, MENTAL_STATE_KEYS} from "../../bot/data/keys";

const prisma = new PrismaClient();
const CHAT_ID = 1;

function getRandomValue<T>(values: T[]): T {
    return values[Math.floor(Math.random() * values.length)];
}

async function seedDatabase() {
    const days = 14;
    const minRecords = 5;
    const maxRecords = 10;
    const now = new Date();


    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const report = await prisma.report.create({
            data: {
                chat_id: CHAT_ID,
                added_at: date,
            },
        });

        await prisma.telegramNotification.create({
            data: {
                chat_id: CHAT_ID,
                sent_at: date,
            },
        });

        await prisma.headacheReport.create({
            data: {
                status: getRandomValue([
                    HEADACHE_KEYS.STRONG,
                    HEADACHE_KEYS.MEDIUM,
                    HEADACHE_KEYS.LOW,
                    HEADACHE_KEYS.CLEAR
                ]),
                report_id: report.id,
                added_at: date,
            },
        });

        await prisma.mentalStateReport.create({
            data: {
                status: getRandomValue([
                    MENTAL_STATE_KEYS.PERFECT,
                    MENTAL_STATE_KEYS.GOOD,
                    MENTAL_STATE_KEYS.BAD,
                    MENTAL_STATE_KEYS.DEPRESSION
                ]),
                report_id: report.id,
                added_at: date,
            },
        });

        await prisma.otherStateReport.create({
            data: {
                status: "good",
                report_id: report.id,
                added_at: date,
            },
        });
    }

    console.log("Database seeding completed.");
    await prisma.$disconnect();
}

seedDatabase().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
