/* ============================================================
   additions.js
   Fitur baru yang ditambahkan ke portfolio Nendar Pramelda:
     1. Disqus Comment System  (Feature 3)
     2. Bilingual Language Toggle EN/ID  (Feature 4)
   File ini di-load SETELAH script.js di bagian bawah index.html.
============================================================ */


/* ============================================================
   FEATURE 3: DISQUS COMMENT SYSTEM
   - Komentar disimpan di server Disqus (gratis)
   - Semua pengunjung bisa melihat & membalas komentar satu sama lain
   - Tidak butuh backend sendiri
   - CARA SETUP:
       1. Daftar di https://disqus.com → "I want to install Disqus on my site"
       2. Isi Website Name → shortname akan terbentuk otomatis
          Contoh: website name "Nendar Pramelda" → shortname: nendar-pramelda
       3. Ganti nilai YOUR_SHORTNAME_HERE di bawah dengan shortname kamu
============================================================ */

(function() {
  // ← GANTI INI dengan shortname Disqus kamu
  var disqus_shortname = 'YOUR_SHORTNAME_HERE';

  // Konfigurasi Disqus
  var disqus_config = function () {
    // URL halaman ini — pastikan sesuai domain yang kamu deploy
    this.page.url = window.location.href;
    // Identifier unik untuk halaman ini
    this.page.identifier = 'nendar-pramelda-portfolio';
  };

  // Muat script Disqus secara async (tidak memperlambat halaman)
  var d = document, s = d.createElement('script');
  s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();


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
