// PUNTO DI INGRESSO DELL'APPLICAZIONE REACT
// Questo file è responsabile del rendering iniziale dell'applicazione nel DOM

// Import delle dipendenze React necessarie
import React from 'react';                    // Libreria React core
import ReactDOM from 'react-dom/client';      // API per il rendering nel DOM (React 18+)
import './index.css';                         // Stili globali e configurazione Tailwind CSS
import App from './App';                      // Componente principale dell'applicazione

// INIZIALIZZAZIONE DELL'APPLICAZIONE
// Crea il root React collegato all'elemento HTML con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// RENDERING DELL'APPLICAZIONE
// Renderizza l'applicazione all'interno di React.StrictMode per controlli aggiuntivi in sviluppo
root.render(
  <React.StrictMode>
    {/* React.StrictMode aiuta a identificare problemi potenziali durante lo sviluppo */}
    <App />  {/* Componente principale che contiene tutta la logica del gioco */}
  </React.StrictMode>
);

// NOTA: React.StrictMode è attivo solo in modalità sviluppo e non influisce sulla produzione