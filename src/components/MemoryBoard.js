import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';

// Liste de toutes les images disponibles (12 cartes)
const ALL_CARD_IMAGES = [
    '/images/TestCarte1.png',
    '/images/TestCarte2.png',
    '/images/TestCarte3.png',
    '/images/TestCarte4.png',
    '/images/TestCarte5.png',
    '/images/TestCarte6.png',
    '/images/TestCarte7.png',
    '/images/TestCarte8.png',
    '/images/TestCarte9.png',
    '/images/TestCarte10.png',
    '/images/TestCarte11.png',
    '/images/TestCarte12.png',
];

/**
 * Fonction de mélange (Fisher-Yates shuffle)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Génère les cartes pour le jeu (6 cartes = 3 paires)
 * Sélectionne 3 images aléatoires et les duplique
 */
function generateCards() {
    // Mélanger toutes les images et en prendre 3
    const shuffledImages = shuffleArray(ALL_CARD_IMAGES);
    const selectedImages = shuffledImages.slice(0, 3);

    // Créer les paires (chaque image apparaît 2 fois)
    const cardPairs = [];
    selectedImages.forEach((image, index) => {
        // Deux cartes avec la même image
        cardPairs.push({
            id: index * 2,
            pairId: index,
            image: image,
            isFlipped: false,
            isMatched: false,
        });
        cardPairs.push({
            id: index * 2 + 1,
            pairId: index,
            image: image,
            isFlipped: false,
            isMatched: false,
        });
    });

    // Mélanger les cartes
    return shuffleArray(cardPairs);
}

/**
 * Composant MemoryBoard - Gère la grille de cartes Memory
 * 
 * @param {Object} props
 * @param {function} props.onReset - Callback pour réinitialiser le jeu (passé par le parent)
 * @param {number} props.resetKey - Clé pour forcer le reset
 */
function MemoryBoard({ resetKey, onGameComplete }) {
    const [cards, setCards] = useState(() => generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);

    // Réinitialiser le jeu quand resetKey change
    useEffect(() => {
        setCards(generateCards());
        setFlippedCards([]);
        setIsChecking(false);
        setMatchedPairs(0);
    }, [resetKey]);

    // Notifier le parent quand le jeu est terminé
    // Note: En mode Strict de React (dev), matchedPairs atteint 6 au lieu de 3 (double-increment)
    // ajout d'une verification pour le mode "strict" = development, qui lis la valeur 2fois, donc, ajout condition 3 pair sans mode dev
    const totalPairs = process.env.NODE_ENV === 'development' ? 6 : 3;
    const isComplete = matchedPairs >= totalPairs;

    useEffect(() => {
        if (isComplete) {
            if (onGameComplete) {
                const timer = setTimeout(() => {
                    onGameComplete();
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [isComplete, onGameComplete]);

    // Vérifier si deux cartes sont identiques
    const checkForMatch = useCallback((card1Id, card2Id) => {
        setIsChecking(true);

        setTimeout(() => {
            setCards(prevCards => {
                const card1 = prevCards.find(c => c.id === card1Id);
                const card2 = prevCards.find(c => c.id === card2Id);

                if (card1.pairId === card2.pairId) {
                    // C'est une paire !
                    setMatchedPairs(prev => prev + 1);
                    return prevCards.map(card =>
                        card.id === card1Id || card.id === card2Id
                            ? { ...card, isMatched: true, isFlipped: false }
                            : card
                    );
                } else {
                    // Pas une paire, retourner les cartes
                    return prevCards.map(card =>
                        card.id === card1Id || card.id === card2Id
                            ? { ...card, isFlipped: false }
                            : card
                    );
                }
            });

            setFlippedCards([]);
            setIsChecking(false);
        }, 1000);
    }, []);

    // Gérer le clic sur une carte
    const handleCardClick = useCallback((cardId) => {
        if (isChecking) return;
        if (flippedCards.length >= 2) return;
        if (flippedCards.includes(cardId)) return;

        // Retourner la carte
        setCards(prevCards =>
            prevCards.map(card =>
                card.id === cardId ? { ...card, isFlipped: true } : card
            )
        );

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        // Si deux cartes sont retournées, vérifier la correspondance
        if (newFlippedCards.length === 2) {
            checkForMatch(newFlippedCards[0], newFlippedCards[1]);
        }
    }, [flippedCards, isChecking, checkForMatch]);

    // Vérifier si le jeu est terminé
    const isGameComplete = matchedPairs === 3;

    return (
        <div>
            {isGameComplete && (
                <div style={{
                    textAlign: 'center',
                    color: '#39ff14',
                    fontSize: '1.5rem',
                    marginBottom: '20px',
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.8)'
                }}>
                    🎉 Félicitations ! Vous avez trouvé toutes les paires ! 🎉
                </div>
            )}
            <div
                className="memory-board memory-board--facile"
                data-total-pairs="3"
                data-difficulty="facile"
            >
                {cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        image={card.image}
                        isFlipped={card.isFlipped}
                        isMatched={card.isMatched}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default MemoryBoard;
