let nElementos = 12;
let seccion = 0;
let elementos = [];
let elementosPosicionX = [];
let elementosPosicionY = [];
let posicionX = [];
let posicionY = [];
let sum = 0;
let iniciarGiro = false;
let tiempoGiro = 0;
let tiempoGiro_o = 0;
let maxTiempoGiro = 4;
let maxTiempoGiroError = 1;
let nivelConocimiento = 0;
let finExperiencia = false;
let botonNuevo, botonContinue;
let imagenFondo;
let logo;
let magnitudeScreen;
let imagenReverso;
let transicion1, trnsicion2, transicion3, transicion4;
let titulo = "¡CONOCE EL PEI INSTITUCIONAL!";
let informacion1 =
  "¡Pongamos a prueba tu concentración!";
let informacion2 =
  "¡Encuentra parejas de elementos en el menor tiempo posible! ¡Cuando aciertes, sumarás dos puntos de conocimiento, pero si no, perderás uno, usa el mouse jugar!";
let informacion3 = "¡Buena suerte!";
let fuente1, fuente2, fuente3;
let temporizador;
let infoElementos = [];
let tituloElemento0 = "Componentes Misionales ";
let infoElemento0 =
  "texto con componentes misionales";
let tituloElemento1 = "PEI ¿qué es?";
let infoElemento1 =
  "texto con descripción del PEI";
let tituloElemento2 = "Misión y Visión";
let infoElemento2 =
  " texto con Misión y Visión ";
let tituloElemento3 = "Principios y Valores";
let infoElemento3 =
  " texto con principios y valores";
let tituloElemento4 = "Objetivos del ITM";
let infoElemento4 =
  "texto con objetivos del ITM";
let tituloElemento5 = "Actores del ITM";
let infoElemento5 =
  "texto con actores del ITM";

let titulosElementos = [
  tituloElemento0,
  tituloElemento1,
  tituloElemento2,
  tituloElemento3,
  tituloElemento4,
  tituloElemento5,
];
let infosElementos = [
  infoElemento0,
  infoElemento1,
  infoElemento2,
  infoElemento3,
  infoElemento4,
  infoElemento5,
];

let pruebaIn = 0;
let w,h;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1380, 720);
  asignarPosiciones();
  cargarImagenes();
  botonNuevo = new Boton(w* 0.9, h * 0.95, 0.5, "Iniciar");
  botonContinue = new Boton(w * 0.5, h* 0.95, 0.5, "Continuar");
  reStartPlay();
  botonContinue.configurarColor(70,51,255);
  transicion1 = new Transicion("out");
  transicion2 = new Transicion("in");
  transicion3 = new Transicion("out");
  transicion4 = new Transicion("in");
  fuente1 = loadFont("/Fonts/FontsFree-Net-KOMTITA_.ttf");
  fuente2 = loadFont("/Fonts/digital-7.ttf");
  fuente3 = loadFont("/Fonts/Montserrat-Regular.ttf");
  temporizador = new Temporizador();
  for (let i = 0; i < nElementos; i++) {
    elementos[i].fInfo = true;
    elementos[i].fInfo = false;
  }
  tamPantalla();
  imagenReverso=loadImage("/Cards/reverso1.png");
}

function draw() {
  background(125);
  reasignarPosiciones();
  selectorSeccionPrincipal(seccion);
}


//*****************************FUNCIONES*********************
function cargarImagenes(){
  imagenFondo = loadImage("/images/fondo1.png");
  logo = loadImage("/images/logo1PEI.png"); 
}
function selectorSeccionPrincipal(sec){
   switch (sec) {
    case 0:
      introSeccion();
      if (transicion1.finalizada) seccion++;
      break;
    case 1:
      informacionSeccion();
      break;
    case 2:
      playSeccion();
      break;
  } 
}
function mostrarFondo() {
  imageMode(CENTER);
  push();
  translate(w/ 2, h/ 2);
  scale(1);
  image(imagenFondo, 0, 0, w, h);
  pop();
}

function mostrarElementos() {
  rectMode(CORNER);
  fill(0, 30, 0, 150);
  rect(0.02 * w, 0.02 * h, 0.64 * w, 0.97 * h, 50);
  if (!temporizador.tiempoTerminado) {
    for (let i = 0; i < nElementos; i++) {

      elementos[i].actualizar(magnitudeScreen);
    }
  }
}

