import { useState } from 'react';

interface FlashCardProps {
    front1: string;
    front2: string | null;
    back1: string;
    back2: string | null;
}

const FlashCard: React.FC<FlashCardProps> = ({ front1, front2, back1, back2 }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div
            onClick={handleFlip}
            style={{
                width: '200px',
                height: '300px',
                perspective: '1000px',
                display: 'inline-block',
                margin: '20px',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : '',
                    transition: 'transform 0.6s',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '18px',
                        textAlign: 'center',
                    }}
                >
                    <div>
                        <p>{front1}</p>
                        <p>{front2}</p>
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '18px',
                        textAlign: 'center',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <div>
                        <p>{back1}</p>
                        <p>{back2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
