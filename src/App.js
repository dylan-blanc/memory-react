import React, { useState } from 'react';
import './App.css';
import Button from './components/button';
import MemoryBoard from './components/MemoryBoard';

function App() {
  // Clé pour réinitialiser le jeu Memory
  const [resetKey, setResetKey] = useState(0);

  // Fonction pour réinitialiser le jeu
  const handleReset = () => {
    setResetKey(prevKey => prevKey + 1);
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
      <section className="leaderboard">
        <h2 className="leaderboard-title">Leaderboard</h2>

        <div className="leaderboard-top3">
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
          <table border="0" cellpadding="0" cellspacing="0" className="score-table-Top20">
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
      </section>

      {/* <section className="last-game" style={{ color: "gold", display: "flex", alignItems: "center", alignSelf: "center", flexDirection: "column" }}>
        <h3>Votre partie est terminée</h3>
        <p>Score : <strong>0</strong></p>
        <p>Temps : <strong>00:00</strong></p>
        <p>Difficulté : <strong>Facile/Normal/Difficile</strong></p>
        <form method="post" action="/submit-score" className="username-form">
          <label htmlFor="username">Choisissez un pseudo pour le sauvegarder</label>
          <br />
          <input type="text" name="username" id="username" maxLength="12" required style={{ width: "100px", marginLeft: "50px", marginTop: "10px" }} />
          <Button text="Enregistrer" />
        </form>
      </section> */}

      {/* <form method="post" action="/set-difficulty" className="difficulty-form">
        <label htmlFor="difficulty" className="difficulty-label">Commencer une partie</label>
        <select name="difficulty" id="difficulty" className="difficulty-select">
          <option value="facile"> Facile </option>
          <option value="moyen"> Moyen </option>
          <option value="difficile"> Difficile </option>
        </select>
        <div className="difficulty-form-footer">
          <Button className="difficulty-button" text="Valider" />
        </div>
      </form> */}

      <section className="memory-section">

        <article className="memory-score">
          <span style={{ position: "absolute", top: "10px", right: "100px", fontSize: "18px", fontWeight: "bold", color: "gold" }}>
            Score :
            <span id="current-score">0</span>
            Temps :
            <span id="timer" data-duration="60">01:00</span>

          </span>
        </article>

        <h2 className="memory-title" style={{ marginTop: "-100px" }}>
          Grille Personnalisée
        </h2>

        {/* Composant MemoryBoard avec 6 cartes (3 paires) */}
        <MemoryBoard resetKey={resetKey} />

        <div className="reset-form" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button
            className="reset-button"
            text="Reset Session"
            onClick={handleReset}
          />
        </div>


      </section>

    </div>
  );
}

export default App;
