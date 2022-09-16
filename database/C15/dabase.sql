-- Create a new database
sqlite3 univdabase.db


-- Create table mahasiswa
CREATE TABLE mahasiswa(nim INT(11) PRIMARY KEY NOT NULL, nama VARCHAR(120) NOT NULL, alamat TEXT NOT NULL, nama_jurusan VARCHAR(100) NOT NULL, FOREIGN KEY (jurusan) REFERENCES jurusan(id_jurusan));

-- Insert data to mahasiswa tables
INSERT INTO mahasiswa VALUES 
('23010030401', 'Rafi Izzaturohman', 'Sanggar Indah Banjaran', 'Rekayasa Perangkat Lunak'), ('23010030402', 'Amelianti Khoirunnisa', 'Perum Parahyangan Kencana', 'Rekayasa Perangkat Lunak'), ('23010030403', 'Nadia Amelia Putri', 'Desa Cingcin', 'PGSD Penjas'), 
('23010030404', 'Mahesa Athur Thursena', 'Perum Parahyangan Kencana', 'PGSD Penjas'), 
('23010030405', 'Dimas Reza', 'Sanggar Indah Banjaran', 'Pendidikan Teknik Otomasi Industri dan Robotika'),
('23010030406', 'Priagung Jembar W', 'Sanggar Indah Banjaran', 'Pendidikan Teknik Otomasi Industri dan Robotika');

-- Create table jurusan
CREATE TABLE jurusan (id_jurusan VARCHAR(4) PRIMARY KEY NOT NULL, nama_jurusan VARCHAR(100));

-- Insert data to jurusan tables
INSERT INTO jurusan VALUES 
('U001', 'Rekayasa Perangkat Lunak'), 
('U002', 'PGSD Penjas'), 
('U003', 'Pendidikan Teknik Otomasi Industri dan Robotika');

-- Create table dosen
CREATE TABLE dosen (nip VARCHAR(11), nama_dosen VARCHAR(120));

-- Insert data to dosen tables
INSERT INTO dosen VALUES 
('23201', 'M. Adi Fauzan'), 
('23202', 'Mohamad Rizal Maolana'), 
('23203', 'Hermansyah Putra'), 
('230204', 'Iwan Solihin'), 
('23205', 'Themas Febrianto'), 
('23206', 'Muhammad Rabbani');

-- Create table matakuliah
CREATE TABLE matakuliah (kd_matkul VARCHAR(5) PRIMARY KEY NOT NULL, nama_matkul VARCHAR(70) NOT NULL, sks INT(2) NOT NULL);

-- Insert data to matakuliah tables
INSERT INTO matakuliah VALUES 
('C1001', 'Pemrograman Berorientasi Objek', '7'), 
('C1002', 'Logika Informatika', '11'), 
('C1003', 'Filsafat Penjas dan Literasi Fisikal', '14'), 
('C1004', 'Anatomi, Fisiologi dan Mekanika Gerak', '3'), 
('C1005', 'Robotika Industri', '9'), 
('C1006', 'Logika Pemrograman Robotika', '12');

-- Create table khs
CREATE TABLE khs (id INTEGER PRIMARY KEY AUTOINCREMENT, nim INT(11) NOT NULL, kdMatkul VARCHAR(5) NOT NULL, nip VARCHAR(5) NOT NULL, id_jurusan VARCHAR(4) NOT NULL, nilai VARCHAR(2), FOREIGN KEY (nim) REFERENCES mahasiswa(nim), FOREIGN KEY (kdMatkul) REFERENCES matakuliah(kdMatkul), FOREIGN KEY (nip) REFERENCES dosen(nip), FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan));

-- Insert data to khs tables for relation
INSERT INTO khs VALUES ('1', '23010030401', 'C1001', '23201', 'U001', 'A+'), ('2', '23010030402', 'C1002', '23202', 'U001', 'B+'), ('3', '23010030403', 'C1003', '23203', 'U002', 'A'), ('4', '23010030404', 'C1004', '23204', 'U002', 'D'), ('5', '23010030405', 'C1005', '23205', 'U003', 'D+'), ('6', '23010030406', 'C1006', '23206', 'U003', 'B');

-- Meng-update atau mengubah value column dari table mata kuliah berdasarkan kd_matkul
UPDATE matakuliah SET nama_matkul = 'data mining' WHERE kd_matkul = 'C1001';

