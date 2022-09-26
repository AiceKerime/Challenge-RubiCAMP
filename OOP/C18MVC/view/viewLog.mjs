export default class ViewLog {
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