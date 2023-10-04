const setBanco = (banco) => {
    localStorage.setItem('database-mario', JSON.stringify(banco));
};

const getBanco = () => {
    return JSON.parse(localStorage.getItem('database-mario')) ?? [];
};

const bancoTemp = (nome, moedas, estrelas, tempo, pontuacao) => {

    let banco = getBanco();    //<array
    let dados = {
        nomeJogador: nome,
        moedasJogador: moedas,
        estrelasJogador: estrelas,
        tempoJogador: tempo,
        pontuacaoJogador: pontuacao
    };

    banco.unshift(dados);
    setBanco(banco);
};

export { setBanco, getBanco, bancoTemp }; 




//POO
//class Carro {
    //constructor(cor, marca, ligado, km,) {
        //this.cor = cor;
        //this.marca = marca;
       // this.ligado = ligado || false;
       // this.km = km || 0;
   // };
   // info() {
       // console.log(`
       // cor: ${this.cor}
        //marca: ${this.marca}
        //ligado: ${this.ligado}
        //km: ${this.km}
        //`);
    //};
//};

//let c1 = new Carro('verde', 'vw', '', '3');
//let c2 = new Carro('azul');
//let c3 = new Carro('roxo');
//let c4 = new Carro('branco');
//let c5 = new Carro('preto');

//c1.info();