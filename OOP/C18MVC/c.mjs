import readline from 'node:readline';
import sqlite3 from 'sqlite3';
import Table from 'cli-table';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dbFile = "./database/univ.db";

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`gak nyambung didatabase`, err) };
});

//================================================================================================================
//login
class users {
    static username() {
        rl.question('username: ', (username) => {
            db.all('SELECT * FROM user WHERE user.username = ?', [username], (err, data) => {
                if (err) {
                    console.log('Gagal ambil data user', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Username tidak terdaftar')
                    users.username()
                }
                users.password(data[0])
            })
        })
    }

    static password(user) {
        rl.question('password: ', (password) => {
            if (password == user.password) {
                Greet.line()
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Utama.home()
            } else {
                console.log('password salah')
                users.password(user)
            }

        })
    }
}

//================================================================================================================
//greet
class Greet {

    static line() {
        console.log('=============================================')
    }

    static logout() {
        console.log(`
=============================================
Anda telah keluar`)
    }

    static home() {
        Greet.line()
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
        Greet.line();
    }

    static welcome() {
        Greet.line()
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        Greet.line()
    }

    static menuMhs() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali`)
        Greet.line();
    }

    static menuJrsn() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali`)
        Greet.line();
    }
    static menuDsn() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali`)
        Greet.line();
    }

    static menuMatkul() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali`)
        Greet.line();
    }

    static menuKontrak() {
        Greet.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali`)
        Greet.line();
    }

}

class Utama {
    static login() {
        Greet.welcome()
        users.username()
    }

    static home() {
        Greet.home();
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (opsi) => {
            switch (opsi) {
                case '1': //Mahasiswa
                    Mahasiswa.MenuMahasiswa();
                    break;
                case '2': //Jurusan
                    Jurusan.MenuJurusan();
                    break;
                case '3': //Dosen
                    Dosen.MenuDosen();
                    break;
                case '4': //Mata Kuliah
                    Matkul.MenuMatkul()
                    break;
                case '5': //Kontrak
                    Kontrak.MenuKontrak()
                    break;
                case '6': //Keluar
                    Greet.logout()
                    Utama.login()
            }
        })
    }
};


//================================================================================================================
//Mahasiswa
class Mahasiswa {
    static MenuMahasiswa() {
        Greet.menuMhs()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Mahasiswa
                    Mahasiswa.daftarMahasiswa()
                    break;
                case '2': //Cari Mahasiswa
                    Mahasiswa.cariMahasiswa()
                    break;
                case '3': //Tambah Mahasiswa
                    Mahasiswa.tambahMahasiswa()
                    break;
                case '4': //Hapus Mahasiswa
                    Mahasiswa.hapusMahasiswa()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarMahasiswa() {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Nama Jurusan']
            , colWidths: [20, 10, 15, 15, 15]
        });
        db.all('SELECT * FROM mahasiswa', (err, data) => {
            if (err) {
                console.log('gagal ambil mahasiswa', err)
                process.exit(1)
            }

            data.forEach(item => {
                tableMahasiswa.push([
                    item.nim,
                    item.nama,
                    item.alamat,
                    item.nama_jurusan,
                    item.dob
                ])
            })
            console.log(tableMahasiswa.toString())
            Mahasiswa.MenuMahasiswa()
        })
    }

    static cariMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('SELECT * FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err, data) => {
                if (err) {
                    console.log('gagal ambil mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim ${nim}, tidak terdaftar`)
                    Mahasiswa.MenuMahasiswa()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${nim}' :
NIM     : ${data[0].nim}
Nama    : ${data[0].nama}
Alamat  : ${data[0].alamat}
Jurusan : ${data[0].nama_jurusan}
            `);
                    Mahasiswa.MenuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('NIM :', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Alamat: ', (alamat) => {
                    rl.question('Jurusan: ', (nama_jurusan) => {
                        rl.question('Tanggal Lahir: ', (dob) => {
                            db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, nama_jurusan, dob], (err) => {
                                if (err) {
                                    console.log('Gagal menambah data mahasiswa mahasiswa', err)
                                    process.exit(1)
                                } else {
                                    console.log('Data mahasiswa telah ditambahkan')
                                    Mahasiswa.daftarMahasiswa()
                                }
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusMahasiswa() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('DELETE FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err) => {
                if (err) {
                    console.log('Gagal ambil data mahasiswa', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data Mahasiswa ${nim}, telah dihapus`);
                    Mahasiswa.MenuMahasiswa()
                }
            })
        })
    }
}

