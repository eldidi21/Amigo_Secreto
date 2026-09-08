const prueba1 = document.getElementById("prueba1");

for (let i = 1; i <= 50; i++) {
  const numero = document.createElement("numero");
  numero.textContent = i;
  prueba1.appendChild(document.createTextNode("-" + numero.textContent));
}
