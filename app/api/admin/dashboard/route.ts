import { prisma } from '@/lib/prisma';
import { startOfDay, subDays } from 'date-fns';
import { NextResponse } from 'next/server';
export async function GET(){
  const all=await prisma.lead.count();
  const today=await prisma.lead.count({where:{createdAt:{gte:startOfDay(new Date())}}});
  const week=await prisma.lead.count({where:{createdAt:{gte:subDays(new Date(),7)}}});
  const statuses=await prisma.lead.groupBy({by:['status'],_count:true});
  return NextResponse.json({all,today,week,statuses});
}
