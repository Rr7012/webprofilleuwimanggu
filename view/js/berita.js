// berita.js
import { db } from "./koneksi.js";
import { ambilWejangan } from "./wejangan.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const targetId = Number(params.get("id"));

export async function tampilkanBerita() {
  if (!targetId) {
    alert("ID berita tidak ditemukan di URL.");
    return;
  }

  try {
    const q = query(collection(db, "berita"), where("id", "==", targetId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Dokumen tidak ditemukan.");
      return;
    }

    const docData = querySnapshot.docs[0].data();

    document.querySelector(".judul-konten-berita h2").textContent = docData.judul || "";
    document.querySelector(".tanggal p").textContent = docData.tanggal || "";
    document.querySelector(".foto-konten-berita img").src = docData.foto || "";

    const kontenBerita = document.querySelector(".konten-berita");

    docData.konten.forEach(item => {
      const p = document.createElement("p");
      p.textContent = item.isi || "";
      kontenBerita.appendChild(p);
    });

  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

export async function tampilkanListBerita() {
  try {
    const beritaListDiv = document.getElementById("beritaList");
    const q = query(collection(db, "berita"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      beritaListDiv.innerHTML = "<p>Tidak ada berita tersedia.</p>";
      return;
    }

    const filteredDocs = querySnapshot.docs
      .filter(doc => doc.data().id !== targetId)
      .reverse()
      .slice(0, 4);

    filteredDocs.forEach((doc) => {
      const data = doc.data();

      const listItem = document.createElement("div");
      listItem.classList.add("list-berita");

      const link = document.createElement("a");
      link.href = `berita.html?id=${data.id}`;
      link.classList.add("berita");

      const fotoDiv = document.createElement("div");
      fotoDiv.classList.add("foto-berita");
      fotoDiv.style.backgroundImage = `url('${data.foto || ""}')`;
      fotoDiv.style.backgroundSize = "cover";
      fotoDiv.style.backgroundPosition = "center";

      const judulDiv = document.createElement("div");
      judulDiv.classList.add("judul-berita");
      judulDiv.textContent = data.judul || "Tanpa Judul";

      link.appendChild(fotoDiv);
      link.appendChild(judulDiv);
      listItem.appendChild(link);
      beritaListDiv.appendChild(listItem);
    });
  } catch (error) {
    console.error("Gagal mengambil daftar berita:", error);
  }
}
 tampilkanBerita()
 tampilkanListBerita();
 ambilWejangan();