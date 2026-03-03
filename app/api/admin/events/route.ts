import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(){
  const grouped=await prisma.event.groupBy({by:['eventName'],_count:true});
  const recent=await prisma.event.findMany({orderBy:{createdAt:'desc'},take:50});
  return NextResponse.json({grouped,recent});
}