-- Menambahkan column tgl_lahir ke table mahasiswa
ALTER TABLE mahasiswa ADD dob date;
UPDATE mahasiswa SET dob = '2004-05-14' WHERE nama = 'Rafi Izzaturohman';
UPDATE mahasiswa SET dob = '2004-05-03' WHERE nama = 'Amelianti Khoirunnisa';
UPDATE mahasiswa SET dob = '2003-09-23' WHERE nama = 'Nadia Amelia Putri';
UPDATE mahasiswa SET dob = '2002-07-23' WHERE nama = 'Mahesa Athur Thursena';
UPDATE mahasiswa SET dob = '2003-03-28' WHERE nama = 'Dimas Reza';
UPDATE mahasiswa SET dob = '2004-05-04' WHERE nama = 'Priagung Jembar W';

-- Menggabungkan table mahasiswa dengan jurusan yang mana nama_jurusan didasarkan pada id_jurusan
SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.alamat, jurusan.nama_jurusan FROM jurusan JOIN mahasiswa ON mahasiswa.nama_jurusan=jurusan.id_jurusan; --1

-- Mencari dan menghitung umur dari hasil pengurangan tanggal sekarang dengan tanggal lahir mahasiswa dan nantinya akan di tampilkan data yang mana hanya ada siswa berusia kurang dari 20 tahun
SELECT mahasiswa.nama, mahasiswa.dob,
(cast(strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', dob) as int)) AS umur 
FROM mahasiswa 
WHERE  umur < 20; --2

-- Mencari dan menampilkan mahasiswa yang memiliki nilai B-, B, B+, A-, A dan A+
SELECT mahasiswa.nim, mahasiswa.nama, khs.nilai FROM mahasiswa JOIN khs ON khs.nim=mahasiswa.nim WHERE nilai like 'B%' or nilai like 'A%'; --3

-- Mencari, menambahkan, dan menggabungkan sks yang diambil kemudian ditampilkan data mahasiswa yang memiliki sks lebih dari 10
SELECT mahasiswa.nama, khs.nim, SUM(matakuliah.sks) FROM khs JOIN mahasiswa ON mahasiswa.nim=khs.nim JOIN mataKuliah ON mataKuliah.kd_matkul=khs.kdMatkul GROUP BY mahasiswa.nama HAVING SUM(matakuliah.sks)>10; --4

-- Mencari, menambahkan, dan menampilkan data mahasiswa berdasarkan nama_matkul yang diambil
SELECT mahasiswa.nama, khs.nim, matakuliah.nama_matkul FROM khs JOIN mahasiswa ON mahasiswa.nim=khs.nim JOIN mataKuliah ON matakuliah.kd_matkul=khs.kdMatkul WHERE matakuliah.nama_matkul='Data Mining'; --5

-- Mencari dan menampilkan jumlah mahasiswa untuk setiap dosen
SELECT khs.nip, dosen.nama_dosen, COUNT( DISTINCT khs.nim), mahasiswa.nama FROM khs JOIN mahasiswa ON mahasiswa.nim=khs.nim JOIN dosen ON dosen.nip=khs.nip GROUP BY dosen.nip; --6

-- Mencari dan mengurutkan mahasiswa berdasarkan umur
SELECT mahasiswa.nama, mahasiswa.dob,(cast(strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', dob) as int)) AS umur FROM mahasiswa ORDER BY umur ASC; --7

-- Menampilkan data mahasiswa yang harus memperbaiki nilai yang mana jika nilai nya E ataupun D

-- With JOIN
SELECT * FROM khs JOIN dosen ON dosen.nip=khs.nip JOIN mahasiswa ON mahasiswa.nim=khs.nim WHERE nilai LIKE 'D%' OR nilai LIKE 'E%';z --8

-- Without JOIN
SELECT mahasiswa.nama, mahasiswa.nim, matakuliah.nama_matkul, dosen.nama_dosen, dosen.nip, khs.nilai FROM matakuliah, mahasiswa, dosen, khs WHERE UPPER(khs.nilai)>'C' AND mahasiswa.nim=khs.nim AND khs.kdMatkul=matakuliah.kd_matkul AND khs.nip=dosen.nip; -- Tanpa nama jurusan

SELECT mahasiswa.nim, mahasiswa.nama, matakuliah.nama_matkul, mahasiswa.nama_jurusan, dosen.nama_dosen, dosen.nip, khs.nilai FROM matakuliah, mahasiswa, dosen, khs WHERE UPPER(khs.nilai)>'C' AND mahasiswa.nim=khs.nim AND khs.kdMatkul=matakuliah.kd_matkul AND khs.nip=dosen.nip; -- Dengan nama jurusan