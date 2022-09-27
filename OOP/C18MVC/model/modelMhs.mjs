import { db } from "../test18MVC.mjs"

export default class ModelMhs {
    static DaftarMahasiswa(callback) {
        db.all('SELECT * FROM mahasiswa', (err, data) => {
            callback(err, data)
        })
    }

    static CariMahasiswa(nim, callback) {
        db.all('SELECT * FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err, data) => {
            callback(err, data)
        })
    }


    static TambahMahasiswa(nim, nama, alamat, id_jurusan, dob, callback) {
        db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, id_jurusan, dob], (err, data) => {
            callback(err, data)
        })
    }

    static HapusMahasiswa(nim, callback) {
        db.all('DELETE FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err) => {
            callback(err)
        })
    }
}