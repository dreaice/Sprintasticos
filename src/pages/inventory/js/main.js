// js/main.js
class Articulo {
    constructor(folio, titulo, descripcion, categoria, materiales, precio, stock, imagenes) {
      this.folio = folio;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.categoria = categoria;
      this.materiales = materiales;
      this.precio = precio;
      this.stock = stock; // Array de variantes {talla, color, cantidad}
      this.imagenes = imagenes; // Array de nombres de archivos
    }
  }
  
  class Alerta {
    constructor(contenedorId) {
      this.contenedor = document.getElementById(contenedorId);
      this.timeoutId = null;
    }
  
    mostrar(mensaje, tipo = 'danger', duracionMs = 4000) {
      if(this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.contenedor.innerHTML = '';
      }
      this.contenedor.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
          ${mensaje}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
      `;
      this.timeoutId = setTimeout(() => {
        this.contenedor.innerHTML = '';
        this.timeoutId = null;
      }, duracionMs);
    }
  
    limpiar() {
      if(this.timeoutId) clearTimeout(this.timeoutId);
      this.contenedor.innerHTML = '';
    }
  }
  
  class FormularioArticulo {
    constructor() {
      this.folio = this.generarFolioNumerico();
      this.stock = [];
      this.imagenesArray = [];
  
      // Referencias a elementos DOM
      this.formulario = document.getElementById('formulario-articulo');
      this.tituloInput = document.getElementById('titulo');
      this.descripcionInput = document.getElementById('descripcion');
      this.categoriaSelect = document.getElementById('categoria');
      this.materialesSelect = document.getElementById('materiales');
      this.precioInput = document.getElementById('precio');
      this.imagenesInput = document.getElementById('imagenes');
      this.tallaSelect = document.getElementById('talla');
      this.colorSelect = document.getElementById('color');
      this.cantidadInput = document.getElementById('cantidad');
      this.btnAgregarStock = document.getElementById('btn-agregar-stock');
      this.listaStock = document.getElementById('lista-stock');
      this.btnVistaPrevia = document.getElementById('btn-vista-previa');
      this.alerta = new Alerta('alerta-container');
  
      this.modalVistaPrevia = new bootstrap.Modal(document.getElementById('modalVistaPrevia'));
      this.contenidoVistaPrevia = document.getElementById('contenido-vista-previa');
      this.btnEditar = document.getElementById('btn-editar');
      this.btnConfirmar = document.getElementById('btn-confirmar');
  
      this.agregarEventos();
    }
  
    generarFolioNumerico() {
      return Math.floor(100000 + Math.random() * 900000);
    }
  
    agregarEventos() {
      this.btnAgregarStock.addEventListener('click', () => this.agregarStock());
      this.imagenesInput.addEventListener('change', () => this.capturarImagenes());
      this.btnVistaPrevia.addEventListener('click', () => this.mostrarVistaPrevia());
      this.btnEditar.addEventListener('click', () => this.modalVistaPrevia.hide());
      this.btnConfirmar.addEventListener('click', () => this.confirmarArticulo());
    }
  
    mostrarAlerta(mensaje, tipo = 'danger') {
      this.alerta.mostrar(mensaje, tipo);
    }
  
    validarFormulario() {
      this.alerta.limpiar();
  
      if (!this.tituloInput.value.trim()) {
        this.mostrarAlerta('El título es obligatorio.');
        return false;
      }
      if (!this.descripcionInput.value.trim()) {
        this.mostrarAlerta('La descripción es obligatoria.');
        return false;
      }
      if (!this.categoriaSelect.value) {
        this.mostrarAlerta('Selecciona una categoría.');
        return false;
      }
      if (!this.materialesSelect.selectedOptions.length) {
        this.mostrarAlerta('Selecciona al menos un material.');
        return false;
      }
      if (!this.precioInput.value || Number(this.precioInput.value) < 0) {
        this.mostrarAlerta('Introduce un precio válido.');
        return false;
      }
      if (!this.imagenesInput.files.length) {
        this.mostrarAlerta('Selecciona al menos una imagen.');
        return false;
      }
      if (!this.stock.length) {
        this.mostrarAlerta('Agrega al menos una variante con stock.');
        return false;
      }
      return true;
    }
  
    agregarStock() {
      this.alerta.limpiar();
  
      const talla = this.tallaSelect.value;
      const color = this.colorSelect.value;
      const cantidad = parseInt(this.cantidadInput.value);
  
      if (!talla) {
        this.mostrarAlerta('Selecciona una talla para el stock.');
        return;
      }
      if (!color) {
        this.mostrarAlerta('Selecciona un color para el stock.');
        return;
      }
      if (!cantidad || cantidad < 1) {
        this.mostrarAlerta('Introduce una cantidad válida para el stock.');
        return;
      }
  
      // Actualizar cantidad si la variante existe
      const idx = this.stock.findIndex(s => s.talla === talla && s.color === color);
      if (idx >= 0) {
        this.stock[idx].cantidad = cantidad;
      } else {
        this.stock.push({ talla, color, cantidad });
      }
  
      this.actualizarListaStock();
    }
  
    actualizarListaStock() {
      this.listaStock.innerHTML = '';
      this.stock.forEach(({ talla, color, cantidad }, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          Talla: <strong>${talla}</strong>, Color: <strong>${color}</strong>, Cantidad: <strong>${cantidad}</strong>
          <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}" title="Eliminar variante"><i class="bi bi-trash"></i></button>
        `;
        this.listaStock.appendChild(li);
      });
  
      // Eventos eliminar variantes
      this.listaStock.querySelectorAll('.btn-eliminar').forEach(btn =>
        btn.addEventListener('click', e => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'));
          this.stock.splice(idx, 1);
          this.actualizarListaStock();
        })
      );
    }
  
    capturarImagenes() {
      this.imagenesArray = Array.from(this.imagenesInput.files);
    }
  
    crearObjetoArticulo() {
      return new Articulo(
        this.folio,
        this.tituloInput.value.trim(),
        this.descripcionInput.value.trim(),
        this.categoriaSelect.value,
        Array.from(this.materialesSelect.selectedOptions).map(opt => opt.value),
        Number(this.precioInput.value),
        this.stock,
        this.imagenesArray.map(file => file.name)
      );
    }
  
    mostrarVistaPrevia() {
      if (!this.validarFormulario()) return;
  
      const articulo = this.crearObjetoArticulo();
  
      let html = `
        <p><strong>Folio:</strong> ${articulo.folio}</p>
        <p><strong>Título:</strong> ${articulo.titulo}</p>
        <p><strong>Descripción:</strong> ${articulo.descripcion}</p>
        <p><strong>Categoría:</strong> ${articulo.categoria}</p>
        <p><strong>Materiales:</strong> ${articulo.materiales.join(', ')}</p>
        <p><strong>Precio fijo:</strong> $${articulo.precio.toFixed(2)} MXN</p>
        <p><strong>Stock:</strong></p>
        <ul>
          ${articulo.stock.map(s => `<li>Talla: ${s.talla}, Color: ${s.color}, Cantidad: ${s.cantidad}</li>`).join('')}
        </ul>
        <p><strong>Imágenes:</strong></p>
        <div class="d-flex flex-wrap gap-2">
          ${this.imagenesArray.map(file =>
            `<img src="${URL.createObjectURL(file)}" alt="${file.name}" class="img-thumbnail" style="max-width: 120px; max-height: 120px;" />`
          ).join('')}
        </div>
      `;
  
      this.contenidoVistaPrevia.innerHTML = html;
      this.modalVistaPrevia.show();
    }
  
    confirmarArticulo() {
      const articulo = this.crearObjetoArticulo();
  
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articulo, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", `articulo_${articulo.folio}.json`);
      document.body.appendChild(dlAnchorElem);
      dlAnchorElem.click();
      dlAnchorElem.remove();
  
      this.modalVistaPrevia.hide();
  
      this.resetFormulario();
    }
  
    resetFormulario() {
      this.formulario.reset();
      this.stock = [];
      this.imagenesArray = [];
      this.actualizarListaStock();
      this.folio = this.generarFolioNumerico();
      this.alerta.limpiar();
    }
  }
  
  // Inicializar formulario al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    new FormularioArticulo();
  });
  