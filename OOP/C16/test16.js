class CarFactory {
    // Menggunakan prorotype method
    constructor(merk1, merk2, merk3) {
        this.merk1 = merk1
        this.merk2 = merk2
        this.merk3 = merk3

        this.cars = []
    }

    // Menggunakan static method
    static random() {
        return Math.floor(Math.random() * 10) + 1;
    }

    // Prototype method yang fungsinya untuk menghasilkan jumlah produksi mobil yang kemudian dimasukkan ke variable cars yang ada di constructor
    produksi(total) {
        let A = 5;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car1 = new E30(total)
            this.cars.push(car1)
            A++;
        }

        let B = 3;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car2 = new AE86(total);

            this.cars.push(car2)
            B++
        }

        let C = 7;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car3 = new Civic(total);

            this.cars.push(car3)
            C++
        }


        console.log(`Pada tahun 1990, perusahaan ${this.merk1} memproduksi sebanyak ${A} unit mobil.
Pada tahun yang sama perusahaan ${this.merk2} juga memproduksi mobil sebanyak ${B} unit mobil.
Perusahaan ${this.merk3}`)
    }

    // Salah satu kemampuan dari NodeJS untuk me-generate suatu nomor unik secara universal atau umum (UUID) dengan  menggunakan static method
    static MyUUID() {
        const { v4: uuidv4 } = require('uuid');
        uuidv4();

        return uuidv4()
    }

    // Prototype Method
    garansi(year) {
        console.log("\nNama Produk:")
        for (let i = 0; i < this.cars.length; i++) {
            let y = year;

            if (y > (this.cars[i].garansi + this.cars[i].yearz)) {
                console.log(`
==========================================================================================

Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model} 
Nomor Mesin: ${this.cars[i].noMesin}
Dengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi sudah TIDAK AKTIF,
karena diproduksi pada tahun ${this.cars[i].yearz} dan sudah habis pada tahun ${this.cars[i].garansi + this.cars[i].yearz}.\n`)
            } else {
                console.log(`
==========================================================================================

Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model}
Nomor Mesin: ${this.cars[i].noMesin}
Dengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi masih AKTIF, 
karena diproduksi pada tahun ${this.cars[i].yearz} dan baru akan habis pada tahun ${this.cars[i].garansi + this.cars[i].yearz}.\n`)
            }

        }

    }
}


// Class yang digunakan untuk pemanggilan properti yang mana properti nya dimasukkan ke dalam constructor, isinya itu berupa spesifikasi dari mobil. Menggunakan property method
class Car {
    constructor(brand, model, yearz, gr, sit, door, tyre) {
        this.brand = brand;
        this.model = model;
        this.yearz = yearz;
        this.garansi = gr;
        this.sit = sit;
        this.door = door;
        this.tyre = tyre;
        this.noMesin = CarFactory.MyUUID();
    }
}

// Class yang digunakan untuk pemanggilan properti yang mana properti nya dimasukkan ke dalam constructor, isinya itu berupa informasi spesifikasi ban yang digunakan oleh mobil. Menggunakan property method
class Ban {
    constructor(size, TyreBrand) {
        this.size = size
        this.BrandTyre = TyreBrand
    }
}

// Inheritance, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class E30 extends Car {
    constructor() {
        super('BMW', 'E30', 1989, 5, 5, 5, new Ban(4, 'GT Radial'))
    }
}

// Inheritance, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class AE86 extends Car {
    constructor() {
        super('Toyota', 'AE86 Trueno', 1984, 10, 5, 5, new Ban(4, 'Goodyear'))
    }
}

// Inheritance atau pewa, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class Civic extends Car {
    constructor() {
        super('Honda', 'Civic SB3', 1990, 10, 5, 5, new Ban(4, 'Perill'))
    }
}

let comp = new CarFactory('BMW', 'Toyota', 'Honda')
let date = (Math.floor(Math.random() * 15) + 2000)
comp.produksi(date)
comp.garansi(date)