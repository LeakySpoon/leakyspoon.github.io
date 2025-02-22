document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const hintButton = document.getElementById('hint-btn');
    const backButton = document.getElementById('back-btn');
    const questionContainerElement = document.getElementById('question-container');
    const imageContainerElement = document.getElementById('image-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const hintContainerElement = document.getElementById('hint-container');
    const hintTextElement = document.getElementById('hint-text');

    let shuffledQuestions, currentQuestionIndex;

    const questions = [
    {
        "image": "1.png",
        "answers": [
            { "text": "Норма", "correct": true },
            { "text": "Пневмония", "correct": false },
            { "text": "ХОБЛ", "correct": false },
            { "text": "Туберкулёз", "correct": false }
        ],
        "hint": "Нормальная рентгенологическая картина лёгких: чёткие контуры, отсутствие затемнений или очаговых изменений. Лёгочный рисунок не усилен, корни лёгких структурны."
    },
    {
        "image": "2.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "ХОБЛ", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Пневмония", "correct": true }
        ],
        "hint": "При пневмонии на рентгене видны очаговые затемнения, усиление лёгочного рисунка, возможны признаки инфильтрации. Часто сопровождается расширением корней лёгких."
    },
    {
        "image": "3.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "ХОБЛ", "correct": false },
            { "text": "Пневмония", "correct": true },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Пневмония характеризуется очаговыми или сегментарными затемнениями, усилением лёгочного рисунка, возможны плевральные изменения."
    },
    {
        "image": "4.png",
        "answers": [
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Левосторонняя пневмония, осложнённая экссудативным плевритом", "correct": true },
            { "text": "Гидроторакс", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "На рентгене видно затемнение в левом лёгком с горизонтальным уровнем жидкости, что указывает на экссудативный плеврит. Лёгочный рисунок в зоне поражения усилен."
    },
    {
        "image": "5.png",
        "answers": [
            { "text": "Идиопатический фиброзирующий альвеолит", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "ХОБЛ", "correct": false },
            { "text": "Туберкулёз", "correct": false }
        ],
        "hint": "Характерны диффузные изменения лёгочной ткани по типу «матового стекла», усиление лёгочного рисунка, возможны кистозные изменения."
    },
    {
        "image": "6.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "ХОБЛ, эмфизема лёгких, пневмофиброз, бронхоэктазы, спайки", "correct": true }
        ],
        "hint": "При ХОБЛ наблюдается повышенная прозрачность лёгочной ткани, низкое стояние диафрагмы, усиление лёгочного рисунка. Бронхоэктазы видны как кольцевидные тени."
    },
    {
        "image": "7.png",
        "answers": [
            { "text": "Остеохондроз", "correct": false },
            { "text": "Гонартроз", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": true },
            { "text": "Подагра", "correct": false }
        ],
        "hint": "На рентгене видны признаки сакроилеита, окостенение связок позвоночника, формирование «бамбукового» позвоночника."
    },
    {
        "image": "8.png",
        "answers": [
            { "text": "Туберкулёз", "correct": true },
            { "text": "Пневмония", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Туберкулёз характеризуется очаговыми изменениями в верхних долях лёгких, возможны кальцинаты, каверны, усиление лёгочного рисунка."
    },
    {
        "image": "9.png",
        "answers": [
            { "text": "ВПС", "correct": true },
            { "text": "Кардиомегалия", "correct": false },
            { "text": "Инфаркт-пневмония", "correct": false },
            { "text": "ХОБЛ", "correct": false }
        ],
        "hint": "При врождённых пороках сердца на рентгене видны изменения конфигурации сердца, возможны признаки лёгочной гипертензии."
    },
    {
        "image": "10.png",
        "answers": [
            { "text": "Метастазы", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Метастазы на рентгене видны как множественные очаговые затемнения различного размера, часто с чёткими контурами."
    },
    {
        "image": "11.png",
        "answers": [
            { "text": "Пневмония", "correct": false },
            { "text": "Пульмонэктомия", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "После пульмонэктомии на рентгене видно отсутствие одного лёгкого, смещение средостения в сторону удалённого лёгкого, повышенная прозрачность оставшегося лёгкого."
    },
    {
        "image": "12.png",
        "answers": [
            { "text": "Саркоидоз", "correct": false },
            { "text": "Идиопатический фиброзирующий альвеолит", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "ХОБЛ", "correct": false }
        ],
        "hint": "Характерны диффузные изменения лёгочной ткани по типу «матового стекла», усиление лёгочного рисунка, возможны кистозные изменения."
    },
    {
        "image": "13.png",
        "answers": [
            { "text": "Кардиомегалия", "correct": true },
            { "text": "Инфаркт-пневмония", "correct": false },
            { "text": "ВПС", "correct": false },
            { "text": "ХОБЛ", "correct": false }
        ],
        "hint": "Кардиомегалия характеризуется увеличением размеров сердца, часто с изменением его конфигурации. Лёгочный рисунок может быть усилен."
    },
    {
        "image": "14.png",
        "answers": [
            { "text": "Инфаркт-пневмония", "correct": false },
            { "text": "Кардиомегалия", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Кардиомегалия характеризуется увеличением размеров сердца, часто с изменением его конфигурации. Лёгочный рисунок может быть усилен."
    },
    {
        "image": "15.png",
        "answers": [
            { "text": "Инфаркт-пневмония", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Инфаркт-пневмония характеризуется очаговыми затемнениями в лёгких, часто в нижних долях, с признаками инфильтрации и возможным плевральным выпотом."
    },
    {
        "image": "16.png",
        "answers": [
            { "text": "Гонартроз", "correct": true },
            { "text": "Остеохондроз", "correct": false },
            { "text": "Подагра", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "Гонартроз характеризуется сужением суставной щели, субхондральным склерозом, остеофитами в области коленного сустава."
    },
    {
        "image": "17.png",
        "answers": [
            { "text": "Остеохондроз", "correct": false },
            { "text": "Гонартроз", "correct": true },
            { "text": "Подагра", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "Гонартроз характеризуется сужением суставной щели, субхондральным склерозом, остеофитами в области коленного сустава."
    },
    {
        "image": "18.png",
        "answers": [
            { "text": "Подагра", "correct": false },
            { "text": "Гонартроз", "correct": true },
            { "text": "Остеохондроз", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "Гонартроз характеризуется сужением суставной щели, субхондральным склерозом, остеофитами в области коленного сустава."
    },
    {
        "image": "19.png",
        "answers": [
            { "text": "Подагра", "correct": true },
            { "text": "Гонартроз", "correct": false },
            { "text": "Остеохондроз", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "При подагре на рентгене видны тофусы в области суставов, эрозии костей, возможны признаки деформации суставов."
    },
    {
        "image": "20.png",
        "answers": [
            { "text": "Миеломная болезнь", "correct": true },
            { "text": "Талассемия", "correct": false },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false }
        ],
        "hint": "Миеломная болезнь характеризуется очагами деструкции костной ткани, чаще в плоских костях, с чёткими контурами."
    },
    {
        "image": "21.png",
        "answers": [
            { "text": "Талассемия (Кули)", "correct": true },
            { "text": "Миеломная болезнь", "correct": false },
            { "text": "Остеопороз", "correct": false },
            { "text": "Метастазы в кости", "correct": false }
        ],
        "hint": "Талассемия характеризуется изменением структуры костей, особенно черепа (феномен «щётка»), а также расширением костномозговых пространств."
    },
    {
        "image": "22.png",
        "answers": [
            { "text": "Туберкулёзный плеврит", "correct": true },
            { "text": "Гидроторакс", "correct": false },
            { "text": "Опухоль плевры", "correct": false },
            { "text": "Пневмоторакс", "correct": false }
        ],
        "hint": "Туберкулёзный плеврит характеризуется наличием жидкости в плевральной полости, часто с утолщением плевры и возможными кальцинатами."
    },
    {
        "image": "23.png",
        "answers": [
            { "text": "Гидроторакс", "correct": true },
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "24.png",
        "answers": [
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Гидроторакс", "correct": true },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "25.png",
        "answers": [
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Гидроторакс", "correct": true },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "26.png",
        "answers": [
            { "text": "Гидроторакс", "correct": true },
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "27.png",
        "answers": [
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Гидроторакс", "correct": true },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "28.png",
        "answers": [
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false },
            { "text": "Гидроторакс", "correct": true },
        ],
        "hint": "Гидроторакс характеризуется скоплением жидкости в плевральной полости, что видно как горизонтальный уровень затемнения на рентгене."
    },
    {
        "image": "29.png",
        "answers": [
            { "text": "Гидроторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Пневмоторакс", "correct": true },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Пневмоторакс характеризуется наличием воздуха в плевральной полости, что видно как просветление без лёгочного рисунка."
    },
    {
        "image": "30.png",
        "answers": [
            { "text": "Гидроторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false },
            { "text": "Пневмоторакс", "correct": true },
        ],
        "hint": "Пневмоторакс характеризуется наличием воздуха в плевральной полости, что видно как просветление без лёгочного рисунка."
    },
    {
        "image": "31.png",
        "answers": [
            { "text": "Гидроторакс", "correct": false },
            { "text": "Пневмоторакс", "correct": true },
            { "text": "Туберкулёзный плеврит", "correct": false },
            { "text": "Опухоль плевры", "correct": false }
        ],
        "hint": "Пневмоторакс характеризуется наличием воздуха в плевральной полости, что видно как просветление без лёгочного рисунка."
    },
    {
        "image": "32.png",
        "answers": [
            { "text": "Опухоль Панкоста", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false }
        ],
        "hint": "Опухоль Панкоста локализуется в верхушке лёгкого, может вызывать разрушение рёбер и позвонков, а также синдром Горнера."
    },
    {
        "image": "33.png",
        "answers": [
            { "text": "Рак лёгкого", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Рак лёгкого на рентгене виден как очаговое затемнение с неровными контурами, возможны признаки инфильтрации и увеличение лимфоузлов."
    },
    {
        "image": "34.png",
        "answers": [
            { "text": "Рак лёгкого", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Рак лёгкого на рентгене виден как очаговое затемнение с неровными контурами, возможны признаки инфильтрации и увеличение лимфоузлов."
    },
    {
        "image": "35.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Рак лёгкого", "correct": true },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Рак лёгкого на рентгене виден как очаговое затемнение с неровными контурами, возможны признаки инфильтрации и увеличение лимфоузлов."
    },
    {
        "image": "36.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Рак лёгкого", "correct": true }
        ],
        "hint": "Рак лёгкого на рентгене виден как очаговое затемнение с неровными контурами, возможны признаки инфильтрации и увеличение лимфоузлов."
    },
    {
        "image": "37.png",
        "answers": [
            { "text": "Диссеминированный туберкулёз", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Диссеминированный туберкулёз характеризуется множественными мелкими очагами затемнения в обоих лёгких, часто с симметричным распределением."
    },
    {
        "image": "38.png",
        "answers": [
            { "text": "Туберкулёз", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Туберкулёз характеризуется очаговыми изменениями в верхних долях лёгких, возможны кальцинаты, каверны, усиление лёгочного рисунка."
    },
    {
        "image": "39.png",
        "answers": [
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Туберкулёз", "correct": true }
        ],
        "hint": "Туберкулёз характеризуется очаговыми изменениями в верхних долях лёгких, возможны кальцинаты, каверны, усиление лёгочного рисунка."
    },
    {
        "image": "40.png",
        "answers": [
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Туберкулёз", "correct": true },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Туберкулёз характеризуется очаговыми изменениями в верхних долях лёгких, возможны кальцинаты, каверны, усиление лёгочного рисунка."
    },
    {
        "image": "41.png",
        "answers": [
            { "text": "Туберкулёз", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Туберкулёз характеризуется очаговыми изменениями в верхних долях лёгких, возможны кальцинаты, каверны, усиление лёгочного рисунка."
    },
    {
        "image": "42.png",
        "answers": [
            { "text": "Осумкованный плеврит", "correct": true },
            { "text": "Гидроторакс", "correct": false },
            { "text": "Пневмоторакс", "correct": false },
            { "text": "Туберкулёзный плеврит", "correct": false }
        ],
        "hint": "Осумкованный плеврит характеризуется локальным скоплением жидкости в плевральной полости, часто с чёткими границами и изменением формы при дыхании."
    },
    {
        "image": "44.png",
        "answers": [
            { "text": "Туберкулёма", "correct": true },
            { "text": "Рак лёгкого", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false }
        ],
        "hint": "Туберкулёма видна на рентгене как округлое образование с чёткими контурами, часто с кальцинатами внутри."
    },
    {
        "image": "45.png",
        "answers": [
            { "text": "Опухоль Панкоста", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false }
        ],
        "hint": "Опухоль Панкоста локализуется в верхушке лёгкого, может вызывать разрушение рёбер и позвонков, а также синдром Горнера."
    },
    {
        "image": "46.png",
        "answers": [
            { "text": "Фиброз лёгких", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Туберкулёз", "correct": false },
            { "text": "ХОБЛ", "correct": false }
        ],
        "hint": "Фиброз лёгких характеризуется усилением лёгочного рисунка, деформацией бронхов, возможны кистозные изменения и уменьшение объёма лёгких."
    },
    {
        "image": "47.png",
        "answers": [
            { "text": "ХОБЛ + фиброз лёгких", "correct": true },
            { "text": "Саркоидоз", "correct": false },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Рак лёгкого", "correct": false }
        ],
        "hint": "ХОБЛ с фиброзом лёгких характеризуется повышенной прозрачностью лёгочной ткани, низким стоянием диафрагмы, усилением лёгочного рисунка и деформацией бронхов."
    },
    {
        "image": "48.png",
        "answers": [
            { "text": "Абсцесс лёгкого", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Рак лёгкого", "correct": false },
            { "text": "Пневмония", "correct": false }
        ],
        "hint": "Абсцесс лёгкого виден на рентгене как полость с горизонтальным уровнем жидкости, окружённая зоной инфильтрации."
    },
    {
        "image": "49.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Рак лёгкого", "correct": false },
            { "text": "Абсцесс лёгкого", "correct": true },
            { "text": "Пневмония", "correct": false }
        ],
        "hint": "Абсцесс лёгкого виден на рентгене как полость с горизонтальным уровнем жидкости, окружённая зоной инфильтрации."
    },
    {
        "image": "50.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false },
            { "text": "Саркоидоз", "correct": true }
        ],
        "hint": "Саркоидоз характеризуется увеличением лимфоузлов корней лёгких, множественными мелкими очагами затемнения, часто с симметричным распределением."
    },
    {
        "image": "51.png",
        "answers": [
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Саркоидоз", "correct": true },
            { "text": "Метастазы в лёгкие", "correct": false }
        ],
        "hint": "Саркоидоз характеризуется увеличением лимфоузлов корней лёгких, множественными мелкими очагами затемнения, часто с симметричным распределением."
    },
    {
        "image": "52.png",
        "answers": [
            { "text": "Саркоидоз", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false }
        ],
        "hint": "Саркоидоз характеризуется увеличением лимфоузлов корней лёгких, множественными мелкими очагами затемнения, часто с симметричным распределением."
    },
    {
        "image": "54.png",
        "answers": [
            { "text": "Саркоидоз", "correct": true },
            { "text": "Туберкулёз", "correct": false },
            { "text": "Фиброз лёгких", "correct": false },
            { "text": "Метастазы в лёгкие", "correct": false }
        ],
        "hint": "Саркоидоз характеризуется увеличением лимфоузлов корней лёгких, множественными мелкими очагами затемнения, часто с симметричным распределением."
    },
    {
        "image": "57.png",
        "answers": [
            { "text": "Ревматоидный артрит", "correct": true },
            { "text": "Остеоартроз", "correct": false },
            { "text": "Подагра", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "Ревматоидный артрит характеризуется эрозиями суставных поверхностей, сужением суставной щели, остеопорозом околосуставных костей."
    },
    {
        "image": "60.png",
        "answers": [
            { "text": "Коксартроз", "correct": true },
            { "text": "Гонартроз", "correct": false },
            { "text": "Остеохондроз", "correct": false },
            { "text": "Подагра", "correct": false }
        ],
        "hint": "Коксартроз характеризуется сужением суставной щели тазобедренного сустава, субхондральным склерозом, остеофитами."
    },
    {
        "image": "61.png",
        "answers": [
            { "text": "Деформирующий остеоартроз (ДОА)", "correct": true },
            { "text": "Ревматоидный артрит", "correct": false },
            { "text": "Подагра", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "ДОА характеризуется сужением суставной щели, субхондральным склерозом, остеофитами и деформацией суставных поверхностей."
    },
    {
        "image": "62.png",
        "answers": [
            { "text": "Подагра", "correct": true },
            { "text": "Ревматоидный артрит", "correct": false },
            { "text": "Остеоартроз", "correct": false },
            { "text": "Анкилозирующий спондилоартрит", "correct": false }
        ],
        "hint": "При подагре на рентгене видны тофусы в области суставов, эрозии костей, возможны признаки деформации суставов."
    },
    {
        "image": "63.png",
        "answers": [
            { "text": "Анкилозирующий спондилоартрит (болезнь Бехтерева)", "correct": true },
            { "text": "Ревматоидный артрит", "correct": false },
            { "text": "Остеоартроз", "correct": false },
            { "text": "Подагра", "correct": false }
        ],
        "hint": "Анкилозирующий спондилоартрит характеризуется сакроилеитом, окостенением связок позвоночника, формированием «бамбукового» позвоночника."
    },
    {
        "image": "64.png",
        "answers": [
            { "text": "Гидронефроз", "correct": true },
            { "text": "Мегаколон", "correct": false },
            { "text": "Язвенный колит", "correct": false },
            { "text": "Опухоль сигмы", "correct": false }
        ],
        "hint": "Гидронефроз характеризуется расширением чашечно-лоханочной системы почки из-за нарушения оттока мочи."
    },
    {
        "image": "67.png",
        "answers": [
            { "text": "Мегаколон", "correct": true },
            { "text": "Гидронефроз", "correct": false },
            { "text": "Язвенный колит", "correct": false },
            { "text": "Опухоль сигмы", "correct": false }
        ],
        "hint": "Мегаколон характеризуется значительным расширением толстой кишки, часто с утолщением стенок и нарушением моторики."
    },
    {
        "image": "68.png",
        "answers": [
            { "text": "Язвенный колит", "correct": true },
            { "text": "Болезнь Крона", "correct": false },
            { "text": "Мегаколон", "correct": false },
            { "text": "Опухоль сигмы", "correct": false }
        ],
        "hint": "Язвенный колит характеризуется непрерывным воспалением слизистой оболочки толстой кишки, часто с образованием язв и псевдополипов."
    },
    {
        "image": "69.png",
        "answers": [
            { "text": "Опухоль сигмовидной кишки", "correct": true },
            { "text": "Язвенный колит", "correct": false },
            { "text": "Болезнь Крона", "correct": false },
            { "text": "Мегаколон", "correct": false }
        ],
        "hint": "Опухоль сигмовидной кишки видна на рентгене как дефект наполнения с неровными контурами, возможны признаки стеноза."
    },
    {
        "image": "70.png",
        "answers": [
            { "text": "Болезнь Крона", "correct": true },
            { "text": "Язвенный колит", "correct": false },
            { "text": "Мегаколон", "correct": false },
            { "text": "Опухоль сигмы", "correct": false }
        ],
        "hint": "Болезнь Крона характеризуется сегментарным поражением кишечника с чередованием здоровых и воспалённых участков, возможны свищи и стриктуры."
    },
    ];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= shuffledQuestions.length) {
            shuffleQuestions();
            currentQuestionIndex = 0;
        }
        setNextQuestion();
    });
    hintButton.addEventListener('click', showHint);
    backButton.addEventListener('click', hideHint);

    function startGame() {
        startButton.classList.add('hide');
        shuffleQuestions();
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
    }

    function shuffleQuestions() {
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = 'Quiz Image';
        imageContainerElement.appendChild(img);

        question.answers.sort(() => Math.random() - 0.5);
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(button, answer));
            answerButtonsElement.appendChild(button);
        });

        hintButton.classList.remove('hide');
    }

    function resetState() {
        nextButton.classList.add('hide');
        hintButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        while (imageContainerElement.firstChild) {
            imageContainerElement.removeChild(imageContainerElement.firstChild);
        }
    }

    function selectAnswer(button, answer) {
        if (answer.correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        Array.from(answerButtonsElement.children).forEach(btn => {
            btn.disabled = true;
            const correctAnswer = shuffledQuestions[currentQuestionIndex].answers.find(ans => ans.correct);
            if (btn.innerText === correctAnswer.text) {
                btn.classList.add('correct');
            } else if (!answer.correct && btn !== button) {
                btn.classList.add('wrong');
            }
        });
        nextButton.classList.remove('hide');
        hintButton.classList.add('hide');
    }

    function showHint() {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        hintTextElement.innerText = currentQuestion.hint;
        hintContainerElement.classList.add('show');
        questionContainerElement.classList.add('hide');
        backButton.classList.remove('hide');
    }

    function hideHint() {
        hintContainerElement.classList.remove('show');
        questionContainerElement.classList.remove('hide');
        backButton.classList.add('hide');
    }
});
