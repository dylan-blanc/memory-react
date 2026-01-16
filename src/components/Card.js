import React from 'react';

/**
 * Composant Card - Représente une carte individuelle du jeu Memory
 * 
 * @param {Object} props
 * @param {number} props.id - Identifiant unique de la carte
 * @param {string} props.image - Chemin de l'image de la face de la carte
 * @param {boolean} props.isFlipped - État de retournement de la carte
 * @param {boolean} props.isMatched - La carte a été trouvée
 * @param {function} props.onClick - Callback lors du clic sur la carte
 */
function Card({ id, image, isFlipped, isMatched, onClick }) {
    const handleClick = () => {
        // Ne pas permettre de cliquer si déjà retournée ou matchée
        if (!isFlipped && !isMatched && onClick) {
            onClick(id);
        }
    };

    return (
        <label
            className={`memory-card ${isMatched ? 'memory-card--matched' : ''}`}
            data-card-id={id}
            onClick={handleClick}
        >
            <input
                type="checkbox"
                className="memory-card-toggle"
                checked={isFlipped || isMatched}
                readOnly
            />
            <span className="memory-card-inner" style={{ width: "150px", height: "250px" }}>
                <span className="memory-card-face memory-card-face--back">
                    <img
                        src="/images/DosDeCarte1.png"
                        alt="Dos de la carte"
                        width="150"
                        height="250"
                    />
                </span>
                <span className="memory-card-face memory-card-face--front">
                    <img
                        src={image}
                        alt={`Carte ${id}`}
                        width="150"
                        height="250"
                    />
                </span>
            </span>
            <span className="sr-only">Carte {id}</span>
        </label>
    );
}

export default Card;
