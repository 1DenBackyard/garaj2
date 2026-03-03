'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Login(){ const [p,setP]=useState(''); const [e,setE]=useState(''); const r=useRouter();
  return <main className='section max-w-md'><h1 className='text-3xl font-bold'>Admin Login</h1><input type='password' value={p} onChange={x=>setP(x.target.value)} className='w-full mt-4 p-2 rounded bg-black/40'/><button className='mt-3 px-4 py-2 bg-neon text-black rounded' onClick={async()=>{const res=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:p})}); if(res.ok)r.push('/admin'); else setE('Неверный пароль');}}>Войти</button><p>{e}</p></main>;
}
