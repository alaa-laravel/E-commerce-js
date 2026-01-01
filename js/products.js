const PRODUCTS_API_URL = "https://fakestoreapi.com/products";
class ProductsManager {
  constructor() {
    this.products = [];
    this.grid = document.getElementById("products-grid");
  }
  async fetch() {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      this.products = await response.json();
      this.display();
    } catch (error) {
      this.grid.innerHTML = '<p class="error-load">Error loading products</p>';
    }
  }
  display() {
    this.grid.innerHTML = "";
    this.products.forEach((product) => {
      const template = document.getElementById("product-card-template");
      const productCardElement = template.content.cloneNode(true);

      productCardElement.querySelector(".product-image").src = product.image;
      productCardElement.querySelector(".product-image").alt = product.title;
      productCardElement.querySelector(".product-title").textContent =
        product.title;
      productCardElement.querySelector(
        ".product-price"
      ).textContent = `$${product.price.toFixed(2)}`;

      const viewDetailsButton =
        productCardElement.querySelector(".btn-details");
      const addToCartButton = productCardElement.querySelector(".btn-add-cart");

      viewDetailsButton.onclick = () => goToDetails(product.id);
      addToCartButton.onclick = () =>
        addToCart(product.id, product.title, product.price, product.image);

      this.grid.appendChild(productCardElement);
    });
  }
}

function goToDetails(id) {
  sessionStorage.setItem("selectedProductId", id);
  window.location.href = "product-detail.html";
}

function addToCart(id, title, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, title, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  Swal.fire({
    icon: "success",
    title: "Added to Cart",
    text: `${title} has been added to your cart!`,
    timer: 1500,
    showConfirmButton: false,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    const productsManager = new ProductsManager();
    productsManager.fetch();
  });
} else {
  const productsManager = new ProductsManager();
  productsManager.fetch();
}
