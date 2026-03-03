'use client';

import { useMemo, useState } from 'react';
import { categories, services } from '@/data/services';
import { rub } from '@/lib/utils';
import { Car, PhoneCall, Send, Wrench } from 'lucide-react';

const slogans = [
  'Чиним по-честному. Без пафоса. С кайфом.',
  'BMW в руках тех, кто шарит, а не обещает.',
  'Гаражный подход, премиальный результат.'
];

const navItems = [
  { id: 'services', label: 'Наши услуги' },
  { id: 'lead', label: 'Оставить заявку' },
  { id: 'calc', label: 'Калькулятор' },
  { id: 'faq', label: 'FAQ' }
];

const track = async (eventName: string, meta: Record<string, unknown> = {}) =>
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      events: [
        {
          sessionId: localStorage.getItem('sid') || 'anon',
          eventName,
          page: '/',
          meta
        }
      ]
    })
  });

if (typeof window !== 'undefined' && !localStorage.getItem('sid')) {
  localStorage.setItem('sid', crypto.randomUUID());
}

export default function HomeClient() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const filtered = useMemo(
    () =>
      services
        .filter(
          (s) =>
            (cat === 'all' || s.category === cat) &&
            `${s.title} ${s.tags.join(' ')}`.toLowerCase().includes(q.toLowerCase())
        )
        .sort((a, b) => (sort === 'asc' ? a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom)),
    [q, cat, sort]
  );

  const total = selected.reduce((acc, id) => acc + (services.find((s) => s.id === id)?.priceFrom || 0), 0);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    track('form_submit_attempt');
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: fd.get('fullName'),
      contact: fd.get('contact'),
      carModel: fd.get('carModel'),
      comment: `${fd.get('comment') || ''}\nВыбрано: ${selected.join(', ')}`,
      selectedServices: selected
    };
    const r = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (r.ok) {
      setSent(true);
      track('form_submit_success');
      e.currentTarget.reset();
    }
  };

  return (
    <main>
      <header className='sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 h-14 flex items-center justify-between'>
          <b className='brand-font text-lg'>NeGaraj</b>
          <nav className='hidden md:flex gap-4 text-[11px] uppercase tracking-[0.14em] text-white/80'>
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className='hover:text-neon transition'>
                {item.label}
              </a>
            ))}
          </nav>
          <a href='#lead' className='px-3 py-1.5 bg-neon text-black rounded-lg text-xs font-semibold'>
            Записаться
          </a>
        </div>
      </header>

      <div className='text-center text-xs py-2 bg-neon2/20'>Специализируемся на BMW</div>

      <section className='section'>
        <h1 className='text-5xl font-black brand-font'>NeGaraj</h1>
        <p className='text-xl mt-4'>{slogans[0]}</p>
        <p className='opacity-80 mt-3 max-w-2xl'>
          Профильные автомеханики. В свободное от основной работы время делаем качественно и дешевле
          рынка.
        </p>

        <div className='mt-6 flex flex-wrap gap-3'>
          <a
            href='#lead'
            className='px-4 py-2 rounded-xl bg-neon text-black inline-flex items-center gap-2'
            onClick={() => track('cta_click', { target: 'lead' })}
          >
            <Wrench size={16} /> Записаться
          </a>
          <a
            href='#calc'
            className='px-4 py-2 rounded-xl border border-white/20 inline-flex items-center gap-2 hover:border-neon'
            onClick={() => track('cta_click', { target: 'calc' })}
          >
            <Car size={16} /> Посчитать стоимость
          </a>
          <a href='tel:89779591082' className='px-4 py-2 rounded-xl border border-white/20 inline-flex items-center gap-2'>
            <PhoneCall size={16} /> 89779591082
          </a>
        </div>

        <div className='grid md:grid-cols-3 gap-4 mt-8'>
          {[
            ['1500+', 'Сделано работ'],
            ['300+', 'BMW в работе'],
            ['до 30%', 'Средняя экономия']
          ].map((i) => (
            <div key={i[1]} className='card p-6'>
              <div className='text-3xl font-bold text-neon'>{i[0]}</div>
              <div>{i[1]}</div>
            </div>
          ))}
        </div>
      </section>

      <section id='services' className='section'>
        <h2 className='text-4xl font-bold'>Наши услуги</h2>
        <p className='opacity-80'>
          Делаем работы по BMW (и не только), цены — за работу. Запчасти подбираем и помогаем выкупить.
        </p>
        <div className='grid md:grid-cols-3 gap-4 mt-8'>
          {categories.map((c) => (
            <button
              key={c}
              className='card p-5 text-left hover:shadow-glow transition'
              onClick={() => {
                setCat(c);
                document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section id='lead' className='section scroll-mt-24'>
        <h2 className='text-4xl font-bold'>Оставьте заявку на ремонт</h2>
        <form onSubmit={submit} className='card p-6 mt-4 grid md:grid-cols-2 gap-3'>
          <input required name='fullName' placeholder='ФИО' className='bg-black/40 rounded p-2' />
          <input required name='contact' placeholder='Номер/ТГ' className='bg-black/40 rounded p-2' />
          <input required name='carModel' placeholder='Марка/модель' className='bg-black/40 rounded p-2 md:col-span-2' />
          <textarea name='comment' placeholder='Комментарий' className='bg-black/40 rounded p-2 md:col-span-2' />
          <label className='text-sm md:col-span-2'>
            <input required type='checkbox' /> Согласен на обработку данных
          </label>
          <button className='bg-neon text-black rounded p-2 md:col-span-2 inline-flex justify-center items-center gap-2'>
            <Send size={16} /> Отправить
          </button>
          {sent && <div className='text-neon'>Заявка отправлена!</div>}
        </form>
        <div className='mt-3 text-sm'>
          Или сразу: <a href='tel:89779591082'>Позвонить</a> /{' '}
          <a href='https://t.me/negaraj_bot?start=lead'>Написать в бот @negaraj_bot</a>
        </div>
      </section>

      <section id='calc' className='section'>
        <h2 className='text-4xl font-bold'>Калькулятор</h2>
        <div className='grid lg:grid-cols-2 gap-6 mt-6'>
          <div className='card p-4'>
            <div className='flex gap-2 mb-3'>
              <input
                className='bg-black/40 p-2 rounded w-full'
                placeholder='Поиск работ'
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <select className='bg-black/40 p-2 rounded' onChange={(e) => setSort(e.target.value)}>
                <option value='asc'>Цена ↑</option>
                <option value='desc'>Цена ↓</option>
              </select>
            </div>
            <div className='flex flex-wrap gap-2 mb-3'>
              <button onClick={() => setCat('all')} className='px-2 py-1 border rounded'>
                Все
              </button>
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className='px-2 py-1 border rounded text-xs'>
                  {c}
                </button>
              ))}
            </div>
            <div className='space-y-2 max-h-[420px] overflow-auto'>
              {filtered.map((s) => (
                <div key={s.id} className='p-3 rounded border border-white/10'>
                  <div className='font-medium'>{s.title}</div>
                  <div className='text-sm opacity-70'>
                    {s.priceType === 'fixed' ? rub(s.priceFrom) : `от ${rub(s.priceFrom)}`}
                  </div>
                  <button
                    className='text-neon text-sm'
                    onClick={() => {
                      setSelected((v) => (v.includes(s.id) ? v : v.concat(s.id)));
                      track('calc_add_service', { id: s.id });
                    }}
                  >
                    Добавить
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='card p-4'>
            <h3 className='font-bold text-xl'>Корзина работ</h3>
            {selected.map((id) => {
              const s = services.find((x) => x.id === id);
              if (!s) return null;
              return (
                <div key={id} className='flex justify-between py-2 border-b border-white/10'>
                  <span>{s.title}</span>
                  <button
                    onClick={() => {
                      setSelected((v) => v.filter((x) => x !== id));
                      track('calc_remove_service', { id });
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
            <p className='mt-4 text-lg'>
              Итого за работу: <b>от {rub(total)}</b>
            </p>
            <p className='text-xs opacity-70'>
              Запчасти/жидкости/расходники — отдельно, поможем подобрать и выкупить.
            </p>
            <a href='#lead' className='inline-block mt-3 px-4 py-2 bg-neon text-black rounded-xl'>
              Оформить заявку
            </a>
          </div>
        </div>
      </section>

      <section id='faq' className='section'>
        <h2 className='text-4xl font-bold'>FAQ</h2>
        {[
          {
            q: 'Какая гарантия на работы?',
            a: 'На выполненные работы даём гарантию. Срок зависит от типа услуги и фиксируется при приёмке.'
          },
          {
            q: 'Как записаться и что нужно для расчёта?',
            a: 'Оставьте заявку на сайте или напишите в @negaraj_bot: фамилия, номер, модель и что беспокоит. Ответим с ориентиром по цене и времени.'
          },
          {
            q: 'Запчасти сами купите или привозить?',
            a: 'Оба варианта возможны. Можем подобрать и помочь выкупить оригинал/неоригинал. В прайсе на сайте указана только работа.'
          },
          {
            q: 'Сколько по времени занимает ТО / мойка радиаторов / чистка впуска?',
            a: 'ТО обычно делаем в течение дня. Мойка радиаторов и чистка впуска занимают от нескольких часов до 1–2 дней в зависимости от модели и состояния.'
          }
        ].map((fq) => (
          <details key={fq.q} className='card p-4 mt-3'>
            <summary>{fq.q}</summary>
            <p className='opacity-70 mt-2'>{fq.a}</p>
          </details>
        ))}
      </section>

      <section id='about' className='section'>
        <h2 className='text-4xl font-bold'>О нас</h2>
        <p className='opacity-80 mt-3'>
          Мы — команда профильных автомехаников. Обычно работаем в сервисе/индустрии, а в свободное
          время берём машины своего круга и делаем качественно, без накруток и дешевле рынка. Есть доступ
          к оригинальным и неоригинальным запчастям по близкой к себестоимости цене: подберём, проверим,
          поможем выкупить. В прайсе на сайте — только стоимость работ.
        </p>
      </section>

      <footer id='contacts' className='section border-t border-white/10 text-sm opacity-80'>
        Телефон: 89779591082 • Telegram: @negaraj_bot • Ежедневно 10:00–21:00
      </footer>
    </main>
  );
}
