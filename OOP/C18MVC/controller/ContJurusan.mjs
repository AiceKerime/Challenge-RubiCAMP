import Table from "cli-table"
import Login, { db, rl } from "../test18MVC.mjs"

//IMPORT MODEL
import ModelJurusan from "../model/modelJurusan.mjs"

//IMPORT VIEW
import ViewJurusan from "../view/viewJurusan.mjs"
import ViewLog from "../view/viewLog.mjs"

export default class ContJurusan {
    static MenuJurusan() {
        ViewJurusan.menuJurusan()
        rl.question('Masukan salah satu nomor dari opsi di bawah ini: ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContJurusan.daftarJurusan()
                    break;
                case '2':
                    ContJurusan.cariJurusan()
                    break;
                case '3':
                    ContJurusan.tambahJurusan()
                    break;
                case '4':
                    ContJurusan.hapusJurusan()
                    break;
                case '5':
                    Login.home()
                    break;
            }
        })
    }

    static daftarJurusan() {
        const tableJurusan = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
        })
        ModelJurusan.DaftarJurusan((err, data) => {
            if (err) {
                console.log('Gagal mengambil data jurusan', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableJurusan.push([
                    item.id_jurusan,
                    item.nama_jurusan
                ])
            })
            console.log(tableJurusan.toString())
            ContJurusan.MenuJurusan()
        })
    }

    static cariJurusan() {
        ViewLog.line()
        rl.question('Masukan id jurusan: ', (id_jurusan) => {
            ModelJurusan.CariJurusan([id_jurusan], (err, data) => {
                if (err) {
                    console.log('Gagal mengambil data jurusan', err)
                    process.exit(1)
                }

                if (data.length == 0) {
                    console.log(`Jurusan dengan kode '${id_jurusan}' tidak terdaftar`)
                    ContJurusan.MenuJurusan()
                } else {
                    console.log(`
=============================================
Kode Jurusan: ${data[0].id_jurusan}
Nama Jurusan: ${data[0].nama_jurusan}
`)
                    ContJurusan.MenuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        ViewLog.line()
        console.log('Lengkapi data di bawah ini: ')
        rl.question('Id jurusan: ', (id_jurusan) => {
            rl.question('Nama jurusan: ', (nama_jurusan) => {
                db.run('INSERT INTO jurusan VALUES (?, ?)', [id_jurusan, nama_jurusan], (err) => {
                    if (err) {
                        console.log('Gagal menambah data jurusan')
                        process.exit(1)
                    } else {
                        console.log('Data mahasiswa berhasil ditambahkan')
                        ContJurusan.daftarJurusan()
                    }
                })
            })
        })
    }

    static hapusJurusan() {
        rl.question('Masukan id jurusan: ', (id_jurusan) => {
            ModelJurusan.HapusJurusan([id_jurusan], (err) => {
                if (err) {
                    console.log('Gagal menghapus data jurusan')
                    process.exit(1)
                } else {
                    console.log(`Data jurusan dengan id '${id_jurusan}' telah dihapus`)
                    ContJurusan.MenuJurusan()
                }
            })
        })
    }
}