import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function getPrismaInstance() {
    return prisma
}
