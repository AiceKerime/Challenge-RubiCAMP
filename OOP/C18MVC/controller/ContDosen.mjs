import Table from "cli-table";
import Login, { db, rl } from "../test18MVC.mjs";

//IMPORT MODEL
import ModelDosen from "../model/modelDosen.mjs";

//IMPORT VIEW
import ViewDosen from "../view/viewDosen.mjs";
import ViewLog from "../view/viewLog.mjs";

export default class ContDosen {
    static MenuDosen() {
        ViewDosen.menuDosen()
        rl.question('Masukan salah satu nomor dari opsi di bawah ini: ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContDosen.daftarDosen()
                    break;
                case '2':
                    ContDosen.cariDosen()
                    break;
                case '3':
                    ContDosen.tambahDosen()
                    break;
                case '4':
                    ContDosen.hapusDosen()
                    break;
                case '5':
                    Login.home()
                    break;
            }
        })
    }

    static daftarDosen() {
        const tableDosen = new Table({
            head: ['NIP', 'Nama Dosen']
        })
        ModelDosen.DaftarDosen((err, data) => {
            if (err) {
                console.log('Gagal mengambil data dosen', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableDosen.push([
                    item.nip,
                    item.nama_dosen
                ])
            })
            console.log(tableDosen.toString())
            ContDosen.MenuDosen()
        })
    }

    static cariDosen() {
        ViewLog.line()
        rl.question('Masukan NIP dosen: ', (nip) => {
            ModelDosen.CariDosen([nip], (err, data) => {
                if (err) {
                    console.log('Gagal mengambil data dosen', err)
                    process.exit(1)
                }

                if (data.length == 0) {
                    console.log(`Dosen dengan NIP '${nip}' tidak terdaftar`)
                    ContDosen.MenuDosen()
                } else {
                    console.log(`
=============================================
NIP         : ${data[0].nip}
Nama Dosen  : ${data[0].nama_dosen}
                    `)
                    ContDosen.MenuDosen()
                }
            })
        })
    }

    static tambahDosen() {
        ViewLog.line()
        console.log('Lengkapi data di bawah ini :')
        rl.question('NIP: ', (nip) => {
            rl.question('Nama Dosen: ', (nama_dosen) => {
                db.run('INSERT INTO dosen VALUES (?, ?)', [nip, nama_dosen], (err) => {
                    if (err) {
                        console.log('Gagal menambah data Dosen', err)
                        process.exit(1)
                    } else {
                        console.log('Data dosen berhasil ditambahkan')
                        ContDosen.daftarDosen()
                    }
                })
            })
        })
    }

    static hapusDosen() {
        ViewLog.line()
        rl.question('Masukan NIP dosen: ', (nip) => {
            ModelDosen.HapusDosen([nip], (err) => {
                if (err) {
                    console.log('Gagal menghapus data dosen')
                } else {
                    console.log(`Data dosen dengan NIP '${nip}' telah dihapus`)
                    ContDosen.MenuDosen()
                }
            })
        })
    }
}