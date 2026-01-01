let render;

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("cart-content");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  render = function () {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      const emptyTemplate = document.getElementById("cart-empty-template");
      contentDiv.innerHTML = "";
      contentDiv.appendChild(emptyTemplate.content.cloneNode(true));
      return;
    }

    const subtotal = cart.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.qty,
      0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const containerTemplate = document.getElementById(
      "cart-container-template"
    );
    contentDiv.innerHTML = "";
    contentDiv.appendChild(containerTemplate.content.cloneNode(true));

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;

    const list = document.getElementById("cart-items-list");
    const itemTemplate = document.getElementById("cart-item-template");

    cart.forEach((cartItem, itemIndex) => {
      const itemElement = itemTemplate.content.cloneNode(true);

      itemElement.querySelector(".cart-item-image").src = cartItem.image;
      itemElement.querySelector(".cart-item-image").alt = cartItem.title;
      itemElement.querySelector(".item-title").textContent = cartItem.title;
      itemElement.querySelector(
        ".item-price"
      ).textContent = `$${cartItem.price.toFixed(2)}`;
      itemElement.querySelector(".subtotal-text").textContent = `Subtotal: $${(
        cartItem.price * cartItem.qty
      ).toFixed(2)}`;
      itemElement.querySelector(".qty-display").textContent = cartItem.qty;

      const decreaseQuantityButton = itemElement.querySelector(".qty-decrease");
      const increaseQuantityButton = itemElement.querySelector(".qty-increase");
      const removeItemButton = itemElement.querySelector(".remove-btn");

      decreaseQuantityButton.onclick = () => updateQty(itemIndex, -1);
      increaseQuantityButton.onclick = () => updateQty(itemIndex, 1);
      removeItemButton.onclick = () => removeItem(itemIndex);

      list.appendChild(itemElement);
    });

    document.querySelector(".checkout-btn").onclick = () => {
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Thank you for your purchase!",
        confirmButtonText: "Continue Shopping",
      }).then(() => {
        localStorage.setItem("cart", JSON.stringify([]));
        updateCartCount();
        window.location.href = "index.html";
      });
    };
  };

  render();

  const scrollToTopButton = document.getElementById("scroll-to-top");
  window.addEventListener("scroll", () => {
    scrollToTopButton.classList.toggle("show", window.scrollY > 300);
  });
  scrollToTopButton.onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function updateQty(itemIndex, quantityChange) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[itemIndex].qty + quantityChange > 0) {
    cart[itemIndex].qty += quantityChange;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    render();
    Swal.fire({
      icon: "info",
      title: "Quantity Updated",
      text: `Quantity changed to ${cart[itemIndex].qty}`,
      timer: 1000,
      showConfirmButton: false,
    });
  }
}

function removeItem(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const removedItemTitle = cart[itemIndex].title;
  cart.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  render();
  Swal.fire({
    icon: "warning",
    title: "Item Removed",
    text: `${removedItemTitle} has been removed from your cart`,
    timer: 1500,
    showConfirmButton: false,
  });
}
