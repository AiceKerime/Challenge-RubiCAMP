import Table from "cli-table"
import ModelKontrak from "../model/modelKontrak.mjs"
import Login, { db, rl } from "../test18MVC.mjs"
import ViewKontrak from "../view/viewKontrak.mjs"
import users from "./ContLog.mjs"

export default class ContKontrak {
    static MenuKontrak() {
        ViewKontrak.menuKontrak()
        rl.question('Masukan salah satu nomor dari opsi di bawah ini: ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContKontrak.daftarKontrak()
                    break;
                case '2':
                    ContKontrak.cariKontrak()
                    break;
                case '3':
                    ContKontrak.tambahKontrak()
                    break;
                case '4':
                    ContKontrak.hapusKontrak()
                    break;
                case '5':
                    Login.home()
                    break;
            }
        })
    }

    static daftarKontrak() {
        const tableKontrak = new Table({
            head: ['Id', 'NIM', 'kdMatkul', 'NIP', 'Id Jurusan', 'Nilai']
        })
        ModelKontrak.DaftarKontrak((err, data) => {
            if (err) {
                console.log('Gagal mengambil data kontrak', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableKontrak.push([
                    item.id,
                    item.nim,
                    item.kdMatkul,
                    item.nip,
                    item.id_jurusan,
                    item.nilai
                ])
            })
            console.log(tableKontrak.toString())
            ContKontrak.MenuKontrak()
        })
    }

    static cariKontrak() {
        ViewLog.line()
        rl.question('Masukan NIM mahasiswa: ', (nim) => {
            ModelKontrak.CariKontrak([nim], (err, data) => {
                if (err) {
                    console.log('Gagal mengambil data kontrak mahasiswa', err)
                    process.exit(1)
                }

                if (data.length == 0) {
                    console.log(`Kontrak mahasiswa dengan NIM '${nim}' tidak terdaftar`)
                    ContKontrak.MenuKontrak()
                } else {
                    console.log(`
=============================================
ID              : ${data[0].id}
NIM             : ${data[0].nim}
Kode Matkul        : ${data[0].kdMatkul}
NIP             : ${data[0].nip}
ID Jurusan      : ${data[0].id_jurusan}
Nilai           : ${data[0].nilai}
`)
                    ContKontrak.MenuKontrak()
                }
            })
        })
    }

    static tambahKontrak() {
        ViewLog.line()
        console.log('Lengkapi data di bawah ini: ')
        rl.question('ID: ', (id) => {
            rl.question('NIM: ', (nim) => {
                rl.question('Kode matkul: ', (kdMatkul) => {
                    rl.question('NIP: ', (nip) => {
                        rl.question('ID Jurusan: ', (id_jurusan) => {
                            rl.question('Nilai: ', (nilai) => {
                                db.run('INSERT INTO kontrak VALUES (?, ?, ?, ?, ?, ?)', [id, nim, kdMatkul, nip, id_jurusan, nilai], (err) => {
                                    if (err) {
                                        console.log('Gagal menambahkan data kontrak mahasiswa')
                                        process.exit(1)
                                    } else {
                                        console.log('Data kontrak mahasiswa berhasil ditambahkan')
                                        ContKontrak.daftarKontrak()
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusKontrak() {
        ViewLog.line()
        rl.question('Masukan ID: ', (id) => {
            ModelKontrak.HapusKontrak([id], (err) => {
                if (err) {
                    console.log('Gagal menghapus data kontrak mahasiswa')
                    process.exit(1)
                } else {
                    console.log(`Data kontrak mahasiswa dengan ID '${id}' telah dihapus`)
                    ContKontrak.MenuKontrak()
                }
            })
        })
    }
}