import ViewLog from "./viewLog.mjs";

export default class ViewMhs {
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