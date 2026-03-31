let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCounter() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.querySelector('.cart-counter');
  if (counter) counter.textContent = total;
}

// ========================================
// Button "Add to cart"
// ========================================
function initAddToCart() {
  document.querySelectorAll('.btn-catalog, .btn-primary[data-id]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const col = this.closest('.col-4') 
               || this.closest('.detail-container') 
               || this.parentElement;
      const select = col.querySelector('.size-select');
      const size = select.value;

      if (!size) {
        alert('Please choose a size!');
        return;
      }

      const product = {
        id:    this.dataset.id,
        name:  this.dataset.name,
        price: parseFloat(this.dataset.price),
        image: this.dataset.image,
        size:  size
      };

      const existing = cart.find(
        item => item.id === product.id && item.size === product.size
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      saveCart();
      updateCartCounter();
      alert(`✓ ${product.name} (${size}) added to cart!`);
    });
  });
}

function renderTotal() {
  const el = document.querySelector('.cart-total');
  if (!el) return;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  el.textContent = `Total: ${total.toFixed(2)} €`;
}

function attachEvents() {
  document.querySelectorAll('.cart-item').forEach(el => {
    const id   = el.dataset.id;
    const size = el.dataset.size;

    el.querySelector('.plus-btn').addEventListener('click', () => {
      cart.find(i => i.id === id && i.size === size).quantity += 1;
      saveCart();
      renderCart();
    });

    el.querySelector('.minus-btn').addEventListener('click', () => {
      const item = cart.find(i => i.id === id && i.size === size);
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.id === id && i.size === size));
      }
      saveCart();
      renderCart();
    });

    el.querySelector('.remove-btn').addEventListener('click', () => {
      cart = cart.filter(i => !(i.id === id && i.size === size));
      saveCart();
      renderCart();
    });
  });
}

function renderCart() {
  const container = document.querySelector('.cart-items');
  if (!container) return; 

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty</p>';
    const total = document.querySelector('.cart-total');
    if (total) total.textContent = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
      <img src="${item.image}" alt="${item.name}" width="80">
      <div>
        <p><strong>${item.name}</strong></p>
        <p>Size: ${item.size}</p>
        <p>${item.price} €</p>
      </div>
      <div>
        <button class="minus-btn">−</button>
        <span>${item.quantity}</span>
        <button class="plus-btn">+</button>
      </div>
      <p><strong>${(item.price * item.quantity).toFixed(2)} €</strong></p>
      <button class="remove-btn">✕</button>
    </div>
  `).join('');

  renderTotal();
  updateCartCounter();
  attachEvents();
}

// Button "Clear cart"
const clearBtn = document.querySelector('.clear-cart-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCart();
    updateCartCounter();
  });
}


updateCartCounter();  
initAddToCart();      
renderCart(); 