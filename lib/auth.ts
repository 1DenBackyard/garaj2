import { cookies } from 'next/headers';
export const setAdminSession = () => cookies().set('admin_session', '1', { httpOnly: true, secure: process.env.NODE_ENV==='production', path: '/', maxAge: 60*60*12 });
export const clearAdminSession = () => cookies().delete('admin_session');
