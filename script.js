// ===== PILIHAN JAWABAN DAN SKOR =====
const answers = [
  { label: "Sering", score: 3 },
  { label: "Beberapa kali", score: 2 },
  { label: "Jarang", score: 1 },
  { label: "Tidak pernah", score: 0 }
];

// ===== PERTANYAAN USIA 15–18 TAHUN =====
const teenQuestions = [
  { category: "Emosi dan suasana hati", text: "Saya merasa sedih atau kehilangan semangat tanpa alasan yang jelas." },
  { category: "Emosi dan suasana hati", text: "Saya mudah marah atau tersinggung karena hal-hal kecil." },
  { category: "Emosi dan suasana hati", text: "Saya merasa cemas atau gelisah saat menjalani aktivitas sehari-hari." },

  { category: "Pikiran dan tekanan sekolah", text: "Saya merasa kewalahan menghadapi tugas, ujian, atau praktik sekolah." },
  { category: "Pikiran dan tekanan sekolah", text: "Saya takut mengecewakan orang tua atau guru karena hasil belajar saya." },
  { category: "Pikiran dan tekanan sekolah", text: "Saya membandingkan prestasi diri sendiri dengan pencapaian teman." },

  { category: "Keluarga dan pertemanan", text: "Saya merasa tidak dipahami oleh keluarga atau teman." },
  { category: "Keluarga dan pertemanan", text: "Saya merasa kesepian meskipun berada di tengah banyak orang." },
  { category: "Keluarga dan pertemanan", text: "Saya takut menceritakan masalah karena khawatir akan dihakimi." },

  { category: "Kepercayaan diri dan mengenali diri", text: "Saya merasa diri saya tidak cukup baik dibandingkan orang lain." },
  { category: "Kepercayaan diri dan mengenali diri", text: "Saya kesulitan menerima kekurangan atau kesalahan diri sendiri." },

  { category: "Tidur, energi, dan rutinitas", text: "Saya kesulitan tidur karena memikirkan berbagai masalah." },
  { category: "Tidur, energi, dan rutinitas", text: "Saya merasa lelah atau sulit berkonsentrasi saat menjalani aktivitas." },

  { category: "Menghadapi masalah dan dukungan", text: "Saya memendam masalah karena tidak tahu kepada siapa harus bercerita." },
  { category: "Menghadapi masalah dan dukungan", text: "Saya kesulitan menenangkan diri ketika menghadapi masalah." }
];

// ===== PERTANYAAN USIA 19–25 TAHUN =====
const adultQuestions = [
  { category: "Emosional dan suasana hati", text: "Saya merasa sedih atau kehilangan semangat tanpa alasan yang jelas." },
  { category: "Emosional dan suasana hati", text: "Saya merasa cemas atau khawatir secara berlebihan." },
  { category: "Emosional dan suasana hati", text: "Saya mudah tersinggung ketika menghadapi tekanan." },

  { category: "Masa depan dan tekanan kuliah/kerja", text: "Saya merasa tertekan ketika memikirkan masa depan." },
  { category: "Masa depan dan tekanan kuliah/kerja", text: "Saya merasa tertinggal saat membandingkan pencapaian saya dengan orang lain." },
  { category: "Masa depan dan tekanan kuliah/kerja", text: "Saya merasa kewalahan menghadapi tuntutan kuliah, pekerjaan, atau tanggung jawab lainnya." },

  { category: "Keluarga dan pertemanan", text: "Saya merasa sulit menceritakan masalah kepada keluarga atau teman." },
  { category: "Keluarga dan pertemanan", text: "Saya merasa kesepian meskipun memiliki hubungan sosial." },

  { category: "Tidur, energi, dan respons tubuh", text: "Saya kesulitan tidur karena memikirkan berbagai masalah." },
  { category: "Tidur, energi, dan respons tubuh", text: "Saya merasa kelelahan secara fisik atau mental meskipun sudah beristirahat." },

  { category: "Strategi menghadapi masalah", text: "Saya menunda menyelesaikan masalah karena merasa kewalahan." },
  { category: "Strategi menghadapi masalah", text: "Saya kesulitan menentukan langkah ketika menghadapi masalah yang rumit." },
  { category: "Strategi menghadapi masalah", text: "Saya memendam emosi agar terlihat kuat di depan orang lain." },

  { category: "Perasaan saat mendapat masalah", text: "Saya menyalahkan diri sendiri ketika sesuatu tidak berjalan sesuai rencana." },
  { category: "Perasaan saat mendapat masalah", text: "Saya merasa kewalahan ketika beberapa masalah datang secara bersamaan." }
];

// ===== MENGAMBIL ELEMEN HTML =====
const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const ageGroup = document.getElementById("ageGroup");
const questionsBox = document.getElementById("questions");
const quizForm = document.getElementById("quizForm");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

let currentQuestions = [];

