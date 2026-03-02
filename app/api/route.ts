import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'NeGaraj API',
    version: '1.0.0',
    status: 'ok',
    endpoints: {
      lead: {
        submit: 'POST /api/lead'
      },
      tracking: {
        ingest: 'POST /api/track'
      },
      telegram: {
        callback: 'POST /api/telegram/callback'
      },
      auth: {
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      admin: {
        leads: 'GET /api/admin/leads',
        dashboard: 'GET /api/admin/dashboard',
        events: 'GET /api/admin/events'
      }
    }
  });
}
