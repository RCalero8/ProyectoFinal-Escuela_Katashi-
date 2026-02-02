document.addEventListener("DOMContentLoaded", () => {
    //Pagina Conocenos
    const conocenosLink = document.getElementById("conocenos");
    conocenosLink.style.color = "white";
    //Boton Leer Mas
    const btnLeer = document.getElementById("btn_leer_historia");
    const extras = document.querySelectorAll(".extra");
    btnLeer.addEventListener("click", () => {
        const hidden = Array.from(extras).some(p => p.style.display === "none");
        extras.forEach(p => {
            p.style.display = hidden ? "block" : "none";
        });
        btnLeer.textContent = hidden ? "Leer resumen historia" : "Leer historia completa";
    });

});