(async function () {
  let cargos;

  async function cargarData(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cargos = data.cargos;
        window.cargos = data.cargos;
      })
      .catch((error) => console.log(`Error cargando el json ${url}`, error));
  }
  await cargarData("porcentajes.json");

  function llenarSelect() {
    let select = document.getElementById("cargos");

    cargos.forEach((cargo, index) => {
      const opcion = document.createElement("option");
      opcion.text = cargo.titulo;
      opcion.value = index;
      select.appendChild(opcion);
    });
  }

  llenarSelect(cargos);
})();

const suplementoSIP = 47793.24;
const base = 26.74;

function handleClick() {
  const divPorc = document.getElementById("porcentualidad");
  const divAjuste = document.getElementById("ajuste-prop");
  const tituloIndex = document.getElementById("cargos").value;
  const divAjusteLabel = document
    .getElementById("ajuste-prop-row")
    .removeAttribute("hidden");
  const divPorcLabel = document
    .getElementById("porcentualidad-row")
    .removeAttribute("hidden");
  const divExtras = document
    .getElementById("extras-row")
    .removeAttribute("hidden");
  const divTotalPerdido = document
    .getElementById("extras-row")
    .removeAttribute("hidden");
  divPorc.innerText = `$${suplementoSIP}`;
  divAjuste.innerText = `$${cargos[tituloIndex].ajustePorcentual}`;
  divPorc.innerText = `$${suplementoSIP}`;
}

function handleClickTotal() {
  const antiguedad = document.getElementById("antiguedad").value;
  const permanencia = document.getElementById("permanencia").value;
  const titulo = document.getElementById("titulo").value;
  const perdido = document.getElementById("total-perdido");
  const tituloIndex = document.getElementById("cargos").value;
  const ajustePorcentual = cargos[tituloIndex].ajustePorcentual;
  var caraLlorando = "\u{1F622}"; // Utilizamos la secuencia de escape Unicode
  const sumaPerdido = ajustePorcentual + 
    (2 * antiguedad * ajustePorcentual) / 100 +
    (10 * permanencia * ajustePorcentual) / 100 +
    (titulo * ajustePorcentual) / 100;
  perdido.innerText = `${caraLlorando} $${sumaPerdido.toFixed(
    2
  )} ${caraLlorando}`;
}

function handleChange() {
  document.getElementById("ajuste-prop-row").setAttribute("hidden", "true");
  document.getElementById("porcentualidad-row").setAttribute("hidden", "true");
  document.getElementById("extras-row").setAttribute("hidden", "true");
  document.getElementById("extras-row").setAttribute("hidden", "true");
  document.getElementById("antiguedad").value = "";
  document.getElementById("permanencia").value = "";
  document.getElementById("titulo").value = "";
}
