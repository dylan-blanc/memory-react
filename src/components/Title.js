import React from 'react';
import Button from './button';

/**
 * Composant Title - Gère l'affichage du leaderboard et le démarrage du jeu
 * 
 * @param {Object} props
 * @param {boolean} props.isGameStarted - Indique si une partie est en cours
 * @param {function} props.onStartGame - Callback pour démarrer une partie
 * @param {React.ReactNode} props.children - Contenu du leaderboard (passé par le parent)
 */
function Title({ isGameStarted, onStartGame, children }) {
    return (
        <div className="title-container">
            {/* Afficher le leaderboard uniquement si le jeu n'est pas en cours */}
            {!isGameStarted && (
                <>
                    {children}
                    <div className="start-game-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '30px',
                        marginBottom: '20px'
                    }}>
                        <Button
                            className="start-game-button"
                            onClick={onStartGame}
                        >
                            🎮 Démarrer la partie
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Title;
