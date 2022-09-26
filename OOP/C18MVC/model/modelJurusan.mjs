import { db } from "../test18MVC.mjs";

export default class ModelJurusan {
    static DaftarJurusan(callback) {
        db.all('SELECT * FROM jurusan', (err, data) => {
            callback(err, data)
        })
    }

    static CariJurusan(id_jurusan, callback) {
        db.all('SELECT * FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err, data) => {
            callback(err, data)
        })
    }

    static TambahJurusan(id_jurusan, nama_jurusan, callback) {
        db.run('INSERT INTO jurusan VALUES (?, ?)', [id_jurusan, nama_jurusan], (err) => {
            callback(err)
        })
    }

    static HapusJurusan(id_jurusan, callback) {
        db.all('DELETE FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err) => {
            callback(err)
        })
    }
}