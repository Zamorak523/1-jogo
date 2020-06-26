class Jogo {
  constructor() {
    this.indice = 0;
    this.mapa = fita.mapa
  }

  setup() {
    cenario = new Cenario(imagemCenario, 3);
    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 0, 30, 110, 135, 220, 270);
    pontuacao = new Pontuacao();
    vida = new Vida(fita.configuracoes.vidaMaxima, fita.configuracoes.vidaInicial);

    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width, 200, 100, 75, 200, 150, 10);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 10);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width, 30, 52, 52, 104, 104, 10);

    inimigos.push(inimigo);
    inimigos.push(inimigoGrande);
    inimigos.push(inimigoVoador);

    somDoJogo.loop();
  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula();
    }
  }

  draw() {
    cenario.exibe();
    cenario.move();
    pontuacao.exibe();
    pontuacao.adicionarPonto();
    vida.exibe();

    personagem.exibe();
    personagem.aplicaGravidade();

    const linhaAtual = this.mapa[this.indice]
    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < -inimigo.largura;
    
    inimigo.velocidade = linhaAtual.velocidade;
    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.indice++;
    inimigo.aparece();
      if (this.indice > this.mapa.length - 1) {
        this.indice = 0
      }

    }

    if (personagem.estaColidindo(inimigo)) {
      console.log('colidiu')
      vida.perdeVida();
      personagem.ficaImune();
      if(vida.vidas === 0){
      vida.perdeVida();
      image(imagemOver, (width / 2) - 206, (height / 2) - 39);
      somDoJogo.stop();
      noLoop();
      }
    }
  }
}