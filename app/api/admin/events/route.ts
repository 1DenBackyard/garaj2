import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(){
  const grouped=await prisma.event.groupBy({by:['eventName'],_count:true});
  const recent=await prisma.event.findMany({orderBy:{createdAt:'desc'},take:50});
  const normalized = recent.map((e) => ({ ...e, metaParsed: (() => { try { return e.meta ? JSON.parse(e.meta as unknown as string) : {}; } catch { return {}; } })() }));
  return NextResponse.json({grouped,recent: normalized});
}
