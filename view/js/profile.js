// profile.js
import { db } from "./koneksi.js";
import { ambilWejangan } from "./wejangan.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

export async function getData() {
    const docRef = doc(db, "profile", "konten");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // Ganti judul
        const judulEl = document.querySelector(".judul h3");
        if (judulEl) judulEl.innerText = data.judul || "PROFILE SEKOLAH";

        // Ganti foto utama
        const fotoUtama = document.querySelector(".foto img");
        if (fotoUtama) fotoUtama.src = data.foto || "../image/gambar/hut.jpeg";

        // Ganti isi paragraf
        const isiDiv = document.querySelector(".isi");
        if (isiDiv) {
            isiDiv.querySelectorAll("p").forEach(p => p.remove());

            if (Array.isArray(data.isi)) {
                data.isi.forEach(paragraf => {
                    const p = document.createElement("p");
                    p.textContent = paragraf;
                    isiDiv.appendChild(p);
                });
            }
        }

        // Slider bagian
        const sliderTrack = document.getElementById("sliderTrack");
        const dotsContainer = document.getElementById("dotsContainer");
        if (!sliderTrack || !dotsContainer) return;

        sliderTrack.innerHTML = "";
        dotsContainer.innerHTML = "";

        const imageList = data.fotoslide || [];
        const numberOfSlides = Math.ceil(imageList.length / 2);
        let currentIndex = 0;

        for (let i = 0; i < imageList.length; i ++) {
            const slide = document.createElement("div");
            slide.classList.add("slide");

            const img1 = document.createElement("img");
            img1.src = imageList[i];
            img1.alt = `Slide ${i + 1}`;
            slide.appendChild(img1);

            if (i + 1 < imageList.length) {
                const img2 = document.createElement("img");
                img2.src = imageList[i + 1];
                img2.alt = `Slide ${i + 2}`;
                slide.appendChild(img2);
            }

            sliderTrack.appendChild(slide);

            // Dot
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                currentIndex = i / 2;
                updateSlider();
            });
            if(i%2 == 0){
                dotsContainer.appendChild(dot);
            }            
            
        }

        function updateSlider() {
            const dots = dotsContainer.querySelectorAll(".dot");
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        document.getElementById("next")?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % numberOfSlides;
            updateSlider();
        });

        document.getElementById("prev")?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + numberOfSlides) % numberOfSlides;
            updateSlider();
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % numberOfSlides;
            updateSlider();
        }, 3000);

        updateSlider();

    } else {
        console.error("Data tidak ditemukan.");
    }
}
getData();
ambilWejangan();