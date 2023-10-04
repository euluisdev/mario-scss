//import { setBanco, getBanco, bancoTemp } from './conexao.js';
import * as conexao from './conexao.js';
import * as modulos from './modulos.js';

const inputJogador = document.querySelector('#inputJogador');
const btnStart = document.querySelector('#btnStart');
const modal = document.querySelector('#modal');
const modalLogin = document.querySelector('#modalLogin');
const modalSleep = document.querySelector('#modalSleep');
const modalGameOver = document.querySelector('#modalGameOver');
const modalRanking = document.querySelector('#modalRanking');
const txtNome = document.querySelector('#txtNome');
const numberContagem = document.querySelector('#numberContagem');
const cenario = document.querySelector('#cenario');
const txtTime = document.querySelector('#txtTime');
const imgPipe = document.querySelector('#imgPipe');
const imgBala = document.querySelector('#imgBala');
const imgMoedas = document.querySelectorAll('#imgMoeda'); //All=virouUmArray
const imgStar = document.querySelectorAll('#imgStar');
const txtMoedas = document.querySelector('#txtMoedas');
const txtStar = document.querySelector('#txtStar');
const btnReiniciar = document.querySelectorAll('#btnReiniciar');
const btnRanking = document.querySelector('#btnRanking');
const tabela = document.querySelector('#tabela');

let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let contDown;
let tempoTime;
let timeMoveElements;
let tempoPegarElementos;
let loopControlMatch;

const validarJogador = ({ target }) => { //aoColocarIsto:{target},eliminao:event
    if (target.value.length >= 3 && target.value.length <= 11) {
        btnStart.removeAttribute('disabled');
        nomeJogador = target.value.toUpperCase().trim();

        const start = () => {
            txtNome.textContent = nomeJogador;
            inputJogador.value = '';
            inputJogador.focus();
            btnStart.setAttribute('disabled', '');
            modal.classList.remove('habilitar');
            modalLogin.classList.remove('active');
            modulos.stopSom('som-abertura');            
            modalSleep.classList.add('active');
            modulos.playSom('som-principal');

            document.addEventListener('keydown', modulos.pular);
            document.addEventListener('keydown', modulos.voar);
            document.addEventListener('keydown', modulos.abaixar);
            document.addEventListener('keyup', modulos.levantar);

            contDown = setInterval(() => {
                let cont = numberContagem.textContent;
                cont --;
                numberContagem.textContent = cont;
                if (cont === 0) {
                    clearInterval(contDown);
                    modalSleep.classList.remove('active');
                    cenario.classList.add('start');
                    modulos.imgMario.src = './imagens/mario.gif';

                    time();
                    moveElements(imgPipe, 1.5); 
                    moveElements(imgBala, 3.5);
                    pegarElementos();
                    controlMatch();
                };     
            }, 1000);
        };

        btnStart.addEventListener('click', start );
        document.addEventListener('keypress', (event) => {
            if (event.key === "Enter" && target.value.length >=3) { 
                start();
            };
        });
    } else {
        btnStart.setAttribute('disabled', '');
    };
};

const iniciarJogo = () => {
    modulos.playSom('som-abertura');
    inputJogador.addEventListener('input', validarJogador);
};
iniciarJogo();

const time = () => {
    tempoTime = setInterval(() => {
        tempoJogador = txtTime.textContent;
        tempoJogador ++;
        txtTime.textContent = tempoJogador;
    }, 1000);
};

