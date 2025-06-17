let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

const hoy = new Date();
hoy.setHours(0, 0, 0, 0); // Ignorar la hora en la comparación

function obtenerPrecioBase(mes) {
  const mesesVerano = [5, 6, 7]; // Junio, Julio, Agosto
  const precioBase = 119.46;
  return mesesVerano.includes(mes)
    ? (precioBase * 1.3).toFixed(2)
    : precioBase.toFixed(2);
}

function generarCalendario(mes, anio) {
  const calendario = document.getElementById("calendario");
  const nombreMes = document.getElementById("mes-actual");

  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);
  const diasMes = ultimoDia.getDate();

  let diaInicio = primerDia.getDay(); // 0 (Dom) a 6 (Sáb)
  diaInicio = (diaInicio + 6) % 7; // Ajuste para que lunes sea 0, domingo 6

  nombreMes.textContent = `${nombresMeses[mes]} ${anio}`;
  calendario.innerHTML = "";

  // Espacios vacíos antes del primer día
  for (let i = 0; i < diaInicio; i++) {
    calendario.innerHTML += "<div></div>";
  }

  const precioPorDia = obtenerPrecioBase(mes);

  for (let dia = 1; dia <= diasMes; dia++) {
    const fecha = new Date(anio, mes, dia);
    fecha.setHours(0, 0, 0, 0);

    let clase = "";
    let contenido = "";

    if (fecha < hoy) {
      clase = "pasado";
      contenido = `${dia}`;
    } else {
      clase = "activo";
      contenido = `${dia}<br>$${precioPorDia}`;
    }

    calendario.innerHTML += `<div class="${clase}">${contenido}</div>`;
  }
}

// Botones de navegación
document.getElementById("btn-anterior").addEventListener("click", () => {
  mesActual--;
  if (mesActual < 0) {
    mesActual = 11;
    anioActual--;
  }
  generarCalendario(mesActual, anioActual);
});

document.getElementById("btn-siguiente").addEventListener("click", () => {
  mesActual++;
  if (mesActual > 11) {
    mesActual = 0;
    anioActual++;
  }
  generarCalendario(mesActual, anioActual);
});

// Generar calendario inicial
generarCalendario(mesActual, anioActual);