const fs = require('fs'); 
const path = './data/joyas.json';  


let joyas = [];

// Cargar datos desde el archivo JSON
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.log('Error al leer el archivo JSON:', err);
        return;
    }

    joyas = JSON.parse(data);  
    // console.log(joyas); 
    mostrarJoyasJSON(joyas);

    
    agregarJoya('Anillo de rubí', 'https://example.com/nuevaJoya.jpg', 'Anillo con rubí y diamantes', 18000, true);
    modificarJoya('Anillo abrazo amatista', 16000, true);
    eliminarJoya('Reloj de lujo con diamantes');
    mostrarJoyasJSON(joyas); 
});

// Función para mostrar las joyas en formato JSON
function mostrarJoyasJSON(joyas) {
    console.log(JSON.stringify(joyas, null, 2));
}

// Función para agregar una nueva joya
function agregarJoya(nombre, img, descripcion, precio, disponible) {
    const nuevaJoya = {
        name: nombre,
        img: img,
        description: descripcion,
        price: precio,
        available: disponible
    };
    joyas.push(nuevaJoya);
}

// Función para modificar una joya existente
function modificarJoya(nombre, nuevoPrecio, nuevaDisponibilidad) {
    const joya = joyas.find(joya => joya.name === nombre);
    if (joya) {
        joya.price = nuevoPrecio;
        joya.available = nuevaDisponibilidad;
    } else {
        console.log("Joya no encontrada");
    }
}

// Función para eliminar una joya
function eliminarJoya(nombre) {
    joyas = joyas.filter(joya => joya.name !== nombre);
}