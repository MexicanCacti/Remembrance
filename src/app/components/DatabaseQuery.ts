import Word from "@/types/word";

const API_URL = "/api/database";

export const getSets = async () => {
    const response = await fetch(`${API_URL}?requestType=0`, {method: "GET"});
    return response.json();
};

export const getWords = async (setID: number) => {
    const response = await fetch(`${API_URL}?requestType=1&setID=${setID}`, {method: "GET"});
    return response.json();
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
    return response.json();
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