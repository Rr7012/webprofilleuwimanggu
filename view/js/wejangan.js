// wejangan.js
import { db } from './koneksi.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function ambilWejangan(selector = "#wejangan") {
  const container = document.querySelector(selector);

  if (!container) {
    console.error(`Element "${selector}" tidak ditemukan di halaman.`);
    return;
  }

  try {
    const docRef = doc(db, "wejangan", "utama");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      container.textContent = data.teks || "Wejangan kosong.";
    } else {
      container.textContent = "Wejangan tidak ditemukan.";
    }
  } catch (err) {
    console.error("Gagal mengambil wejangan:", err);
    container.textContent = "Gagal memuat wejangan.";
  }
}
