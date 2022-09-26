import { db } from "../test18MVC.mjs";

export default class ModelDosen {
    static DaftarDosen(callback) {
        db.all('SELECT * FROM dosen', (err, data) => {
            callback(err, data)
        })
    }

    static CariDosen(nip, callback) {
        db.all('SELECT * FROM dosen WHERE dosen.nip = ?', [nip], (err, data) => {
            callback(err, data)
        })
    }

    static TambahDosen(nip, nama_dosen, callback) {
        db.run('INSERT INTO dosen VALUES (?, ?)', [nip, nama_dosen], (err) => {
            callback(err)
        })
    }

    static HapusDosen(nip, callback) {
        db.all('DELETE FROM dosen WHERE dosen.nip = ?', [nip], (err) => {
            callback(err)
        })
    }
}