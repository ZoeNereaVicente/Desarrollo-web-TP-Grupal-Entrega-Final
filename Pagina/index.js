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