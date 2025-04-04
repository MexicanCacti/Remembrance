import Word from "@/types/word";

const API_URL = "/api/database";

export const getSets = async () => {
    try{
        const response = await fetch(`${API_URL}?requestType=0`, {method: "GET"});
        const data = await response.json();
        return data.result;
    }
    catch(error){
        console.error("Error Fetching Sets:", error);
        return [];

    }
};

export const getWords = async (setID: number) => {
    try{
        const response = await fetch(`${API_URL}?requestType=1&setID=${setID}`, {method: "GET"});
        const data = await response.json();
        console.log("Words fetched:", data.result);
        return data.result;
    }
    catch(error){
        console.error("Error Fetching Words:", error);
        return [];
    }
};

export const initTables = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                requestType: -1
            }),
        });
        const data = await response.json();
        return data.success === true;
    } catch (error) {
        console.error("Error initializing tables:", error);
        return false; 
    }
};

export const addSet = async (setName : string, setDesc : string) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            requestType: 0,
            setName,
            setDesc: setDesc ?? ""
        }),
    });

    const data = await response.json();
    return data.result;
};

export const addWord = async(setID: number, word : Word) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            requestType: 1,
            setID,
            word : word ?? null
        }),
    });
    return response.json();
};

export const updateWord = async(setID: number, word: Word | null, wordID: number) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            requestType: 5,
            setID,
            word : word,
            wordID : wordID
        }),
    });
    return response.json();
}

export const removeSet = async (setID: number) => {
    const response = await fetch(API_URL, {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            requestType: 2,
            setID
        }),
    });
    return response.json(); 
};

export const removeWord = async(setID: number, wordID: number) => {
    const response = await fetch(API_URL, {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            requestType: 3,
            setID,
            wordID
        }),
    });
    return response.json();
};

export const updateLastUsed = async(setID: number) => {
    const response = await fetch(API_URL,{
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            requestType: 4,
            setID
        }),
    });
    return response.json();
}