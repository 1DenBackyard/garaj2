import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(req:Request){
  const {searchParams}=new URL(req.url); const q=searchParams.get('q')||''; const status=searchParams.get('status')||undefined;
  const leads=await prisma.lead.findMany({where:{AND:[status?{status:status as any}:{},{OR:[{fullName:{contains:q}},{carModel:{contains:q}},{contact:{contains:q}}]}]},orderBy:{createdAt:'desc'}});
  if(searchParams.get('export')==='csv'){
    const csv='id,date,name,contact,car,status,comment\n'+leads.map(l=>`${l.id},${l.createdAt.toISOString()},"${l.fullName}","${l.contact}","${l.carModel}",${l.status},"${l.comment||''}"`).join('\n');
    return new NextResponse(csv,{headers:{'content-type':'text/csv','content-disposition':'attachment; filename=leads.csv'}});
  }
  return NextResponse.json(leads);
}
