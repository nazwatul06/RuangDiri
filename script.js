const questionGroups = {
  "15-18": [
    {
      category: "Emosi dan suasana hati",
      questions: [
        "Merasa sedih atau kehilangan semangat.",
        "Suasana hati berubah dan sulit dipahami.",
        " Tiba tiba merasa khawatir atau gelisah."
      ]
    },
    {
      category: "Pikiran dan tekanan sekolah",
      questions: [
        "Merasa terbebani oleh tugas atau nilai sekolah.",
        "Sulit berkonsentrasi saat belajar atau ke distract karena masalah pribadi yang belum selesai.",
        "Terlalu memikirkan kesalahan dan kegagalan."
      ]
    },
    {
      category: "Keluarga dan teman",
      questions: [
        "Merasa tidak mendapat support system dari keluarga.",
        "Merasa kesepian dan tidak memiliki siapa siapa.",
        "Konflik dengan keluarga atau teman sangat mengganggu pikiran."
      ]
    },
    {
      category: "Kepercayaan diri",
      questions: [
        "Sering membandingkan diri dengan orang lain.",
        "Merasa kurang berharga atau tidak cukup baik."
      ]
    },
    {
      category: "Tidur dan energi",
      questions: [
        "Pola tidur terganggu karena belajar larut malam.",
        "Merasa lelah meskipun sudah beristirahat."
      ]
    },
    {
      category: "Cara menghadapi masalah",
      questions: [
        "Sulitan bercerita kepada orang yang dipercaya.",
        "Merasa pikiran menjadi berat padahal tidak sedang mengalami masalah."
      ]
    }
  ],

  "19-25": [
    {
      category: "Emosi dan suasana hati",
      questions: [
        "Merasa semua orang terlihat menyebalkan saat sedang lelah.",
        "Cemas atau gelisah tanpa sebab.",
        "Kesulitan mengontrol emosi."
      ]
    },
    {
      category: "Tekanan masa depan, kuliah, atau kerja",
      questions: [
        "Memaksa diri untuk bisa melakukan semua hal.",
        "Khawatir tentang masa depan.",
        "Merasa harus selalu berhasil memenuhi harapan orang lain."
      ]
    },
    {
      category: "Keluarga dan pertemanan",
      questions: [
        "Merasa tidak dipahami orang terdekat.",
        "Merasa tidak mendapat support system.",
        "Konflik hubungan mengganggu ketenangan."
      ]
    },
    {
      category: "Tidur dan respons tubuh",
      questions: [
        "Pola tidur saya terganggu karna bekerja atau belajar larut malam.",
        "Selalu merasa lelah meskipun sudah beristirahat."
      ]
    },
    {
      category: "Cara menghadapi masalah",
      questions: [
        "Kesulitan mencari dukungan saat menghadapi masalah.",
        "Merasa kewalahan menghadapi kegiatan sehari-hari."
      ]
    },
    {
      category: "Perasaan saat menghadapi masalah",
      questions: [
        "Sering menyalahkan diri sendiri.",
        "Merasa sulit menemukan hal yang membuat saya bersemangat."
      ]
    }
  ]
};

const answerOptions = [
  { label: "Tidak pernah", value: 0 },
  { label: "Jarang", value: 1 },
  { label: "Beberapa kali", value: 2 },
  { label: "Sering", value: 3 }
];

const questionsContainer = document.getElementById("questions");
const ageSelect = document.getElementById("usia");
const resultContainer = document.getElementById("hasil");

