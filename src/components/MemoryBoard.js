import React, { useState, useEffect } from 'react';
import Card from './Card';

// === LISTE DES IMAGES ===
const IMAGES = [
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

// === FONCTION: Mélanger un tableau ===
function melanger(tableau) {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}

// === FONCTION: Créer les cartes du jeu ===
function creerCartes() {
    // Prendre 3 images au hasard
    const imagesChoisies = melanger(IMAGES).slice(0, 3);

    // Créer 2 cartes par image (= 6 cartes, 3 paires)
    const cartes = [];
    imagesChoisies.forEach((image, index) => {
        cartes.push({ id: index * 2, pairId: index, image, retournee: false, trouvee: false });
        cartes.push({ id: index * 2 + 1, pairId: index, image, retournee: false, trouvee: false });
    });

    return melanger(cartes);
}

// === COMPOSANT PRINCIPAL ===
function MemoryBoard({ resetKey, onGameComplete }) {
    const [cartes, setCartes] = useState(creerCartes);
    const [selection, setSelection] = useState([]);     // Les 2 cartes cliquées
    const [bloque, setBloque] = useState(false);        // Bloque les clics pendant la vérif
    const [paires, setPaires] = useState(0);            // Nombre de paires trouvées

    // Reset quand resetKey change
    useEffect(() => {
        setCartes(creerCartes());
        setSelection([]);
        setBloque(false);
        setPaires(0);
    }, [resetKey]);

    // Victoire: 3 paires trouvées
    useEffect(() => {
        if (paires === 3 && onGameComplete) {
            setTimeout(onGameComplete, 1500);
        }
    }, [paires, onGameComplete]);

    // === CLIC SUR UNE CARTE ===
    function cliquerCarte(id) {
        if (bloque) return;
        if (selection.length >= 2) return;
        if (selection.includes(id)) return;

        // Retourner la carte
        setCartes(prev => prev.map(c =>
            c.id === id ? { ...c, retournee: true } : c
        ));

        const nouvelleSelection = [...selection, id];
        setSelection(nouvelleSelection);

        // Si 2 cartes sélectionnées → vérifier
        if (nouvelleSelection.length === 2) {
            verifierPaire(nouvelleSelection[0], nouvelleSelection[1]);
        }
    }

    // === VÉRIFIER SI C'EST UNE PAIRE ===
    function verifierPaire(id1, id2) {
        setBloque(true);

        setTimeout(() => {
            const carte1 = cartes.find(c => c.id === id1);
            const carte2 = cartes.find(c => c.id === id2);

            if (carte1.pairId === carte2.pairId) {
                // PAIRE TROUVÉE !
                setPaires(p => p + 1);
                setCartes(prev => prev.map(c =>
                    c.id === id1 || c.id === id2
                        ? { ...c, trouvee: true, retournee: false }
                        : c
                ));
            } else {
                // Pas une paire → retourner face cachée
                setCartes(prev => prev.map(c =>
                    c.id === id1 || c.id === id2
                        ? { ...c, retournee: false }
                        : c
                ));
            }

            setSelection([]);
            setBloque(false);
        }, 1000);
    }

    // === AFFICHAGE ===
    return (
        <div>
            {paires === 3 && (
                <div style={{
                    textAlign: 'center',
                    color: '#39ff14',
                    fontSize: '1.5rem',
                    marginBottom: '20px',
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.8)'
                }}>
                    🎉 Vous avez trouvé toutes les paires !
                </div>
            )}

            <div className="memory-board memory-board--facile">
                {cartes.map(carte => (
                    <Card
                        key={carte.id}
                        id={carte.id}
                        image={carte.image}
                        isFlipped={carte.retournee}
                        isMatched={carte.trouvee}
                        onClick={cliquerCarte}
                    />
                ))}
            </div>
        </div>
    );
}

export default MemoryBoard;
