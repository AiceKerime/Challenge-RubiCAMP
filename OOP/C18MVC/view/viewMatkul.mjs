import ViewLog from "./viewLog.mjs";

export default class ViewMatkul {
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