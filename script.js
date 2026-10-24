
// ========================================
// RUANG DIRI - JAVASCRIPT
// ========================================

// Mengambil elemen HTML berdasarkan ID
const get = (id) => document.getElementById(id);

// Penyimpanan browser untuk versi demo
const STORAGE = {
  mood: "ruangDiriMood",
  journal: "ruangDiriJournal",
  story: "ruangDiriStory"
};

// Membaca data dari browser dengan aman
function readData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

// Menyimpan data ke browser
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    alert("Data tidak bisa disimpan. Periksa pengaturan browser.");
    return false;
  }
}

// Membuat teks biasa agar input pengguna
// tidak diperlakukan sebagai kode HTML.
function makeText(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function today() {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ========================================
// 1. MIND CHECK
// ========================================

// Kuesioner refleksi edukatif.
// Bukan instrumen klinis tervalidasi.
const questions = [
  "Aku merasa sedih atau kehilangan semangat.",
  "Aku merasa khawatir atau sulit merasa tenang.",
  "Aku sulit menikmati hal yang biasanya kusukai.",
  "Aku merasa kewalahan dengan kegiatan sehari-hari.",
  "Aku sulit berkonsentrasi.",
  "Tidur atau waktu istirahatku terganggu.",
  "Aku merasa sendirian atau sulit meminta dukungan.",
  "Perasaanku membuat kegiatan sehari-hari lebih sulit."
];

const answerOptions = [
  "Tidak pernah",
  "Beberapa hari",
  "Sering",
  "Hampir tiap hari"
];

const questionContainer = get("questions");

// Membuat pertanyaan dan pilihan jawaban otomatis
questions.forEach((question, index) => {
  const wrapper = document.createElement("div");
  wrapper.className = "question";

  const title = makeText("p", `${index + 1}. ${question}`);
  wrapper.appendChild(title);

  const answers = document.createElement("div");
  answers.className = "answers";

  answerOptions.forEach((answer, score) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");

    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = score;
    radio.required = true;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + answer));
    answers.appendChild(label);
  });

  wrapper.appendChild(answers);
  questionContainer.appendChild(wrapper);
});

// Menghitung jawaban dan menampilkan refleksi
get("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(
      `input[name="question${i}"]:checked`
    );

    if (!selected) {
      alert("Silakan jawab semua pertanyaan terlebih dahulu.");
      return;
    }

    score += Number(selected.value);
  }

  let title;
  let message;
  let steps;

  // Rentang skor ini hanya untuk demo,
  // bukan standar diagnosis kesehatan mental.
  if (score <= 6) {
    title = "🌿 Terus rawat dirimu!";
    message =
      "Jawabanmu menunjukkan lebih sedikit pengalaman sulit " +
      "pada pertanyaan refleksi ini. Kamu tetap boleh beristirahat " +
      "dan meminta dukungan saat membutuhkannya.";

    steps = [
      "Pertahankan kebiasaan yang membuatmu nyaman.",
      "Luangkan waktu untuk hal yang kamu sukai.",
      "Ceritakan masalah kepada orang tepercaya jika diperlukan."
    ];
  } else if (score <= 15) {
    title = "☁️ Beri dirimu ruang untuk bernapas.";
    message =
      "Beberapa jawabanmu menunjukkan pengalaman yang mungkin " +
      "cukup menguras energi. Cobalah mengenali kebutuhanmu " +
      "dan perhatikan perasaanmu tanpa menghakimi diri sendiri.";

    steps = [
      "Jaga kebutuhan dasar seperti makan dan istirahat.",
      "Tuliskan hal yang sedang memenuhi pikiranmu.",
      "Pertimbangkan berbicara kepada orang tepercaya."
    ];
  } else {
    title = "💗 Kamu layak mendapat dukungan.";
    message =
      "Jawabanmu menunjukkan bahwa beberapa pengalaman sulit " +
      "cukup sering muncul. Kamu tidak harus menghadapinya " +
      "sendirian. Pertimbangkan mencari dukungan yang tepat.";

    steps = [
      "Hubungi orang dewasa tepercaya atau guru BK.",
      "Pertimbangkan berkonsultasi dengan psikolog atau tenaga kesehatan.",
      "Jika kamu merasa tidak aman, segera cari bantuan langsung."
    ];
  }

  const result = get("result");
  result.replaceChildren();

  result.appendChild(makeText("h3", title));
  result.appendChild(makeText("p", message));
  result.appendChild(makeText("h4", "Langkah kecil yang bisa dicoba:"));

  const list = document.createElement("ul");

  steps.forEach(step => {
    list.appendChild(makeText("li", step));
  });

  result.appendChild(list);

  result.appendChild(makeText(
    "small",
    "Ini adalah hasil refleksi dari kuesioner demo, bukan diagnosis " +
    "atau ukuran mutlak kesehatan mental. Jika kamu khawatir dengan " +
    "kondisimu, mintalah bantuan tenaga profesional."
  ));

  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Bersihkan hasil ketika kuesioner diulang
get("quizForm").addEventListener("reset", () => {
  get("result").classList.add("hidden");
});

// ========================================
// 2. MOOD TRACKER
// ========================================

let selectedMood = "";

const moodButtons = document.querySelectorAll(".mood");

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    moodButtons.forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");
    selectedMood = button.dataset.mood;

    get("moodFeedback").textContent =
      `Kamu memilih suasana hati: ${selectedMood} ♡`;
  });
});

