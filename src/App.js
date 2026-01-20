import React, { useState } from "react";
import "./App.css";
import Button from "./components/button";
import MemoryBoard from "./components/MemoryBoard";
import Title from "./components/Title";

function App() {
  // Clé pour réinitialiser le jeu Memory
  const [resetKey, setResetKey] = useState(0);
  // État pour savoir si une partie est en cours
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Fonction pour démarrer une nouvelle partie
  const handleStartGame = () => {
    setIsGameStarted(true);
    setResetKey((prevKey) => prevKey + 1);
  };

  // Fonction appelée quand le jeu est terminé (toutes les paires trouvées)
  const handleGameComplete = () => {
    setIsGameStarted(false);
  };

  // Fonction pour réinitialiser le jeu (sans quitter la partie)
  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>

      {/* Composant Title qui gère l'affichage du leaderboard et du bouton démarrer */}
      <Title isGameStarted={isGameStarted} onStartGame={handleStartGame}>
        <section className="leaderboard">
          <h2 className="leaderboard-title">Memory-React</h2>

          {/* <div className="leaderboard-top3">
            <table border="0" className="score-table-Top3">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>Score</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="leaderboard-grid">
            <table
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="score-table-Top20"
            >
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Username</td>
                  <td>Score</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </section>
      </Title>

      {/* Afficher la section Memory uniquement si le jeu est en cours */}
      {isGameStarted && (
        <section className="memory-section">
          <article className="memory-score">
            {/* <span
              style={{
                position: "absolute",
                top: "10px",
                right: "100px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "gold",
              }}
            >
              Score :<span id="current-score">0</span>
              Temps :
              <span id="timer" data-duration="60">
                01:00
              </span>
            </span> */}
          </article>

          <h2 className="memory-title" style={{ marginTop: "-100px" }}>
            Grille Personnalisée
          </h2>

          {/* Composant MemoryBoard avec callback de fin de partie */}
          <MemoryBoard
            resetKey={resetKey}
            onGameComplete={handleGameComplete}
          />

          <div
            className="reset-form"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              className="reset-button"
              onClick={handleReset}
            >
              Reset Session
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
