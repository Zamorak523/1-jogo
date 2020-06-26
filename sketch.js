function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  jogo = new Jogo();
  telaInicial = new TelaInicial();
  jogo.setup();
  cenas = {
    telaInicial,
    jogo,
  };
  gerenciadorBotao = new GerenciadorBotao('INICIAR', width - 100, height - 100);
}

function keyPressed() {
  jogo.keyPressed(key);
}

function draw() {
  cenas[cenaAtual].draw();
}