import ViewLog from "./viewLog.mjs";

export default class ViewKontrak {
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