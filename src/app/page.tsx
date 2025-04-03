"use client";
import {RouteButton} from './components/Buttons';
import { useState, useEffect} from 'react';
import {initTables} from "@/app/components/DatabaseQuery";

export default function Home() {
  const [createdTable, setCreatedTable] = useState(false);

  /* FIX ME: Runs EVERY time page is loaded... should run only once! */
  useEffect(() => {
    const initDB = async() => {
      console.log("Checking Table Status...")
      const success = await initTables();
      if(success === true){
        console.log("Database init Success!");
        setCreatedTable(true);
      }
      else{
        console.log("Database init failed!");
      }
    };
    
    if(!createdTable){
      initDB();
    }
  }, []);

  return (
    <div className="homeLayout">
      <title>It's time to remember!</title>
      
      <h1 className="dailyMessage">It's time to remember!</h1>

      <section className="navButtons">
        <RouteButton
          text = "New Set"
          dest = "newset"
        />
        <RouteButton
        text = "Review Set"
        dest = "reviewset"
        />
        <RouteButton
        text = "Edit Set"
        dest = "editset"
        />
      </section>

    </div>
  );
}
