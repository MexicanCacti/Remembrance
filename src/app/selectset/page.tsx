"use client"
import { useState, useEffect} from 'react';
import {getSets, removeSet, updateLastUsed} from "@/app/components/DatabaseQuery";
import { useRouter} from "next/navigation";
import {SubmitButton} from "@/app/components/Buttons";
import Set from "@/types/set";

export default function SelectSet(){
    const [setList, setSetList] = useState<Set[]>([]);
    const router = useRouter();

    /* Retrieve All Sets */
    useEffect(() => {
    const getAllSets = async() => {
        console.log("Getting Sets...")
        const result = await getSets();
        setSetList(result);
    };
    getAllSets();
    }, []);

    const handleSetSelect = async (setID: number) => {
        const response = await updateLastUsed(setID);
        router.push(`/editset?setID=${setID}`);
    };

    const handleSetDelete = async (setID: number) => {
        const response = await removeSet(setID);
        if (response.result) {
            setSetList((prevSetList) => prevSetList.filter((set) => set.id !== setID));
            console.log(`Set ${setID} deleted successfully`);
        } else {
            console.error(`Failed to delete set ${setID}`);
        }
    }

    return (
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <h1 style={{ color: "#000" }}>Select Set</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {setList.length > 0 ? (
                        setList.map((set: any) => (
                            <tr key={set.id}>
                                <td>{set.id}</td>
                                <td>{set.name}</td>
                                <td>{set.description}</td>
                                <td>
                                    <SubmitButton 
                                        text="Edit" 
                                        onClick={() => handleSetSelect(set.id)} 
                                    />
                                    <SubmitButton 
                                        text="Delete" 
                                        onClick={() => handleSetDelete(set.id)} 
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No sets available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}