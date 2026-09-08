const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyUH0IwXHI_JMuJ4y73UR6uk-atDDf5V-kaq-Xeq2TJ_UVgePeg8VoGIfUM_A6KBtZnCA/exec"; // tu URL real

const saludo = document.getElementById("saludo");
const resultadoEl = document.getElementById("resultado");
const boton = document.getElementById("girar");

const params = new URLSearchParams(window.location.search);
const persona = params.get("persona");

if (persona) {
  saludo.innerHTML = `Hola, <span class="nombre">${persona}</span> 👋`;
} else {
  saludo.textContent = "Link inválido";
  document.getElementById("mensaje").textContent =
    "Pídele el link correcto a quien organizó el sorteo";
  boton.disabled = true;
}

if (boton) {
  boton.addEventListener("click", async function () {
    if (!persona) return;

    boton.textContent = "Buscando...";
    boton.disabled = true;

    try {
      const res = await fetch(
        `${APPS_SCRIPT_URL}?persona=${encodeURIComponent(persona)}`,
      );
      const data = await res.json();

      if (data.error) {
        resultadoEl.textContent = "No encontramos tu nombre, revisa el link 😬";
        boton.textContent = "Ver amigo secreto →";
        boton.disabled = false;
        return;
      }

      resultadoEl.textContent = "🎉 Tu amigo secreto es: " + data.resultado;
      boton.style.display = "none";
    } catch (err) {
      resultadoEl.textContent = "Hubo un error, intenta de nuevo";
      boton.textContent = "Ver amigo secreto →";
      boton.disabled = false;
    }
  });
}
