import {Chat, HeadacheReport, MentalStateReport, OtherStateReport, Report} from "@prisma/client";
import getPrismaInstance from "../postgres";


export async function getOrCreateReport(chatId: number): Promise<Report> {
    const database = getPrismaInstance();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let report = await database.report.findFirst({
        where: {
            chat_id: chatId,
            added_at: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });

    console.log("=== Found or Creating Report ===", { chatId, report });

    if (!report) {
        report = await database.report.create({
            data: { chat_id: chatId },
        });
    }

    return report;
}

export async function createHeadacheReport(report: Report, status: string): Promise<HeadacheReport> {
    const database = getPrismaInstance();
    return database.headacheReport.create({
        data: {
            report_id: report.id,
            status,
        },
    });
}

export async function createMentalStateReport(report: Report, status: string): Promise<MentalStateReport> {
    const database = getPrismaInstance();
    console.log("Creating MentalStateReport:", { report_id: report.id, status });

    return database.mentalStateReport.create({
        data: {
            report_id: report.id,
            status,
        },
    });
}

export async function createOtherStateReport(report: Report, status: string): Promise<OtherStateReport> {
    const database = getPrismaInstance();
    return database.otherStateReport.create({
        data: {
            report_id: report.id,
            status,
        },
    });
}


export async function getOrCreateChat(chatId: number): Promise<Chat> {
    const database = getPrismaInstance();

    let chat = await database.chat.findFirst({
        where: { chat_id: chatId },
    });

    if (!chat) {
        chat = await database.chat.create({
            data: {
                chat_id: chatId,
            },
        });
    }

    return chat;
}