"use client";
import { useState } from 'react';
import { RouteButton, SubmitButton } from '../components/Buttons';
import {useRouter} from "next/navigation";
import {addSet} from "@/app/components/DatabaseQuery";

export default function NewSet() {
    const [setName, setSetName] = useState("");
    const [setDesc, setSetDesc] = useState("");
    const router = useRouter(); /* Conditional Routing */

    const handleSubmit = async () => {
      console.log("Submitting new set...");
      const setID = await addSet(setName, setDesc);
      const setIDNumber = (typeof setID === "number" && !isNaN(setID)) ? setID : -1;
      console.log(`"${setIDNumber}"`);
      router.push(`/editset?setID=${setIDNumber}`);
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
    
      <section className="inputButtons">
        <SubmitButton text = "Submit" onClick={handleSubmit}/>
        <RouteButton text = "Return" dest = "" />
      </section>

    </div>
  );
}
