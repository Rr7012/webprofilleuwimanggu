    const items = [];
    for (let i = 1; i <= 50; i++) {
        items.push("Item " + i);
    }

    const itemsPerPage = 6;
    let currentPage = 1;

    function displayItems(items, container, page, perPage) {
        container.innerHTML = "";
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedItems = items.slice(start, end);

        for (let item of paginatedItems) {
            const div = document.createElement("div");
            div.className = "berita";
            div.textContent = item;
            container.appendChild(div);
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
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(currentPage + 2, pageCount);

        // Penyesuaian jika halaman kurang dari 5
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(startPage + 4, pageCount);
            } else if (endPage === pageCount) {
                startPage = Math.max(endPage - 4, 1);
            }
        }

        // Tombol halaman pertama dan ellipsis awal
        if (startPage > 1) {
            container.appendChild(createButton(1));
            if (startPage > 2) {
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
            if (endPage < pageCount - 1) {
                container.appendChild(createEllipsis());
            }
            container.appendChild(createButton(pageCount));
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
        span.textContent = "...";
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
