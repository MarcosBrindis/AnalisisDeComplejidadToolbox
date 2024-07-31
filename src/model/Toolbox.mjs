export class Toolbox {

constructor(){
this.nuts=[];
this.screws=[];
}

setNuts(nuts) {
    this.nuts = nuts;
  }

  setScrews(screws) {
    this.screws = screws;
  }

  generateNutsAndScrews(count) {
    this.nuts = [];
    this.screws = [];
    for (let i = 0; i < count; i++) {
      const size = (Math.random() * 10).toFixed(2);
      this.nuts.push(size);
      this.screws.push(size);
    }
    // desordenarlos
    this.nuts = this.shuffleArray(this.nuts);
    this.screws = this.shuffleArray(this.screws);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Complejidad Cuadrática O(n^2)
  emparejarCuadratico() {
    const start = performance.now();
    let iteraciones = 0;
    let emparejamientos = [];
    for (let i = 0; i < this.nuts.length; i++) {
      for (let j = 0; j < this.screws.length; j++) {
        iteraciones++;
        if (this.nuts[i] === this.screws[j]) {
          emparejamientos.push({ nut: this.nuts[i], screw: this.screws[j] });
          break;
        }
      }
    }
    const tiempo = performance.now() - start;
    return { emparejamientos, iteraciones, tiempo };
  }

  // Complejidad Logarítmica O(n log n)
  emparejarLogaritmico() {
    const start = performance.now();
    let iteraciones = 0;
    const quicksortEmparejamiento = (nuts, screws, low, high) => {
      if (low < high) {
        let pivotIndex = particionar(nuts, screws, low, high);
        quicksortEmparejamiento(nuts, screws, low, pivotIndex - 1);
        quicksortEmparejamiento(nuts, screws, pivotIndex + 1, high);
      }
    };

    const particionar = (nuts, screws, low, high) => {
      let pivot = screws[low];
      let i = low;
      for (let j = low + 1; j <= high; j++) {
        iteraciones++;
        if (nuts[j] < pivot) {
          i++;
          [nuts[i], nuts[j]] = [nuts[j], nuts[i]];
        }
      }
      [nuts[i], nuts[low]] = [nuts[low], nuts[i]];

      pivot = nuts[i];
      i = low;
      for (let j = low + 1; j <= high; j++) {
        iteraciones++;
        if (screws[j] < pivot) {
          i++;
          [screws[i], screws[j]] = [screws[j], screws[i]];
        }
      }
      [screws[i], screws[low]] = [screws[low], screws[i]];

      return i;
    };

    let nutsCopy = [...this.nuts];
    let screwsCopy = [...this.screws];
    quicksortEmparejamiento(nutsCopy, screwsCopy, 0, this.nuts.length - 1);
    let emparejamientos = [];
    for (let i = 0; i < nutsCopy.length; i++) {
      emparejamientos.push({ nut: nutsCopy[i], screw: screwsCopy[i] });
    }
    const tiempo = performance.now() - start;
    return { emparejamientos, iteraciones, tiempo };
  }

  // Complejidad Lineal O(n)
  emparejarLineal() {
    const start = performance.now();
    let iteraciones = 0;
    let map = new Map();
    let emparejamientos = [];

    this.nuts.forEach(nut => {
      iteraciones++;
      map.set(nut, null);
    });

    this.screws.forEach(screw => {
      iteraciones++;
      if (map.has(screw)) {
        emparejamientos.push({ nut: screw, screw: screw });
        map.delete(screw);
      }
    });

    const tiempo = performance.now() - start;
    return { emparejamientos, iteraciones, tiempo };
  }
}