function asignarPosiciones() {
  for (let i = 0; i < nElementos/ 3; i++) {
    for (let j = 0; j < 3; j++) {
      elementosPosicionX[i + int(nElementos / 3) * j] = int(
        (w/ 7) * i /*+ windowWidth * 0.0002*/
      );
      posicionX[i + int(nElementos / 3) * j] = i + int(nElementos / 3) * j;

      elementosPosicionY[i + int(nElementos / 3) * j] = int(
        (h/ 7) * j /* + windowHeight * 0.0001*/
      );
      posicionY[i + int(nElementos/ 3) * j] = int(i + int(nElementos / 3) * j);
    }
  }
  for (let i = 0; i < nElementos; i++) {
    elementos[i] = new Elemento(
      elementosPosicionX[i],
      elementosPosicionY[i],
      i % int(nElementos / 2),
      titulosElementos[i % int(nElementos/ 2)],
      infosElementos[i % int(nElementos/ 2)]
    );
    let number = "Cards/elemento" + (i % int(nElementos / 2)) + ".png";
    elementos[i].frontImage = loadImage(number);
    elementos[i].raerImage = loadImage("/Cards/reverso1.png");
  }
}

function reasignarPosiciones() {
  magnitudeScreen = sqrt(pow(w, 2) + pow(h, 2));

  for (let i = 0; i < nElementos / 3; i++) {
    for (let j = 0; j < 3; j++) {
      elementosPosicionX[i + int(nElementos / 3) * j] = int(
        (w/ 6.5) * (i + w * 0.0002)
      );
      posicionX[i + int(nElementos / 3) * j] = i + int(nElementos/ 3) * j;

      elementosPosicionY[i + int(nElementos/ 3) * j] = int(
        (h/ 3) * (j + h* 0.0002)
      );
      posicionY[i + int(nElementos/ 3) * j] = int(i + int(nElementos / 3) * j);
    }
  }
  for (let i = 0; i < nElementos; i++) {
    elementos[i].x = elementosPosicionX[i];
    elementos[i].y = elementosPosicionY[i];
  }
}
function reStartPlay() {
  shuffle(elementos, true);
  for (let i = 0; i < nElementos; i++) {
    elementos[i].estado = false;
    elementos[i].played = false;
    elementos[i].x = elementosPosicionX[posicionX[i]];
    elementos[i].y = elementosPosicionY[posicionY[i]];
    sum = 0;
    iniciarGiro = false;
    tiempoGiro = 0;
    tiempoGiro_o = 0;
    nivelConocimiento = 0;
    finExperiencia = false;
    seccion = 0;
    transicion1 = new Transicion("out");
    transicion2 = new Transicion("in");
    transicion3 = new Transicion("out");
    transicion4 = new Transicion("in");
    temporizador = new Temporizador();
    botonNuevo = new Boton(w* 0.9, h* 0.95, 0.1, "Iniciar");
    botonContinue = new Boton(w* 0.5, h* 0.92, 0.1, "Continuar");
  }
}
function verificarElementosGirados() {
  let cont = 0;
  let indexCompare = [];
  let verify = [];
  let elementosGirados = [];
  let cardsPlayed = 0;
  for (let i = 0; i < nElementos; i++) {
    if (elementos[i].played) {
      cardsPlayed++;
      if (cardsPlayed == 12) {
        finExperiencia = true;
        temporizador.tiempoTerminado = true;
      }
    }
    if (elementos[i].estado) {
      elementosGirados[i] = 1;
      verify[cont] = i;
      indexCompare[cont] = elementos[i].index;
      cont++;
    } else {
      elementosGirados[i] = 0;
    }
  }
  sum = 0;
  for (let i = 0; i < nElementos; i++) {
    sum += elementosGirados[i];
  }
  if (indexCompare[0] == indexCompare[1] && cont == 2) {
    if (!iniciarGiro) {
      iniciarGiro = true;
      tiempoGiro_o = millis();
      print(verify);
      print(elementos[verify[0]].index+":"+elementos[verify[1]].index);
      elementos[verify[0]].fInfo = true;
      elementos[verify[1]].fInfo = true;
      temporizador.pause = true;
    }
    tiempoGiro = millis();
    if (tiempoGiro - tiempoGiro_o >= maxTiempoGiro * 1000 && iniciarGiro) {
      elementos[verify[0]].played = true;
      elementos[verify[1]].played = true;
      turn();
      iniciarGiro = false;
      tiempoGiro = 0;
      tiempoGiro_o = 0;
      cont = 0;
      sum = 0;
      nivelConocimiento += 2;
      temporizador.pause = false;
      elementos[verify[0]].fInfo = false;
      elementos[verify[1]].fInfo = false;
    }
  } else if (indexCompare[0] != indexCompare[1] && cont == 2 && cont == 2) {
    if (!iniciarGiro) {
      iniciarGiro = true;
      tiempoGiro_o = millis();
    }
    tiempoGiro = millis();
    if (tiempoGiro - tiempoGiro_o >= maxTiempoGiroError * 1000 && iniciarGiro) {
      turn();
      iniciarGiro = false;
      tiempoGiro = 0;
      tiempoGiro_o = 0;
      cont = 0;
      sum = 0;
      nivelConocimiento -= 1;
    }
  }
  nivelConocimiento = constrain(nivelConocimiento, 0, 12);
}

