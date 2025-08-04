import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
    import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDkCWMaH4T2W7Ix2VaHPmA4eD7c88dvpXk",
      authDomain: "webprofilesdn.firebaseapp.com",
      databaseURL: "https://webprofilesdn-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "webprofilesdn",
      storageBucket: "webprofilesdn.appspot.com",
      messagingSenderId: "338937569949",
      appId: "1:338937569949:web:7c2f9fcfdbd97784bbaa74",
      measurementId: "G-PX6RRFQQGL"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const beritaList = document.getElementById("beritaList");

    async function tampilkanBerita() {
      try {
        const querySnapshot = await getDocs(collection(db, "berita"));
        if (querySnapshot.empty) {
          beritaList.innerHTML = "<p>Tidak ada berita ditemukan.</p>";
          return;
        }

        beritaList.innerHTML = ""; // Bersihkan sebelum ditampilkan
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const div = document.createElement("div");
          div.className = "berita";

          div.innerHTML = `
            <h2>${data.judul}</h2>
            ${data.foto ? `<img src="${data.foto}" alt="Foto Berita">` : ""}
            <p><strong>Tanggal:</strong> ${data.tanggal}</p>
            <div>
              <strong>Konten:</strong>
              ${data.konten && Array.isArray(data.konten) ? data.konten.map(k => `
                <div class="konten-item">
                  <p>${k.isi}</p>
                </div>`).join("") : "<p>Tidak ada konten</p>"}
            </div>
          `;

          beritaList.appendChild(div);
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        beritaList.innerHTML = "<p>Terjadi kesalahan saat mengambil data.</p>";
      }
    }

    // tampilkanBerita();