// ===== MEMBUAT TAMPILAN PERTANYAAN =====
function renderQuestions() {
  questionsBox.innerHTML = "";

  const categories = [
    ...new Set(currentQuestions.map(question => question.category))
  ];

  categories.forEach(category => {
    const heading = document.createElement("h3");
    heading.textContent = category;
    questionsBox.appendChild(heading);

    currentQuestions.forEach((question, index) => {
      if (question.category !== category) return;

      const questionBox = document.createElement("div");
      questionBox.className = "question";

      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${question.text}`;
      questionBox.appendChild(questionText);

      const optionsBox = document.createElement("div");
      optionsBox.className = "options";

      answers.forEach(answer => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `q${index}`;
        radio.value = answer.score;
        radio.addEventListener("change", updateProgress);

        const span = document.createElement("span");
        span.textContent = answer.label;

        label.appendChild(radio);
        label.appendChild(span);
        optionsBox.appendChild(label);
      });

      questionBox.appendChild(optionsBox);
      questionsBox.appendChild(questionBox);
    });
  });

  updateProgress();
}

// ===== MEMPERBARUI PROGRES JAWABAN =====
function updateProgress() {
  const answered = currentQuestions.filter((_, index =>
    document.querySelector(`input[name="q${index}"]:checked`)
  )).length;

  progressText.textContent =
    `${answered} dari ${currentQuestions.length} pertanyaan dijawab`;

  progressBar.style.width =
    `${(answered / currentQuestions.length) * 100}%`;
}

// ===== MEMULAI KUESIONER =====
document.getElementById("startBtn").addEventListener("click", () => {
  if (!ageGroup.value) {
    alert("Silakan pilih kelompok usia terlebih dahulu.");
    return;
  }

  currentQuestions = ageGroup.value === "teen"
    ? teenQuestions
    : adultQuestions;

  document.getElementById("quizTitle").textContent =
    ageGroup.value === "teen"
      ? "Refleksi Diri Usia 15–18 Tahun"
      : "Refleksi Diri Usia 19–25 Tahun";

  welcome.hidden = true;
  result.hidden = true;
  quiz.hidden = false;

  renderQuestions();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== MENGHITUNG DAN MENAMPILKAN HASIL =====
quizForm.addEventListener("submit", event => {
  event.preventDefault();

  const scores = currentQuestions.map((_, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    return selected ? Number(selected.value) : null;
  });

  if (scores.some(score => score === null)) {
    alert("Silakan jawab semua 15 pertanyaan terlebih dahulu.");

    const firstUnanswered = scores.findIndex(score => score === null);

    document.querySelector(
      `.question input[name="q${firstUnanswered}"]`
    ).closest(".question").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  const maxScore = currentQuestions.length * 3;
  const percentage = Math.round((total / maxScore) * 100);

  let colorClass;
  let statusText;
  let summaryText;
  let recommendationText;

  if (percentage <= 33) {
    colorClass = "green";
    statusText = "Hijau · Relatif jarang";

    summaryText =
      "Pengalaman yang mengganggu relatif jarang kamu laporkan. Tetap jaga keseimbangan dan rawat dirimu.";

    recommendationText =
      "🌱 Pertahankan rutinitas yang membantumu. Kamu tetap boleh mencari dukungan kapan pun membutuhkannya.";

  } else if (percentage <= 66) {
    colorClass = "yellow";
    statusText = "Kuning · Perlu diperhatikan";

    summaryText =
      "Beberapa pengalaman mungkin cukup sering muncul. Cobalah mengenali pemicu dan kebutuhanmu.";

    recommendationText =
      "💛 Coba bicarakan perasaanmu dengan orang yang dipercaya. Pertimbangkan dukungan guru BK, konselor, atau tenaga profesional jika keseharianmu terganggu.";

  } else {
    colorClass = "red";
    statusText = "Merah · Pertimbangkan dukungan";

    summaryText =
      "Kamu melaporkan cukup banyak pengalaman yang mengganggu. Kamu tidak harus menghadapinya sendirian.";

    recommendationText =
      "❤️ Pertimbangkan berbicara dengan orang tepercaya atau tenaga profesional. Jika merasa tidak aman, segera cari bantuan orang dewasa tepercaya atau layanan darurat setempat.";
  }

  document.getElementById("percentage").textContent =
    `${percentage}%`;

  const status = document.getElementById("status");
  status.className = `result-badge ${colorClass}`;
  status.textContent = statusText;

  document.getElementById("summary").textContent = summaryText;
  document.getElementById("recommendation").textContent =
    recommendationText;

  // ===== HASIL PER KATEGORI =====
  const categoryResults = document.getElementById("categoryResults");
  categoryResults.innerHTML = "";

  const categories = [
    ...new Set(currentQuestions.map(question => question.category))
  ];

  categories.forEach(category => {
    const indices = currentQuestions
      .map((question, index) =>
        question.category === category ? index : -1
      )
      .filter(index => index !== -1);

    const categoryScore = indices.reduce(
      (sum, index) => sum + scores[index], 0
    );

    const categoryMax = indices.length * 3;
    const categoryPercent = Math.round(
      (categoryScore / categoryMax) * 100
    );

    const row = document.createElement("div");
    row.className = "category-result";

    const title = document.createElement("strong");
    title.textContent = category;

    const percent = document.createElement("span");
    percent.textContent = ` — ${categoryPercent}%`;

    const track = document.createElement("div");
    track.className = "progress-track";

    const bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.style.width = `${categoryPercent}%`;

    if (categoryPercent <= 33) {
      bar.style.background = "#27945b";
    } else if (categoryPercent <= 66) {
      bar.style.background = "#d9a02d";
    } else {
      bar.style.background = "#d84859";
    }

    track.appendChild(bar);
    row.appendChild(title);
    row.appendChild(percent);
    row.appendChild(track);
    categoryResults.appendChild(row);
  });

  quiz.hidden = true;
  result.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CETAK ATAU SIMPAN HASIL SEBAGAI PDF =====
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

// ===== MENGULANGI KUESIONER =====
document.getElementById("restartBtn").addEventListener("click", () => {
  quizForm.reset();
  currentQuestions = [];
  ageGroup.value = "";

  result.hidden = true;
  quiz.hidden = true;
  welcome.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
});
