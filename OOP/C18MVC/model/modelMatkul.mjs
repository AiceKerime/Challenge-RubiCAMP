import { db } from "../test18MVC.mjs";

export default class ModelMatkul {
    static DaftarMatkul(callback) {
        db.all('SELECT * FROM matakuliah', (err, data) => {
            callback(err, data)
        })
    }

    static CariMatkul(kd_matkul, callback) {
        db.all('SELECT * FROM matakuliah WHERE matakuliah.kd_matkul = ?', [kd_matkul], (err, data) => {
            callback(err, data)
        })
    }

    static TambahMatkul(kd_matkul, nama_matkul, sks, callback) {
        db.run('INSERT INTO matakuliah VALUES (?, ?, ?)', [kd_matkul, nama_matkul, sks], (err) => {
            callback(err)
        })
    }

    static HapusMatkul(kd_matkul, callback) {
        db.all('DELETE FROM matakuliah WHERE matakuliah.kd_matkul = ?', [kd_matkul], (err) => {
            callback(err)
        })
    }
}