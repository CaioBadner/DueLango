<template>
  <div class="help-container">
  <h2 class="help-header">Como Jogar?</h2>
    <div class="help-how-to">
      <div class="help-board-container">
        <div class="help-board">
          <div class="help-tile D" >
            <div class="help-tile-letter">D</div>
            <div class="help-trace se"></div>
          </div>
          <div class="help-tile N" >
            <div class="help-tile-letter">N</div>
            <div class="help-trace sw"></div>
            <div class="help-trace e"></div>
          </div>
          <div class="help-tile G" >
            <div class="help-tile-letter">G</div>
            <div class="help-trace w"></div>
            <div class="help-trace s"></div>
          </div>
          <div class="help-tile A" >
            <div class="help-tile-letter">A</div>
            <div class="help-trace se"></div>
            <div class="help-trace ne"></div>
          </div>
          <div class="help-tile U" >
            <div class="help-tile-letter">U</div>
            <div class="help-trace nw"></div>
            <div class="help-trace se"></div>
          </div>
          <div class="help-tile O" >
            <div class="help-tile-letter">O</div>
            <div class="help-trace n"></div>
          </div>
          <div class="help-tile P" >
            <div class="help-tile-letter">P</div>
          </div>
          <div class="help-tile L" >
            <div class="help-tile-letter">L</div>
            <div class="help-trace e"></div>
            <div class="help-trace nw"></div>
          </div>
          <div class="help-tile E" >
            <div class="help-tile-letter">E</div>
            <div class="help-trace nw"></div>
            <div class="help-trace w"></div>
          </div>
        </div>
        <br>
        <span>DUELANGO</span>
      </div>
      <p>Monte palavras de, <b>no mínimo 4 letras</b>, usando as letras do tabuleiro. Selecione a letra inicial e vá arrastando o cursor até encontrar uma palavra. 
        As letras podem estar conectadas horizontalmente, verticalmente, diagonalmente e podem até se cruzar.
          Só não vale repetir a letra que já foi usada. </p>
      </div>
    

  <h2 class="help-header">Que palavras valem?</h2>
  <p>O dicionário do Duelango é baseado no <a href="https://pt.wiktionary.org" style="text-decoration: underline;">Wikcionário</a> e contém mais 
  de 350.000 verbetes e variantes. Cada dia, nós geramos um tabuleiro novo e escolhemos somente as palavras mais relevantes. 
  Mas nada é excluído, conjugações verbais incomuns (tu, vós, pretérito mais-que-perfeito, etc), palavras obscuras, coloquialismos, gírias (e até palavrões) são incluídos como palavras bônus.</p>

  <h2 class="help-header">E os acentos? E o cê-cedilha?</h2>
  <p>No intuito de deixar o jogo mais interessante e desafiador, decidimos simplificar e remover todos os acentos e caracteres especiais do português. Logo, as palavras MACA e MAÇÃ contam como uma só. Caso você encontre uma palavra que pareça estranha, pense por um momento se ela talvez não tenha um acento.</p>
  
  <h2 class="help-header">E se ficar difícil?</h2>
  <p>Libere as dicas para te ajudar. Na lista de palavras você tem algumas formas de ajuda que podem ser liberadas. Revelar quantas palavras começam com cada letra, quantas palavras usam cada letra e ver partes das palavras que ainda não foram descobertas. Você também pode pedir para o computador revelar uma palavra aleatória, quem sabe não é logo aquela que você não conseguiu encontrar de jeito nenhum?</p>

  <h2 class="help-header">Por que Duelango?</h2>
  <p>Estamos trabalhando para fazer um sistema onde os jogadores possam se enfrentar em tempo real e se degladiar em busca da glória. No futuro teremos um ranking ELO para descobrir quem é o melhor caçador de palavras do mundo.</p>

  <h2 class="help-header">Como apoiar o Duelango?</h2>
  <p>O principal é mostrar para os amigos, compartilhe seus resultados nas redes sociais para nos ajudar a divulgar o Duelango. 
    Em breve disponibilizaremos a opção de cadastro de membros com vantagens e mimos. Até lá, quem quiser ajudar o desenvolvimento e 
    manutenção do site pode me pagar um cafezinho, mas só se for de coração <i class="fa fa-smile-o"></i> </p>
    <a class="ko-fi" href='https://ko-fi.com/H2H0YRTR8' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>

  <h5 style="font-family: 'PseudoAPL'">Badeco 2024</h5>    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.help-container {
  display:flex;
  flex-direction: column;
  max-width: 500px;
  margin: 5px;
  max-height: vh;
  overflow: auto;
  margin-bottom: 100px;
}
.help-header {
  font-family: 'PseudoAPL';
}
.help-how-to {
  display:flex;
  flex-direction: row;
  max-width: 500px;
  gap: 20px;
}
.help-board-container {
  display:flex;
  flex-direction: column;
  max-width: fit-content;
}

p {
  margin: 5px;
}
.help-board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3%;
  justify-content: space-evenly;
  min-height: 150px;
  min-width: 150px;
  max-height: 150px;
  max-width: 150px;
}
.help-tile {
  background-color:  rgb(122, 12, 34); 
  color:white;
  border-radius: 5px;
  border: solid crimson;
  height: 92%;
  width: 92%;
  position: relative;
  justify-content: center;
  align-content: center;
  display: grid;  
  grid-template-columns: 1fr;
}
.help-tile-letter {
  font-size: 30px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  user-select: none;
  vertical-align: middle;
  justify-content: center;
  align-content: center;
  text-align: center;
  line-height: 43.2375px;
}
.help-tile.D {
  border-color: white;
  background: rgb(122, 12, 34); 
}
.help-tile.P {
  background: crimson;
}
.help-trace {
  background: rgba(255, 255, 255, 0.294);
  position: absolute;
  border-radius: 20%;
  user-select: none;
}
.help-trace.se {
  top: 70%;
  left: 60%;
  height: 20%;
  width: 40%;
  transform: rotate(45deg);
}
.nw {
  top: 10%;
  left: 00%;
  height: 20%;
  width: 40%;
  transform: rotate(45deg);
}
.w {
  top: 40%;
  left: 00%;
  height: 20%;
  width: 40%;
}
.e {
  top: 40%;
  left: 60%;
  height: 20%;
  width: 40%;
}
.ne {
  top: 10%;
  left: 60%;
  height: 20%;
  width: 40%;
  transform: rotate(315deg);
}
.sw {
  top: 70%;
  left: 00%;
  height: 20%;
  width: 40%;
  transform: rotate(315deg);
}
.n {
  top: 0%;
  left: 40%;
  height: 40%;
  width: 20%;
}
.s {
  top: 60%;
  left: 40%;
  height: 40%;
  width: 20%;
}
</style>