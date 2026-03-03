import type { PrismaClient as PrismaClientType } from '@prisma/client';

type PrismaGlobal = typeof globalThis & { prisma?: PrismaClientType };
const g = globalThis as PrismaGlobal;

function createPrismaClient(): PrismaClientType {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client') as { PrismaClient: new () => PrismaClientType };
    return new PrismaClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Prisma Client is not generated. Run: "pnpm prisma:generate" (or reinstall deps). Original error: ${message}`
    );
  }
}

export const prisma = g.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== 'production') g.prisma = prisma;
