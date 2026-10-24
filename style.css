/* ===== PENGATURAN DASAR ===== */
:root {
  --primary: #6558c9;
  --soft: #f1efff;
  --text: #292943;
  --muted: #74748b;
  --white: #ffffff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: var(--text);
  background: linear-gradient(135deg, #f3f1ff, #e8f6ff);
  line-height: 1.6;
}

/* ===== HEADER ===== */
header {
  padding: 28px 16px;
  text-align: center;
  background: var(--white);
  border-bottom: 1px solid #e9e6fb;
}

.logo {
  font-size: 32px;
}

header h1 {
  margin: 5px 0;
  color: var(--primary);
}

header p {
  margin: 0;
  color: var(--muted);
}

/* ===== TATA LETAK ===== */
main {
  width: min(850px, 92%);
  margin: 28px auto;
}

.card {
  background: var(--white);
  padding: 24px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 30px #3d367410;
}

h2 {
  margin-top: 0;
  font-size: 22px;
}

.intro,
.small {
  color: var(--muted);
}

.small {
  font-size: 13px;
}

/* ===== INPUT ===== */
label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

select {
  width: 100%;
  padding: 13px;
  border: 1px solid #d8d5ed;
  border-radius: 12px;
  background: white;
  font-size: 16px;
  color: var(--text);
}

.notice {
  background: #fff7df;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  margin: 18px 0;
}

/* ===== KARTU PERTANYAAN ===== */
.question {
  border: 1px solid #eceaf5;
  padding: 17px;
  border-radius: 14px;
  margin: 14px 0;
}

.question p {
  margin: 0 0 12px;
  font-weight: 600;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #e2e0f0;
  border-radius: 10px;
  cursor: pointer;
  font-weight: normal;
  margin: 0;
}

.option:has(input:checked) {
  border-color: var(--primary);
  background: var(--soft);
}

input[type="radio"] {
  accent-color: var(--primary);
}

/* ===== TOMBOL ===== */
button {
  border: none;
  padding: 13px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.primary {
  color: white;
  background: var(--primary);
  width: 100%;
  margin-top: 15px;
}

.secondary {
  color: var(--primary);
  background: var(--soft);
  margin-top: 10px;
}

/* ===== INDIKATOR PROGRES ===== */
.progress-track {
  background: #e9e7f5;
  height: 9px;
  border-radius: 99px;
  overflow: hidden;
  margin: 12px 0;
}

.progress-bar {
  height: 100%;
  background: var(--primary);
  width: 0%;
  transition: width 0.2s;
}

/* ===== HASIL TES ===== */
.result-top {
  text-align: center;
  padding: 18px;
  border-radius: 16px;
  background: #f5f4fc;
}

.result-number {
  font-size: 46px;
  font-weight: bold;
  line-height: 1.3;
}

.result-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 30px;
  font-weight: bold;
}

.green {
  color: #176b3a;
  background: #dcf7e5;
}

.yellow {
  color: #805b0a;
  background: #fff0c5;
}

.red {
  color: #a5293c;
  background: #ffe1e5;
}

.category-result {
  padding: 13px 0;
  border-bottom: 1px solid #eeeaf6;
}

.category-result:last-child {
  border-bottom: none;
}

.category-result .progress-track {
  margin-bottom: 0;
}

.category-result .progress-bar {
  background: var(--category-color, var(--primary));
}

/* ===== FOOTER ===== */
footer {
  text-align: center;
  padding: 25px 15px;
  color: var(--muted);
  font-size: 13px;
}

/* Menyembunyikan bagian yang belum digunakan */
[hidden] {
  display: none !important;
}

/* ===== TAMPILAN HP ===== */
@media (max-width: 480px) {
  .card {
    padding: 17px;
  }

  .options {
    grid-template-columns: 1fr;
  }

  header h1 {
    font-size: 25px;
  }
}

/* ===== CETAK HASIL ===== */
@media print {
  body {
    background: white;
  }

  header,
  footer,
  #welcome,
  #quiz,
  #printBtn,
  #restartBtn {
    display: none !important;
  }

  main {
    width: 100%;
    margin: 0;
  }

  .card {
    box-shadow: none;
  }
}