function renderQuestions() {
  questionsContainer.replaceChildren();
  resultContainer.replaceChildren();

  let number = 0;

  questionGroups[ageSelect.value].forEach(group => {
    const heading = document.createElement("h3");
    heading.textContent = group.category;
    questionsContainer.appendChild(heading);

    group.questions.forEach(question => {
      number++;

      const card = document.createElement("div");
      card.className = "question";

      const title = document.createElement("p");
      title.textContent = `${number}. ${question}`;
      card.appendChild(title);

      const options = document.createElement("div");
      options.className = "options";

      answerOptions.forEach(option => {
        const label = document.createElement("label");
        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = `q${number}`;
        radio.value = option.value;
        radio.required = true;

        label.append(radio, document.createTextNode(option.label));
        options.appendChild(label);
      });

      card.appendChild(options);
      questionsContainer.appendChild(card);
    });
  });
}

ageSelect.addEventListener("change", renderQuestions);

document.getElementById("submitTest").addEventListener("click", () => {
  const questions = questionsContainer.querySelectorAll(".question");
  const answers = [];

  for (let i = 1; i <= questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);

    if (!selected) {
      alert(`Silakan jawab pertanyaan nomor ${i} terlebih dahulu.`);
      questions[i - 1].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }

    answers.push(Number(selected.value));
  }

  const total = answers.reduce((sum, value) => sum + value, 0);
  const maxScore = answers.length * 3;
  const percentage = Math.round((total / maxScore) * 100);

  let category;
  let className;
  let recommendation;

  if (percentage <= 33) {
    category = "Hijau — skor refleksi relatif rendah";
    className = "good";
    recommendation =
      "Pertahankan kebiasaan yang mendukung kesejahteraanmu. Tetap beri ruang untuk beristirahat, bercerita, dan menjaga hubungan yang sehat.";
  } else if (percentage <= 66) {
    category = "Kuning — perlu perhatian";
    className = "medium";
    recommendation =
      "Cobalah mengenali hal yang paling membebani pikiranmu. Atur waktu istirahat, lakukan kegiatan yang menenangkan, dan pertimbangkan berbicara dengan orang yang kamu percaya.";
  } else {
    category = "Merah — perlu dukungan lebih";
    className = "high";
    recommendation =
      "Kamu layak mendapatkan dukungan. Pertimbangkan untuk berbicara dengan orang dewasa yang dipercaya, guru BK, psikolog, atau tenaga kesehatan.";
  }

  resultContainer.replaceChildren();

  const result = document.createElement("div");
  result.className = `result ${className}`;

  const title = document.createElement("h3");
  title.textContent = "Hasil refleksi kamu";

  const score = document.createElement("p");
  score.textContent = `Skor refleksi: ${percentage}%`;

  const status = document.createElement("p");
  status.textContent = category;

  const progress = document.createElement("div");
  progress.className = "progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-valuenow", percentage);
  progress.setAttribute("aria-valuemin", 0);
  progress.setAttribute("aria-valuemax", 100);

  const bar = document.createElement("span");
  bar.style.width = `${percentage}%`;
  progress.appendChild(bar);

  const advice = document.createElement("p");
  advice.textContent = recommendation;

  const motivation = document.createElement("p");
  motivation.textContent =
    "💜 Jika kamu tidak tau apa yang harus dikejar saat ini, kejarlah dirimu sendiri, berusahalah menjadi versi dirimu yang paling sehat, paling bahagia, dan paling percaya diri";

  const disclaimer = document.createElement("p");
  disclaimer.className = "note";
  disclaimer.textContent =
    "Hasil ini hanya refleksi sederhana, bukan diagnosis kesehatan mental. Persentase bukan ukuran pasti kondisi mental. Jika kamu merasa terganggu atau khawatir, mintalah bantuan profesional.";

  const printButton = document.createElement("button");
  printButton.className = "button";
  printButton.textContent = "Cetak atau simpan sebagai PDF";
  printButton.addEventListener("click", () => window.print());

  result.append(title, score, progress, status, advice, motivation, disclaimer, printButton);
  resultContainer.appendChild(result);
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

// RUANG CERITA: cerita disimpan hanya di browser perangkat ini.
const STORAGE_KEY = "ruangDiriStoriesV1";
const storyForm = document.getElementById("storyForm");
const storyList = document.getElementById("daftarCerita");
const storyResponse = document.getElementById("responsCerita");

