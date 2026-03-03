import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req:Request){ const {events=[]}= await req.json(); if (!Array.isArray(events)) return NextResponse.json({ok:false},{status:400});
 await prisma.event.createMany({data:events.map((e:any)=>({sessionId:e.sessionId||'anon',eventName:e.eventName,page:e.page||'/',meta:JSON.stringify(e.meta||{})}))});
 return NextResponse.json({ok:true}); }
