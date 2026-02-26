/* ============================================================
   additions.js
   Fitur baru yang ditambahkan ke portfolio Nendar Pramelda:
     1. LocalStorage Comment System  (Feature 3)
     2. Bilingual Language Toggle EN/ID  (Feature 4)
   File ini di-load SETELAH script.js di bagian bawah index.html.
============================================================ */


/* ============================================================
   FEATURE 3: LOCALSTORAGE COMMENT SYSTEM
   - Komentar disimpan di localStorage dengan key 'np_comments'
   - Format data: array of objects { name, message, date }
   - Komentar tetap ada setelah refresh (persistent)
   - Tidak butuh backend / database eksternal
============================================================ */

const STORAGE_KEY = 'np_comments';

/**
 * Render semua komentar dari localStorage ke dalam #commentsList.
 * Dipanggil saat halaman load dan setiap kali komentar baru ditambah.
 */
function loadComments() {
  const list  = document.getElementById('commentsList');
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  if (saved.length === 0) {
    // Tampilkan pesan kosong jika belum ada komentar
    list.innerHTML = '<p class="comments-empty" data-en="No comments yet. Be the first to say hello!" data-id="Belum ada komentar. Jadilah yang pertama menyapa!">No comments yet. Be the first to say hello!</p>';
    return;
  }

  // Bangun HTML untuk setiap komentar yang tersimpan
  list.innerHTML = saved.map(c => `
    <div class="comment-item">
      <div class="comment-item-header">
        <span class="comment-item-name">${escapeHtml(c.name)}</span>
        <span class="comment-item-date">${c.date}</span>
      </div>
      <p class="comment-item-text">${escapeHtml(c.message)}</p>
    </div>
  `).join('');
}

/**
 * Sanitasi input pengguna untuk mencegah XSS.
 * Ganti karakter HTML khusus dengan entity-nya.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Tangani klik tombol "Post Comment"
document.getElementById('commentSubmit').addEventListener('click', () => {
  const nameEl  = document.getElementById('commentName');
  const textEl  = document.getElementById('commentText');
  const name    = nameEl.value.trim();
  const message = textEl.value.trim();

  // Validasi: nama dan pesan wajib diisi
  if (!name || !message) {
    nameEl.style.outline = name    ? '' : '2px solid var(--coral)';
    textEl.style.outline = message ? '' : '2px solid var(--coral)';
    return;
  }

  // Reset outline jika validasi lulus
  nameEl.style.outline = '';
  textEl.style.outline = '';

  // Format tanggal dan waktu saat ini
  const now  = new Date();
  const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
             + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  // Ambil komentar lama, tambahkan yang baru di awal (newest first), simpan
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  saved.unshift({ name, message, date });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  // Kosongkan form
  nameEl.value = '';
  document.getElementById('commentEmail').value = '';
  textEl.value = '';

  // Render ulang daftar komentar
  loadComments();
});

// Render komentar saat halaman pertama kali dibuka
loadComments();


/* ============================================================
   FEATURE 4: BILINGUAL LANGUAGE TOGGLE (EN / ID)
   - Elemen yang bisa diterjemahkan ditandai dengan atribut
     data-en="..." dan data-id="..." langsung di HTML.
   - Fungsi applyLang(lang) memperbarui semua elemen tersebut
     secara serentak tanpa reload halaman.
   - Pilihan bahasa disimpan di localStorage dengan key 'np_lang'
     agar tetap aktif setelah refresh.
   - Input/textarea placeholder ditangani via atribut
     data-en-placeholder dan data-id-placeholder.
============================================================ */

const langBtns = document.querySelectorAll('.lang-btn');

/**
 * Terapkan bahasa yang dipilih ke semua elemen translatable.
 * @param {string} lang - 'en' atau 'id'
 */
function applyLang(lang) {
  // Perbarui semua elemen bertanda data-en / data-id
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) {
      // Gunakan innerHTML agar tag <br> dan <em> bisa dirender
      el.innerHTML = text;
    }
  });

  // Perbarui placeholder input dan textarea
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    const ph = el.getAttribute('data-' + lang + '-placeholder');
    if (ph !== null) el.placeholder = ph;
  });

  // Tandai tombol bahasa yang aktif
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update atribut lang pada <html> untuk aksesibilitas
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';

  // Simpan pilihan ke localStorage
  localStorage.setItem('np_lang', lang);
}

// Pasang event listener ke setiap tombol bahasa
langBtns.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Pulihkan bahasa yang tersimpan saat halaman dibuka
const savedLang = localStorage.getItem('np_lang') || 'en';
applyLang(savedLang);