function turn() {
  for (let i = 0; i < nElementos; i++) {
    elementos[i].estado = false;
  }
}

function mostrarConocimiento(x, y, s) {
  imageMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  push();
  translate(x, y);
  textSize(s);
  noStroke();
  fill(0, 30, 0, 150);
  rect(0, -h* 0.02, w* 0.3, h* 0.1, 10);
  fill(200);
  noStroke();
  textFont(fuente1);
  text("Conocimiento: " + nivelConocimiento, 0, -0.025 * h);
  pop();
}

function mostrarLogo(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  fill(200, 180);
  noStroke();
  rect(0, 0, 0.65 * w, 0.3 * h, 30);
  image(logo, 0, 0);
  pop();
}

function playSeccion() {
  mostrarFondo();
  mostrarElementos();
  verificarElementosGirados();
  mostrarConocimiento(w* 0.83, h* 0.4, 40);
  if (temporizador.tiempoTerminado) finExperiencia = true;
  if (finExperiencia) {
    botonNuevo.actualizar(w* 0.83, h* 0.95);
    if (botonNuevo.estado) {
      reStartPlay();
    }
  }
  mostrarLogo(0.83 * w, 0.15 * h, 0.3);
  temporizador.actualizar(0.83 * w, 0.6 * h);
  for (let i = 0; i < nElementos; i++) {
    elementos[i].showInfo();
  }
  transicion4.actualizar(3);
}

function introSeccion() {
  mostrarFondo();
  noStroke();
  fill(0, 30, 0, 50);
  rectMode(CENTER);
  rect(w/ 2, h/ 2, w, h, 20);
  mostrarLogo(w/ 2, h / 2, 0.05 * sin(0.005 * frameCount) + 0.8);

  transicion1.actualizar(1);
}

function informacionSeccion() {
  mostrarFondo();
  noStroke();
  fill(0, 30, 0, 70);
  rectMode(CENTER);
  rect(w/ 2, h/ 2, w, h, 20);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(titulo, w/ 2, h* 0.3);
  textSize(30);
  textAlign(CENTER, CENTER);
  textFont(fuente1);
  text(informacion1, 0.5 * w, 0.5 * h);
  text(informacion2, 0.5 * w, 0.6 * h, 0.8 * w);
  text(informacion3, 0.5 * w, 0.75 * h, 0.8 * w);
  botonContinue.actualizar(w* 0.5, h * 0.95);
  if (botonContinue.estado) {
    seccion++;
  }
  transicion2.actualizar(3);
}

function mouseReleased() {
  print(elementos);
}

//*****************************CLASS**************************
class Elemento {
  constructor(x, y, i, nombre, info) {
    this.x = x;
    this.y = y;
    this.estado = false;
    this.played = false;
    this.index = i;
    this.escaclaX = 1;
    this.escalaY = 1;
    this.frontImage; // = loadImage(this.nombre);
    this.raerImage = loadImage("/Cards/reverso1.png");
    this.size;
    this.info = info;
    this.nombre = nombre;
    this.fInfo = false;
  }
  actualizar(s) {
    this.size = 0.118 * s;
    imageMode(CORNER);
    push();
    translate(this.x, this.y);
    scale(this.escalaX, this.escalaY);

    if (!this.played) {
      if (this.estado) {
        image(this.frontImage, 0, 0, this.size, this.size);
      } else {
        //image(this.raerImage, 0, 0, this.size, this.size);
        fill(255);
        rect(0,0,this.size, this.size);
      }
    }
    pop();
    if (
      mouseX > this.x &&
      mouseX < this.x + this.size &&
      mouseY > this.y &&
      mouseY < this.y + this.size
    ) {
      if (sum < 2 && mouseIsPressed) {
        this.estado = true;
      }
    }
  }
  showInfo() {
    if (this.fInfo) {
      noStroke();
      fill(200, 150);
      rectMode(CENTER);
      imageMode(CENTER);
      push();
      translate(w/ 2, h/ 2);
      rect(0, 0, w * 0.8, h* 0.8, 30);
      image(this.frontImage, -0.25 * w, 0);
      textFont(fuente1);
      fill(0);
      textSize(54);
      textAlign(CENTER, CENTER);
      text(this.nombre, 0, -0.35 * h);
      textSize(34);
      textAlign(LEFT, CENTER);
      textFont(fuente3);
      text(this.info, 0.13 * w, -0.2 * h, 0.5 * w);

      pop();
    }
  }
}

