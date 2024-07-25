// Elementos del DOM
const formUser = document.getElementById("formUser");
const txtuser = document.getElementById("textusuario");
const txtnombre = document.getElementById("textnombre");
const txtimagen = document.getElementById("textimagen");
const txtmascota = document.getElementById("textmascota");

const table = document.getElementById("table");
const list = document.getElementById("mascotas");

let usuarios = [];

class Usuario {
    constructor(usuario, nombre, imagen, mascota) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.imagen = imagen;
        this.mascotas = [mascota];
    }

    agregarATabla() {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${this.usuario}</td>
            <td>${this.nombre}</td>
            <td><a href="${this.imagen}" target="_blank">${this.imagen}</a></td>
            <td><button class="ver-tabla" data-usuario="${this.usuario}">Ver Tabla</button></td>
        `;
        table.appendChild(fila);
    }

    agregarALista(mascota) {
        let elementoLista = document.createElement("li");
        elementoLista.innerHTML = `<span>${mascota}</span>`;
        list.appendChild(elementoLista);
    }

    agregarMascota(mascota) {
        if (!this.mascotas.includes(mascota)) {
            this.mascotas.push(mascota);
            this.mostrarMascotas();
        } else {
            alert("Esta mascota ya está registrada para este usuario.");
        }
    }

    mostrarMascotas() {
        list.innerHTML = '';
        this.mascotas.forEach(mascota => {
            this.agregarALista(mascota);
        });
    }

}
function revisarPunto(usuario) {
    return usuario.includes('.');
}

function mascotadistinta(usuarioExistente, mascota) {
    return !usuarioExistente.mascotas.includes(mascota);
}
window.onload = () => {
formUser.addEventListener("submit", (event) => {
    event.preventDefault();
    let usuario = txtuser.value;
    let nombre = txtnombre.value;
    let imagen = txtimagen.value;
    let mascota = txtmascota.value;

    if (revisarPunto(usuario)) {
        let usuarioExistente = usuarios.find(user => user.usuario === usuario);
        if (usuarioExistente) {
            if (mascotadistinta(usuarioExistente, mascota)) {
                usuarioExistente.agregarMascota(mascota);
            } else {
                alert("El usuario ya tiene esta mascota registrada.");
            }
        } else {
            let nuevoUsuario = new Usuario(usuario, nombre, imagen, mascota);
            nuevoUsuario.agregarATabla();
            usuarios.push(nuevoUsuario);
        }
    } else {
        alert("El usuario debe tener mínimo un '.'");
    }
});

table.addEventListener("click", (event) => {
        const usuarioId = event.target.dataset.usuario;
        const usuario = usuarios.find(user => user.usuario === usuarioId);
        if (usuario) {
            usuario.mostrarMascotas();
        }
});

}