//================================================================================================================
//Jurusan
class Jurusan {
    static MenuJurusan() {
        Greet.menuJrsn()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Jurusan
                    Jurusan.daftarJurusan()
                    break;
                case '2': //Cari Jurusan
                    Jurusan.cariJurusan()
                    break;
                case '3': //Tambah Jurusan
                    Jurusan.tambahJurusan()
                    break;
                case '4': //Hapus Jurusan
                    Jurusan.hapusJurusan()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarJurusan() {
        const tableJurusan = new Table({
            head: ['Id Jurusan', 'Nama Jurusan']
            , colWidths: [15, 20]
        });
        db.all('SELECT * FROM jurusan', (err, data) => {
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
            Jurusan.MenuJurusan()
        })
    }

    static cariJurusan() {
        rl.question('Masukkan id jurusan : ', (id_jurusan) => {
            db.all('SELECT * FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err, data) => {
                if (err) {
                    console.log('Gagal ambil data jurusan', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Jurusan dengan id ${id_jurusan} tidak terdaftar`)
                    Jurusan.MenuJurusan()
                } else {
                    console.log(`
========================================
Detail Jurusan dengan Kode '${id_jurusan}' :
Kode Jurusan : ${data[0].id_jurusan}
Nama Jurusan : ${data[0].nama_jurusan}
            `);
                    Jurusan.MenuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('Kode Jurusan: ', (id_jurusan) => {
            rl.question('Nama Jurusan : ', (nama_jurusan) => {
                db.run('INSERT INTO jurusan VALUES (?, ?)', [id_jurusan, nama_jurusan], (err) => {
                    if (err) {
                        console.log('Gagal menambah data jurusan', err)
                        process.exit(1)
                    } else {
                        console.log('Data jurusan telah ditambahkan ke database')
                        Jurusan.daftarJurusan()
                    }
                })
            })
        })



    }

    static hapusJurusan() {
        rl.question('Masukkan Kode Jurusan : ', (id_jurusan) => {
            db.all('DELETE FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err) => {
                if (err) {
                    console.log('Gagal menghapus data jurusan', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data jurusan dengan id '${id_jurusan}' telah dihapus`);
                    Jurusan.MenuJurusan()
                }
            })
        })
    }
}

