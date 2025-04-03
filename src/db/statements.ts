import Word from "@/types/word";
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'db', 'database.db');
const db = require('better-sqlite3')(dbPath)

export const createTables = () => {
    try{
        const setTable = `
        CREATE TABLE IF NOT EXISTS sets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NULL,
            date_created DATE DEFAULT CURRENT_TIMESTAMP,
            date_last_used DATE NULL
        );
        `
        const wordTable = `
        CREATE TABLE IF NOT EXISTS words(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            set_id INTEGER NOT NULL,
            front1 TEXT NOT NULL,
            front2 TEXT NULL,
            back TEXT NOT NULL,
            back2 TEXT NULL,
            FOREIGN KEY (set_id) REFERENCES sets(id) ON DELETE CASCADE
        );
        `
        db.prepare(setTable).run();
        db.prepare(wordTable).run();
        console.log("Tables initialized successfully!");
        return true;    
    }
    catch (error){
        console.log("Table Init Error:", error);
        return false;
    }

}

export const createSet = (setName : string, setDesc : string = "") => {
    const checkSql = `
        SELECT COUNT(*) as count
        FROM sets
        WHERE name = ?
    `;
    const checkResult = db.prepare(checkSql).get(setName);

    if(checkResult.count > 0){
        console.log(`Set with "${setName}" exists!`);
        return false;
    }
    try{
        const insertSql = `
        INSERT INTO sets (name, description)
        VALUES (?, ?)
        `
        db.prepare(insertSql).run(setName, setDesc)
        console.log(`Set "${setName}" added successfully!`);  
        return true;    
    }
    catch (error){
        console.log("Table Creation Error:", error);
        return false;
    }
}

export const deleteSet = (setID : number) => {
    try{
        const deleteSql = `
            DELETE FROM sets
            WHERE id = ?
        `;
        db.prepare(deleteSql).run(setID);
        return true;  
    }
    catch(error){
        return false;
    }
}

export const getSets = () => {
    try{
        const sql = `
        SELECT * from sets
        `
        const rows = db.prepare(sql).all()
        console.log(rows) 
        return rows;
    }
    catch(error){
        return false;
    }
}

export const getWords = (setID : number) =>{
    try{
        const getWordsSql = `
            SELECT * FROM words
            WHERE set_id = ?
        `;

        const words = db.prepeare(getWordsSql).run(setID);
        console.log(words);
        return words;
    }
    catch(error){
        return false;
    }

}

export const addWord = (setID : number, word: Word) => {
    try{
        const addWordSql = `
            INSERT INTO words (set_id, front1, front2, back, back2)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.prepare(addWordSql).run(setID, word.front1, word.front2 || null, word.back1, word.back2 || null);
        return true;
    }
    catch(error){
        return false;
    }
}

export const deleteWord = (setID : number, wordID : number) => {
    try{
        const deleteWordSql = `
            DELETE FROM words
            WHERE setID = ? AND wordID = ?
        `;
        db.prepare(deleteWordSql).run(setID, wordID);
        return true;
    }
    catch(error){
        return false;
    }
}