function renderMoods() {
  const container = get("moodHistory");
  container.replaceChildren();

  const moods = readData(STORAGE.mood);

  if (moods.length === 0) {
    container.appendChild(makeText(
      "p",
      "Belum ada catatan mood. Kamu bisa mulai kapan saja."
    ));
    return;
  }

  moods.slice(0, 10).forEach(item => {
    const entry = document.createElement("div");
    entry.className = "entry";

    entry.appendChild(makeText("strong", `🌤️ ${item.mood}`));
    entry.appendChild(makeText("small", item.date));

    if (item.note) {
      entry.appendChild(makeText("p", item.note));
    }

    container.appendChild(entry);
  });
}

get("saveMood").addEventListener("click", () => {
  if (!selectedMood) {
    alert("Pilih suasana hati terlebih dahulu, ya.");
    return;
  }

  const moods = readData(STORAGE.mood);

  moods.unshift({
    mood: selectedMood,
    note: get("moodNote").value.trim(),
    date: today()
  });

  if (saveData(STORAGE.mood, moods.slice(0, 30))) {
    get("moodNote").value = "";
    get("moodFeedback").textContent =
      "Catatan mood tersimpan di perangkat ini ♡";

    selectedMood = "";
    moodButtons.forEach(item => item.classList.remove("selected"));
    renderMoods();
  }
});

renderMoods();

// ========================================
// 3. JURNAL PRIBADI
// ========================================

function renderJournals() {
  const container = get("journalList");
  container.replaceChildren();

  const journals = readData(STORAGE.journal);

  if (journals.length === 0) {
    container.appendChild(makeText(
      "p",
      "Belum ada catatan. Mulailah menulis saat kamu siap."
    ));
    return;
  }

  journals.slice(0, 20).forEach(item => {
    const entry = document.createElement("article");
    entry.className = "entry";

    entry.appendChild(makeText("strong", item.title));
    entry.appendChild(makeText("small", item.date));
    entry.appendChild(makeText("p", item.body));

    const deleteButton = makeText(
      "button",
      "Hapus catatan",
      "delete-btn"
    );

    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {
      const remaining = readData(STORAGE.journal)
        .filter(note => note.id !== item.id);

      if (saveData(STORAGE.journal, remaining)) {
        renderJournals();
      }
    });

    entry.appendChild(deleteButton);
    container.appendChild(entry);
  });
}

get("journalForm").addEventListener("submit", event => {
  event.preventDefault();

  const title = get("journalTitle").value.trim();
  const body = get("journalText").value.trim();

  if (!title || !body) {
    alert("Isi judul dan catatan terlebih dahulu.");
    return;
  }

  const journals = readData(STORAGE.journal);

  journals.unshift({
    id: Date.now() + Math.random(),
    title,
    body,
    date: today()
  });

  if (saveData(STORAGE.journal, journals.slice(0, 30))) {
    get("journalForm").reset();
    renderJournals();
    alert("Catatan berhasil disimpan di perangkat ini ♡");
  }
});

renderJournals();

// ========================================
// 4. MOTIVASI
// ========================================

const motivations = [
  "Aku tidak harus punya semua jawaban untuk mulai melangkah.",
  "Beristirahat bukan berarti menyerah. Aku juga perlu dirawat.",
  "Perasaanku layak didengarkan, termasuk oleh diriku sendiri.",
  "Aku boleh bertumbuh dengan ritmeku sendiri.",
  "Satu langkah kecil tetap merupakan sebuah kemajuan.",
  "Aku boleh meminta bantuan. Aku tidak harus sendirian.",
  "Hari yang sulit tidak menentukan seluruh perjalanan hidupku.",
  "Aku bisa belajar tanpa terus menyalahkan diri sendiri."
];

let motivationIndex = 0;

get("newMotivation").addEventListener("click", () => {
  motivationIndex = (motivationIndex + 1) % motivations.length;

  get("motivationText").textContent =
    motivations[motivationIndex];
});

// ========================================
// 5. CERITA RUANG
// ========================================

// Versi ini hanya menyimpan cerita di browser.
// Bukan forum publik dan bukan layanan konseling langsung.

function renderStories() {
  const container = get("storyList");
  container.replaceChildren();

  const stories = readData(STORAGE.story)
    .filter(story => story.shared);

  if (stories.length === 0) {
    container.appendChild(makeText(
      "p",
      "Belum ada cerita yang dibagikan di demo ini. ♡"
    ));
    return;
  }

  stories.slice(0, 20).forEach(story => {
    const entry = document.createElement("article");
    entry.className = "entry";

    entry.appendChild(makeText("strong", `☁ ${story.alias}`));
    entry.appendChild(makeText("small", story.date));
    entry.appendChild(makeText("p", story.body));

    container.appendChild(entry);
  });
}

get("storyForm").addEventListener("submit", event => {
  event.preventDefault();

  const alias = get("storyAlias").value.trim();
  const body = get("storyText").value.trim();
  const shared = get("shareStory").checked;

  if (!alias || !body) {
    alert("Isi nama samaran dan cerita terlebih dahulu.");
    return;
  }

  if (shared) {
    const confirmed = confirm(
      "Cerita akan ditampilkan di halaman demo pada browser ini. " +
      "Pastikan tidak ada informasi pribadi. Lanjutkan?"
    );

    if (!confirmed) return;
  }

  const stories = readData(STORAGE.story);

  stories.unshift({
    alias,
    body,
    shared,
    date: today()
  });

  if (saveData(STORAGE.story, stories.slice(0, 30))) {
    get("storyForm").reset();
    renderStories();

    alert(
      shared
        ? "Cerita tersimpan di demo lokal."
        : "Cerita tersimpan di perangkat ini."
    );
  }
});

renderStories();
