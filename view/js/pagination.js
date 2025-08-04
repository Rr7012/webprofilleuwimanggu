    const items = [];
    for (let i = 1; i <= 50; i++) {
        // items.push("Item " + i);
        items.push("SDN Leuwimanggu Gelar Lomba Hari Kemerdekaan ke-80");
    }

    const itemsPerPage = 9;
    let currentPage = 1;

    function displayItems(items, container, page, perPage) {
        container.innerHTML = "";
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedItems = items.slice(start, end);

        for (let item of paginatedItems) {
            const a = document.createElement("a");
            a.href = "berita.html";
            a.className = "berita";
            a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0, 0.5) 30%, transparent 50%), url("../image/gambar/hut.jpeg")`;
            a.addEventListener('mouseenter', () => {
                a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0, 0.9) 30%, transparent 50%), url("../image/gambar/hut.jpeg")`;
            })
            a.addEventListener('mouseleave', () => {
                a.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0, 0.5) 30%, transparent 50%), url("../image/gambar/hut.jpeg")`;
            })
            a.sty


            const judulFotoDiv = document.createElement("div");
            judulFotoDiv.className = "judul-foto";
            

            const h3 = document.createElement("h3");
            h3.textContent = item; // Gunakan item sebagai judul

            judulFotoDiv.appendChild(h3);
            a.appendChild(judulFotoDiv);

            container.appendChild(a);
        }
    }


    function setupPagination(items, container, perPage) {
        container.innerHTML = "";
        const pageCount = Math.ceil(items.length / perPage);

        // Tombol Prev
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

        // Hitung range halaman
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(currentPage + 1, pageCount);

        // Penyesuaian jika halaman kurang dari 5
        if (endPage - startPage < 2 ) {
            if (startPage === 1) {
                endPage = Math.min(startPage + 2, pageCount);
            } else if (endPage === pageCount) {
                startPage = Math.max(endPage - 2, 1);
            }
        }

        // Tombol halaman pertama dan ellipsis awal
        if (startPage > 1) {
            if (startPage >= 2) {
                container.appendChild(createEllipsis());
            }
        }

        // Tombol halaman dinamis
        for (let i = startPage; i <= endPage; i++) {
            const btn = createButton(i);
            container.appendChild(btn);
        }

        // Ellipsis akhir dan tombol halaman terakhir
        if (endPage < pageCount) {
            if (endPage <= pageCount - 1) {
                container.appendChild(createEllipsis());
            }
        }

        // Tombol Next
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
        // span.textContent = "...";
        span.className = "ellipsis";
        return span;
    }


    function createButton(page) {
        const button = document.createElement("button");
        button.textContent = page;

        if (currentPage === page) {
            button.classList.add("active");
        }

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
    update();
