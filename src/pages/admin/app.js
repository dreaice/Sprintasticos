const productosArray = [];

// Función para agregar producto
function agregarProducto() {
  const name = document.getElementById("nombre").value.trim();
  const description = document.getElementById("descripcion").value.trim();
  const price = parseFloat(document.getElementById("precio").value.trim());
  const material = document.getElementById("material").value.trim();
  const image_url = document.getElementById("imgUrl").value.trim();
  const stock = parseInt(document.getElementById("stock").value.trim());
  const categoryId = parseInt(document.getElementById("category").value.trim());
  const stoneId = parseInt(document.getElementById("stone").value.trim());

  if (!name || !description || !price || !stock || !categoryId || !stoneId) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const producto = {
    name,
    description,
    price,
    material,
    image_url,
    stock,
    category: {
      id_category: categoryId
    },
    stone: {
      id_stone: stoneId
    }
  };

  productosArray.push(producto);
  console.log(JSON.stringify(productosArray, null, 2));


  addProducto(producto);
  limpiarFormulario();
  alert("¡Producto agregado correctamente!");
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("material").value = "";
  document.getElementById("imgUrl").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
  document.getElementById("stone").value = "";
}

function addProducto(producto) {
  fetch("http://localhost:8081/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al guardar en bd (8081)");
      }
      return response.json(); // ✅ leer el objeto con ID
    })
    .then(data => {
      console.log("data", data);
      producto.id = data.id_jewelry; // asignar ID devuelto por backend
      productosArray.push(producto); // agregar al array
      mostrarProducto(producto);     // mostrar en pantalla con ID válido
    })
    .catch(error => {
      console.error(error);
      alert("Error al guardar el producto");
    });
}

// Función para mostrar un producto en el contenedor
function mostrarProducto(producto) {
  console.log("mostrarProducto", producto.id);
  const contenedor = document.getElementById("productos");

  const productoCard = document.createElement("div");
  productoCard.className = "producto card";
  productoCard.setAttribute("data-id", producto.id);
  productoCard.innerHTML = `
    <div class="producto-header">
      <strong>${producto.name}</strong>
      <span>${producto.image_url ? `<img src='${producto.image_url}' alt="img" width="40">` : 'Sin imagen'}</span>
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


// Función para borrar todos los productos
function borrarTodo() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productosArray.length = 0;
  alert("Todos los productos han sido eliminados.");
}

// Función para cargar los productos desde el JSON y mostrar en la página
function cargarProductos() {
  fetch('http://localhost:8081/api/productos')
    .then(response => response.json())
    .then(data => {
      data.forEach(producto => {
        producto.id = producto.id_jewelry;
        productosArray.push(producto);
        mostrarProducto(producto);
      });
    })
    .catch(error => console.log('Error al cargar los productos:', error));
}
function modificarProducto(button) {
  const productoCard = button.closest('.producto');
  const id = productoCard.getAttribute("data-id");

  if (!id) {
    alert("ID de producto no encontrado.");
    return;
  }


  // Simulación: mostrar datos en formulario (aquí puedes mejorar más)
  const name = prompt("Nuevo nombre:");
  const description = prompt("Nueva descripción:");
  const price = prompt("Nuevo precio:");
  const material = prompt("Nuevo material:");
  const image_url = prompt("Nueva imagen:");
  const stock = prompt("Nuevo stock:");
  const categoryId = prompt("Nueva categoría:");
  const stoneId = prompt("Nueva piedra:");
  if (!name || !price) return;

  const updatedProducto = {
    id: parseInt(id),
    name: name,
    description: description,
    price: parseFloat(price),
    material: material,
    image_url: image_url,
    stock: stock,
    category: { id_category: categoryId },
    stone: { id_stone: stoneId }
  };



  fetch(`http://localhost:8081/api/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProducto)
  })
    .then(response => {
      if (response.ok) {
        alert("Producto modificado correctamente");
        location.reload(); // o vuelve a renderizar el producto
      } else {
        alert("Error al modificar producto");
      }
    })
    .catch(error => {
      console.error("Error en PUT:", error);
    });
}

function eliminarProducto(button) {
  const productoCard = button.closest('.producto');
  const id = productoCard.getAttribute("data-id"); // 👈 obtener ID

  if (!id) {
    alert("ID de producto no encontrado.");
    return;
  }

  fetch(`http://localhost:8081/api/productos/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        productoCard.remove(); // eliminar de la vista
        alert("Producto eliminado correctamente");
      } else {
        alert("Error al eliminar el producto");
      }
    })
    .catch(error => {
      console.error("Error en la solicitud DELETE:", error);
    });
}

// Cargar los productos al cargar la página
window.onload = cargarProductos;
