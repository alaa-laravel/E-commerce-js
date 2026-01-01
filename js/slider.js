// Image Slider

const API_URL = "https://fakestoreapi.com/products";
let current = 0;
let slides = [];
let interval;

async function loadSlides() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();
    const container = document.querySelector(".slider");

    container.innerHTML = "";
    products.slice(0, 5).forEach((p, i) => {
      const slide = document.createElement("div");
      slide.className = `slide ${i === 0 ? "active" : ""}`;
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = p.title;
      slide.appendChild(img);
      container.appendChild(slide);
    });

    slides = container.querySelectorAll(".slide");
    show(0);
    autoSlide();
  } catch (error) {
    console.error("Error loading slider:", error);
  }
}

function show(n) {
  slides.forEach((s) => s.classList.remove("active"));
  current = (n + slides.length) % slides.length;
  slides[current].classList.add("active");
}

function next() {
  show(current + 1);
  clearInterval(interval);
  autoSlide();
}

function prev() {
  show(current - 1);
  clearInterval(interval);
  autoSlide();
}

function autoSlide() {
  interval = setInterval(() => show(current + 1), 3000);
}

document.addEventListener("DOMContentLoaded", loadSlides);
