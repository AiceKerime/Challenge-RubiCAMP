import ViewLog from "./viewLog.mjs";

export default class ViewDosen {
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