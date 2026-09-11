import { Surah, Reciter } from '../types';

export const RECITERS: Reciter[] = [
  // 1. الشيخ رعد الكردي
  { 
    id: 'raad_kurdi', 
    nameAr: 'الشيخ رعد الكردي', 
    nameEn: 'Raad Al-Kurdi', 
    nameUg: 'شەيخ رەئد ئەلكۇردىي', 
    nameTr: 'Raad el-Kürdi',
    styleAr: 'صوت هادئ خاشع ومؤثر',
    styleUg: 'تىنچ، تەسىرلىك ۋە يۈرەككە يېقىملىق تىلاۋەت',
    styleEn: 'Calm & Heart-touching Recitation',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server6.mp3quran.net/kurdi/'
  },
  // 2. القارئ إسلام صبحي
  { 
    id: 'islam_sobhi', 
    nameAr: 'القارئ إسلام صبحي', 
    nameEn: 'Islam Sobhi', 
    nameUg: 'شەيخ ئىسلام سوبھى', 
    nameTr: 'İslam Subhi',
    styleAr: 'نبرة شجية عذبة تأسر القلوب',
    styleUg: 'يۈرەكلەرنى ئېرىتىدىغان جەلپكار مۇڭلۇق ئاۋاز',
    styleEn: 'Melodic & Emotional Tone',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/'
  },
  // 3. الشيخ عبد الرحمن مسعد
  { 
    id: 'abdulrahman_massad', 
    nameAr: 'القارئ عبد الرحمن مسعد', 
    nameEn: 'Abdulrahman Massad', 
    nameUg: 'شەيخ ئابدۇرراھمان مەسئۇد', 
    nameTr: 'Abdurrahman Massad',
    styleAr: 'تلاوة ندية مريحة للأعصاب تسكن الفؤاد',
    styleUg: 'ناھايىتى سۈزۈك، كۆڭۈلگە ئارام بېغىشلايدىغان ئاۋاز',
    styleEn: 'Serene & Soulful Voice',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://archive.org/download/20210117_20210117_1138/'
  },
  // 4. الشيخ محمد اللحيدان
  { 
    id: 'muhammad_luhaidan', 
    nameAr: 'الشيخ محمد اللحيدان', 
    nameEn: 'Muhammad Al-Luhaidan', 
    nameUg: 'شەيخ مۇھەممەد ئەللوھەيدان', 
    nameTr: 'Muhammed el-Luheydan',
    styleAr: 'تلاوة نجدية حزينة خاشعة ومبكية',
    styleUg: 'نەجدىچە ناھايىتى مۇڭلۇق، تەسىرلىك ۋە يىغلىتىدىغان تىلاۋەت',
    styleEn: 'Deeply Moving & Tearful Najdi Recitation',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server8.mp3quran.net/lhdan/'
  },
  // 5. الشيخ عبد العزيز سحيم (ئەڭ مۇڭ تىلاۋەتلەر)
  { 
    id: 'abdulaziz_suhaim', 
    nameAr: 'الشيخ عبد العزيز سحيم', 
    nameEn: 'Abdulaziz Suhaim', 
    nameUg: 'شەيخ ئابدۇلئەزىز سۇھەيم', 
    nameTr: 'Abdülaziz Suheym',
    styleAr: 'تلاوة جزائرية خاشعة ومتقنة ومؤثرة',
    styleUg: 'جەزائىرچە پاساھەتلىك، روھلاندۇرىدىغان مۇڭ تىلاۋەت',
    styleEn: 'Captivating Algerian Recitation',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server16.mp3quran.net/a_sheim/Rewayat-Warsh-A-n-Nafi/'
  },
  // 6. القارئ شريف مصطفى (ئەڭ مۇڭ تىلاۋەتلەر)
  { 
    id: 'sherif_mostafa', 
    nameAr: 'القارئ شريف مصطفى', 
    nameEn: 'Sherif Mostafa', 
    nameUg: 'شەيخ شەرىف مۇستافا', 
    nameTr: 'Şerif Mustafa',
    styleAr: 'تلاوة سينمائية آسرة تشفي الصدور',
    styleUg: 'ئوچۇق، ھەيۋەتلىك ۋە تەسىرلىك مۇڭلۇق تىلاۋەت',
    styleEn: 'Deep Resonant & Moving Voice',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://archive.org/download/Sherif-Mostafa/'
  },
  // 6. هزاع البلوشي
  { 
    id: 'hazza_albalushi', 
    nameAr: 'هزاع البلوشي', 
    nameEn: 'Hazza Al-Balushi', 
    nameUg: 'ھەززائ ئەلبەلۇشىي', 
    nameTr: 'Hazza el-Baluşi',
    styleAr: 'صوت رخيم هادئ يأخذك لعالم السكينة',
    styleUg: 'ناھايىتى مۇلايىم، قەلبلەرگە تەمكىنلىك بېغىشلىغۇچى ئاۋاز',
    styleEn: 'Tranquil & Peaceful Resonance',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server11.mp3quran.net/hazza/'
  },
  // 7. الشيخ مشاري راشد العفاسي
  { 
    id: 'mishary', 
    nameAr: 'الشيخ مشاري راشد العفاسي', 
    nameEn: 'Mishary Rashid Alafasy', 
    nameUg: 'شەيخ مىشارى راشىد ئەلئەفاسى', 
    nameTr: 'Mişari Raşid el-Afasi',
    styleAr: 'أشهر قراء العالم الإسلامي ترتيلاً وإتقاناً',
    styleUg: 'ئىسلام دۇنياسىدىكى ئەڭ مەشھۇر ۋە ئېنىق تىلاۋەت',
    styleEn: 'Iconic Global Master Reciter',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server8.mp3quran.net/afs/'
  },
  // 8. الشيخ ياسر الدوسري
  { 
    id: 'yasser_dossari', 
    nameAr: 'الشيخ ياسر الدوسري', 
    nameEn: 'Yasser Al-Dossari', 
    nameUg: 'شەيخ ياسىر ئەددەۋسەرىي', 
    nameTr: 'Yaser ed-Devseri',
    styleAr: 'إمام الحرم المكي الشريف - صوت قوي خاشع',
    styleUg: 'ھەرەم مەسچىتىنىڭ ئىمامى - ھەيۋەتلىك ۋە تەسىرلىك',
    styleEn: 'Imam of Masjid Al-Haram Makkah',
    subfolder: 'Yasser_Ad-Dussary_128kbps',
    streamBaseUrl: 'https://server11.mp3quran.net/yasser/'
  },
  // 9. الشيخ ماهر المعيقلي
  { 
    id: 'maher_muaiqly', 
    nameAr: 'الشيخ ماهر المعيقلي', 
    nameEn: 'Maher Al-Muaiqly', 
    nameUg: 'شەيخ ماھىر ئەلمۇئەيقلىي', 
    nameTr: 'Mahir el-Muaykili',
    styleAr: 'إمام الحرم المكي الشريف - نبرة دافئة محببة',
    styleUg: 'ھەرەم مەسچىتىنىڭ ئىمامى - ئىللىق، سۈزۈك تىلاۋەت',
    styleEn: 'Imam of Masjid Al-Haram Makkah',
    subfolder: 'Maher_AlMuaiqly_64kbps',
    streamBaseUrl: 'https://server12.mp3quran.net/maher/'
  },
  // 10. الشيخ ناصر القطامي
  { 
    id: 'nasser_qatami', 
    nameAr: 'الشيخ ناصر القطامي', 
    nameEn: 'Nasser Al-Qatami', 
    nameUg: 'شەيخ ناسىر ئەلقەتامىي', 
    nameTr: 'Nasır el-Katami',
    styleAr: 'تلاوة حجازية نجدية بديعة خاشعة',
    styleUg: 'ھىجاز-نەجد ئۇسلۇبىدىكى گۈزەل تىلاۋەت',
    styleEn: 'Majestic Saudi Recitation',
    subfolder: 'Nasser_Alqatami_128kbps',
    streamBaseUrl: 'https://server6.mp3quran.net/qtm/'
  },
  // 12. الشيخ أحمد النفيس
  { 
    id: 'ahmad_nufais', 
    nameAr: 'الشيخ أحمد النفيس', 
    nameEn: 'Ahmad Al-Nufais', 
    nameUg: 'شەيخ ئەھمەد ئەننەفىيس', 
    nameTr: 'Ahmed en-Nefis',
    styleAr: 'صوت كويتي عذب ورنان',
    styleUg: 'كۇۋەيتلىك قارىي - شېرىن ۋە شوخ راۋان ئاۋاز',
    styleEn: 'Sweet & Melodious Voice',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server16.mp3quran.net/nufais/'
  },
  // 13. الشيخ بدر التركي
  { 
    id: 'badr_turki', 
    nameAr: 'الشيخ بدر التركي', 
    nameEn: 'Badr Al-Turki', 
    nameUg: 'شەيخ بەدر ئەلتۈركىي', 
    nameTr: 'Bedr et-Türki',
    styleAr: 'تلاوة نجدية مريحة جداً للقلب',
    styleUg: 'قەلبلەرگە راھەت بېغىشلىغۇچى سۈزۈك ئاۋاز',
    styleEn: 'Deep Serene Najdi Recitation',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server16.mp3quran.net/badr/'
  },
  // 14. الشيخ منصور السالمي
  { 
    id: 'mansoor_salimi', 
    nameAr: 'الشيخ منصور السالمي', 
    nameEn: 'Mansoor Al-Salimi', 
    nameUg: 'شەيخ مەنسۇر ئەلسالىمىي', 
    nameTr: 'Mansur es-Salimi',
    styleAr: 'تلاوة مؤثرة تلامس الوجدان',
    styleUg: 'ھېسسىياتقا باي تەسىرلىك تىلاۋەت',
    styleEn: 'Inspiring & Moving Reciter',
    subfolder: 'Alafasy_128kbps',
    streamBaseUrl: 'https://server14.mp3quran.net/mansor/'
  },
  // 15. الشيخ عبد الباسط عبد الصمد
  { 
    id: 'abdulbasit', 
    nameAr: 'الشيخ عبد الباسط عبد الصمد', 
    nameEn: 'Abdulbasit Abdussamad', 
    nameUg: 'شەيخ ئابدۇلباسىت ئابدۇسسەمەد', 
    nameTr: 'Abdülbasit Abdüssamed',
    styleAr: 'صوت مكة الخالد وأسطورة التجويد',
    styleUg: 'تەجۋىد شاھى ۋە دۇنياۋى ئەڭ داڭلىق ئالتۇن ئاۋاز',
    styleEn: 'Golden Voice & Master of Tajweed',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    streamBaseUrl: 'https://server7.mp3quran.net/basit/'
  },
  // 16. الشيخ محمود خليل الحصري
  { 
    id: 'hussary', 
    nameAr: 'الشيخ محمود خليل الحصري', 
    nameEn: 'Mahmoud Khalil Al-Hussary', 
    nameUg: 'شەيخ مەھمۇد خەلىل ئەلھۇسەرىي', 
    nameTr: 'Mahmud Halil el-Husari',
    styleAr: 'شيخ عموم المقارئ المصرية وأستاذ الترتيل',
    styleUg: 'تەجۋىد قائىدىلىرىگە ئەڭ دەل توغرا بولغان ئۇستاز قارىي',
    styleEn: 'Master of Tajweed Precision',
    subfolder: 'Hussary_128kbps',
    streamBaseUrl: 'https://server13.mp3quran.net/husr/'
  },
  // 17. الشيخ محمد صديق المنشاوي
  { 
    id: 'minshawi', 
    nameAr: 'الشيخ محمد صديق المنشاوي', 
    nameEn: 'Mohamed Siddiq Al-Minshawi', 
    nameUg: 'شەيخ مۇھەممەد سىددىق ئەلمىنشاۋى', 
    nameTr: 'Muhammed Sıddık el-Minşavi',
    styleAr: 'الصوت الباكي الخاشع رائد مدرسة الترتيل',
    styleUg: 'ھۆرمەتكە سازاۋەر يىغلاتقۇچى خاشىئ تىلاۋەت',
    styleEn: 'The Weeping & Humble Voice',
    subfolder: 'Minshawy_Murattal_128kbps',
    streamBaseUrl: 'https://server10.mp3quran.net/minsh/'
  },
  // 18. الشيخ سعد الغامدي
  { 
    id: 'ghamadi', 
    nameAr: 'الشيخ سعد الغامدي', 
    nameEn: 'Saad Al-Ghamdi', 
    nameUg: 'شەيخ سەئد ئەلغامىدى', 
    nameTr: 'Saad el-Gamidi',
    styleAr: 'تلاوة متقنة ذات لحن مميز ومحبوب',
    styleUg: 'پۈتۈن دۇنياغا تونۇلغان كۆركەم مۇڭلۇق ئاۋاز',
    styleEn: 'Beloved Melody & Fluent Pace',
    subfolder: 'Ghamadi_40kbps',
    streamBaseUrl: 'https://server7.mp3quran.net/s_gmd/'
  },
  // 19. الشيخ عبد الرحمن السديس
  { 
    id: 'sudais', 
    nameAr: 'الشيخ عبد الرحمن السديس', 
    nameEn: 'Abdur-Rahman As-Sudais', 
    nameUg: 'شەيخ ئابدۇرراھمان ئەلسۇدەيس', 
    nameTr: 'Abdurrahman es-Sudeys',
    styleAr: 'رئيس شؤون الحرمين وإمام المسجد الحرام',
    styleUg: 'ھەرەم مەسچىتىنىڭ باش ئىمامى - ھەيۋەتلىك ئاۋاز',
    styleEn: 'Head Imam of Masjid Al-Haram',
    subfolder: 'Abdurrahmaan_As-Sudais_192kbps',
    streamBaseUrl: 'https://server11.mp3quran.net/sds/'
  },
  // 20. الشيخ سعود الشريم
  { 
    id: 'shuraim', 
    nameAr: 'الشيخ سعود الشريم', 
    nameEn: 'Saood Ash-Shuraym', 
    nameUg: 'شەيخ سەئۇد ئەلشۇرەيم', 
    nameTr: 'Suud eş-Şureym',
    styleAr: 'إمام الحرم المكي الشريف السابق',
    styleUg: 'ھەرەم مەسچىتىنىڭ سابىق ئىمامى - كۈچلۈك تىلاۋەت',
    styleEn: 'Former Imam of Masjid Al-Haram',
    subfolder: 'Saood_ash-Shuraym_128kbps',
    streamBaseUrl: 'https://server7.mp3quran.net/shur/'
  },
  // 21. الشيخ فارس عباد
  { 
    id: 'fares_abbad', 
    nameAr: 'الشيخ فارس عباد', 
    nameEn: 'Fares Abbad', 
    nameUg: 'شەيخ فارىس ئەبباد', 
    nameTr: 'Faris Abbad',
    styleAr: 'تلاوة رخيمة تبعث على الخشوع والسكينة',
    styleUg: 'خۇشخۇي، تىنىچلىق بېغىشلىغۇچى تەسىرلىك ئاۋاز',
    styleEn: 'Soul-stirring Yemen Recitation',
    subfolder: 'Fares_Abbad_64kbps',
    streamBaseUrl: 'https://server8.mp3quran.net/frs_a/'
  },
  // 22. الشيخ علي جابر
  { 
    id: 'ali_jaber', 
    nameAr: 'الشيخ علي جابر رحمه الله', 
    nameEn: 'Ali Jaber', 
    nameUg: 'شەيخ ئەلىي جابىر (رەھىمەھۇللاھ)', 
    nameTr: 'Ali Cabir',
    styleAr: 'إمام الحرم المكي الأسبق - صاحب الحنجرة الذهبية',
    styleUg: 'ھەرەمنىڭ ئالتۇن ھالقىلىق تارىخىي ئىمامى',
    styleEn: 'Legendary Historic Haram Imam',
    subfolder: 'Ali_Jaber_64kbps',
    streamBaseUrl: 'https://server11.mp3quran.net/a_jbr/'
  }
];

