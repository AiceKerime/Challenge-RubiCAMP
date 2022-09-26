import readline from 'node:readline';
import sqlite3 from 'sqlite3';
import Table from 'cli-table';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dbFile = "./database/univ.db";

export const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.log(`Gagal menghubungkan ke database`, err) };
});
// USER START
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
                ViewLog.line()
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Login.home()
            } else {
                console.log('password salah')
                users.password(user)
            }
        })
    }
}
// USER END
// ===========================================================================================
// LOGIN START
class Login {
    static login() {
        ViewLog.welcome()
        users.username()
    }

    static home() {
        ViewLog.home()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (opsi) => {
            switch (opsi) {
                case '1': //Mahasiswa
                    ContMhs.MenuMahasiswa()
                    break;
                case '2': //Jurusan
                    ContJurusan.MenuJurusan();
                    break;
                case '3': //Dosen
                    ContDosen.MenuDosen();
                    break;
                case '4': //Mata Kuliah
                    ContMatkul.MenuMatkul()
                    break;
                case '5': //Kontrak
                    ContKontrak.MenuKontrak()
                    break;
                case '6': //Keluar
                    ViewLog.logout()
                    Login.login()
            }
        })
    }
}

class ViewLog {
    static line() {
        console.log('=============================================')

    }

    static welcome() {
        ViewLog.line()
        console.log('Welcome to Universitas Pendidikan Indonesia')
        console.log('Jl. Setiabudhi No. 255')
        ViewLog.line()
    }

    static home() {
        ViewLog.line()
        console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
        ViewLog.line();
    }

    static logout() {
        console.log(`
=============================================
Anda telah keluar`)
    }
}
// LOGIN END
// ===========================================================================================
// MAHASISWA START
class ViewMhs {
    static menuMhs() {
        ViewLog.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali`)
        ViewLog.line();
    }
}

class ContMhs {
    static MenuMahasiswa() {
        ViewMhs.menuMhs()
        rl.question('Masukkan salah satu nomor dari opsi di bawah ini : ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContMhs.daftarMahasiswa()
                    break;
                case '2':
                    ContMhs.cariMahasiswa()
                    break;
                case '3':
                    ContMhs.tambahMahasiswa()
                    break;
                case '4':
                    ContMhs.hapusMahasiswa()
                    break;
                case '5':
                    Login.home()
                    break;
            }
        })
    }

    static daftarMahasiswa() {
        const tableMahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Nama Jurusan']
        });
        db.all('SELECT * FROM mahasiswa', (err, data) => {
            if (err) {
                console.log('Gagal mengambil data mahasiswa', err)
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
            ContMhs.MenuMahasiswa()
        })
    }

    static cariMahasiswa() {
        ViewLog.line()
        rl.question('Masukkan NIM mahasiswa : ', (nim) => {
            db.all('SELECT * FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err, data) => {
                if (err) {
                    console.log('Gagal mengambil data mahasiswa', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan nim '${nim}' tidak terdaftar`)
                    ContMhs.MenuMahasiswa()
                } else {
                    console.log(`
=============================================
Detail mahasiswa dengan NIM '${nim}' :
NIM     : ${data[0].nim}
Nama    : ${data[0].nama}
Alamat  : ${data[0].alamat}
Jurusan : ${data[0].nama_jurusan}
Jurusan : ${data[0].dob}
            `);
                    ContMhs.MenuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        ViewLog.line()
        console.log('Lengkapi data di bawah ini : ')
        rl.question('NIM :', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Alamat: ', (alamat) => {
                    rl.question('Jurusan: ', (nama_jurusan) => {
                        rl.question('Tanggal Lahir: ', (dob) => {
                            db.run('INSERT INTO mahasiswa VALUES (?, ?, ?, ?, ?)', [nim, nama, alamat, nama_jurusan, dob], (err) => {
                                if (err) {
                                    console.log('Gagal menambah data mahasiswa', err)
                                    process.exit(1)
                                } else {
                                    console.log('Data mahasiswa berhasil ditambahkan')
                                    ContMhs.daftarMahasiswa()
                                }
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusMahasiswa() {
        ViewLog.line()
        rl.question('Masukkan NIM Mahasiswa : ', (nim) => {
            db.all('DELETE FROM mahasiswa WHERE mahasiswa.nim = ?', [nim], (err) => {
                if (err) {
                    console.log('Gagal menghapus data mahasiswa', err)
                    process.exit(1)
                } else {
                    console.log(`Data mahasiswa dengan '${nim}' telah dihapus`);
                    ContMhs.MenuMahasiswa()
                }
            })
        })
    }
}
// MAHASISWA END
// ===========================================================================================
// JURUSAN START
class ViewJurusan {
    static menuJurusan() {
        ViewLog.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali`)
        ViewLog.line();
    }
}

class ContJurusan {
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
            ContJurusan.MenuJurusan()
        })
    }

    static cariJurusan() {
        ViewLog.line()
        rl.question('Masukan id jurusan: ', (id_jurusan) => {
            db.all('SELECT * FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err, data) => {
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
            db.all('DELETE FROM jurusan WHERE jurusan.id_jurusan = ?', [id_jurusan], (err) => {
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
// JURUSAN END
// ===========================================================================================
// DOSEN START
class ViewDosen {
    static menuDosen() {
        ViewLog.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali`)
        ViewLog.line();
    }
}

class ContDosen {
    static MenuDosen() {
        ViewDosen.menuDosen()
        rl.question('Masukan salah satu nomor dari opsi di bawah ini: ', (opsi) => {
            switch (opsi) {
                case '1':
                    ContDosen.daftarDosen()
                    break;
                case '2':
                    ContDosen.cariDosen()
                case '3':
                    ContDosen.tambahDosen()
                case '4':
                    ContDosen.hapusDosen()
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
            ContDosen.MenuDosen()
        })
    }

    static cariDosen() {
        ViewLog.line()
        rl.question('Masukan NIP dosen: ', (nip) => {
            db.all('SELECT * FROM dosen WHERE dosen.nip = ?', [nip], (err, data) => {
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
        console.log('Lengkapi data di bawah ini : ')
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
            db.all('DELETE FROM dosen WHERE dosen.nip = ?', [nip], (err) => {
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
// DOSEN END
// ===========================================================================================
// MATKUL START
class ViewMatkul {
    static menuMatkul() {
        ViewLog.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Mata Kuliah
[2] Cari Mata Kuliah
[3] Tambah Mata Kuliah
[4] Hapus Mata Kuliah
[5] Kembali`)
        ViewLog.line();
    }
}

class ContMatkul {
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
        db.all('SELECT * FROM matakuliah', (err, data) => {
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
            db.all('SELECT * FROM matakuliah WHERE matakuliah.kd_matkul = ?', [kd_matkul], (err, data) => {
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
            db.all('DELETE FROM matakuliah WHERE matakuliah.kd_matkul = ?', [kd_matkul], (err) => {
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
// MATKUL END
// ===========================================================================================
// KONTRAK START
class ViewKontrak {
    static menuKontrak() {
        ViewLog.line();
        console.log(`
silahkan pilih opsi di bawah ini
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Kembali`)
        ViewLog.line();
    }
}

class ContKontrak {
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
        db.all('SELECT * FROM kontrak', (err, data) => {
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
            db.all('SELECT * FROM kontrak WHERE kontrak.nim = ?', [nim], (err, data) => {
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
            db.all('DELETE FROM kontrak WHERE kontrak.id = ?', [id], (err) => {
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
// KONTRAK END

Login.login()