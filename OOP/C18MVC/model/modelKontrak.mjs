import { db } from "../test18MVC.mjs";

export default class ModelKontrak {
    static DaftarKontrak(callback) {
        db.all('SELECT * FROM kontrak', (err, data) => {
            callback(err, data)
        })
    }

    static CariKontrak(nim, callback) {
        db.all('SELECT * FROM kontrak WHERE kontrak.nim = ?', [nim], (err, data) => {
            callback(err, data)
        })
    }

    static TambahKontrak(id, nim, kdMatkul, nip, id_jurusan, nilai, callback) {
        db.run('INSERT INTO kontrak  VALUES (?, ?, ?, ?, ?, ?)', [id, nim, kdMatkul, nip, id_jurusan, nilai], (err) => {
            callback(err)
        })
    }

    static HapusKontrak(id, callback) {
        db.all('DELETE FROM kontrak WHERE id = ?', [id], (err) => {
            callback(err)
        })
    }
}