export const SURAHS_LIST: Surah[] = [
  {
    number: 1,
    name: 'الفاتحة',
    englishName: 'Al-Fatihah',
    englishNameTranslation: 'The Opening',
    nameUg: 'فاتىھە سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
    page: 1,
    juz: 1,
    ayahs: [
      {
        number: 1,
        numberInSurah: 1,
        text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translationUg: 'ناھايىتى شەپقەتلىك ۋە مېھرىبان ئاللاھنىڭ ئىسمى بىلەن باشلايمەن.',
        translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        tafsirAr: 'أبدأ قراءتي باسم الله مستعينا به، الرحمن الذي وسعت رحمته كل شيء، الرحيم بالمؤمنين.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3'
      },
      {
        number: 2,
        numberInSurah: 2,
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translationUg: 'جىمى ھەمدۇسانا ئالەملەرنىڭ پەرۋەردىگارى ئاللاھقا خاستۇر.',
        translationEn: '[All] praise is [due] to Allah, Lord of the worlds.',
        tafsirAr: 'الثناء الكامل لله وحده، مالك الخلق والمدبر لأمرهم.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3'
      },
      {
        number: 3,
        numberInSurah: 3,
        text: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translationUg: 'ئۇ ناھايىتى شەپقەتلىك ۋە مېھرىباندۇر.',
        translationEn: 'The Entirely Merciful, the Especially Merciful,',
        tafsirAr: 'الذي عمّ برحمته جميع خلقه، وخصّ المؤمنين برحمته وإحسانه.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3'
      },
      {
        number: 4,
        numberInSurah: 4,
        text: 'مَالِكِ يَوْمِ الدِّينِ',
        translationUg: 'قىيامەت كۈنىنىڭ پادىشاھىدۇر.',
        translationEn: 'Sovereign of the Day of Recompense.',
        tafsirAr: 'الملك المتصرف في يوم الجزاء والحساب.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3'
      },
      {
        number: 5,
        numberInSurah: 5,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translationUg: '(پەرۋەردىگارىمىز!) ساڭىلا ئىبادەت قىلىمىز ۋە سەندىنلا ياردەم تىلەيمىز.',
        translationEn: 'It is You we worship and You we ask for help.',
        tafsirAr: 'نخصك وحدك بالعبادة، ونطلب منك وحدك المعونة في جميع أمورنا.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3'
      },
      {
        number: 6,
        numberInSurah: 6,
        text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translationUg: 'بىزنى توغرا يولغا باشلىغىن.',
        translationEn: 'Guide us to the straight path -',
        tafsirAr: 'وفقنا وأرشدنا إلى الطريق الواضح الذي لا اعوجاج فيه، وهو دين الإسلام.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3'
      },
      {
        number: 7,
        numberInSurah: 7,
        text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translationUg: 'سەن ئىنئام قىلغانلارنىڭ يولىغا، غەزەپكە ئۇچرىغانلارنىڭ ۋە ئازغانلارنىڭ يولىغا ئەمەس.',
        translationEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        tafsirAr: 'طريق الذين أنعمت عليهم من النبيين والصديقين والشهداء والصالحين.',
        juz: 1,
        page: 1,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3'
      }
    ]
  },
  {
    number: 2,
    name: 'سورة البقرة',
    englishName: 'Al-Baqarah',
    englishNameTranslation: 'The Cow',
    nameUg: 'بەقەرە سۈرىسى',
    revelationType: 'Medinan',
    numberOfAyahs: 286,
    page: 2,
    juz: 1,
    ayahs: [
      {
        number: 8,
        numberInSurah: 1,
        text: 'الٓمٓ',
        translationUg: 'ئەلىف، لام، مىم.',
        translationEn: 'Alif, Lam, Meem.',
        tafsirAr: 'حروف مقطعة لبيان إعجاز القرآن وأنه مركب من هذه الحروف العربية التي يعجزون عن معارضتها.',
        juz: 1,
        page: 2,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002001.mp3'
      },
      {
        number: 9,
        numberInSurah: 2,
        text: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        translationUg: 'بۇ كىتابتا ھېچ شەك-شۈبھە يوق، تەقۋادارلار ئۈچۈن توغرا يول كۆرسەتكۈچىدۇر.',
        translationEn: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
        tafsirAr: 'هذا القرآن العظيم لا شك في أنه حق منزل من عند الله، يهدي به المتقين الذين يخافون عقابه ويرجون ثوابه.',
        juz: 1,
        page: 2,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002002.mp3'
      },
      {
        number: 10,
        numberInSurah: 3,
        text: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        translationUg: 'ئۇلار غەيبكە ئىشىنىدۇ، نامازنى تولۇق ئادا قىلىدۇ، بىز ئۇلارغا رىزىق قىلىپ بەرگەن نەرسىلەردىن (خەير-ئېھسانغا) سەرپ قىلىدۇ.',
        translationEn: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,',
        tafsirAr: 'الذين يصدقون بالغيب الذي أخبرت به الرسل، ويؤدون الصلاة بأركانها وشروطها، وينفقون في سبيل الله مما رزقهم الله.',
        juz: 1,
        page: 2,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002003.mp3'
      },
      {
        number: 11,
        numberInSurah: 4,
        text: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
        translationUg: 'ئۇلار ساڭا نازىل قىلىنغان كىتابقا ۋە سەندىن ئىلگىرى نازىل قىلىنغان كىتابلارغا ئىشىنىدۇ، ئاخىرەت كۈنىگە چىن دىلىدىن ئىشىنىدۇ.',
        translationEn: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].',
        tafsirAr: 'والذين يصدقون بالقرآن المنزل عليك يا محمد وبما أنزل على الرسل من قبلك كالتوراة والإنجيل، وهم بالدار الآخرة موقنون.',
        juz: 1,
        page: 2,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002004.mp3'
      },
      {
        number: 12,
        numberInSurah: 5,
        text: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
        translationUg: 'ئەنە شۇلار پەرۋەردىگارى تەرىپىدىن كۆرسىتىلگەن توغرا يولدىدۇر، ئەنە شۇلار نىجات تاپقۇچىلاردۇر.',
        translationEn: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.',
        tafsirAr: 'أصحاب هذه الصفات على نور وبيان من ربهم، وأولئك هم الفائزون بالسعادة في الدنيا والآخرة.',
        juz: 1,
        page: 2,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002005.mp3'
      }
    ]
  },
  {
    number: 3,
    name: 'آل عمران',
    englishName: 'Ali \'Imran',
    englishNameTranslation: 'Family of Imran',
    nameUg: 'ئال ئىمران سۈرىسى',
    revelationType: 'Medinan',
    numberOfAyahs: 200,
    page: 50,
    juz: 3,
    ayahs: [
      {
        number: 294,
        numberInSurah: 1,
        text: 'الٓمٓ',
        translationUg: 'ئەلىف، لام، مىم.',
        translationEn: 'Alif, Lam, Meem.',
        tafsirAr: 'حروف مقطعة للتحدي والإعجاز.',
        juz: 3,
        page: 50,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/003001.mp3'
      },
      {
        number: 295,
        numberInSurah: 2,
        text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        translationUg: 'ئاللاھتىن باشقا ھېچ بىر ئىلاھ يوقتۇر، ئۇ مەڭگۈ ھاياتتۇر، مەخلۇقاتنى باشقۇرۇپ تۇرغۇچىدۇر.',
        translationEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
        tafsirAr: 'الله المنفرد بالألوهية، الحي الذي لا يموت، القائم بتدبير خلقه.',
        juz: 3,
        page: 50,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/003002.mp3'
      }
    ]
  },
  {
    number: 18,
    name: 'الكهف',
    englishName: 'Al-Kahf',
    englishNameTranslation: 'The Cave',
    nameUg: 'كەھف سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 110,
    page: 293,
    juz: 15,
    ayahs: [
      {
        number: 2141,
        numberInSurah: 1,
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا ۜ',
        translationUg: 'جىمى ھەمدۇسانا ئۆز بەندىسى (مۇھەممەد)گە كىتابنى نازىل قىلغان ۋە ئۇنىڭدا ھېچبىر قىڭغىرلىق قىلمىغان ئاللاھقا خاستۇر.',
        translationEn: '[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.',
        tafsirAr: 'الثناء الكامل لله الذي أنزل القرآن على رسوله محمد صلى الله عليه وسلم قيماً لا عوج فيه.',
        juz: 15,
        page: 293,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/018001.mp3'
      }
    ]
  },
  {
    number: 36,
    name: 'يس',
    englishName: 'Ya-Sin',
    englishNameTranslation: 'Ya Sin',
    nameUg: 'ياسىين سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 83,
    page: 440,
    juz: 22,
    ayahs: [
      {
        number: 3706,
        numberInSurah: 1,
        text: 'يسٓ',
        translationUg: 'يا، سىين.',
        translationEn: 'Ya, Seen.',
        tafsirAr: 'حروف مقطعة لبيان إعجاز القرآن.',
        juz: 22,
        page: 440,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036001.mp3'
      },
      {
        number: 3707,
        numberInSurah: 2,
        text: 'وَالْقُرْآنِ الْحَكِيمِ',
        translationUg: 'ھېكمەت بىلەن تولغان قۇرئان بىلەن قەسەم قىلىمەنكى،',
        translationEn: 'By the wise Qur\'an.',
        tafsirAr: 'يقسم الله بالقرآن المحكم في نظمه ومعانيه.',
        juz: 22,
        page: 440,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/036002.mp3'
      }
    ]
  },
  {
    number: 67,
    name: 'الملك',
    englishName: 'Al-Mulk',
    englishNameTranslation: 'The Sovereignty',
    nameUg: 'مۈلك سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 30,
    page: 562,
    juz: 29,
    ayahs: [
      {
        number: 5242,
        numberInSurah: 1,
        text: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
        translationUg: 'پۈتۈن ھۆكۈمرانلىق ئۆز ئىلكىدە بولغان ئاللاھ بۈيۈكتۇر، ئۇ ھەر نەرسىگە قادىردۇر.',
        translationEn: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
        tafsirAr: 'تعاظم وتكاثر خير وبركة الله الذي بيده ملك السماوات والأرض وله القدرة المطلقة.',
        juz: 29,
        page: 562,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/067001.mp3'
      }
    ]
  },
  {
    number: 112,
    name: 'الإخلاص',
    englishName: 'Al-Ikhlas',
    englishNameTranslation: 'Sincerity',
    nameUg: 'ئىخلاس سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 4,
    page: 604,
    juz: 30,
    ayahs: [
      {
        number: 6222,
        numberInSurah: 1,
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        translationUg: '(ئى مۇھەممەد!) ئېيتقىنكى: «ئۇ ئاللاھ بىردۇر.',
        translationEn: 'Say, "He is Allah, [who is] One,',
        tafsirAr: 'قل يا محمد لهؤلاء المشركين: الله هو الواحد الأحد الذي لا شريك له.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3'
      },
      {
        number: 6223,
        numberInSurah: 2,
        text: 'اللَّهُ الصَّمَدُ',
        translationUg: 'ئاللاھ ھەممىدىن بىھاجەتتۇر، پۈتۈن مەخلۇقات ئۇنىڭغا ھاجەتمەندۇر.',
        translationEn: 'Allah, the Eternal Refuge.',
        tafsirAr: 'الذي يقصده جميع خلقه في حوائجهم.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3'
      },
      {
        number: 6224,
        numberInSurah: 3,
        text: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translationUg: 'ئۇ تۇغمىغان ۋە تۇغۇلمىغاندۇر.',
        translationEn: 'He neither begets nor is born,',
        tafsirAr: 'ليس له ولد، ولم يلده أحد.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3'
      },
      {
        number: 6225,
        numberInSurah: 4,
        text: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translationUg: 'ھېچ كىشى ئۇنىڭغا تەڭداش بولالمايدۇ.»',
        translationEn: 'Nor is there to Him any equivalent."',
        tafsirAr: 'ولم يكن له مماثل ولا نظير في ذاته أو صفاته.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3'
      }
    ]
  },
  {
    number: 113,
    name: 'الفلق',
    englishName: 'Al-Falaq',
    englishNameTranslation: 'The Daybreak',
    nameUg: 'فەلەق سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 5,
    page: 604,
    juz: 30,
    ayahs: [
      {
        number: 6226,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        translationUg: 'ئېيتقىنكى: «تاڭ نۇرىنىڭ پەرۋەردىگارى بىلەن پاناھلىنىمەن،',
        translationEn: 'Say, "I seek refuge in the Lord of daybreak',
        tafsirAr: 'قل: أعتصم برب الصبح وفالقه.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3'
      }
    ]
  },
  {
    number: 114,
    name: 'الناس',
    englishName: 'An-Nas',
    englishNameTranslation: 'Mankind',
    nameUg: 'ناس سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 6,
    page: 604,
    juz: 30,
    ayahs: [
      {
        number: 6231,
        numberInSurah: 1,
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        translationUg: 'ئېيتقىنكى: «ئىنسانلارنىڭ پەرۋەردىگارى، ئىنسانلارنىڭ پادىشاھى، ئىنسانلارنىڭ ئىلاھى بىلەن پاناھلىنىمەن،',
        translationEn: 'Say, "I seek refuge in the Lord of mankind,',
        tafsirAr: 'قل: أعتصم وألتجئ برب البشر وخالقهم ومدبر أمورهم.',
        juz: 30,
        page: 604,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3'
      }
    ]
  },
  {
    number: 97,
    name: 'القدر',
    englishName: 'Al-Qadr',
    englishNameTranslation: 'The Power / Night of Decree',
    nameUg: 'قەدر سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 5,
    page: 598,
    juz: 30,
    ayahs: [
      {
        number: 6126,
        numberInSurah: 1,
        text: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        translationUg: 'ھەقىقەتەن بىز قۇرئاننى قەدر كېچىسىدە نازىل قىلدۇق.',
        translationEn: 'Indeed, We sent the Qur\'an down during the Night of Decree.',
        tafsirAr: 'إنا ابتدأنا إنزال القرآن في ليلة القدر المباركة من شهر رمضان.',
        juz: 30,
        page: 598,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/097001.mp3'
      },
      {
        number: 6127,
        numberInSurah: 2,
        text: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',
        translationUg: 'قەدر كېچىسىنىڭ نېمە ئىكەنلىكىنى بىلەمسەن؟',
        translationEn: 'And what can make you know what is the Night of Decree?',
        tafsirAr: 'وما أعلمك يا محمد بعظم قدر وشرف هذه الليلة؟',
        juz: 30,
        page: 598,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/097002.mp3'
      },
      {
        number: 6128,
        numberInSurah: 3,
        text: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
        translationUg: 'قەدر كېچىسى مىڭ ئايدىن ئەۋزەلدۇر.',
        translationEn: 'The Night of Decree is better than a thousand months.',
        tafsirAr: 'العمل الصالح في هذه الليلة خير وأفضل من عبادة ألف شهر ليس فيها ليلة قدر.',
        juz: 30,
        page: 598,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/097003.mp3'
      },
      {
        number: 6129,
        numberInSurah: 4,
        text: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ',
        translationUg: 'شۇ كېچىدە پەرىشتىلەر ۋە جىبرىئىل پەرۋەردىگارىنىڭ ئىزنى بىلەن بارلىق ئىشلار ئۈچۈن چۈشىدۇ.',
        translationEn: 'The angels and the Spirit descend therein by permission of their Lord for every matter.',
        tafsirAr: 'تنزل الملائكة وجبريل عليه السلام بإذن ربهم بكل أمر قضاه الله لتلك السنة.',
        juz: 30,
        page: 598,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/097004.mp3'
      },
      {
        number: 6130,
        numberInSurah: 5,
        text: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
        translationUg: 'ئۇ كېچە تاڭ ئاتقۇچە تىنچلىق-ئامانلىقتۇر.',
        translationEn: 'Peace it is until the emergence of dawn.',
        tafsirAr: 'سلام وأمان وخير كلها حتى مطلع الفجر.',
        juz: 30,
        page: 598,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/097005.mp3'
      }
    ]
  },
  {
    number: 103,
    name: 'العصر',
    englishName: 'Al-\'Asr',
    englishNameTranslation: 'The Declining Day, Epoch',
    nameUg: 'ئەسر سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 3,
    page: 601,
    juz: 30,
    ayahs: [
      {
        number: 6177,
        numberInSurah: 1,
        text: 'وَالْعَصْرِ',
        translationUg: 'زامان بىلەن قەسەمكى،',
        translationEn: 'By time,',
        tafsirAr: 'يقسم الله تعالى بالدهر والزمان لما فيه من العبر والعجائب.',
        juz: 30,
        page: 601,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/103001.mp3'
      },
      {
        number: 6178,
        numberInSurah: 2,
        text: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
        translationUg: 'ئىنسان چوقۇم زىيان ئىچىدىدۇر.',
        translationEn: 'Indeed, mankind is in loss,',
        tafsirAr: 'إن كل إنسان في خسران وهلاك ونقصان.',
        juz: 30,
        page: 601,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/103002.mp3'
      },
      {
        number: 6179,
        numberInSurah: 3,
        text: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
        translationUg: 'پەقەت ئىمان ئېيتقان، ياخشى ئەمەللەرنى قىلغان، بىر-بىرىگە ھەقنى تەۋسىيە قىلىشقان ۋە سەۋرنى تەۋسىيە قىلىشقانلار بۇنىڭدىن مۇستەسنا.',
        translationEn: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
        tafsirAr: 'إلا الذين آمنوا بالله وعملوا الأعمال الصالحة، وتواصوا بالحق والصبر على طاعة الله.',
        juz: 30,
        page: 601,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/103003.mp3'
      }
    ]
  },
  {
    number: 108,
    name: 'الكوثر',
    englishName: 'Al-Kawthar',
    englishNameTranslation: 'Abundance',
    nameUg: 'كەۋسەر سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 3,
    page: 602,
    juz: 30,
    ayahs: [
      {
        number: 6189,
        numberInSurah: 1,
        text: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
        translationUg: 'شۈبھىسىزكى، بىز ساڭا كۆپ ياخشىلىقنى (كەۋسەر كۆلىنى) ئاتا قىلدۇق.',
        translationEn: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.',
        tafsirAr: 'إنا أعطيناك يا محمد الخير الكثير ومنه نهر الكوثر في الجنة.',
        juz: 30,
        page: 602,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108001.mp3'
      },
      {
        number: 6190,
        numberInSurah: 2,
        text: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        translationUg: 'شۇڭا سەن پەرۋەردىگارىڭ ئۈچۈن ناماز ئوقۇغىن ۋە قۇربانلىق قىلغىن.',
        translationEn: 'So pray to your Lord and sacrifice [to Him alone].',
        tafsirAr: 'فأخلص لربك صلاتك كلها واذبح ذبيحتك له وحده لا للأصنام.',
        juz: 30,
        page: 602,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108002.mp3'
      },
      {
        number: 6191,
        numberInSurah: 3,
        text: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
        translationUg: 'ھەقىقەتەن سېنى ئۆچ كۆرگۈچىنىڭ ئۆزى نەسلى قۇرۇغۇچىدۇر.',
        translationEn: 'Indeed, your enemy is the one cut off.',
        tafsirAr: 'إن مبغضك وعدوك يا محمد هو المنقطع أثره والمقطوع من كل خير.',
        juz: 30,
        page: 602,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108003.mp3'
      }
    ]
  },
  {
    number: 109,
    name: 'الكافرون',
    englishName: 'Al-Kafirun',
    englishNameTranslation: 'The Disbelievers',
    nameUg: 'كافىرۇن سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 6,
    page: 603,
    juz: 30,
    ayahs: [
      {
        number: 6192,
        numberInSurah: 1,
        text: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ',
        translationUg: 'ئېيتقىنكى: «ئى كاپىرلار!',
        translationEn: 'Say, "O disbelievers,',
        tafsirAr: 'قل للذين كفروا بالله ورسوله معلنا براءتك من دينهم.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109001.mp3'
      },
      {
        number: 6193,
        numberInSurah: 2,
        text: 'لَا أَعْبُدُ مَا تَعْبُدُونَ',
        translationUg: 'مەن سىلەر ئىبادەت قىلىۋاتقان نەرسىلەرگە ئىبادەت قىلمايمەن.',
        translationEn: 'I do not worship what you worship.',
        tafsirAr: 'لا أعبد الأصنام والآلهة الباطلة التي تعبدونها.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109002.mp3'
      },
      {
        number: 6194,
        numberInSurah: 3,
        text: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',
        translationUg: 'سىلەرمۇ مەن ئىبادەت قىلىۋاتقان زاتقا ئىبادەت قىلغۇچى ئەمەسسىلەر.',
        translationEn: 'Nor are you worshippers of what I worship.',
        tafsirAr: 'ولستم عابدين الله وحده المعبود بحق.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109003.mp3'
      },
      {
        number: 6195,
        numberInSurah: 4,
        text: 'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ',
        translationUg: 'مەن سىلەر ئىبادەت قىلغان نەرسىلەرگە ھەرگىز ئىبادەت قىلغۇچى ئەمەسمەن.',
        translationEn: 'Nor will I be a worshipper of what you worship.',
        tafsirAr: 'ولا أنا في المستقبل بعابد ما عبدتم.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109004.mp3'
      },
      {
        number: 6196,
        numberInSurah: 5,
        text: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ',
        translationUg: 'سىلەرمۇ مەن ئىبادەت قىلىۋاتقان زاتقا ئىبادەت قىلغۇچى ئەمەسسىلەر.',
        translationEn: 'Nor will you be worshippers of what I worship.',
        tafsirAr: 'ولا أنتم في المستقبل بعابدين ما أعبد.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109005.mp3'
      },
      {
        number: 6197,
        numberInSurah: 6,
        text: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
        translationUg: 'سىلەرنىڭ دىنىڭلار ئۆزۈڭلار ئۈچۈن، مېنىڭ دىنىم ئۆزۈم ئۈچۈندۇر.»',
        translationEn: 'For you is your religion, and for me is my religion."',
        tafsirAr: 'لكم كفركم وشرككم، ولي ديني وإخلاصي لله وحده.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/109006.mp3'
      }
    ]
  },
  {
    number: 110,
    name: 'النصر',
    englishName: 'An-Nasr',
    englishNameTranslation: 'The Divine Support / Victory',
    nameUg: 'نەسر سۈرىسى',
    revelationType: 'Medinan',
    numberOfAyahs: 3,
    page: 603,
    juz: 30,
    ayahs: [
      {
        number: 6198,
        numberInSurah: 1,
        text: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
        translationUg: 'ئاللاھنىڭ ياردىمى ۋە غەلىبە (مەككىنىڭ پەتھى قىلىنىشى) كەلگەن چاغدا،',
        translationEn: 'When the victory of Allah has come and the conquest,',
        tafsirAr: 'إذا تم نصر الله لدينك يا محمد وفتح مكة.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/110001.mp3'
      },
      {
        number: 6199,
        numberInSurah: 2,
        text: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
        translationUg: 'ئىنسانلارنىڭ ئاللاھنىڭ دىنىغا توپ-توپ بولۇپ كىرىۋاتقانلىقىنى كۆرگەن چاغدا،',
        translationEn: 'And you see the people entering into the religion of Allah in multitudes,',
        tafsirAr: 'ورأيت الناس يدخلون في دين الإسلام جماعات وأفواجا.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/110002.mp3'
      },
      {
        number: 6200,
        numberInSurah: 3,
        text: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
        translationUg: 'پەرۋەردىگارىڭغا ھەمدۇسانا ئېيتىش بىلەن ئۇنى ئۇلۇغلىغىن ۋە ئۇنىڭدىن مەغپىرەت تىلىگىن. چۈنكى ئۇ تەۋبىنى كۆپلەپ قوبۇل قىلغۇچىدۇر.',
        translationEn: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.',
        tafsirAr: 'فسبح بحمد ربك شكراً له على نعمه واستغفره، إنه كان تواباً رحيماً.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/110003.mp3'
      }
    ]
  },
  {
    number: 111,
    name: 'المسد',
    englishName: 'Al-Masad',
    englishNameTranslation: 'The Palm Fiber',
    nameUg: 'مەسەد سۈرىسى',
    revelationType: 'Meccan',
    numberOfAyahs: 5,
    page: 603,
    juz: 30,
    ayahs: [
      {
        number: 6201,
        numberInSurah: 1,
        text: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
        translationUg: 'ئەبۇ لەھەبنىڭ ئىككى قولى قۇرۇسۇن (ھالاك بولسۇن)! ھەم ئۆزىمۇ ھالاك بولدى.',
        translationEn: 'May the hands of Abu Lahab be ruined, and ruined is he.',
        tafsirAr: 'خسرت يدا أبي لهب وخسر هو وهلك لعداوته للرسول.',
        juz: 30,
        page: 603,
        audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/111001.mp3'
      }
    ]
  }
];

// Re-export full 114 Surahs from the complete dataset
import { ALL_114_SURAHS_DATA } from './quranSurahsMeta';
export const ALL_114_SURAHS_META = ALL_114_SURAHS_DATA;
