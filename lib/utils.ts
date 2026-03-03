import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
export const rub = (n:number)=> new Intl.NumberFormat('ru-RU').format(n)+' ₽';
