import ViewLog from "./viewLog.mjs";

export default class ViewJurusan {
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