// ===== CART DATA (LocalStorage) =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart (with quantity)
function addToCart(name, price) {
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  alert(name + " added to cart!");
}

// Increase quantity
function increaseQty(name) {
  let item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
    saveCart();
    showCart();
  }
}

// Decrease quantity
function decreaseQty(name) {
  let item = cart.find(i => i.name === name);
  if (item) {
    item.qty -= 1;

    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }

    saveCart();
    showCart();
  }
}

// Remove item completely
function removeItem(name) {
  cart = cart.filter(i => i.name !== name);
  saveCart();
  showCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  showCart();
}

// ===== SHOW CART =====
function showCart() {
  let cartItems = document.getElementById("cartItems");
  let totalBox = document.getElementById("total");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty 😢</li>";
    totalBox.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    let li = document.createElement("li");

    let itemTotal = item.price * item.qty;
    total += itemTotal;

    li.innerHTML = `
      <span>
        <b>${item.name}</b> <br>
        ₹${item.price} × ${item.qty} = <b>₹${itemTotal}</b>
      </span>

      <span>
        <button onclick="decreaseQty('${item.name}')">-</button>
        <button onclick="increaseQty('${item.name}')">+</button>
        <button onclick="removeItem('${item.name}')">Remove</button>
      </span>
    `;

    cartItems.appendChild(li);
  });

  let gst = Math.round(total * 0.18);
  let grandTotal = total + gst;

  totalBox.innerHTML = `
    Subtotal: ₹${total} <br>
    GST (18%): ₹${gst} <br>
    <b>Grand Total: ₹${grandTotal}</b>
    <br><br>
    <button onclick="clearCart()">Clear Cart</button>
  `;
}
