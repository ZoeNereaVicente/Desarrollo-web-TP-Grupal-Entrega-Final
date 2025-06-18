document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  toggleButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
  });
});

document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.body.classList.toggle("menu-open");
});

document.querySelector(".navbar").addEventListener("click", function () {
  document.querySelector("footer").style.marginTop = "60px";
});

function toggleCarrito() {
  const panel = document.getElementById("carrito-panel");
  panel.classList.toggle("oculto");
}

const btnBuscar = document.getElementById('buscar-precios');
  if (btnBuscar) {
    btnBuscar.addEventListener('click', () => {
      const adultos = parseInt(document.getElementById('adultos').value);
      const ninos = parseInt(document.getElementById('ninos').value);
      if (isNaN(adultos) || adultos < 1 || adultos > 8) {
        alert("Seleccioná entre 1 y 8 adultos.");
        return;
      }
      if (isNaN(ninos) || ninos < 1 || ninos > 10) {
        alert("Seleccioná entre 1 y 10 menores.");
        return;
      }
      window.location.href = "Tickets.html";
    });
  }