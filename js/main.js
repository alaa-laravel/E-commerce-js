
class ScrollToTop {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.toggleButton());
    this.button.addEventListener("click", () => this.scrollToTop());
  }

  toggleButton() {
    if (window.scrollY > 300) {
      this.button.classList.add("show");
    } else {
      this.button.classList.remove("show");
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTop = new ScrollToTop("scroll-to-top");
});
