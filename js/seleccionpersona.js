const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyUH0IwXHI_JMuJ4y73UR6uk-atDDf5V-kaq-Xeq2TJ_UVgePeg8VoGIfUM_A6KBtZnCA/exec"; // tu URL real

const amigoSecreto = document.getElementById("amigosecreto");
const params = new URLSearchParams(window.location.search);
const persona = params.get("persona");

if (persona) {
  amigoSecreto.textContent = `Hola ${persona} 👋 Presiona el botón para ver tu amigo secreto`;
} else {
  amigoSecreto.textContent =
    "Link inválido, pídele el link correcto a quien organizó el sorteo";
}

if (document.getElementById("girar")) {
  document.getElementById("girar").addEventListener("click", async function () {
    if (!persona) return;

    amigoSecreto.textContent = "Buscando...";

    try {
      const res = await fetch(
        `${APPS_SCRIPT_URL}?persona=${encodeURIComponent(persona)}`,
      );
      const data = await res.json();

      if (data.error) {
        amigoSecreto.textContent =
          "No encontramos tu nombre, revisa el link 😬";
        return;
      }

      amigoSecreto.textContent = "Tu amigo secreto es: " + data.resultado;
    } catch (err) {
      amigoSecreto.textContent = "Hubo un error, intenta de nuevo";
    }
  });
}
