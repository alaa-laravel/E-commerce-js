// Product details page

const API_URL = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", async () => {
  const detailDiv = document.getElementById("product-detail");
  const productId = sessionStorage.getItem("selectedProductId");

  if (!productId) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`);
    const productData = await response.json();
    let selectedQuantity = 1;

    const template = document.getElementById("product-detail-template");
    const detailElement = template.content.cloneNode(true);

    detailElement.querySelector(".product-detail-image").src =
      productData.image;
    detailElement.querySelector(".product-detail-image").alt =
      productData.title;
    detailElement.querySelector(".detail-title").textContent =
      productData.title;
    detailElement.querySelector(".product-category").textContent =
      productData.category;
    detailElement.querySelector(
      ".product-detail-price"
    ).textContent = `$${productData.price.toFixed(2)}`;
    detailElement.querySelector(".product-description").textContent =
      productData.description;

    detailDiv.appendChild(detailElement);

    const quantityInput = document.getElementById("quantity");
    document.getElementById("decrease-qty").onclick = () => {
      selectedQuantity = Math.max(1, selectedQuantity - 1);
      quantityInput.value = selectedQuantity;
    };
    document.getElementById("increase-qty").onclick = () => {
      selectedQuantity++;
      quantityInput.value = selectedQuantity;
    };
    quantityInput.onchange = () => {
      selectedQuantity = Math.max(1, parseInt(quantityInput.value) || 1);
      quantityInput.value = selectedQuantity;
    };

    document.getElementById("add-to-cart-btn").onclick = () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItem = cart.find((i) => i.id === productData.id);

      if (existingCartItem) {
        existingCartItem.qty += selectedQuantity;
      } else {
        cart.push({
          id: productData.id,
          title: productData.title,
          price: productData.price,
          image: productData.image,
          qty: selectedQuantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${selectedQuantity} item(s) added successfully!`,
        timer: 1500,
        showConfirmButton: false,
      });
      selectedQuantity = 1;
      quantityInput.value = 1;
    };
  } catch (error) {
    detailDiv.innerHTML = "<p>Error loading product details</p>";
  }

  // Scroll to top button
  const scrollToTopButton = document.getElementById("scroll-to-top");
  window.addEventListener("scroll", () => {
    scrollToTopButton.classList.toggle("show", window.scrollY > 300);
  });
  scrollToTopButton.onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
});
