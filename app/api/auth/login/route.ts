import { NextResponse } from 'next/server';
import { z } from 'zod';
import { setAdminSession } from '@/lib/auth';
const schema = z.object({ password: z.string().min(1) });
export async function POST(req: Request) {
  const body = schema.parse(await req.json());
  if (body.password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ ok:false }, { status: 401 });
  setAdminSession();
  return NextResponse.json({ ok:true });
}
