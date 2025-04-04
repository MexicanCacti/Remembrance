"use client";
import { useSearchParams } from "next/navigation";
import EditSet from "./EditSet";
import EditSelect from "./EditSelect";

export default function directPage() {
    const searchParams = useSearchParams();
    const setID = searchParams.get("setID");
    const setIDNumber = setID ? parseInt(setID, 10) : -1;

    return(
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <h1 style={{ color: "#000" }}>Edit Page</h1>
            {setIDNumber < 0 ? <EditSelect /> : <EditSet setID={setIDNumber} />}
        </div>
    );

}
