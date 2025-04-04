"use client";
import { useSearchParams } from "next/navigation";
import ReviewSet from "./ReviewSet";
import ReviewSelect from "./ReviewSelect";

export default function directPage() {
    const searchParams = useSearchParams();
    const setID = searchParams.get("setID");
    const setIDNumber = setID ? parseInt(setID, 10) : -1;

    return(
        <div style={{ backgroundColor: "#f0f0f0", color: "#333", padding: "20px", borderRadius: "8px" }}>
            <h1 style={{ color: "#000" }}>Review Page</h1>
            {setIDNumber < 0 ? <ReviewSelect /> : <ReviewSet setID={setIDNumber} />}
        </div>
    );

}
