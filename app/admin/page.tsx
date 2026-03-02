'use client';
import { useEffect, useState } from 'react';

export default function Admin(){
  const [leads,setLeads]=useState<any[]>([]); const [dash,setDash]=useState<any>(); const [events,setEvents]=useState<any>(); const [q,setQ]=useState('');
  useEffect(()=>{fetch('/api/admin/leads').then(r=>r.json()).then(setLeads); fetch('/api/admin/dashboard').then(r=>r.json()).then(setDash); fetch('/api/admin/events').then(r=>r.json()).then(setEvents);},[]);
  const f=leads.filter(l=>`${l.fullName} ${l.contact} ${l.carModel}`.toLowerCase().includes(q.toLowerCase()));
  return <main className='section'><div className='flex justify-between'><h1 className='text-4xl font-bold'>Админка</h1><button onClick={()=>fetch('/api/auth/logout',{method:'POST'}).then(()=>location.href='/admin/login')}>Выход</button></div>
  <section className='mt-6 card p-4'><h2 className='text-2xl font-bold'>Дашборд</h2><div className='grid md:grid-cols-3 gap-3 mt-3'><div>Всего: {dash?.all}</div><div>Сегодня: {dash?.today}</div><div>7 дней: {dash?.week}</div></div></section>
  <section className='mt-6 card p-4'><h2 className='text-2xl font-bold'>Заявки</h2><input placeholder='поиск' className='bg-black/40 rounded p-2 mt-3' value={q} onChange={e=>setQ(e.target.value)}/><a className='ml-3 underline' href='/api/admin/leads?export=csv'>CSV</a><div className='overflow-auto mt-3'><table className='w-full text-sm'><thead><tr><th>ID</th><th>Дата</th><th>ФИО</th><th>Контакт</th><th>Авто</th><th>Статус</th></tr></thead><tbody>{f.map(l=><tr key={l.id}><td>{l.id}</td><td>{new Date(l.createdAt).toLocaleString()}</td><td>{l.fullName}</td><td>{l.contact}</td><td>{l.carModel}</td><td>{l.status}</td></tr>)}</tbody></table></div></section>
  <section className='mt-6 card p-4'><h2 className='text-2xl font-bold'>Аналитика действий</h2><div className='grid md:grid-cols-2 gap-4 mt-3'><div>{events?.grouped?.map((g:any)=><div key={g.eventName}>{g.eventName}: {g._count}</div>)}</div><div className='text-xs max-h-56 overflow-auto'>{events?.recent?.map((ev:any)=><div key={ev.id}>{new Date(ev.createdAt).toLocaleString()} • {ev.eventName}</div>)}</div></div></section></main>;
}
