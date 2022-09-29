import Table from "cli-table";
import Login, { db, rl } from "../test18MVC.mjs";

//IMPORT MODEL
import ModelMatkul from "../model/modelMatkul.mjs";

//IMPORT VIEW
import ViewLog from "../view/viewLog.mjs";
import ViewMatkul from "../view/viewMatkul.mjs";

export default class ContMatkul {
    static MenuMatkul() {
        ViewMatkul.menuMatkul()
        rl.question('Masukan salah satu nomor dari opsi di bawah ini: ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContMatkul.daftarMatkul()
                    break;
                case '2':
                    ContMatkul.cariMatkul()
                    break;
                case '3':
                    ContMatkul.tambahMatkul()
                    break;
                case '4':
                    ContMatkul.hapusMatkul()
                    break;
                case '5':
                    Login.home()
                    break;
            }
        })
    }

    static daftarMatkul() {
        const tableMatkul = new Table({
            head: ['Kode Mata Kuliah', 'Nama Mata Kuliah', 'SKS']
        })
        ModelMatkul.DaftarMatkul((err, data) => {
            if (err) {
                console.log('Gagal mengambil data mata kuliah', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableMatkul.push([
                    item.kd_matkul,
                    item.nama_matkul,
                    item.sks
                ])
            })
            console.log(tableMatkul.toString())
            ContMatkul.MenuMatkul()
        })
    }

    static cariMatkul() {
        ViewLog.line()
        rl.question('Masukan kode mata kuliah: ', (kd_matkul) => {
            ModelMatkul.CariMatkul([kd_matkul], (err, data) => {
                if (err) {
                    console.log('Gagal mengambil data mata kuliah')
                    process.exit(1)
                }

                if (data.length == 0) {
                    console.log(`Mata kuliah dengan kode '${kd_matkul}' tidak terdaftar`)
                    ContMatkul.MenuMatkul()
                } else {
                    console.log(`
=============================================
Kode mata kuliah    : ${data[0].kd_matkul}
Nama mata kuliah    : ${data[0].nama_matkul}
SKS                 : ${data[0].sks}
`)
                    ContMatkul.MenuMatkul()
                }
            })
        })
    }

    static tambahMatkul() {
        ViewLog.line()
        console.log('Lengkapi data di bawah ini: ')
        rl.question('Kode mata kuliah: ', (kd_matkul) => {
            rl.question('Nama mata kuliah: ', (nama_matkul) => {
                rl.question('SKS: ', (sks) => {
                    db.run('INSERT INTO matakuliah VALUES (?, ?, ?)', [kd_matkul, nama_matkul, sks], (err) => {
                        if (err) {
                            console.log('Gagal menambahkan data mata kuliah')
                            process.exit()
                        } else {
                            console.log('Data mata kuliah berhasil ditambahkan')
                            ContMatkul.daftarMatkul()
                        }
                    })
                })
            })
        })
    }

    static hapusMatkul() {
        ViewLog.line()
        rl.question('Masukan kode mata kuliah: ', (kd_matkul) => {
            ModelMatkul.HapusMatkul([kd_matkul], (err) => {
                if (err) {
                    console.log('Gagal menghapus data mata kuliah')
                    process.exit(1)
                } else {
                    console.log(`Data mata kuliah dengan kode '${kd_matkul}' telah dihapus`)
                    ContMatkul.MenuMatkul()
                }
            })
        })
    }
}