export const projects = [
  {
    id: 'websitemts',
    title: 'Admin MTS Al-Asy\'ari',
    subtitle: 'Full-Stack School Management System',
    category: 'web',
    description: 'Sistem administrasi sekolah lengkap untuk MTs Al-Asy\'ari Tuban. Mencakup CBT (Computer Based Test), manajemen siswa, AI-powered content generation, kartu ujian, dan sistem surat digital. Tersedia versi web dan desktop (Electron).',
    tech: ['React', 'Vite', 'Firebase', 'Tailwind CSS', 'Electron', 'Gemini AI', 'Framer Motion'],
    features: [
      'CBT (Computer Based Test) dengan token keamanan',
      'Manajemen data siswa & guru',
      'AI-powered generator soal & konten Arab',
      'Kartu ujian generator dengan template SVG',
      'Sistem surat digital',
      'Desktop app via Electron',
      'PPDB Online (Penerimaan Peserta Didik Baru)',
      'Quiz harian dengan AI',
      'Export data ke Excel/PDF'
    ],
    fileTree: [
      { name: 'src/', type: 'dir', children: [
        { name: 'pages/', type: 'dir', children: [
          { name: 'admin/', type: 'dir' },
          { name: 'public/', type: 'dir' }
        ]},
        { name: 'components/', type: 'dir' },
        { name: 'lib/', type: 'dir', children: [
          { name: 'aiProvider.js', type: 'file' },
          { name: 'aiArabicGenerator.js', type: 'file' }
        ]}
      ]},
      { name: 'electron/', type: 'dir' },
      { name: 'api/', type: 'dir' }
    ],
    color: '#047857',
    icon: '🏫',
    image: '/projects/admin_mts.png',
    url: 'https://online.mtsalasyari.my.id'
  },
  {
    id: 'wabot-mts',
    title: 'WABot MTS AI',
    subtitle: 'AI-Powered WhatsApp Bot',
    category: 'bot',
    description: 'Bot WhatsApp cerdas untuk MTs Al-Asy\'ari yang terintegrasi dengan Gemini AI. Mampu menjawab pertanyaan siswa, generate dokumen Word, menganalisa gambar, dan mendukung multiple AI model.',
    tech: ['Node.js', 'WhatsApp Web.js', 'Gemini AI', 'Express', 'Firebase', 'Puppeteer', 'Docker'],
    features: [
      'Multi-model AI (Gemini 1.5, 2.5, 3.5)',
      'Generate dokumen Word (.docx)',
      'Analisis gambar via AI',
      'Deploy di Docker / Hugging Face Spaces',
      'REST API untuk kontrol dari web',
      'QR Code authentication',
      'Integrasi Firebase real-time'
    ],
    fileTree: [
      { name: 'index.js', type: 'file' },
      { name: 'Dockerfile', type: 'file' },
      { name: 'package.json', type: 'file' },
      { name: 'wa-session/', type: 'dir' }
    ],
    color: '#25D366',
    icon: '🤖',
    image: '/projects/wabot.png'
  },
  {
    id: 'websurat',
    title: 'WebSurat',
    subtitle: 'Digital Document Management',
    category: 'web',
    description: 'Sistem manajemen surat dan dokumen digital menggunakan Next.js dan Prisma ORM. Mendukung pembuatan, tracking, dan arsip surat resmi instansi.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Lucide Icons', 'date-fns'],
    features: [
      'CRUD surat masuk & keluar',
      'Database relational dengan Prisma ORM',
      'Tracking status surat',
      'Arsip digital searchable',
      'Template surat otomatis',
      'Responsive design'
    ],
    fileTree: [
      { name: 'src/', type: 'dir', children: [
        { name: 'app/', type: 'dir' },
        { name: 'components/', type: 'dir' }
      ]},
      { name: 'prisma/', type: 'dir', children: [
        { name: 'schema.prisma', type: 'file' }
      ]}
    ],
    color: '#3b82f6',
    icon: '📨',
    image: '/projects/websurat.png'
  },
  {
    id: 'raport-tk',
    title: 'Raport TK PGRI',
    subtitle: 'Kindergarten Report Card System',
    category: 'web',
    description: 'Aplikasi generator raport otomatis untuk TK PGRI. Menggunakan template Word (.docx) yang bisa dikustomisasi, dengan data siswa yang diisi melalui web interface dan di-generate menjadi dokumen raport lengkap.',
    tech: ['Next.js', 'TypeScript', 'SQLite', 'Docxtemplater', 'Tailwind CSS', 'Gemini AI'],
    features: [
      'Template raport Word yang customizable',
      'Auto-fill data siswa ke template',
      'Database lokal SQLite',
      'Upload & manage template',
      'AI-powered deskripsi naratif',
      'Export raport ke .docx',
      'Multi-semester support'
    ],
    fileTree: [
      { name: 'src/', type: 'dir', children: [
        { name: 'app/', type: 'dir' },
        { name: 'components/', type: 'dir' }
      ]},
      { name: 'public/', type: 'dir', children: [
        { name: 'templates/', type: 'dir' }
      ]},
      { name: 'raport.db', type: 'file' }
    ],
    color: '#f59e0b',
    icon: '📝',
    image: '/projects/raport_tk.png'
  },
  {
    id: 'cbt-exam-browser',
    title: 'CBT Exam Browser',
    subtitle: 'Secure Android Exam App',
    category: 'mobile',
    description: 'Aplikasi Android khusus untuk ujian CBT (Computer Based Test). Berjalan dalam mode kiosk/fullscreen untuk mencegah siswa mengakses aplikasi lain selama ujian berlangsung.',
    tech: ['Android', 'Kotlin', 'Java', 'Gradle', 'WebView', 'Kiosk Mode'],
    features: [
      'Fullscreen kiosk mode',
      'Block navigasi keluar app',
      'Support portrait & landscape',
      'Auto-connect ke server CBT',
      'Immersive system UI',
      'Pinch-to-zoom support',
      'APK distribusi offline'
    ],
    fileTree: [
      { name: 'app/', type: 'dir', children: [
        { name: 'src/main/', type: 'dir', children: [
          { name: 'java/', type: 'dir' },
          { name: 'res/', type: 'dir' }
        ]},
        { name: 'build.gradle.kts', type: 'file' }
      ]},
      { name: 'gradle/', type: 'dir' }
    ],
    color: '#10b981',
    icon: '📱',
    image: '/projects/cbt_mobile.png'
  },
  {
    id: 'cbt-monitor',
    title: 'CBT Monitor Desktop',
    subtitle: 'Real-time Exam Dashboard',
    category: 'desktop',
    description: 'Aplikasi desktop untuk monitoring ujian CBT secara real-time. Admin bisa memantau siswa yang sedang mengerjakan, menambah waktu, force stop, reset ujian, dan kelola token keamanan.',
    tech: ['Python', 'CustomTkinter', 'Firebase', 'Threading', 'PIL'],
    features: [
      'Real-time monitoring siswa',
      'Force stop ujian siswa',
      'Tambah waktu ujian',
      'Reset progress siswa',
      'Generate & kelola token ujian',
      'Auto-refresh data setiap 2 detik',
      'Multi-ujian sidebar',
      'Build ke .exe standalone'
    ],
    fileTree: [
      { name: 'main.py', type: 'file' },
      { name: 'firebase_api.py', type: 'file' },
      { name: 'assets/', type: 'dir' },
      { name: 'CBT_Monitor.spec', type: 'file' }
    ],
    color: '#8b5cf6',
    icon: '🖥️',
    image: '/projects/cbt_desktop.png'
  },
  {
    id: 'formulir-penelitian',
    title: 'Formulir Penelitian Kesehatan',
    subtitle: 'Health Research Questionnaire',
    category: 'web',
    description: 'Aplikasi pengisian formulir penelitian kesehatan untuk IIKNU Tuban. Dilengkapi tanda tangan digital, validasi form, dan integrasi Google Sheets untuk pengumpulan data.',
    tech: ['React', 'Vite', 'Framer Motion', 'Google Apps Script', 'Google Sheets'],
    features: [
      'Multi-step questionnaire form',
      'Digital signature capture',
      'Google Sheets integration',
      'Mobile-optimized layout',
      'Glassmorphism UI design',
      'Form validation real-time',
      'PDF export support'
    ],
    fileTree: [
      { name: 'src/', type: 'dir' },
      { name: 'google_apps_script.js', type: 'file' },
      { name: 'dist/', type: 'dir' }
    ],
    color: '#06b6d4',
    icon: '🔬'
  },
  {
    id: 'kuisioner-app',
    title: 'Kuisioner App',
    subtitle: 'Cross-platform Questionnaire',
    category: 'mobile',
    description: 'Aplikasi kuisioner yang tersedia dalam versi web dan Android APK. Dilengkapi QR code untuk akses cepat dan optimasi mobile fullscreen.',
    tech: ['HTML/CSS/JS', 'Android WebView', 'QR Code Generator'],
    features: [
      'Web + Android APK',
      'QR Code access link',
      'Fullscreen mobile mode',
      'Offline-capable',
      'Touch-optimized interface',
      'Data collection & export'
    ],
    fileTree: [
      { name: 'kuisioner-qr.html', type: 'file' },
      { name: 'android-app/', type: 'dir' },
      { name: 'Kuisioner-App.apk', type: 'file' }
    ],
    color: '#ec4899',
    icon: '📋'
  },
  {
    id: 'porto-music',
    title: 'Music Streaming App',
    subtitle: 'YT Music Client',
    category: 'web',
    description: 'Web-based music streaming app yang menggunakan YouTube Music API. Fitur pencarian lagu, home sections curated, dan audio streaming berkualitas tinggi.',
    tech: ['React', 'Vite', 'Express', 'YT Music API', 'play-dl', 'Framer Motion', 'Tailwind CSS'],
    features: [
      'Search lagu dari YouTube Music',
      'Home sections curated',
      'Audio streaming HQ',
      'Node.js backend proxy',
      'Responsive music player UI',
      'Artist & album info'
    ],
    fileTree: [
      { name: 'src/', type: 'dir' },
      { name: 'server.js', type: 'file' },
      { name: 'vite.config.js', type: 'file' }
    ],
    color: '#ef4444',
    icon: '🎵'
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Interactive',
    subtitle: 'Creative Portfolio Website',
    category: 'web',
    description: 'Website portfolio interaktif dengan fitur arcade games, AI Corner (Groq + Llama 3), design tools, virtual wall, dan character creator. Tema VTuber & anime dengan custom cursor dan particle effects.',
    tech: ['HTML/CSS/JS', 'Supabase', 'Groq AI', 'Canvas API', 'Font Awesome'],
    features: [
      'Interactive arcade mini-games',
      'AI-powered brand name generator',
      'Color palette from image',
      'Font pairing suggestor',
      'Virtual sticky note wall',
      'VTuber character creator',
      'Custom cursor & particles',
      'Spotify Wrapped-style stats'
    ],
    fileTree: [
      { name: 'index.html', type: 'file' },
      { name: 'css/', type: 'dir', children: [
        { name: 'styles.css', type: 'file' },
        { name: 'home.css', type: 'file' },
        { name: 'arcade.css', type: 'file' }
      ]},
      { name: 'js/', type: 'dir', children: [
        { name: 'app.js', type: 'file' },
        { name: 'arcade.js', type: 'file' },
        { name: 'aicorner.js', type: 'file' }
      ]}
    ],
    color: '#f472b6',
    icon: '🎨'
  }
];

export const categories = [
  { id: 'all', label: 'ALL PROJECTS', icon: '⚡' },
  { id: 'web', label: 'WEB APPS', icon: '🌐' },
  { id: 'mobile', label: 'MOBILE', icon: '📱' },
  { id: 'desktop', label: 'DESKTOP', icon: '🖥️' },
  { id: 'bot', label: 'BOT / AI', icon: '🤖' }
];
