import { PrismaClient } from '@prisma/client';
import {SUPPORTED_DATABASES} from "./constants";

const prisma = new PrismaClient();

export default function getPrismaInstance() {
    return prisma
}
