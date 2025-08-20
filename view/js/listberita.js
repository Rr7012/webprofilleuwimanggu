// listberita.js
import { db } from "./koneksi.js";
import { ambilWejangan } from "./wejangan.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let items = [];
const itemsPerPage = 9;
let currentPage = 1;

async function getBerita() {
  const snapshot = await getDocs(collection(db, "berita"));
  items = snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  update();
}


function displayItems(items, container, page, perPage) {
  container.innerHTML = "";
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = items.slice(start, end);

  for (let item of paginatedItems) {
    const a = document.createElement("a");
    a.href = `berita.html?id=${item.id}`;
    a.className = "berita";
    const fotoURL = item.foto || "../image/gambar/default.jpg";
    a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent 50%), url("${fotoURL}")`;

    a.addEventListener("mouseenter", () => {
      a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.9) 30%, transparent 50%), url("${fotoURL}")`;
    });
    a.addEventListener("mouseleave", () => {
      a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent 50%), url("${fotoURL}")`;
    });

    const judulFotoDiv = document.createElement("div");
    judulFotoDiv.className = "judul-foto";

    const h3 = document.createElement("h3");
    h3.textContent = item.judul;

    judulFotoDiv.appendChild(h3);
    a.appendChild(judulFotoDiv);

    container.appendChild(a);
  }
}

function setupPagination(items, container, perPage) {
  container.innerHTML = "";
  const pageCount = Math.ceil(items.length / perPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      update();
    }
  });
  container.appendChild(prevBtn);

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, pageCount);

  if (endPage - startPage < 2) {
    if (startPage === 1) {
      endPage = Math.min(startPage + 2, pageCount);
    } else if (endPage === pageCount) {
      startPage = Math.max(endPage - 2, 1);
    }
  }

  if (startPage > 1) {
    container.appendChild(createEllipsis());
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = createButton(i);
    container.appendChild(btn);
  }

  if (endPage < pageCount) {
    container.appendChild(createEllipsis());
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.disabled = currentPage === pageCount;
  nextBtn.addEventListener("click", () => {
    if (currentPage < pageCount) {
      currentPage++;
      update();
    }
  });
  container.appendChild(nextBtn);
}

function createEllipsis() {
  const span = document.createElement("span");
  span.className = "ellipsis";
  span.textContent = "...";
  return span;
}

function createButton(page) {
  const button = document.createElement("button");
  button.textContent = page;
  if (currentPage === page) button.classList.add("active");

  button.addEventListener("click", () => {
    currentPage = page;
    update();
  });

  return button;
}

function update() {
  const container = document.getElementById("item-container");
  const pagination = document.getElementById("pagination");

  displayItems(items, container, currentPage, itemsPerPage);
  setupPagination(items, pagination, itemsPerPage);
}

// Inisialisasi

getBerita();
ambilWejangan();
