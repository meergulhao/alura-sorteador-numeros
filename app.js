// Fiz sozinho, antes de ver a aula (usando o código de outra aula pra relembrar algumas coisas)
// Vou destacar em comentários as diferenças de como foi feito na aula

document.getElementById('btn-sortear').removeAttribute('disabled');

function sortear() {
    // Adicionou parseInt() pra só permitir inteiros nos inputs, porém, já não aceita letras no front. Será que precisa?
    let quantidadeDeNumeros = document.getElementById('quantidade').value;
    let numeroMinimo = document.getElementById('de').value;
    let numeroMaximo = document.getElementById('ate').value;
    let numeroSorteado = [];

    // Aqui, como foi depois, usei o return no final do if
    if((numeroMaximo - numeroMinimo + 1) < quantidadeDeNumeros) {
        alert('A quantidade de números a sortear deve ser menor que a diferença entre os valores "Do número" e "Até o número".\nPreencha novamente');
        document.getElementById('quantidade').value = '';
        document.getElementById('de').value = '';
        document.getElementById('ate').value = '';
        return;
    }
    
    if(numeroMaximo <= numeroMinimo) {
        alert('Atenção, o valor em "Até o número" deve ser maior que o valor em "Do número".\nPreencha novamente.');
        document.getElementById('quantidade').value = '';
        document.getElementById('de').value = '';
        document.getElementById('ate').value = '';
    
    // Nesse if foi usado um return, de forma que não seria necessário aplicar o else, pois ele interrompe a execução do restante do código
    } else {

        // Criou uma função separada pra gerar o número aleatório, que recebe min e max
        // Usou uma função já nativa Math.floor(Math.random() * (max - min + 1) + min). Isso torna a primeira condição do if desnecessária
        // A segunda condição do if, que impede repetição, fizeram com um while, que verifica se o array já tem aquele número
        for(i = 0; i < quantidadeDeNumeros; i++) {
            let numeroAleatorio = parseInt(Math.random() * numeroMaximo + 1);
            if((numeroAleatorio < numeroMinimo) || (numeroSorteado.includes(numeroAleatorio))) {
                i--;
            } else {
                numeroSorteado.push(numeroAleatorio);
            }
        }
        console.log(numeroSorteado);

        // Não separou uma função mudar o texto na tela
        // Adicionou a função innerHTML para trocar toda a linha da label (eu adicionei um id na label, e me pareceu que ficou mais simples)
        exibirTextoNaTela('numerosSorteados', `Números sorteados: ${numeroSorteado}`);

        // Não desabilitou o botão de sortear depois de sorteado, não precisava, mas achei legal (=
        document.getElementById('btn-sortear').setAttribute('disabled', true);

        // Criou uma função para mudar a classe (status) do botão (eu tirei o disabled da classe, não sabia que era algo do CSS ahahaha)
        // Nessa função, usou um if pra verificar se está desabilitado, com um classList.contains, 
        // classList.remove pra remover a classe disabled, e um classList.add pra adicionar a classe habilitada
        document.getElementById('btn-reiniciar').removeAttribute('disabled');
    }
}

function exibirTextoNaTela(id, texto) {
    let resultado = document.getElementById(id);
    resultado.innerHTML = texto;
}

// Toda a mudança do status do botão ficou em outra função
// A função reiniciar() só foi criada para limpar os campos e atualizar o texto. Também chama a função para mudar o status do botão.
function reiniciar() {
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';

    document.getElementById('btn-sortear').removeAttribute('disabled');

    exibirTextoNaTela('numerosSorteados', 'Números sorteados: nenhum até agora')

    document.getElementById('btn-reiniciar').setAttribute('disabled', true);
}