function readStories() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveStories(stories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    return true;
  } catch {
    alert("Cerita tidak dapat disimpan. Periksa pengaturan penyimpanan browser.");
    return false;
  }
}

const moodAdvice = {
  sedih: "Tidak apa-apa jika hari ini terasa berat. Cobalah bercerita kepada seseorang yang kamu percaya.",
  cemas: "Tarik napas perlahan dan fokus pada satu hal yang bisa kamu lakukan sekarang.",
  marah: "Beri dirimu waktu untuk tenang sebelum mengambil keputusan atau membalas perkataan orang lain.",
  lelah: "Kamu boleh beristirahat. Pilih satu kebutuhan kecil yang bisa kamu penuhi sekarang.",
  senang: "Nikmati momen baik ini dan simpan hal yang membuatmu merasa bersyukur.",
  bingung: "Kamu tidak harus memiliki semua jawaban sekarang. Pecah masalah menjadi langkah-langkah kecil."
};

function renderStories() {
  storyList.replaceChildren();
  const stories = readStories();

  if (stories.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Belum ada cerita yang disimpan di perangkat ini.";
    storyList.appendChild(empty);
    return;
  }

  stories.slice().reverse().forEach(story => {
    const article = document.createElement("article");
    article.className = "story-item";

    const heading = document.createElement("h3");
    heading.textContent = `${story.alias} · ${story.mood}`;

    const body = document.createElement("p");
    body.textContent = story.text;

    const date = document.createElement("p");
    date.className = "note";
    date.textContent = story.date;

    const removeButton = document.createElement("button");
    removeButton.className = "button secondary";
    removeButton.textContent = "Hapus cerita";

    removeButton.addEventListener("click", () => {
      const remaining = readStories().filter(item => item.id !== story.id);
      if (saveStories(remaining)) renderStories();
    });

    article.append(heading, body, date, removeButton);
    storyList.appendChild(article);
  });
}

storyForm.addEventListener("submit", event => {
  event.preventDefault();

  const alias = document.getElementById("samaran").value.trim();
  const mood = document.getElementById("mood").value;
  const storyText = document.getElementById("ceritaText").value.trim();

  if (!alias || !storyText) {
    alert("Silakan isi nama samaran dan ceritamu.");
    return;
  }

  // Pemeriksaan sederhana ini tidak menjamin semua informasi pribadi terdeteksi.
  const sensitivePatterns = [
    /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i,
    /\b(?:\+?62|0)\d[\d\s-]{7,}\d\b/,
    /\b\d{9,}\b/i,
    /\b(?:alamat rumah|nama lengkap|nomor telepon)\b/i
  ];

  if (sensitivePatterns.some(pattern => pattern.test(storyText))) {
    alert("Cerita mungkin memuat informasi pribadi. Hapus informasi tersebut sebelum menyimpan.");
    return;
  }

  const stories = readStories();

  stories.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    alias,
    mood,
    text: storyText,
    date: new Date().toLocaleString("id-ID")
  });

  if (!saveStories(stories)) return;

  storyForm.reset();
  storyResponse.replaceChildren();

  const feedback = document.createElement("div");
  feedback.className = "result good";

  const message = document.createElement("p");
  message.textContent = moodAdvice[mood];

  const motivation = document.createElement("p");
  motivation.textContent =
    "💜 Terima kasih sudah memberi ruang bagi perasaanmu. Kamu layak didengarkan dan dihargai.";

  feedback.append(message, motivation);
  storyResponse.appendChild(feedback);
  renderStories();
});

document.getElementById("hapusSemua").addEventListener("click", () => {
  if (readStories().length === 0) return;

  if (confirm("Hapus semua cerita yang tersimpan di browser ini?")) {
    if (saveStories([])) renderStories();
  }
});

