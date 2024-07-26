// Inicializa o tabuleiro como um array vazio.
const board = [];
// Obtém o elemento HTML onde o tabuleiro do jogo será exibido.
const gameBoard = document.getElementById('gameBoard');
// Define o número de linhas e colunas do tabuleiro.
const rows = 3;
const cols = 3;
// Define qual jogador começa o jogo. 'X' será o primeiro.
let currentPlayer = 'X';

// Função para iniciar ou reiniciar o jogo.
function startGame() {
    // Limpa o conteúdo do tabuleiro no HTML para um novo jogo.
    gameBoard.innerHTML = '';
    // Reinicia o jogador para 'X'.
    currentPlayer = 'X';
    // Preenche o tabuleiro com células vazias e adiciona elementos HTML para cada célula.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = '';
            const cell = document.createElement('div');
            // Adiciona a classe 'cell' para estilização.
            cell.classList.add('cell');
            // Armazena a posição da célula para uso posterior.
            cell.dataset.row = i;
            cell.dataset.col = j;
            // Adiciona um ouvinte de evento para tratar o clique na célula.
            cell.addEventListener('click', cellClicked);
            // Adiciona a célula ao tabuleiro no HTML.
            gameBoard.appendChild(cell);
        }
    }
}

// Função chamada quando uma célula é clicada.
function cellClicked() {
    // Obtém a linha e coluna da célula clicada.
    const row = this.dataset.row;
    const col = this.dataset.col;
    // Verifica se a célula já está ocupada.
    if (board[row][col] !== '') return;
    // Define o jogador atual na célula e atualiza o texto exibido.
    this.innerText = currentPlayer;
    board[row][col] = currentPlayer;
    // Verifica se o jogador atual ganhou.
    if (checkWinner(currentPlayer)) {
        alert(currentPlayer + ' ganhou!');
        startGame();
        return;
    }
    // Verifica se o jogo terminou em empate.
    if (checkDraw()) {
        alert('Empate!');
        startGame();
        return;
    }
    // Troca o jogador atual.
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para verificar se há um vencedor.
function checkWinner(player) {
    // Verifica todas as linhas para ver se há uma vitória.
    for (let i = 0; i < rows; i++) {
        if (board[i].every(cell => cell === player)) return true;
    }
    // Verifica todas as colunas para ver se há uma vitória.
    for (let j = 0; j < cols; j++) {
        if (board.map(row => row[j]).every(cell => cell === player)) return true;
    }
    // Verifica as duas diagonais para ver se há uma vitória.
    if (board.map((row, idx) => row[idx]).every(cell => cell === player)) return true;
    if (board.map((row, idx) => row[cols - 1 - idx]).every(cell => cell === player)) return true;
    return false;
}

// Função para verificar se o jogo terminou em empate.
function checkDraw() {
    // Verifica se todas as células estão preenchidas e nenhuma condição de vitória foi atendida.
    return board.flat().every(cell => cell !== '');
}

// Evento que inicializa o jogo assim que o conteúdo do DOM estiver carregado.
document.addEventListener('DOMContentLoaded', startGame);