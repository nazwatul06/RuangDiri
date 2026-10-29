const questionGroups = {
  "15-18": [
    {
      category: "Emosi dan suasana hati",
      questions: [
        "Suasana hati berubah drastis tanpa sebab",
        "Senyum dan tawa menjadi cara untuk menyembunyikan perasaan yang sebenarnya (seperti sedih atau kecewa)",
        "Merasa kosong atau kehilangan semangat meskipun tidak sedang mengalami masalah besar"
      ]
    },
    {
      category: "Pikiran dan tekanan sekolah",
      questions: [
        "Takut mengecewakan orang lain lebih besar daripada keinginan untuk membahagiakan diri sendiri",
        "Merasa tertinggal ketika melihat pencapaian teman, meskipun sudah berusaha keras",
        "Pikiran tentang masa depan mengganggu ketenangan saat ini"
      ]
    },
    {
      category: "Keluarga dan teman",
      questions: [
        "Merasa tidak mendapat support system dari keluarga",
        "Memilih diam karna takut perasaan atau pendapat justru menjadi sumber masalah",
        "Merasa harus menjadi orang yang kuat agar tidak merepotkan orang lain"
      ]
    },
    {
      category: "Kepercayaan diri",
      questions: [
        "Meragukan kemampuan diri sebelum benar-benar mencoba sesuatu",
        "Merasa nilai diri bergantung pada pujian, pencapaian, atau pengakuan orang lain"
      ]
    },
    {
      category: "Tidur dan energi",
      questions: [
        "Tubuh terasa lelah tetapi pikiran tetap sulit beristirahat",
        "Kehilangan energi untuk melakukan hal yang biasanya terasa menyenangkan"
      ]
    },
    {
      category: "Cara menghadapi masalah",
      questions: [
        "Memilih memendam masalah sampai terasa lebih berat daripada yang seharusnya",
        "Sulit meminta bantuan kepada orang lain saat menghadapi masalah meskipun saat benar-benar membutuhkan"
      ]
    }
  ],

  "19-25": [
    {
      category: "Emosi dan suasana hati",
      questions: [
        "Merasa lelah secara emosional tanpa tahu apa yang sebenarnya menguras energi",
        "Merasa hidup berjalan seperti biasa, tetapi ada bagian diri yang terasa hampa",
        "Berpura-pura baik-baik saja agar tidak perlu menjelaskan perasaan yang sulit dipahami"
      ]
    },
    {
      category: "Tekanan masa depan, kuliah, atau kerja",
      questions: [
        "Merasa tertinggal ketika melihat orang lain tampak lebih maju dalam hidupnya",
        "Takut memilih jalan yang salah hingga sulit menikmati proses yang sedang dijalani",
        "Merasa harus segera berhasil karna khawatir mengecewakan keluarga atau orang terdekat"
      ]
    },
    {
      category: "Keluarga dan pertemanan",
      questions: [
        "Merasa harus memenuhi harapan keluarga meskipun bertentangan dengan keinginan pribadi",
        "Merasa kesepian meskipun masih memiliki orang-orang yang bisa diajak bicara",
        "Menahan pendapat atau perasaan demi menjaga hubungan agar tidak berubah"
      ]
    },
    {
      category: "Tidur dan energi",
      questions: [
        "Pikiran berat tentang hari ini membuat tidur terasa tidak menenangkan",
        "Kehilangan semangat melakukan hal yang biasanya memberi kebahagiaan"
      ]
    },
    {
      category: "Cara dan perasaan menghadapi masalah",
      questions: [
        "Memilih menyelesaikan semuanya sendiri karena merasa tidak ingin menjadi beban bagi orang lain",
        "Ketika menghadapi masalah, seberapa sering kesulitan menerima bahwa diri sendiri juga membutuhkan dukungan"
      ]
    },
    {
      category: "Masalah diri",
      questions: [
        "Mempertanyakan nilai diri saat pencapaian tidak sesuai dengan harapan",
        "Kehilangan arah karena terlalu lama menjalani hidup berdasarkan ekspektasi orang lain"
      ]
    }
  ]
};

const answerOptions = [
  { label: "Tidak pernah", value: 0 },
  { label: "Jarang", value: 1 },
  { label: "Beberapa kali", value: 2 },
  { label: "Selalu", value: 3 }
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
    category = "Kondisi Emosional Positif";
    className = "good";
    recommendation =
      "Pertahankan kebiasaan yang mendukung kesejahteraanmu. Tetap beri ruang untuk beristirahat, bercerita, dan menjaga hubungan yang sehat.";
  } else if (percentage <= 66) {
    category = "Perlu Ruang Untuk Diri Sendiri";
    className = "medium";
    recommendation =
      "Cobalah mengenali hal yang paling membebani pikiranmu. Atur waktu istirahat, dan lakukan kegiatan yang menenangkan";
  } else {
    category = "Sedang Mengalami Tekanan Emosional";
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