// Tampilkan pertanyaan dan cerita ketika halaman dibuka.
renderQuestions();
renderStories();

/* =========================================
   RUANG DIRI AI REASONING - VERSI DEMO
   Menggunakan aturan dan kata kunci JavaScript.
   Belum terhubung ke model AI sungguhan.
========================================= */

const aiForm = document.getElementById("aiForm");
const quizResult = document.getElementById("quizResult");
const storyInput = document.getElementById("storyInput");
const aiOutput = document.getElementById("aiOutput");

if (aiForm && quizResult && storyInput && aiOutput) {
  aiForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const result = quizResult.value;
    const story = storyInput.value.trim();

    if (!result) {
      alert("Silakan pilih hasil kuesioner terlebih dahulu.");
      return;
    }

    if (story.length < 10) {
      alert("Coba ceritakan perasaanmu sedikit lebih lengkap.");
      storyInput.focus();
      return;
    }

    const analysis = analyzeReflection(result, story);
    showAnalysis(analysis);
  });
}

/* Menganalisis hasil kuesioner dan cerita */
function analyzeReflection(result, story) {
  const text = story.toLowerCase();

  const themes = [];

  // Kata kunci untuk mengenali tema cerita.
  const themeRules = [
    {
      name: "tekanan atau beban",
      words: [
        "tugas", "stres", "stress", "beban",
        "kewalahan", "capek", "lelah", "pusing"
      ],
      advice:
        "Pilih satu hal yang paling mendesak, lalu pecah menjadi langkah kecil. Sisihkan waktu untuk beristirahat."
    },
    {
      name: "kecemasan atau kekhawatiran",
      words: [
        "takut", "cemas", "khawatir",
        "gelisah", "panik", "kepikiran"
      ],
      advice:
        "Coba berhenti sejenak, atur napas dengan nyaman, dan tuliskan hal yang bisa kamu kendalikan sekarang."
    },
    {
      name: "kesedihan atau kesepian",
      words: [
        "sedih", "sendiri", "kesepian",
        "menangis", "hampa", "kecewa"
      ],
      advice:
        "Berikan ruang untuk perasaanmu tanpa menghakimi diri sendiri. Jika memungkinkan, hubungi orang yang kamu percaya."
    },
    {
      name: "hubungan dengan orang lain",
      words: [
        "teman", "orang tua", "keluarga",
        "pacar", "bertengkar", "dimarahi",
        "mengecewakan"
      ],
      advice:
        "Pikirkan apa yang ingin kamu sampaikan. Kamu bisa memulai percakapan dengan orang tepercaya ketika sudah siap."
    },
    {
      name: "istirahat dan energi",
      words: [
        "susah tidur", "tidak bisa tidur",
        "sulit tidur", "kurang tidur",
        "kelelahan", "tidak bertenaga"
      ],
      advice:
        "Coba buat rutinitas istirahat yang lebih teratur dan kurangi aktivitas yang membuatmu semakin kelelahan."
    }
  ];

  themeRules.forEach(function (rule) {
    const matched = rule.words.some(function (word) {
      return text.includes(word);
    });

    if (matched) {
      themes.push(rule);
    }
  });

  // Menentukan pemahaman berdasarkan hasil kuesioner.
  let understanding = "";

  if (result === "positif") {
    understanding =
      "Jawaban kuesionermu cenderung positif. Ini mungkin menunjukkan " +
      "ada beberapa hal yang sudah berjalan cukup baik. Kamu tetap " +
      "boleh merasa sedih atau kesulitan sesekali.";
  } else if (result === "campuran") {
    understanding =
      "Jawabanmu menunjukkan pengalaman yang beragam. Ada hal yang " +
      "mungkin sudah terasa baik, sekaligus hal lain yang masih " +
      "membutuhkan perhatian.";
  } else {
    understanding =
      "Jawabanmu menunjukkan ada beberapa hal yang mungkin terasa " +
      "berat akhir-akhir ini. Ini bukan berarti kamu lemah. Hasil " +
      "kuesioner saja belum cukup untuk mengetahui penyebabnya.";
  }

  // Membuat saran berdasarkan tema cerita.
  let adviceList = themes
    .slice(0, 3)
    .map(function (theme) {
      return theme.advice;
    });

  // Jika tidak ada kata kunci yang cocok.
  if (adviceList.length === 0) {
    adviceList = [
      "Coba kenali perasaan yang paling kuat kamu rasakan saat ini.",
      "Pikirkan satu hal kecil yang bisa membuat harimu terasa lebih ringan.",
      "Jika kamu masih bingung, kamu bisa berbicara dengan orang tepercaya."
    ];
  }

  // Pesan reflektif berdasarkan hasil.
  let message = "";

  if (result === "positif") {
    message =
      "Pertahankan hal-hal yang membantumu berkembang. " +
      "Kamu tidak harus selalu baik-baik saja untuk tetap bertumbuh.";
  } else if (result === "campuran") {
    message =
      "Kamu boleh menghargai hal yang sudah berjalan baik " +
      "sambil perlahan memperhatikan hal yang masih terasa berat.";
  } else {
    message =
      "Kamu tidak harus menyelesaikan semuanya hari ini. " +
      "Meminta bantuan adalah salah satu cara menjaga dirimu.";
  }

  // Reasoning yang ditampilkan adalah ringkasan,
  // bukan proses pikiran internal model AI.
  const themeNames = themes.map(function (theme) {
    return theme.name;
  });

  const reasoning = themeNames.length
    ? "Dari kata-kata yang kamu tulis, tema yang mungkin berkaitan " +
      "dengan ceritamu adalah: " + themeNames.join(", ") + "."
    : "Ceritamu belum menunjukkan tema tertentu yang bisa dikenali " +
      "oleh aturan sederhana ini. Kamu bisa menambahkan konteks " +
      "jika merasa nyaman.";

  return {
    understanding: understanding,
    reasoning: reasoning,
    advice: adviceList,
    message: message
  };
}

