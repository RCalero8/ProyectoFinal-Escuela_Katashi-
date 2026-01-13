const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const links = document.querySelectorAll("#header_list a");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
  burger.classList.toggle("active");
});

// Cerrar menú al pulsar un enlace (solo móvil)
links.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    burger.classList.remove("active");
  });
});
