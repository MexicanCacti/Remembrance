"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addWord, updateWord } from "@/app/components/DatabaseQuery";  // Assuming you have addWord function

export default function WordField () {
    const searchParams = useSearchParams();
    const setID = parseInt(searchParams.get("setID") || "0", 10);
    const wordID = parseInt(searchParams.get("wordID") || "-1", 10);

    const [front1, setFront1] = useState("");
    const [front2, setFront2] = useState("");
    const [back1, setBack1] = useState("");
    const [back2, setBack2] = useState("");
    const router = useRouter();

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        
        const word = {
            id: wordID,
            front1: front1,
            front2: front2,
            back1: back1,
            back2: back2
        };

        try{
            if(wordID === -1){
                await addWord(setID, word);
            }
            else{
                await updateWord(setID, word, wordID);
            }
            router.push(`/editset?setID=${setID}`);
        }
        catch(error){
            console.error("Error adding word:", error);
        }
    }

    return (
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <h1>{wordID < 0 ? "Add Word to " : "Edit Word from "} Set {setID}</h1>
            <form onSubmit={handleSubmit}>
                <label>Front1: </label>
                <input value={front1} onChange={(e) => setFront1(e.target.value)} />

                <label>Front2: </label>
                <input value={front2} onChange={(e) => setFront2(e.target.value)} />

                <label>Back1: </label>
                <input value={back1} onChange={(e) => setBack1(e.target.value)} />

                <label>Back2: </label>
                <input value={back2} onChange={(e) => setBack2(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};