import getPrismaInstance from "../postgres";
import {Chat} from "@prisma/client";

export async function getGraphicHeadache(chat: Chat) {
    const database = getPrismaInstance();
    const headacheGraph = await database.headacheReport.findMany({
        where: {
            report: {
                chat_id: chat.id
            }
        },
        select: {
            added_at: true,
            status: true
        }
    });

    return headacheGraph.map(entry => ({
        date: entry.added_at,
        headache_status: entry.status
    }));
}