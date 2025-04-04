import { useState, useEffect} from 'react';
import {getWords, removeWord} from "@/app/components/DatabaseQuery";
import { useRouter} from "next/navigation";
import {SubmitButton, RouteButton} from "@/app/components/Buttons";
import Word from "@/types/word";

export default function EditSet({setID} : {setID : number}) {
    const [wordList, setWordList] = useState<Word[]>([]);
    const router = useRouter();

    const getAllWords = async(set_id : number) => {
        console.log("Getting Words...")
        const result = await getWords(set_id);
        setWordList(result);
    };

    /* Retrieve All Words from Set */
    useEffect(() => {
    getAllWords(setID);
    }, []);

    const handleWordAdd = () => {
        console.log("Add Word Clicked");
        router.push(`/wordfield?setID=${setID}&wordID=${-1}`);
    }

    const handleWordEdit = async (wordID: number) => {
        router.push(`/wordfield?setID=${setID}&wordID=${wordID}`);
    };

    const handleWordDelete = async (wordID: number) => {
        console.log("Deleting Word...");
        const response = await removeWord(setID, wordID);
        if (response.result) {
            setWordList((prevWordList) => prevWordList.filter((word) => word.id !== wordID));
            console.log(`Set ${wordID} deleted successfully`);
        } else {
            console.error(`Failed to delete word ${wordID}`);
        }
    }

    /* Consider changing to Edit Set: {Name of Set!} */
    return (
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <h1 style={{ color: "#000" }}>Edit Set {setID}</h1> 
            <RouteButton text = "Home" dest = "" />
            <SubmitButton text="Add Word" onClick={() => handleWordAdd()} />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Front1</th>
                        <th>Front2</th>
                        <th>Back1</th>
                        <th>Back2</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wordList.length > 0 ? (
                        wordList.map((word: any) => (
                            <tr key={word.id}>
                                <td>{word.id}</td>
                                <td>{word.front1}</td>
                                <td>{word.front2}</td>
                                <td>{word.back1}</td>
                                <td>{word.back2}</td>
                                <td>
                                    <SubmitButton 
                                        text="Edit" 
                                        onClick={() => handleWordEdit(word.id)} 
                                    />
                                    <SubmitButton 
                                        text="Delete" 
                                        onClick={() => handleWordDelete(word.id)} 
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Words available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}