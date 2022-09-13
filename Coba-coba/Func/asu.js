import sqlite3 from "sqlite3";
import readline from "node:readline"
import Table from "cli-table";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const db = sqlite3.Database('data.db', sqlite3.OPEN_READWRITE, err => {
    
})

function line() {
    console.log('================================================')
}

function asd() {

}