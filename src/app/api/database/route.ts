import Word from "@/types/word";
import {NextResponse} from 'next/server';
import {createTables, createSet, getSets, getWords, addWord, deleteWord, deleteSet} from '@/db/statements';

/* Get All Sets, Get Words from a Set */
/* requestID... 
    0: All Sets, 
    1: Words corresp to set */
export async function GET(request : Request){
    try{
        const url = new URL(request.url);
        const requestType = url.searchParams.get("requestType");
        const requestTypeNumber = requestType ? parseInt(requestType, 10) : null;
        const setID = url.searchParams.get("setID");
        const setIDNumber = setID ? parseInt(setID, 10) : null;

        let result;
        if(requestTypeNumber === 0){
            result = getSets();
        }
        else if(requestTypeNumber === 1){
            if(setIDNumber != null){
                result = getWords(setIDNumber);
            }
            else throw new Error("Invalid setID!");
        }
        return NextResponse.json(result);
    }
    catch(error){
        const errorMsg = error instanceof Error ? error.message : "Unknown error occured!";
        return NextResponse.json({error: errorMsg});
    }
}

/* Add Sets, Add Words to Set, Remove Set, Remove Word from Set */
/* requestID... 
    -1: Init Tables
    0: Add Set
    1: Add Word to Set 
    2: Remove Set
    3: Remove Word from Set */
export async function POST(request : Request){
    try{
        console.log("Received POST request to /api/database");

        const body = await request.json();
        console.log("Request Body:", body);

        const requestTypeNumber = body.requestType ?? null;
        console.log("Request Type:", requestTypeNumber);
        
        const setName : string | null = body.setName || null;
        const setDesc : string | null = body.setDesc || null;
        const setID : number | null = body.setID ? parseInt(body.setID, 10) : null;
        const word : Word | null = body.word || null;
        const wordID : number | null = body.wordID ? parseInt(body.wordID, 10) : null;

        let success = false;
        switch(requestTypeNumber){
            case -1:
                success = createTables();
                break;
            case 0:
                if(setName){
                    if(setDesc != null){
                        success = createSet(setName, setDesc);
                    }
                    else{
                        success = createSet(setName);
                    }
                }
                break;
            case 1:
                if(setID !== null && word !== null){
                    success = addWord(setID, word);
                }
                break;
            case 2:
                if(setID !== null){
                    success = deleteSet(setID);
                }
                break;
            case 3:
                if(setID !== null && wordID !== null){
                    success = deleteWord(setID, wordID);
                }
                break;
            default:
                return NextResponse.json({ error: "Invalid requestType" });
        }
        return NextResponse.json({success});
    }
    catch(error){
        const errorMsg = error instanceof Error ? error.message : "Unknown error occured!";
        return NextResponse.json({error: errorMsg});
    }
}