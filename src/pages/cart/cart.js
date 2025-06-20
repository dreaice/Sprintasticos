// cart.js – Manejo global del carrito de compras
// Requiere que los botones "Agregar al carrito" tengan la clase .add-to-cart y los atributos
// data-id, data-name, data-price, data-img.
// Debe existir un <span id="cart-badge"> junto al ícono del carrito.

(() => {
    const STORAGE_KEY = 'cart';
    let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    /* Utilidades */
    const $ = (sel) => document.querySelector(sel);
  
    const cartTableBody = $('#tabla-productos');
    const subtotalCell = $('#subtotal');
    const totalCell = $('#total');
  
    /* Persistencia */
    const saveCart = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    const formatMoney = (n) => `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
  
    /* ===== Operaciones ===== */
    const addToCart = (item) => {
      const existing = cart.find((p) => p.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        cart.push({ ...item, quantity: item.quantity || 1 });
      }
      saveCart();
      renderCart();
    };
  
    const changeQty = (id, delta) => {
      const prod = cart.find((p) => p.id === id);
      if (!prod) return;
      prod.quantity += delta;
      if (prod.quantity <= 0) cart = cart.filter((p) => p.id !== id);
      saveCart();
      renderCart();
    };
  
    /* ===== Render ===== */
    const renderCart = () => {
      // Si estamos en la página del carrito
      if (cartTableBody) {
        cartTableBody.innerHTML = '';
        cart.forEach((item) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><img src="${item.img}" alt="${item.name}" width="50"></td>
            <td>
              ${item.name}
              <div class="d-flex align-items-center gap-2 mt-2">
                <button class="btn btn-sm btn-primary decrement-btn" data-id="${item.id}">-</button>
                <span class="fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-primary increment-btn" data-id="${item.id}">+</button>
              </div>
            </td>
            <td class="text-end">${formatMoney(item.price * item.quantity)}</td>
          `;
          cartTableBody.appendChild(row);
        });
  
        const subtotal = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        if (subtotalCell) subtotalCell.textContent = formatMoney(subtotal);
  
        const shipping = 0; // Sustituir con el cálculo real de envío si aplica
        if (totalCell) totalCell.textContent = formatMoney(subtotal + shipping);
      }
  
      updateCartBadge();
    };
  
    const updateCartBadge = () => {
      const badge = $('#cart-badge');
      if (!badge) return;
      const totalQty = cart.reduce((acc, cur) => acc + cur.quantity, 0);
      if (totalQty === 0) {
        badge.classList.add('d-none');
      } else {
        badge.classList.remove('d-none');
        badge.textContent = totalQty > 9 ? '+9' : totalQty;
      }
    };
  
    /* ===== Listeners globales ===== */
    // Agregar al carrito en cualquier página
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart');
      if (!btn) return;
      e.preventDefault();
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        img: btn.dataset.img,
        quantity: 1,
      });
    });
  
    // Incrementar / decrementar dentro de la tabla del carrito
    if (cartTableBody) {
      cartTableBody.addEventListener('click', (e) => {
        if (e.target.matches('.increment-btn')) changeQty(e.target.dataset.id, 1);
        if (e.target.matches('.decrement-btn')) changeQty(e.target.dataset.id, -1);
      });
    }
  
    /* Inicialización */
    document.addEventListener('DOMContentLoaded', renderCart);
    // Para páginas sin tabla, actualiza badge inmediatamente
    renderCart();
  })();
  