class Boton {
  constructor(x, y, s, nombre) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.nombre = nombre;
    this.estado = false;
    this.presionado = false;
    this.colorBoton=color(70,51,255);
    this.colorBotonInteraccion=color(80,61,255);;
  }
  actualizar(x, y) {
    rectMode(CENTER);
    imageMode(CENTER);
    stroke(0);
    this.x = x;
    this.y = y;

    if (
      mouseX > this.x - (w* this.size) / 2 &&
      mouseX < this.x + (w* this.size) / 2 &&
      mouseY > this.y - (h* this.size) / 2 &&
      mouseY < this.y + (h* this.size) / 2
    ) {
      fill(80,61,255);
      if (mouseIsPressed) {
        this.presionado = true;
      }
    } else {
      fill(70,51,255);
      if (mouseReleased && this.presionado) {
        this.estado = true;
      }
    }
    if (mouseReleased && this.presionado && this.estdo) {
      this.estado = false;
      this.presionado = false;
    }

    push();
    translate(this.x, this.y);
    rect(0, 0, w* this.size*1.1, h* this.size * 0.6, 20);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(w* this.size * 0.16);
    textFont(fuente1);
    text(this.nombre, 0, 0);
    pop();
  }
  configurarColor(rojo, verde, azul){
    //this.colorBoton=color(rojo,verde, azul);
    //this.colorBotonInteraccion=color(red(this.colorBoton)+50,green(this.colorBoton)+50,blue(this.colorBoton)+50);
  }
}

class Transicion {
  constructor(val) {
    this.alpha = 0;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.val = val;
    this.finalizada = false;
    if (this.val == "in") {
      this.alpha = 255;
    } else {
      this.alpha = 0;
    }
  }
  actualizar(inc) {
    rectMode(CENTER);
    noStroke();

    if (this.val == "in" && !this.finalizada) {
      this.alpha -= inc;
      if (this.alpha <= 0) this.finalizada = true;
    }
    if (this.val == "out" && !this.finalizada) {
      this.alpha += inc;
      if (this.alpha >= 255) this.finalizada = true;
    }
    this.alpha = constrain(this.alpha, 0, 255);
    fill(this.r, this.g, this.b, this.alpha);
    rect(w/ 2, h/ 2, w, h);
  }
  init() {
    if (this.val == "in") {
      this.alpha = 255;
    } else {
      this.alpha = 0;
    }
  }
}
class Temporizador {
  constructor() {
    this.to = 0;
    this.tf = 0;
    this.t = 0;
    this.activo = false;
    this.tiempoTerminado = false;
    this.tiempo = 90;
    this.minutes = 1;
    this.seconds = 30;
    this.escala = 3;
    this.x, this.y;
    this.pause = false;
  }
  actualizar(x, y) {
    this.x = x;
    this.y = y;
    if (!this.activo) {
      this.activo = true;
      this.to = millis();
    }
    this.tf = millis();
    this.t = this.tf - this.to;
    if (this.t >= 1000 && !this.tiempoTerminado) {
      this.to = millis();
      if (!this.pause) this.tiempo--;
      if (this.tiempo <= 0) {
        this.activo = false;
        this.tiempoTerminado = true;
      }
    }
    this.mostrar(this.x, this.y);
  }
  mostrar() {
    push();
    translate(this.x, this.y);
    scale(this.escala);
    noStroke();
    fill(0, 25, 0);
    rect(0, 0, 0.08 * w, 0.05 * h, 30);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textFont(fuente2);
    text(this.tiempo, 0, 0);
    pop();
  }
}

function tamPantalla(){
  w=width;
  h=height;
}

