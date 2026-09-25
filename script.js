document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  const currentLabel = carousel.querySelector("[data-carousel-current]");
  let currentIndex = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "phase-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show phase ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.hidden = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    currentLabel.textContent = String(currentIndex + 1);
  }

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showSlide(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showSlide(currentIndex + 1);
    }
  });

  showSlide(0);
});
