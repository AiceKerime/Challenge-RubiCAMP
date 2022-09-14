-- Create a new database
sqlite3 univdabase.db


-- Create table mahasiswa
CREATE TABLE mahasiswa(nim INT(11) PRIMARY KEY NOT NULL, nama VARCHAR(120) NOT NULL, alamat TEXT NOT NULL, nama_jurusan VARCHAR(100) NOT NULL, FOREIGN KEY (jurusan) REFERENCES jurusan(id_jurusan));

-- Create table jurusan
CREATE TABLE jurusan (id_jurusan VARCHAR(4) PRIMARY KEY NOT NULL, nama_jurusan VARCHAR(100));

-- Create table dosen
CREATE TABLE dosen (nip VARCHAR(11), nama_dosen VARCHAR(120));

-- Create table matakuliah
CREATE TABLE matakuliah (kdMatkul VARCHAR(5) PRIMARY KEY NOT NULL, nama_matkul VARCHAR(70) NOT NULL, sks INT(1) NOT NULL);

-- Create table laporan
CREATE TABLE raport (id INT PRIMARY KEY AUTOINCREMENT, nim INT(11) NOT NULL, kdMatkul VARCHAR(5) NOT NULL, nip VARCHAR(5) NOT NULL, id_jurusan VARCHAR(4) NOT NULL, nilai VARCHAR(2), FOREIGN KEY (nim) REFERENCES mahasiswa(nim), FOREIGN KEY (kdMatkul) REFERENCES matakuliah(kdMatkul), FOREIGN KEY (nip) REFERENCES dosen(nip), FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan));

-- Insert data to mahasiswa tables
INSERT INTO mahasiswa VALUES ('23010030401', 'Rafi Izzaturohman', 'Sanggar Indah Banjaran', 'Rekayasa Perangkat Lunak'), ('23010030402', 'Nadia Amelia Putri', 'Desa Cingcin', 'PGSD Penjas'), ('23010030403', 'Dimas Reza', 'Sanggar Indah Banjaran', 'Pendidikan Teknik Otomasi Industri dan Robotika');

-- Insert data to jurusan tables
INSERT INTO jurusan VALUES ('U001', 'Rekayasa Perangkat Lunak'), ('U002', 'PGSD Penjas'), ('U003', 'Pendidikan Teknik Otomasi Industri dan Robotika');

-- Insert data to dosen tables
INSERT INTO dosen VALUES ('23201', 'M. Adi Fauzan'), ('23202', 'Hermansyah Putra'), ('23203', 'Themas Febrianto');

-- Insert data to matakuliah tables
INSERT INTO matakuliah VALUES ('C1001', 'Pemrograman Berorientasi Objek', '4'),  ('C1002', 'Olahraga tradisional', '3'), ('C1003', 'Robotika', '4');

-- Insert data to laporan tables for relation
INSERT INTO raport VALUES ('1', '23010030401', 'C1001', '23201', 'U001', 'A-'), ('2', '23010030402', 'C1002', '23202', 'U002', 'A+'), ('3', '23010030403', 'C1003', '23203', 'U003', 'A');