import getPrismaInstance from "../postgres";
import {Chat} from "@prisma/client";

export async function getGraphicMentalState(chat: Chat, days: number) {
    const database = getPrismaInstance();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days); // Вычисляем дату "с"

    const mentalStateGraph = await database.mentalStateReport.findMany({
        where: {
            report: {
                chat_id: chat.id
            },
            added_at: {
                gte: startDate // Фильтр по дате
            }
        },
        include: {
            report: true
        }
    });

    return mentalStateGraph.map((entry) => ({
        date: entry.added_at,
        status: entry.status
    }));
}

export async function getGraphicHeadache(chat: Chat, days: number) {
    const database = getPrismaInstance();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days); // Вычисляем дату "с"

    const headacheGraph = await database.headacheReport.findMany({
        where: {
            report: {
                chat_id: chat.id
            },
            added_at: {
                gte: startDate // Фильтр по дате
            }
        },
        include: {
            report: true
        }
    });

    return headacheGraph.map((entry) => ({
        date: entry.added_at,
        status: entry.status
    }));
}

