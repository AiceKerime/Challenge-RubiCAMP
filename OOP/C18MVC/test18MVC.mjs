import readline from 'node:readline';
import sqlite3 from 'sqlite3';
// import Table from 'cli-table';

import users from './controller/ContLog.mjs';
import ViewLog from './view/viewLog.mjs';
import ContMhs from './controller/ContMahasiswa.mjs'
import ContJurusan from './controller/ContJurusan.mjs';
import ContDosen from './controller/ContDosen.mjs';
import ContMatkul from "./controller/ContMatKul.mjs";
import ContKontrak from './controller/ContKontrak.mjs';


export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dbFile = "./database/univ.db";

export const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`Gagal menghubungkan ke database`, err) };
});


export default class Login {
    static login() {
        ViewLog.welcome()
        users.username()
    }

    static home() {
        ViewLog.home()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (opsi) => {
            switch (opsi) {
                case '1': //Mahasiswa
                    ContMhs.MenuMahasiswa()
                    break;
                case '2': //Jurusan
                    ContJurusan.MenuJurusan();
                    break;
                case '3': //Dosen
                    ContDosen.MenuDosen();
                    break;
                case '4': //Mata Kuliah
                    ContMatkul.MenuMatkul()
                    break;
                case '5': //Kontrak
                    ContKontrak.MenuKontrak()
                    break;
                case '6': //Keluar
                    ViewLog.logout()
                    Login.login()
            }
        })
    }
};

Login.login()