
import React, { useState, useEffect } from 'react';

// Import di tutte le funzioni e costanti dalla logica di gioco

import {
  MOVES,                // Enum delle mosse disponibili
  RESULTS,              // Enum dei risultati possibili
  generateComputerMove, // Funzione per generare mosse casuali del computer
  determineWinner,      // Funzione per determinare il vincitore
  getAllMoves,          // Funzione per ottenere tutte le mosse disponibili
  getMoveName,          // Funzione per ottenere il nome di una mossa
  getMoveEmoji,         // Funzione per ottenere l'emoji di una mossa
  getResultMessage      // Funzione per ottenere il messaggio del risultato
} from './gameLogic';

// Modalità di gioco disponibili
const GAME_MODES = {
  HUMAN_VS_COMPUTER: 'human_vs_computer',        // Modalità Umano vs Computer
  COMPUTER_VS_COMPUTER: 'computer_vs_computer'   // Modalità Computer vs Computer
};

/**
 * Componente principale dell'applicazione Rock, Paper, Scissors
 */
function App() {
  // STATO DEL GIOCO - Gestione centralizzata di tutti i dati dell'applicazione
  
  // Modalità di gioco corrente (Human vs Computer / Computer vs Computer)
  const [gameMode, setGameMode] = useState(GAME_MODES.HUMAN_VS_COMPUTER);
  
  // Mossa del giocatore 1 (umano o computer a seconda della modalità)
  const [playerMove, setPlayerMove] = useState(null);
  
  // Mossa del giocatore 2 (sempre computer)
  const [computerMove, setComputerMove] = useState(null);
  
  // Risultato dell'ultima partita (win/lose/tie)
  const [result, setResult] = useState(null);
  
  // Punteggio cumulativo delle partite
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  
  // Cronologia delle ultime 10 partite
  const [gameHistory, setGameHistory] = useState([]);
  
  // Flag per indicare se l'autoplay è attivo (solo per Computer vs Computer)
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Riferimento all'intervallo per l'autoplay
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  // FUNZIONE PRINCIPALE DEL GIOCO - CORE LOGIC ESTENDIBILE
  /**
   * ESTENDIBILITÀ: Può facilmente supportare nuove modalità di gioco
   * @param {string|null} humanMove - La mossa dell'umano (solo per modalità Human vs Computer)
   */
  const playGame = (humanMove = null) => {
    let player1Move, player2Move;
    
    // Determina le mosse in base alla modalità di gioco
    if (gameMode === GAME_MODES.HUMAN_VS_COMPUTER) {
      // Modalità Umano vs Computer: usa la mossa dell'umano e genera una per il computer
      player1Move = humanMove;
      player2Move = generateComputerMove();
    } else {
      // Modalità Computer vs Computer: genera entrambe le mosse casualmente
      player1Move = generateComputerMove();
      player2Move = generateComputerMove();
    }


    // Determina il vincitore utilizzando la logica di gioco modulare
    const gameResult = determineWinner(player1Move, player2Move);
    
    // Aggiorna lo stato dell'interfaccia con i risultati
    setPlayerMove(player1Move);
    setComputerMove(player2Move);
    setResult(gameResult);
    
    // AGGIORNAMENTO DEL PUNTEGGIO - Gestione immutabile dello stato
    setScore(prevScore => {
      // Crea una copia dello stato precedente per mantenere l'immutabilità
      const newScore = { ...prevScore };
      // Incrementa il contatore appropriato in base al risultato
      if (gameResult === RESULTS.WIN) newScore.wins++;
      else if (gameResult === RESULTS.LOSE) newScore.losses++;
      else newScore.ties++;
      return newScore;
    });
    
    // AGGIORNAMENTO CRONOLOGIA - Mantiene solo le ultime 10 partite
    setGameHistory(prev => [{
      player1: player1Move,        // Mossa del giocatore 1
      player2: player2Move,        // Mossa del giocatore 2
      result: gameResult,          // Risultato della partita
      timestamp: new Date().toLocaleTimeString()  // Timestamp della partita
    }, ...prev].slice(0, 10)); // Mantiene solo le ultime 10 partite per performance
  };

  // FUNZIONE DI RESET - Ripristina lo stato iniziale del gioco
  /**
   * Resetta completamente il gioco riportando tutti i valori allo stato iniziale
   */
  const startNewGame = () => {
    setPlayerMove(null);                            
    setComputerMove(null);                           
    setResult(null);                                  
    setScore({ wins: 0, losses: 0, ties: 0 });      
    setGameHistory([]);                               
    stopAutoPlay();                                   
  };

  // FUNZIONE AUTOPLAY - Gestisce il gioco automatico Computer vs Computer
  /**
   * Avvia l'autoplay per la modalità Computer vs Computer
   */
  const startAutoPlay = () => {
    if (gameMode === GAME_MODES.COMPUTER_VS_COMPUTER) {
      setIsPlaying(true);  
      const interval = setInterval(() => {
        playGame();  // Esegue una partita automatica
      }, 2000); // Intervallo configurabile per diverse velocità di gioco
      setAutoPlayInterval(interval);  // Salva il riferimento per poterlo fermare
    }
  };

  /**
   * Ferma l'autoplay e pulisce l'intervallo
   * GESTIONE DELLE RISORSE: Importante per evitare memory leaks
   */
  const stopAutoPlay = () => {
    setIsPlaying(false);  // Disattiva il flag di gioco
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);  // Ferma l'intervallo
      setAutoPlayInterval(null);        // Pulisce il riferimento
    }
  };


  // GESTIONE CAMBIO MODALITÀ - Ferma l'autoplay quando si cambia modalità
  /**
   * useEffect che ferma automaticamente l'autoplay quando si cambia modalità di gioco
   */
  useEffect(() => {
    stopAutoPlay();  // Ferma l'autoplay ogni volta che cambia la modalità
  }, [gameMode]);  // Dipendenza: si riesegue quando gameMode cambia

  // COMPONENTE DI RENDERING - Pulsante per le mosse
  /**
   * Renderizza un pulsante per una specifica mossa del gioco
   * @param {string} move - La mossa da renderizzare
   * @returns {JSX.Element} Il pulsante della mossa
   */
  const renderMoveButton = (move) => (
    <button
      key={move}  // Chiave unica per React
      onClick={() => playGame(move)}  // Esegue il gioco con la mossa selezionata
      disabled={gameMode === GAME_MODES.COMPUTER_VS_COMPUTER}  // Disabilita in modalità Computer vs Computer
      className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2 min-w-[120px]"
    >
      {/* Emoji della mossa - si adatta automaticamente a nuove mosse */}
      <span className="text-3xl">{getMoveEmoji(move)}</span>
      {/* Nome della mossa - si adatta automaticamente a nuove mosse */}
      <span className="text-sm">{getMoveName(move)}</span>
    </button>
  );

  // COMPONENTE DI RENDERING - Risultato della partita
  /**
   * Renderizza il risultato dell'ultima partita giocata
   * @returns {JSX.Element|null} Il componente del risultato o null se non ci sono mosse
   */
  const renderGameResult = () => {
    // Non mostra nulla se non ci sono mosse da visualizzare
    if (!playerMove || !computerMove) return null;

    // Determina le etichette dei giocatori in base alla modalità di gioco
    const player1Label = gameMode === GAME_MODES.HUMAN_VS_COMPUTER ? 'You' : 'Computer 1';
    const player2Label = gameMode === GAME_MODES.HUMAN_VS_COMPUTER ? 'Computer' : 'Computer 2';

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {/* Layout a griglia per mostrare le due mosse e il VS */}
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          {/* Sezione Giocatore 1 */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-700 mb-2">{player1Label}</h3>
            <div className="text-6xl mb-2">{getMoveEmoji(playerMove)}</div>
            <p className="text-lg font-medium">{getMoveName(playerMove)}</p>
          </div>
          
          {/* Separatore VS */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-600">VS</div>
          </div>
          
          {/* Sezione Giocatore 2 */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-700 mb-2">{player2Label}</h3>
            <div className="text-6xl mb-2">{getMoveEmoji(computerMove)}</div>
            <p className="text-lg font-medium">{getMoveName(computerMove)}</p>
          </div>
        </div>
        
        {/* Sezione del risultato con colori dinamici */}
        <div className="text-center">
          <p className={`text-2xl font-bold ${
            result === RESULTS.WIN ? 'text-green-600' :     // Verde per vittoria
            result === RESULTS.LOSE ? 'text-red-600' :      // Rosso per sconfitta
            'text-yellow-600'                           // Giallo per pareggio
          }`}>
            {getResultMessage(result)}  {/* Messaggio del risultato localizzato */}
          </p>
        </div>
      </div>
    );
  };

  // RENDERING PRINCIPALE DEL COMPONENTE
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Titolo principale dell'applicazione */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎮 Rock, Paper, Scissors
        </h1>
        
        {/* SEZIONE SELEZIONE MODALITÀ - Interfaccia estendibile per nuove modalità */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Game Mode</h2>
          <div className="flex flex-wrap gap-4">
            {/* Pulsante modalità Umano vs Computer */}
            <button
              onClick={() => setGameMode(GAME_MODES.HUMAN_VS_COMPUTER)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === GAME_MODES.HUMAN_VS_COMPUTER
                  ? 'bg-blue-500 text-white'  // Stile attivo
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'  // Stile inattivo
              }`}
            >
              👤 Human vs Computer
            </button>
            {/* Pulsante modalità Computer vs Computer */}
            <button
              onClick={() => setGameMode(GAME_MODES.COMPUTER_VS_COMPUTER)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gameMode === GAME_MODES.COMPUTER_VS_COMPUTER
                  ? 'bg-blue-500 text-white'  // Stile attivo
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'  // Stile inattivo
              }`}
            >
              🤖 Computer vs Computer
            </button>
          </div>
        </div>

        {/* SEZIONE CONTROLLI DI GIOCO - Interfaccia adattiva per diverse modalità */}
        {gameMode === GAME_MODES.HUMAN_VS_COMPUTER ? (
          // Controlli per modalità Umano vs Computer
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Choose your move:
            </h2>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              {/* Genera automaticamente i pulsanti per tutte le mosse disponibili */}
              {getAllMoves().map(renderMoveButton)}
            </div>
          </div>
        ) : (
          // Controlli per modalità Computer vs Computer
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Computer vs Computer Controls:
            </h2>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              {/* Pulsante per giocare una singola partita */}
              <button
                onClick={() => playGame()}  // Gioca senza parametri (genera mosse automatiche)
                disabled={isPlaying}        // Disabilita durante l'autoplay
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                🎲 Play one game
              </button>
              {/* Controlli autoplay condizionali */}
              {!isPlaying ? (
                // Pulsante per avviare l'autoplay
                <button
                  onClick={startAutoPlay}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  ▶️ Auto play
                </button>
              ) : (
                // Pulsante per fermare l'autoplay
                <button
                  onClick={stopAutoPlay}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  ⏹️ Stop
                </button>
              )}
            </div>
          </div>
        )}

        {/* SEZIONE RISULTATO PARTITA - Mostra il risultato dell'ultima partita */}
        {renderGameResult()}

        {/* SEZIONE PUNTEGGIO - Dashboard delle statistiche di gioco */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Score</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Contatore vittorie */}
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{score.wins}</div>
              <div className="text-sm text-green-700">Wins</div>
            </div>
            {/* Contatore pareggi */}
            <div className="bg-yellow-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">{score.ties}</div>
              <div className="text-sm text-yellow-700">Ties</div>
            </div>
            {/* Contatore sconfitte */}
            <div className="bg-red-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{score.losses}</div>
              <div className="text-sm text-red-700">Losses</div>
            </div>
          </div>
        </div>

        {/* SEZIONE CRONOLOGIA - Mostra le ultime 10 partite giocate */}
        {gameHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Game History</h2>
            {/* Area scrollabile per la cronologia con altezza limitata */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {gameHistory.map((game, index) => (
                // Singola riga della cronologia
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-3 text-sm">
                  {/* Timestamp della partita */}
                  <span className="text-gray-600">{game.timestamp}</span>
                  {/* Visualizzazione delle mosse con emoji */}
                  <div className="flex items-center space-x-2">
                    <span>{getMoveEmoji(game.player1)}</span>
                    <span className="text-gray-500">vs</span>
                    <span>{getMoveEmoji(game.player2)}</span>
                  </div>
                  {/* Risultato con colore dinamico */}
                  <span className={`font-medium ${
                    game.result === RESULTS.WIN ? 'text-green-600' :   // Verde per vittoria
                    game.result === RESULTS.LOSE ? 'text-red-600' :    // Rosso per sconfitta
                    'text-yellow-600'                                   // Giallo per pareggio
                  }`}>
                    {getResultMessage(game.result)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEZIONE RESET - Pulsante per iniziare una nuova sessione di gioco */}
        <div className="text-center">
          <button
            onClick={startNewGame}  // Resetta tutto lo stato del gioco
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
          >
            🔄 New Game
          </button>
        </div>
      </div>
    </div>
  );
}

// EXPORT DEL COMPONENTE PRINCIPALE
// Esporta il componente App come default per l'utilizzo in index.js
export default App;