/* Menampilkan hasil dengan aman di halaman */
function showAnalysis(data) {
  aiOutput.replaceChildren();
  aiOutput.hidden = false;

  const title = document.createElement("h3");
  title.textContent = "✦ Hasil Refleksi Ruang Diri";

  const understandingTitle = document.createElement("h4");
  understandingTitle.textContent = "Pemahaman awal";

  const understandingText = document.createElement("p");
  understandingText.textContent = data.understanding;

  const reasoningTitle = document.createElement("h4");
  reasoningTitle.textContent = "Hal yang mungkin berkaitan";

  const reasoningText = document.createElement("p");
  reasoningText.textContent = data.reasoning;

  const adviceTitle = document.createElement("h4");
  adviceTitle.textContent = "Langkah yang bisa kamu coba";

  const adviceList = document.createElement("ol");

  data.advice.forEach(function (advice) {
    const item = document.createElement("li");
    item.textContent = advice;
    adviceList.appendChild(item);
  });

  const messageTitle = document.createElement("h4");
  messageTitle.textContent = "Pesan untukmu";

  const messageText = document.createElement("p");
  messageText.textContent = "“" + data.message + "”";

  const note = document.createElement("p");
  note.className = "ai-result-note";
  note.textContent =
    "Ini adalah refleksi otomatis sederhana, bukan diagnosis. " +
    "Jika kesulitan terasa berat atau terus berlanjut, " +
    "cobalah berbicara dengan orang tepercaya atau tenaga profesional.";

  aiOutput.append(
    title,
    understandingTitle,
    understandingText,
    reasoningTitle,
    reasoningText,
    adviceTitle,
    adviceList,
    messageTitle,
    messageText,
    note
  );

  aiOutput.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
