const btnEmpezar = document.getElementById("btnEmpezar");
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const lblNivel = document.getElementById('level')
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    btnEmpezar.classList.toggle("hide");
    this.nivel = 1;
    this.colores = {
        celeste,
        violeta,
        naranja,
        verde
    }
    this.printNivel()
  }

  printNivel(){
    lblNivel.textContent = this.nivel;
  }

  generarSecuencia(){
      this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  ganoElJuego(){
    swal('¡Ganaste!', `Felicidades, pasaste los ${ULTIMO_NIVEL} niveles.`, 'success')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

  perdioElJuego(){
    swal('¡Perdiste!', `Llegaste al nivel ${this.nivel}. ¡Segui practicando!`, 'error')
    .then(() => {
      this.eliminarEventosClick()
      this.inicializar()
    })
  }

  siguienteNivel(){
      this.subNivel = 0
      this.printNivel()
      this.iluminarSecuencia()
      this.agregarEventosClick()
  }

  transformarNumeroAColor(numero){
    switch(numero){
        case 0: return 'celeste'
        case 1: return 'violeta'
        case 2: return 'naranja'
        case 3: return 'verde'
    }
  }

  transformarColorANumero(color){
    switch(color){
        case 'celeste': return 0
        case 'violeta': return 1
        case 'naranja': return 2
        case 'verde': return 3
    }
  }

  iluminarColor(color){
      this.colores[color].classList.add('light')
      setTimeout(() => {
          this.apagarColor(color)
      }, 500)
  }

  apagarColor(color){
      this.colores[color].classList.remove('light')
  }

  iluminarSecuencia(){
      for(let i=0; i < this.nivel; i++){
        const color = this.transformarNumeroAColor(this.secuencia[i])

        setTimeout(() => {
            this.iluminarColor(color)
        }, 1000 * i)
      }
  }

  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(evt){
    const nombreColor = evt.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    
    this.iluminarColor(nombreColor)

    if(numeroColor === this.secuencia[this.subNivel]){
      this.subNivel++
      if(this.subNivel === this.nivel){
        this.nivel++

        if(this.nivel === (ULTIMO_NIVEL+1)){
          this.ganoElJuego();
        }else{
          
          setTimeout(this.siguienteNivel, 2000)
        }

      }
    }else{
      this.perdioElJuego()
    }
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
