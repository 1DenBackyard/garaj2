export type ServiceCategory =
  | 'ТО и жидкости'
  | 'Двигатель'
  | 'Трансмиссия/привод'
  | 'Редукторы/раздатка'
  | 'Тормоза'
  | 'Подвеска/рулевое'
  | 'Охлаждение'
  | 'Кодирование/CarPlay/функции'
  | 'Другое';
export type PriceType = 'fixed'|'range'|'unknown';
export type Service = {id:string; title:string; category:ServiceCategory; priceType:PriceType; priceFrom:number; priceTo?:number; note?:string; tags:string[]};

const coding = (id:string,title:string,from:number,tags:string[]=[]):Service=>({id,title,category:'Кодирование/CarPlay/функции',priceType:'unknown',priceFrom:from,priceTo:Math.max(from,from+3000),tags});

export const services: Service[] = [
{id:'eng-1',title:'Чистка впуска 4 цилиндра',category:'Двигатель',priceType:'fixed',priceFrom:25000,tags:['впуск']},
{id:'eng-2',title:'Чистка впуска 6 цилиндров',category:'Двигатель',priceType:'fixed',priceFrom:30000,tags:['впуск']},
{id:'eng-3',title:'Замена подушек ДВС',category:'Двигатель',priceType:'fixed',priceFrom:15000,tags:['двигатель']},
{id:'eng-4',title:'Замена демпфера',category:'Двигатель',priceType:'fixed',priceFrom:7000,tags:['демпфер']},
{id:'eng-5',title:'Замена масляного стакана',category:'Двигатель',priceType:'range',priceFrom:7000,priceTo:15000,tags:['масло']},
{id:'eng-6',title:'Замена клапанной крышки',category:'Двигатель',priceType:'fixed',priceFrom:15000,tags:['крышка']},
{id:'tr-1',title:'Замена масла в коробке',category:'Трансмиссия/привод',priceType:'fixed',priceFrom:6000,tags:['коробка','масло']},
{id:'tr-2',title:'Замена масла в ДВС',category:'ТО и жидкости',priceType:'fixed',priceFrom:1500,tags:['то']},
{id:'rd-1',title:'Замена масла в переднем редукторе',category:'Редукторы/раздатка',priceType:'fixed',priceFrom:2500,tags:['редуктор']},
{id:'rd-2',title:'Замена масла в раздатке',category:'Редукторы/раздатка',priceType:'fixed',priceFrom:3500,note:'Включает сброс адаптаций',tags:['раздатка']},
{id:'rd-3',title:'Замена масла в заднем редукторе',category:'Редукторы/раздатка',priceType:'fixed',priceFrom:2000,tags:['редуктор']},
{id:'rd-4',title:'Замена сальников заднего редуктора',category:'Редукторы/раздатка',priceType:'fixed',priceFrom:13000,tags:['сальник']},
{id:'rd-5',title:'Замена муфты заднего редуктора',category:'Редукторы/раздатка',priceType:'fixed',priceFrom:8000,tags:['муфта']},
{id:'f-1',title:'Замена салонного фильтра',category:'ТО и жидкости',priceType:'range',priceFrom:1000,priceTo:1500,tags:['фильтр']},
{id:'f-2',title:'Замена воздушного фильтра',category:'ТО и жидкости',priceType:'range',priceFrom:800,priceTo:1000,tags:['фильтр']},
{id:'dr-1',title:'Замена/снятие-установка привода или пыльника',category:'Трансмиссия/привод',priceType:'fixed',priceFrom:12000,tags:['привод','пыльник']},
{id:'cool-1',title:'Мойка радиаторов',category:'Охлаждение',priceType:'range',priceFrom:12000,priceTo:32000,note:'Жидкости/расходники отдельно, Porsche — 32 000',tags:['радиатор']},
{id:'br-1',title:'Замена колодок (1 ось)',category:'Тормоза',priceType:'fixed',priceFrom:2500,tags:['колодки']},
{id:'br-2',title:'Замена тормозных дисков (1 ось)',category:'Тормоза',priceType:'fixed',priceFrom:2500,tags:['диски']},
{id:'br-3',title:'Замена тормозной жидкости',category:'Тормоза',priceType:'fixed',priceFrom:2500,note:'Жидкость отдельно',tags:['жидкость']},
{id:'sus-1',title:'Смазка задних шаровых на G-кузов BMW',category:'Подвеска/рулевое',priceType:'fixed',priceFrom:6000,tags:['g-кузов']},
{id:'sus-2',title:'Замена рычага нижнего поперечного (1 шт)',category:'Подвеска/рулевое',priceType:'fixed',priceFrom:3500,tags:['рычаг']},
{id:'sus-3',title:'Замена продольной тяги (1 шт)',category:'Подвеска/рулевое',priceType:'fixed',priceFrom:3500,tags:['тяга']},
{id:'sus-4',title:'Замена сайлентблоков передних продольных тяг (1 шт)',category:'Подвеска/рулевое',priceType:'fixed',priceFrom:4500,note:'Часто выгоднее поменять тягу целиком',tags:['сайлентблок']},
{id:'sus-5',title:'Разработка и смазка рулевых тяг для регулировки УУК',category:'Подвеска/рулевое',priceType:'fixed',priceFrom:4000,note:'Если получится раскрутить',tags:['уук']},
{id:'code-0',title:'Устранение сбоев в работе CarPlay',category:'Кодирование/CarPlay/функции',priceType:'range',priceFrom:3000,priceTo:10000,tags:['carplay']},
...[
['Отключение Start/Stop (память)',2000],['Разблокировка видео в движении',2000],['Открытие/закрытие багажника без удерживания кнопки',2000],['Выключение звука “пристегните ремень”',1500],['Скорость на приборной панели',1500],['Приборка M/Alpina',3000],['Увеличение яркости габаритов',1500],['Перемигивание дальнего с ПТФ',2000],['Звуки RR/Mini',2000],['Изменение цветов подсветки',2000],['Регулировка температуры подогрева сидений',2000],['Добавление режимов Comfort+ / Sport+',3000],['Угол опускания правого зеркала задним ходом',1500],['Настройки B&O/B&W / улучшение Harman Kardon',3000],['Эквалайзер для Stereo/Hi-Fi',2000],['Интерфейс ГУ ID5–ID6',3000],['Стробоскопы (ПТФ гаснут при дальнем)',2000],['Автоподогрев/вентиляция сидений и руля от температуры',3000],['Системные звуки уведомлений (Mini/i8/RR/ID8)',2000],['Заставка/лого при приветствии/выключении',2000],['Перспектива “прицеп” для камеры (зум)',2000],['Багажник закрывается из салона одним нажатием',2000],['Плавное закрытие багажника',3000],['Омыватели фар: отключение/настройка',2000],['Подъём стекла не прекращается при открытии двери',2000],['Подсветка ручек при заднем ходе',2000],['Режим по умолчанию при запуске (Sport/Eco/Comfort)',2000],['Активация 2TB/лепестков',3000],['Launch Control',3000],['Температура шин (если датчики есть)',2000],['Спортивные приборы',2000],['Белая подсветка 6WA ночью',2000],['Поворотники на HUD',2000],['Комфортная посадка (сиденье отъезжает)',2000],['Складывание зеркал при закрытии/открытии',2000],['Убрать задержки складывания/доводчиков/багажника',2000],['Яркость колец/ДХО/режимы света + галочка ДХО',3000],['Настройка датчиков дождя/затемнения/света/омыва',2000],['Добавление LIM',2000],['Включение ПТФ при повороте руля',2000],['Убрать предупреждение камеры заднего вида',1500],['Убрать проверку ламп после LED/ксенон в ПТФ',2000],['Память последнего режима движения/обогревов',2000]
].map((v,i)=>coding(`code-${i+1}`,String(v[0]),Number(v[1])))
];

export const categories = Array.from(new Set(services.map((s)=>s.category)));