const moveElements = (elemento, retardo = 0) => {
    timeMoveElements = setInterval(() => {
        if (tempoJogador < 13.2) {
            elemento.style.animation = `mover-elementos 4.8s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 25) {
            elemento.style.animation = `mover-elementos 4.6s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 40) {
            elemento.style.animation = `mover-elementos 4.4s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 100) {
            elemento.style.animation = `mover-elementos 4.2s infinite linear ${retardo}s`;
        } 
    }, 10);
}; //moverElementos('dois', param); chamar function com dois parâmetros

const pegarElementos = () => {
    tempoPegarElementos = setInterval(() => {
        let posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');
        let posicaoMarioTop = modulos.imgMario.offsetTop;
        
        imgMoedas.forEach((item, index) => {
            let posicaoMoedaLeft = item.offsetLeft;

            if(posicaoMarioBottom >= 40 && posicaoMarioBottom <= 200 && posicaoMoedaLeft <= 120) {
                moedasJogador ++;
                txtMoedas.textContent = moedasJogador;
                item.style.display = 'none';
                modulos.playSom('som-moeda')

                setTimeout(() => {
                    item.style.display = 'block'
                }, 5);
            };
        });

        imgStar.forEach((item) => {
            let posicaoStarLeft = item.offsetLeft;

            if(posicaoMarioTop <= 340 && posicaoMarioTop >= 240 && posicaoStarLeft <= 200 || posicaoMarioTop <= 230 && posicaoStarLeft >= 280 && posicaoStarLeft <= 330) {
                estrelasJogador ++;
                txtStar.textContent = estrelasJogador;
                item.style.display = 'none';
                modulos.playSom('som-estrela')

                setTimeout(() => {
                    item.style.display = 'block'
                }, 50);
            }
        });
    }, 250);
};

const controlMatch = () => {
    loopControlMatch = setInterval(() => {
        let posiPipeLeft = imgPipe.offsetLeft;
        let posiBalaLeft = imgBala.offsetLeft;
        let alturaMario = modulos.imgMario.offsetHeight;
        let posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');

                  //PIPE//
        if (posiPipeLeft <= 110 && posiPipeLeft >= 10 && posicaoMarioBottom <= 60) {
            imgPipe.style.animation = 'none';
            imgPipe.style.left = `${posiPipeLeft}px`;
            
            modulos.imgMario.style.animation = 'none';
            modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;

            modulos.imgMario.src = './imagens/game-over.png';
            modulos.imgMario.style.width = '65px';
            modulos.imgMario.style.left = '42px'

            gameOver();
            
        };
             //BALA//
        if (posiBalaLeft <= 90 && posiBalaLeft >= 10 && posicaoMarioBottom <= 260 && alturaMario > 80) {
            imgBala.style.animation = 'none';
            imgBala.style.left = `${posiBalaLeft}px`;

            modulos.imgMario.style.animation = 'none';
            modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;

            modulos.imgMario.src = './imagens/game-over.png';
            modulos.imgMario.style.width = '65px';
            modulos.imgMario.style.left = '42px'

            gameOver();  
        };
    }, 1);
};

const calcPoint = () => {
    pontuacaoJogador = (moedasJogador * 2) + (estrelasJogador * 5) + tempoJogador;
};

const gameOver = () => {
    modulos.stopSom('som-principal');
    modulos.playSom('som-perdeu');

    document.removeEventListener('keydown', modulos.pular);
    document.removeEventListener('keydown', modulos.voar);
    document.removeEventListener('keydown', modulos.abaixar);
    document.removeEventListener('keyup', modulos.levantar);

    clearInterval(tempoTime);
    clearInterval(tempoPegarElementos);
    clearInterval(loopControlMatch);
    clearInterval(timeMoveElements);
    clearInterval(contDown);

    clearTimeout(modulos.stopFly);  //interrompeAnimaçãoFLY

    calcPoint();

    setTimeout(() => {
        modal.classList.add('habilitar');
        modalGameOver.classList.add('active');
        modulos.stopSom('som-perdeu');
        modulos.playSom('som-game-over');
    }, 3100);

    conexao.bancoTemp(nomeJogador, moedasJogador, estrelasJogador, tempoJogador, pontuacaoJogador);
};

const reinicPartida = () => {
    modulos.playSom('som-abertura');
    location.reload(true);
};

btnReiniciar.forEach((btn) => {
    btn.addEventListener('click', reinicPartida);
});

const ranking = () => {
    modulos.stopSom('som-game-over')
    modulos.playSom('som-ranking');
    modalGameOver.classList.remove('active');
    modalRanking.classList.add('active');

    tabelaRanking();    
};
btnRanking.addEventListener('click', ranking);

const tabelaRanking = () => {
    const classificacao = conexao.getBanco();
    classificacao.sort((a, b) => b.pontuacaoJogador - a.pontuacaoJogador);  //sort(classificaNumericamente)

    classificacao.forEach((item, index) => {
        let posicao = index +1;
        let nome = item.nomeJogador;
        let moedas = item.moedasJogador; 
        let estrelas = item.estrelasJogador;
        let tempo = item.tempoJogador;
        let pontuacao = item.pontuacaoJogador;
      
        creatTable(posicao, nome, moedas, estrelas, tempo, pontuacao);
    });
};

const creatTable = (posicao, nome, moedas, estrelas, tempo, pontuacao) => {
    const row = document.createElement('tr');
    row.classList.add('linha');

    row.innerHTML = `
    <td class="coluna">${posicao}</td>
    <td class="coluna">${nome}</td>
    <td class="coluna">${moedas}</td>
    <td class="coluna">${estrelas}</td>
    <td class="coluna">${tempo}</td>
    <td class="coluna">${pontuacao}</td>
    `;
    
    tabela.appendChild(row);
};





const teste = () => {
    const classificacao = conexao.getBanco();
    classificacao.sort((a, b) => b.pontuacaoJogador - a.pontuacaoJogador);

    classificacao.forEach((item, index) => {
        console.log(index +1, item);

        let nome = item.nomeJogador;
        let moedas = item.moedasJogador; 
        let estrelas = item.estrelasJogador;
        let tempo = item.tempoJogador;
        let pontuacao = item.pontuacaoJogador;
    });
};



//teste();








/*const numbers = [1, 2, 3, 4, 5, 6, 7];
numbers.forEach((number, index, array) => {
    array[index] = number+1;
});
console.log(numbers)*/



/*let positionLeft = modulos.imgMario.offsetLeft;
let positionTop = modulos.imgMario.offsetTop;

console.log(positionLeft);
console.log(positionTop);

const personArrow = {
    name: 'Luis',
    sayHello: function() {
      console.log(`Hello, my name is ${this.name}`);
    }
  };

  personArrow.sayHello();*/