<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Data Pengguna</title>
</head>
<body>
  <h1>Daftar Pengguna</h1>
  <table border="1" cellpadding="10">
    <thead>
      <tr>
        <th>Nama</th>
        <th>Email</th>
        <th>Waktu Submit</th>
      </tr>
    </thead>
    <tbody id="dataTabel">
      <!-- Data akan dimuat di sini -->
    </tbody>
  </table>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
    const db = getFirestore(app);

    async function loadData() {
      const dataTabel = document.getElementById('dataTabel');
      dataTabel.innerHTML = ""; // Kosongkan isi sebelumnya

      const querySnapshot = await getDocs(collection(db, "pengguna"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement('tr');
        const waktu = data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : "-";
        
        row.innerHTML = `
          <td>${data.nama}</td>
          <td>${data.email}</td>
          <td>${waktu}</td>
        `;
        dataTabel.appendChild(row);
      });
    }

    loadData();
  </script>
</body>
</html>
