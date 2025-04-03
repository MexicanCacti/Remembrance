"use client";
import { useState } from 'react';
import { RouteButton, SubmitButton } from '../components/Buttons';
import {useRouter} from "next/navigation";
import {addSet} from "@/app/components/DatabaseQuery";

export default function NewSet() {
    const [setName, setSetName] = useState("");
    const [setDesc, setSetDesc] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); /* Conditional Routing */

    const handleSubmit = async () => {
        const success = await addSet(setName, setDesc);
        if(success){
            router.push("/");
        }
        else{
            setError("Set name already exists or error occurred!");
        }
    };

  return (
    <div className="newSetLayout">
      <title>It's time to create!</title>
      
      <h1 className="dailyMessage">It's time to create!</h1>

      <section className="inputField">
        <label>
            Set Name:
            <input
                name="setName"
                value = {setName}
                onChange = {(e) => setSetName(e.target.value)}
            />
            Description:
            <input
                name="setDesc"
                value = {setDesc}
                onChange = {(e) => setSetDesc(e.target.value)}
            />
        </label>
      </section>
      
      {error && <p className="errorMessage">{error}</p>}
    
      <section className="inputButtons">
        <SubmitButton onClick={handleSubmit} text = "Submit" />
        <RouteButton
            text = "Return"
            dest = ""
        />
      </section>

    </div>
  );
}
