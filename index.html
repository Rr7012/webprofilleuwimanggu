<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Firestore Simpan Data</title>
</head>
<body>
    <img src="https://drive.google.com/uc?export=view&id=16nEcFYCrcYugAxmTk2aYk07fEPJ8Zo4d" alt="Gambar dari Google Drive">
    <!-- https://drive.google.com/file/d/16nEcFYCrcYugAxmTk2aYk07fEPJ8Zo4d -->

  <h1>Form Penyimpanan Data</h1>
  <form id="dataForm">
    <input type="text" id="nama" placeholder="Nama" required><br>
    <input type="email" id="email" placeholder="Email" required><br>
    <button type="submit">Simpan</button>
  </form>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDkCWMaH4T2W7Ix2VaHPmA4eD7c88dvpXk",
      authDomain: "webprofilesdn.firebaseapp.com",
      databaseURL: "https://webprofilesdn-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "webprofilesdn",
      storageBucket: "webprofilesdn.firebasestorage.app",
      messagingSenderId: "338937569949",
      appId: "1:338937569949:web:7c2f9fcfdbd97784bbaa74",
      measurementId: "G-PX6RRFQQGL"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const form = document.getElementById('dataForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nama = document.getElementById('nama').value;
      const email = document.getElementById('email').value;

      try {
        await addDoc(collection(db, "pengguna"), {
          nama: nama,
          email: email,
          timestamp: new Date()
        });
        alert("Data berhasil disimpan!");
        form.reset();
      } catch (error) {
        alert("Gagal menyimpan data: " + error);
      }
    });
  </script>
</body>
</html>
