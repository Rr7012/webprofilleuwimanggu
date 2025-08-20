// pendaftaran.js
import { db } from "./koneksi.js";
import { ambilWejangan } from "./wejangan.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const konten = document.querySelector(".konten");

async function tampilkanLangkah() {
  try {
    const querySnapshot = await getDocs(collection(db, "langkahPendaftaran"));
    const dataLangkah = [];

    querySnapshot.forEach(doc => {
      dataLangkah.push(doc.data());
    });

    dataLangkah.sort((a, b) => a.nomor - b.nomor);

    konten.innerHTML = `
      <div class="background"></div>
      <div class="judul">
          <img src="../image/gambar/marisekolah.jpeg">
      </div>
    `;

    dataLangkah.forEach((langkah, index) => {
      const isGenap = index % 2 === 0;
      const html = `
        <div class="${isGenap ? 'langkah-kanan' : 'langkah-kiri'}">
          ${isGenap ? `<h1>${langkah.nomor}</h1>` : ''}
          <div class="kotak">
            ${!isGenap ? `<img src="../image/logo/${langkah.logo}">` : ''}
            <div class="sub" style="text-align: ${isGenap ? 'end' : 'start'};">
              <h2>${langkah.judul}</h2>
              <h3>${langkah.isi}</h3>
            </div>
            ${isGenap ? `<img src="../image/logo/${langkah.logo}" style="margin: 0 5vw 0 1vw;">` : ''}
          </div>
          ${!isGenap ? `<h1>${langkah.nomor}</h1>` : ''}
        </div>
      `;
      konten.innerHTML += html;
    });
  } catch (err) {
    console.error("Gagal menampilkan langkah pendaftaran:", err);
    konten.innerHTML = "<p>Gagal memuat data pendaftaran.</p>";
  }
}

tampilkanLangkah();
ambilWejangan();
