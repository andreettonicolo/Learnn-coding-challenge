// Enum delle mosse del gioco 

// Per aggiungere nuove mosse (es. Rock, Paper, Scissors, Lizard, Spock),
// basta aggiungere nuove proprietà qui mantenendo la struttura chiave-valore
export const MOVES = {
  ROCK: 'rock',        // Sasso
  PAPER: 'paper',      // Carta
  SCISSORS: 'scissors' // Forbici
  // Esempio di estensione futura:
  // LIZARD: 'lizard',
  // SPOCK: 'spock'
};

// Mapping degli emoji per ogni mossa.
// Quando si aggiungono nuove mosse, basta aggiungere il corrispondente emoji qui.
export const MOVE_EMOJIS = {
  [MOVES.ROCK]: '🗿',      // Emoji per il sasso
  [MOVES.PAPER]: '📄',     // Emoji per la carta
  [MOVES.SCISSORS]: '✂️'   // Emoji per le forbici
  // Esempio di estensione futura:
  // [MOVES.LIZARD]: '🦎',
  // [MOVES.SPOCK]: '🖖'
};

// Enum dei risultati possibili del gioco
export const RESULTS = {
  WIN: 'win',   // Vittoria
  LOSE: 'lose', // Sconfitta
  TIE: 'tie'    // Pareggio
};

// Regole del gioco - definisce quale mossa batte quale 
// Questa è la parte più critica per l'estensibilità del gioco.
// La struttura chiave-valore definisce: [mossa_vincente]: mossa_che_viene_battuta
const WINNING_COMBINATIONS = {
  [MOVES.ROCK]: MOVES.SCISSORS,     // Il sasso batte le forbici
  [MOVES.PAPER]: MOVES.ROCK,        // La carta batte il sasso
  [MOVES.SCISSORS]: MOVES.PAPER     // Le forbici battono la carta
  // Esempio di estensione per Lizard-Spock:
  // [MOVES.ROCK]: [MOVES.SCISSORS, MOVES.LIZARD],     // Il sasso batte forbici e lucertola
};

/**
 * Genera una mossa casuale per il computer
 * FUNZIONE AUTOMATICAMENTE ESTENDIBILE: si adatta automaticamente a nuove mosse
 * aggiunte nell'enum MOVES senza necessità di modifiche
 * 
 * @returns {string} Una mossa valida scelta casualmente
 */
export const generateComputerMove = () => {
  // Estrae tutti i valori dall'enum MOVES (es. ['rock', 'paper', 'scissors'])
  const moves = Object.values(MOVES);
  // Genera un indice casuale e restituisce la mossa corrispondente
  return moves[Math.floor(Math.random() * moves.length)];
};

/**
 * Determina il vincitore di una partita
 * FUNZIONE CORE DEL GIOCO - Utilizza le WINNING_COMBINATIONS per determinare il risultato
 * ESTENDIBILITÀ: Funziona automaticamente con qualsiasi numero di mosse,
 * purché le WINNING_COMBINATIONS siano definite correttamente
 * @param {string} playerMove - La mossa del giocatore
 * @param {string} opponentMove - La mossa dell'avversario
 * @returns {string} Il risultato dal punto di vista del giocatore (win/lose/tie)
 */
export const determineWinner = (playerMove, opponentMove) => {
  // Caso 1: Mosse identiche = pareggio
  if (playerMove === opponentMove) {
    return RESULTS.TIE;
  }
  
  // Caso 2: La mossa del giocatore batte quella dell'avversario = vittoria
  // Controlla se nella tabella WINNING_COMBINATIONS la mossa del giocatore
  // corrisponde alla mossa che viene battuta dall'avversario
  if (WINNING_COMBINATIONS[playerMove] === opponentMove) {
    return RESULTS.WIN;
  }
  
  // Caso 3: Tutti gli altri casi = sconfitta
  return RESULTS.LOSE;
};

/**
 * Restituisce tutte le mosse disponibili
 * FUNZIONE AUTOMATICAMENTE ESTENDIBILE: si aggiorna automaticamente
 * quando vengono aggiunte nuove mosse all'enum MOVES
 * @returns {Array} Array contenente tutte le mosse disponibili
 */
export const getAllMoves = () => Object.values(MOVES);

/**
 * Valida se una mossa è valida
 * FUNZIONE AUTOMATICAMENTE ESTENDIBILE: controlla automaticamente
 * tutte le mosse definite nell'enum MOVES
 * @param {string} move - La mossa da validare
 * @returns {boolean} True se la mossa è valida, false altrimenti
 */
export const isValidMove = (move) => {
  // Controlla se la mossa fornita è presente tra i valori dell'enum MOVES
  return Object.values(MOVES).includes(move);
};

/**
 * Restituisce il nome di una mossa
 * FUNZIONE SEMPLIFICATA: restituisce direttamente il valore della mossa
 * Questa funzione è stata semplificata per non utilizzare un mapping separato
 * @param {string} move - La mossa di cui ottenere il nome
 * @returns {string} Il nome della mossa o stringa vuota se non valida
 */
export const getMoveName = (move) => {
  // Restituisce direttamente il valore della mossa (es. 'rock', 'paper', 'scissors')
  return move || '';
};

/**
 * Restituisce l'emoji corrispondente a una mossa
 * FUNZIONE AUTOMATICAMENTE ESTENDIBILE: funziona con qualsiasi mossa
 * definita nel mapping MOVE_EMOJIS
 * @param {string} move - La mossa di cui ottenere l'emoji
 * @returns {string} L'emoji della mossa 
 */
export const getMoveEmoji = (move) => {

  return MOVE_EMOJIS[move];
};

/**
 * Restituisce il messaggio corrispondente al risultato
 * FUNZIONE DI PRESENTAZIONE: converte i risultati in messaggi leggibili
 * @param {string} result - Il risultato (win/lose/tie)
 * @returns {string} Il messaggio corrispondente al risultato
 */
export const getResultMessage = (result) => {
  switch (result) {
    case RESULTS.WIN:
      return 'You won!';    // Messaggio di vittoria
    case RESULTS.LOSE:
      return 'You lost!';   // Messaggio di sconfitta
    case RESULTS.TIE:
      return 'Tie!';        // Messaggio di pareggio
    default:
      return 'Error: Unknown result';            // Fallback per risultati non riconosciuti
  }
};