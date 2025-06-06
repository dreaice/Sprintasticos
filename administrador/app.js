const productosArray = [];

// Función para agregar producto
function agregarProducto() {
  const name = document.getElementById("nombre").value.trim(); 
  const description = document.getElementById("descripcion").value.trim();
  const price = document.getElementById("precio").value.trim();
  const imgUrl = document.getElementById("imgUrl").value.trim();

  if (!name || !description || !price) {
    alert("Por favor completa todos los campos.");
    return;
  };

  const nuevoProducto = {
    name,
    description,
    price,
    imgUrl
  };
  productosArray.push(nuevoProducto);
  
  console.log(JSON.stringify(productosArray, null, 2));
  mostrarProducto(nuevoProducto);
  
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imgUrl").value = "";

  alert("¡Producto agregado correctamente!");
}


// Función para mostrar un producto en el contenedor
function mostrarProducto(producto) {
  const contenedor = document.getElementById("productos");

  const productoCard = document.createElement("div");
  productoCard.className = "producto card";

  productoCard.innerHTML = `
    <div class="producto-header">
      <strong>${producto.name}</strong>
      <span>${producto.imgUrl ? `<img src='${producto.imgUrl}' alt="img" width="40">` : 'Sin imagen'}</span>
    </div>
    <div class="producto-info">
      <p>${producto.description}</p>
      <p><strong>PRECIO:</strong> $${producto.price}</p>
    </div>
    <div class="botones">
      <button class="modificar" onclick="modificarProducto(this)">✏️</button>
      <button class="eliminar" onclick="eliminarProducto(this)">🗑️</button>
    </div>`;

  contenedor.appendChild(productoCard);
}

// Función para modificar producto
function modificarProducto(button) {
  const productoCard = button.closest('.producto');
}

// Función para eliminar producto
function eliminarProducto(button) {
  const productoCard = button.closest('.producto');
  productoCard.remove();
}

// Función para cargar los productos desde el JSON y mostrar en la página
function cargarProductos() {
  fetch('./data/joyas.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(producto => {
        productosArray.push(producto);
        mostrarProducto(producto);
      });
    })
    .catch(error => console.log('Error al cargar los productos:', error));
}

// Cargar los productos al cargar la página
window.onload = cargarProductos;
