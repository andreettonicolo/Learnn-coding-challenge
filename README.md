# Coding Problems - Soluzioni

Questo repository contiene le soluzioni a due problemi di programmazione:

1. **FooBar**: Un semplice programma Python che stampa numeri da 1 a 100 con sostituzioni specifiche.
2. **Carta, Forbice e Sasso**: Un'applicazione web interattiva che implementa il classico gioco con diverse modalità.

## Problema 1: FooBar

### Descrizione del Problema

Scrivi un piccolo programma che stampi ogni numero da 1 a 100 su una nuova riga.
- Per ogni multiplo di 3, stampa "Foo" invece del numero.
- Per ogni multiplo di 5, stampa "Bar" invece del numero.
- Per ogni numero multiplo di 3 e 5 insieme, stampa "FooBar" invece del numero.

### Implementazione

Il programma è implementato in Python e utilizza un semplice ciclo `for` con controlli condizionali per determinare cosa stampare per ogni numero.

```python
# FOOBAR - Problema di programmazione
# Stampa numeri da 1 a 100 con sostituzioni:
# - Multipli di 3: "Foo"
# - Multipli di 5: "Bar"
# - Multipli di 3 e 5: "FooBar"

for numero in range(1, 101):
    if numero % 3 == 0 and numero % 5 == 0:
        print("FooBar")
    elif numero % 3 == 0:
        print("Foo")
    elif numero % 5 == 0:
        print("Bar")
    else:
        print(numero)
```

### Come Eseguire

Per eseguire il programma FooBar:

```bash
python foobar.py
```

## Problema 2: Carta, Forbice e Sasso

### Descrizione del Progetto

Questo progetto implementa il classico gioco "Carta, Forbice e Sasso" (Rock, Paper, Scissors) con un'interfaccia web moderna e reattiva. Il gioco è stato sviluppato utilizzando React e Tailwind CSS, seguendo le migliori pratiche di sviluppo software e con un'architettura estendibile.

### Funzionalità

- **Modalità di gioco multiple**:
  - Umano vs Computer: Permette all'utente di giocare contro il computer
  - Computer vs Computer: Simula partite automatiche tra due computer

- **Interfaccia utente intuitiva**:
  - Design responsive con Tailwind CSS
  - Feedback visivo chiaro con emoji e colori
  - Cronologia delle partite
  - Statistiche di gioco (vittorie, sconfitte, pareggi)

- **Funzionalità avanzate**:
  - Modalità autoplay per Computer vs Computer
  - Possibilità di iniziare una nuova partita in qualsiasi momento
  - Visualizzazione dettagliata dei risultati

### Architettura del Codice

Il progetto è strutturato seguendo principi di modularità e separazione delle responsabilità:

- **gameLogic.js**: Contiene tutta la logica di gioco, indipendente dall'interfaccia utente
  - Definizione delle mosse e dei risultati possibili
  - Logica per determinare il vincitore
  - Funzioni di utilità per la gestione del gioco

- **App.js**: Componente React principale che gestisce:
  - Stato dell'applicazione
  - Interfaccia utente
  - Interazione con la logica di gioco

### Estendibilità

Il codice è stato progettato per essere facilmente estendibile. Ad esempio, per aggiungere la variante "Rock, Paper, Scissors, Lizard, Spock" sarebbe necessario:

1. Aggiungere le nuove mosse nell'enum `MOVES` in gameLogic.js
2. Aggiungere i corrispondenti emoji nel mapping `MOVE_EMOJIS`
3. Aggiornare le regole del gioco in `WINNING_COMBINATIONS`

Tutte le altre funzionalità (generazione mosse casuali, interfaccia utente, cronologia, ecc.) si adatterebbero automaticamente alle nuove mosse senza ulteriori modifiche.

### Tecnologie Utilizzate

- **React**: Per la costruzione dell'interfaccia utente
- **Tailwind CSS**: Per lo styling e il design responsive
- **JavaScript ES6+**: Per la logica di applicazione

### Come Eseguire il Progetto

Per eseguire il progetto Carta, Forbice e Sasso:

1. Naviga nella cartella del progetto:
   ```bash
   cd "Carta, forbice e sasso"
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm start
   ```

4. Apri il browser all'indirizzo [http://localhost:3000](http://localhost:3000)

### Struttura del Progetto

```
Carta, forbice e sasso/
├── public/
│   └── index.html
├── src/
│   ├── App.js         # Componente principale React
│   ├── gameLogic.js   # Logica di gioco
│   ├── index.css      # Stili globali
│   └── index.js       # Entry point
├── package.json       # Dipendenze e script
└── tailwind.config.js # Configurazione Tailwind CSS
```

## Struttura del Repository

```
/
├── foobar.py                  # Soluzione al problema FooBar
├── Carta, forbice e sasso/    # Cartella del progetto Rock, Paper, Scissors
│   ├── public/
│   ├── src/
│   └── ...
└── README.md                  # Questo file
```