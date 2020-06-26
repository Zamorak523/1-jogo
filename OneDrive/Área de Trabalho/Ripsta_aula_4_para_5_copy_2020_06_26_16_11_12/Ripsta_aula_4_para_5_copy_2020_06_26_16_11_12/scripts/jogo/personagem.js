class Personagem extends Animacao {
  constructor(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite) {
    super(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite);

    this.variacaoY = variacaoY;
    this.yInicial = height - this.altura - this.variacaoY;
    this.y = this.yInicial;

    this.velocidadeDoPulo = 0;
    this.gravidade = 5;
    this.alturaDoPulo = -35;

    this.nPulo = 0;
    this.mPulo = 2;

    this.imune = false;
  }

  pula() {
    if (this.nPulo < this.mPulo) {
      somDoPulo.play();
      console.log('pulou')
      this.velocidadeDoPulo = this.alturaDoPulo
      this.nPulo++
    }
  }

  aplicaGravidade() {
    this.y = this.y + this.velocidadeDoPulo
    this.velocidadeDoPulo = this.velocidadeDoPulo + this.gravidade
    if (this.y > this.yInicial) {
      this.y = this.yInicial
      this.nPulo = 0;
    }
  }
  ficaImune() {
    this.imune = true;
    setTimeout(() => {
      this.imune = false
    }, 1000)

  }

  estaColidindo(inimigo) {
    const precisao = 0.6
    if (this.imune) {
      return false
    }
    const colisao = collideRectCircle(

      this.x + this.largura / 4,
      this.y + this.altura / 4,
      this.largura * precisao,
      this.altura * precisao,
      inimigo.x + inimigo.largura / 2,
      inimigo.y + inimigo.altura / 2,
      inimigo.largura / 2
    )
    return colisao;

  }
}