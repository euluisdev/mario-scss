const imgMario = document.querySelector('#mario');
let stopFly;

const playSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.play();
};

const stopSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.pause();
};

const pular = (event) => {
    if (event.key == 'ArrowUp') {
        imgMario.classList.add('jump');
        imgMario.src = './imagens/mario.gif';
        playSom('som-pulo');

        setTimeout(() => {           
            imgMario.classList.remove('jump');
        }, 500);
    };
};

const voar = (event) => {
    if (event.key === ' ') {
        imgMario.classList.add('fly');
        imgMario.src = './imagens/mario-voando.png';
        playSom('som-voar');
        
        if (stopFly) {
            clearTimeout(stopFly);
        }

        stopFly = setTimeout(() => {
            imgMario.classList.remove('fly');  
            imgMario.src = './imagens/mario.gif';
        }, 1500);
    };
};

const abaixar = (event) => {
    if (event.key === 'ArrowDown') {
        imgMario.src = './imagens/mario-squat.png';
        imgMario.classList.add('squat');
        playSom('som-agachado')
    };
};

const levantar = (event) => {
    if (event.key === 'ArrowDown') {
        imgMario.classList.remove('squat');
        imgMario.src = './imagens/mario.gif';
    };
};

export { playSom, stopSom, pular, voar, abaixar, levantar, imgMario, stopFly };