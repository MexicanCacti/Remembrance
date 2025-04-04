import { useState, useEffect} from 'react';
import {getWords} from "@/app/components/DatabaseQuery";
import { useRouter} from "next/navigation";
import {SubmitButton, RouteButton} from "@/app/components/Buttons";
import Word from "@/types/word";
import FlashCard from "@/app/components/Flashcards";

export default function ReviewSet({setID} : {setID : number}) {
    const [wordList, setWordList] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const getAllWords = async(set_id : number) => {
        console.log("Getting Words...")
        const result = await getWords(set_id);
        setWordList(result);
    };

    /* Retrieve All Words from Set */
    useEffect(() => {
    getAllWords(setID);
    }, [setID]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % wordList.length);
    };

    
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + wordList.length) % wordList.length);
    };

    /* Consider changing to Review Set: {Name of Set!} */
    return (
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <RouteButton text="Home" dest=""/>
            <h1 style={{ color: "#000" }}>Review Set {setID}</h1>
            {wordList.length > 0 ? (
                <div>
                    <FlashCard
                        front1={wordList[currentIndex]?.front1}
                        front2={wordList[currentIndex]?.front2}
                        back1={wordList[currentIndex]?.back1}
                        back2={wordList[currentIndex]?.back2}
                    />
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={handlePrevious} disabled={currentIndex === 0}>
                            Previous
                        </button>
                        <button onClick={handleNext} disabled={currentIndex === wordList.length - 1}>
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading words...</p>
            )}
        </div>
    );
}