//================================================================================================================
//Dosen
class Dosen {
    static MenuDosen() {
        Greet.menuDsn()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Dosen
                    Dosen.daftarDosen()
                    break;
                case '2': //Cari Dosen
                    Dosen.cariDosen()
                    break;
                case '3': //Tambah Dosen
                    Dosen.tambahDosen()
                    break;
                case '4': //Hapus Dosen
                    Dosen.hapusDosen()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarDosen() {
        const tableDosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [15, 20]
        });
        db.all('SELECT * FROM dosen', (err, data) => {
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
            Dosen.MenuDosen()
        })
    }

    static cariDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            db.all('SELECT * FROM dosen WHERE dosen.nip = ?', [nip], (err, data) => {
                if (err) {
                    console.log('Gagal ambil data dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan NIP '${nip}' tidak terdaftar`)
                    Dosen.MenuDosen()
                } else {
                    console.log(`
========================================
Detail Dosen dengan NIP '${nip}' :
NIP        : ${data[0].nip}
Nama Dosen : ${data[0].nama_dosen}
            `);
                    Dosen.MenuDosen()
                }
            })
        })
    }

    static tambahDosen() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('NIP :', (nip) => {
            rl.question('Nama Dosen :', (nama_dosen) => {
                db.run('INSERT INTO dosen VALUES (?, ?)', [nip, nama_dosen], (err) => {
                    if (err) {
                        console.log('Dagal menambah data Dosen', err)
                        process.exit(1)
                    } else {
                        console.log('Data dosen berhasil ditambahkan')
                        Dosen.daftarDosen()
                    }
                })
            })
        })
    }

    static hapusDosen() {
        rl.question('Masukkan NIP Dosen : ', (nip) => {
            db.all('DELETE FROM dosen WHERE dosen.nip = ?', [nip], (err) => {
                if (err) {
                    console.log('Gagal menghapus data dosen', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data dosen dengan NIP '${nip}' telah dihapus`);
                    Dosen.MenuDosen()
                }
            })
        })
    }
}

//================================================================================================================
//Matkul
class Matkul {
    static MenuMatkul() {
        Greet.menuMatkul()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Matkul
                    Matkul.daftarMatkul()
                    break;
                case '2': //Cari Matkul
                    Matkul.cariMatkul()
                    break;
                case '3': //Tambah Matkul
                    Matkul.tambahMatkul()
                    break;
                case '4': //Hapus Matkul
                    Matkul.hapusMatkul()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarMatkul() {
        const tableMatkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        db.all('SELECT * FROM mataKuliah', (err, data) => {
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
            Matkul.MenuMatkul()
        })
    }

    static cariMatkul() {
        rl.question('Masukkan Kode Mata Kuliah : ', (kd_matkul) => {
            db.all('SELECT * FROM mataKuliah WHERE mataKuliah.kd_matkul = ?', [kd_matkul], (err, data) => {
                if (err) {
                    console.log('gagal ambil data dosen', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Dosen dengan kode ${kd_matkul}, tidak terdaftar`)
                    Matkul.MenuMatkul()
                } else {
                    console.log(`
========================================
Detail Matkul dengan Kode '${kd_matkul}' :
Kode Matkul : ${data[0].kd_matkul}
Nama Matkul : ${data[0].nama_matkul}
SKS         : ${data[0].sks}
            `);
                    Matkul.MenuMatkul()
                }
            })
        })
    }

    static tambahMatkul() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('kd_matkul :', (kd_matkul) => {
            rl.question('Nama Matkul :', (nama_matkul) => {
                rl.question('SKS :', (sks) => {
                    db.run('INSERT INTO mataKuliah VALUES (?, ?, ?)', [kd_matkul, nama_matkul, sks], (err) => {
                        if (err) {
                            console.log('gagal menambah Matkul', err)
                            process.exit(1)
                        } else {
                            console.log('Matkul telah ditambahkan')
                            Matkul.daftarMatkul()
                        }
                    })
                })
            })
        })



    }

    static hapusMatkul() {
        rl.question('Masukkan kode Matkul : ', (kd_matkul) => {
            db.all('DELETE FROM mataKuliah WHERE mataKuliah.kd_matkul = ?', [kd_matkul], (err) => {
                if (err) {
                    console.log('gagal ambil data Matkul', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data dosen ${kd_matkul}, telah dihapus`);
                    Matkul.MenuMatkul()
                }
            })
        })
    }
}

//================================================================================================================
//Kontrak
class Kontrak {
    static MenuKontrak() {
        Greet.menuKontrak()
        rl.question('Masukkan salah satu nomor dari opsi di atas : ', (opsi) => {
            switch (opsi) {
                case '1': //Daftar Kontrak
                    Kontrak.daftarKontrak()
                    break;
                case '2': //Cari Kontrak
                    Kontrak.cariKontrak()
                    break;
                case '3': //Tambah Kontrak
                    Kontrak.tambahKontrak()
                    break;
                case '4': //Hapus Kontrak
                    Kontrak.hapusKontrak()
                    break;
                case '5': //Kembali
                    Utama.home()
                    break;
            }
        })
    }

    static daftarKontrak() {
        const tableKontrak = new Table({
            head: ['ID', 'NIM', 'Kode Mata Kuliah', 'NIP', 'Id Jurusan', 'Nilai']
            , colWidths: [5, 15, 10, 15, 10]
        });
        db.all('SELECT * FROM kontrak', (err, data) => {
            if (err) {
                console.log('Gagal ambil data kontrak', err)
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
            Kontrak.MenuKontrak()
        })
    }

    static cariKontrak() {
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('SELECT * FROM kontrak WHERE kontrak.nim = ?', [nim], (err, data) => {
                if (err) {
                    console.log('Gagal ambil data kontrak', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim '${nim}' tidak terdaftar`)
                    Kontrak.MenuKontrak()
                } else {
                    console.log(`
========================================
Detail mahasiswa dengan NIM '${nim}' :
ID                : ${data[0].id}
NIM               : ${data[0].nim}
Kode Mata Kuliah  : ${data[0].kdMatkul}
NIP               : ${data[0].nip}
ID Jurusan        : ${data[0].id_jurusan}
Nilai             : ${data[0].nilai}
            `);
                    Kontrak.MenuKontrak()
                }
            })
        })
    }

    static tambahKontrak() {
        console.log('Lengkapi data di bawah ini : ')
        rl.question('Id :', (id) => {
            rl.question('NIM: ', (nim) => {
                rl.question('Kode Mata Kuliah: ', (kdMatkul) => {
                    rl.question('NIP: ', (nip) => {
                        rl.question('ID Jurusan: ', (id_jurusan) => {
                            rl.question('NILAI: ', (nilai) => {
                                db.run('INSERT INTO kontrak VALUES (?, ?, ?, ?, ?, ?)', [id, nim, kdMatkul, nip, id_jurusan, nilai], (err) => {
                                    if (err) {
                                        console.log('Gagal menambah data kontrak', err)
                                        process.exit(1)
                                    } else {
                                        console.log(`Data kontrak mahasiswa dengan NIM '${nim}' telah ditambahkan`)
                                        Kontrak.daftarKontrak()
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
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('DELETE FROM kontrak WHERE kontrak.nim = ?', [nim], (err) => {
                if (err) {
                    console.log('Gagal ambil data kontrak', err)
                    process.exit(1)
                }
                else {
                    console.log(`Data kontrak mahasiswa '${nim}' telah dihapus`);
                    Kontrak.MenuKontrak()
                }
            })
        })
    }
}

//================================================================================================================
//Utama
Utama.login()