import Table from "cli-table"
import ModelDosen from "../model/modelDosen.mjs"
import ModelJurusan from "../model/modelJurusan.mjs"
import ModelKontrak from "../model/modelKontrak.mjs"
import ModelMatkul from "../model/modelMatkul.mjs"
import ModelMhs from "../model/modelMhs.mjs"
import Login, { db, rl } from "../test18MVC.mjs"
import ViewKontrak from "../view/viewKontrak.mjs"
import ViewLog from "../view/viewLog.mjs"

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
        // Table Mahasiswa
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Id Jurusan']
        });
        ModelMhs.DaftarMahasiswa((err, data) => {
            if (err) {
                console.log('Gagal mengambil data mahasiswa', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableMahasiswa.push([
                    item.nim,
                    item.nama,
                    item.alamat,
                    item.id_jurusan,
                    item.dob
                ])
            })
            console.log(tableMahasiswa.toString())
            rl.question('NIM: ', (nim) => {
                // Table Matkul
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
                    rl.question('Kode matkul: ', (kdMatkul) => {
                        // Table Dosen
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
                            rl.question('NIP: ', (nip) => {
                                // Table Jurusan
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
                                    rl.question('ID Jurusan: ', (id_jurusan) => {
                                        rl.question('Nilai: ', (nilai) => {
                                            db.run('INSERT INTO kontrak (nim, kdMatkul, nip, id_jurusan, nilai) VALUES (?, ?, ?, ?, ?)', [nim, kdMatkul, nip, id_jurusan, nilai], (err) => {
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