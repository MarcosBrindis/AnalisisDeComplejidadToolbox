import { Toolbox } from "../model/Toolbox.mjs";

document.addEventListener('DOMContentLoaded', () => {
  const toolbox = new Toolbox();
  const sizeInput = document.getElementById('sizeInput');
  const generateBtn = document.getElementById('generateBtn');
  const emparejarCuadraticoBtn = document.getElementById('emparejarCuadraticoBtn');
  const emparejarLogaritmicoBtn = document.getElementById('emparejarLogaritmicoBtn');
  const emparejarLinealBtn = document.getElementById('emparejarLinealBtn');
  const resultadoDiv = document.getElementById('resultado');
  const resultTableBody = document.querySelector('#resultTable tbody');

  generateBtn.addEventListener('click', () => {
    const count = parseInt(sizeInput.value, 10);
    if (count > 0) {
      toolbox.generateNutsAndScrews(count);
      printNutsAndScrews(toolbox);
    }
  });

  emparejarCuadraticoBtn.addEventListener('click', () => {
    const { emparejamientos, iteraciones, tiempo } = toolbox.emparejarCuadratico();
    mostrarResultado(iteraciones, tiempo, "Cuadrático (O(n^2))");
    agregarResultadoTabla("Cuadrático (O(n^2))", toolbox.nuts.length, tiempo, iteraciones);
    actualizarGrafica("Cuadrático (O(n^2))", tiempo, iteraciones);
  });

  emparejarLogaritmicoBtn.addEventListener('click', () => {
    const { emparejamientos, iteraciones, tiempo } = toolbox.emparejarLogaritmico();
    mostrarResultado(iteraciones, tiempo, "Logarítmico (O(n log n))");
    agregarResultadoTabla("Logarítmico (O(n log n))", toolbox.nuts.length, tiempo, iteraciones);
    actualizarGrafica("Logarítmico (O(n log n))", tiempo, iteraciones);
  });

  emparejarLinealBtn.addEventListener('click', () => {
    const { emparejamientos, iteraciones, tiempo } = toolbox.emparejarLineal();
    mostrarResultado(iteraciones, tiempo, "Lineal (O(n))");
    agregarResultadoTabla("Lineal (O(n))", toolbox.nuts.length, tiempo, iteraciones);
    actualizarGrafica("Lineal (O(n))", tiempo, iteraciones);
  });

  function printNutsAndScrews(toolbox) {
    console.log('Tuercas:', toolbox.nuts);
    console.log('Tornillos:', toolbox.screws);
  }

  function mostrarResultado(iteraciones, tiempo, tipo) {
    resultadoDiv.innerHTML = `<h3>Algoritmo: ${tipo}</h3>`;
    resultadoDiv.innerHTML += `<p>Tiempo: ${tiempo.toFixed(2)} ms</p>`;
    resultadoDiv.innerHTML += `<p>Iteraciones: ${iteraciones}</p>`;
  }

  function agregarResultadoTabla(algoritmo, numElementos, tiempo, iteraciones) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${algoritmo}</td>
      <td>${numElementos}</td>
      <td>${tiempo.toFixed(2)}</td>
      <td>${iteraciones}</td>
    `;
    resultTableBody.appendChild(row);
    console.log(`Agregado a la tabla: ${algoritmo}, ${numElementos}, ${tiempo}, ${iteraciones}`);
  }

  const ctx1 = document.getElementById('grafica1').getContext('2d');
  const chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ["Cuadrático (O(n^2))", "Logarítmico (O(n log n))", "Lineal (O(n))"],
      datasets: [
        {
          label: 'Tiempo (ms)',
          backgroundColor: 'rgb(75, 192, 192)',
          data: [0, 0, 0]  
        },
        {
          label: 'Iteraciones',
          backgroundColor: 'rgb(255, 99, 132)',
          data: [0, 0, 0]  
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function actualizarGrafica(algoritmo, tiempo, iteraciones) {
    const labelIndex = chart1.data.labels.indexOf(algoritmo);
    if (labelIndex === -1) {
      chart1.data.labels.push(algoritmo);
      chart1.data.datasets[0].data.push(tiempo);
      chart1.data.datasets[1].data.push(iteraciones);
    } else {
      chart1.data.datasets[0].data[labelIndex] = tiempo;
      chart1.data.datasets[1].data[labelIndex] = iteraciones;
    }
    chart1.update();
    //console.log(`Gráfica actualizada: ${algoritmo}, ${tiempo}, ${iteraciones}`);
  }

});