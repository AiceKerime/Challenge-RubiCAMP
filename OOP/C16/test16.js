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

        let C = 2;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car3 = new Civic(total);

            this.cars.push(car3)
            C++
        }


        console.log(`Pada tahun ${total}, perusahaan ${this.merk1} memproduksi sebanyak ${A} unit mobil.
Pada tahun yang sama perusahaan ${this.merk2} juga memproduksi mobil sebanyak ${B} unit mobil dan perusahaan ${this.merk3} memproduksi sebanyak ${C} unit mobil.`)
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
            var habis = this.cars[i].garansi + this.cars[i].yearz

            if (y > (this.cars[i].garansi + this.cars[i].yearz)) {
                console.log(`
==========================================================================================

Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model} 
Nomor Mesin: ${this.cars[i].noMesin}
Dengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi sudah TIDAK AKTIF,
karena diproduksi pada tahun ${this.cars[i].yearz} dan sudah habis pada tahun ${habis}.`)
            } else {
                console.log(`
==========================================================================================

Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model}
Nomor Mesin: ${this.cars[i].noMesin}
Dengan waktu garansi ${this.cars[i].garansi} tahun, di tahun ${y} garansi masih AKTIF, 
karena diproduksi pada tahun ${this.cars[i].yearz} dan akan habis pada tahun ${habis}.`)
            }
        }
    }
}


// Class yang digunakan untuk pemanggilan properti yang mana properti nya dimasukkan ke dalam constructor, isinya itu berupa spesifikasi dari mobil. Menggunakan property method
// Encapsulation
class Car {
    constructor(brand, model, yearz, gr, sit, door, tyre) {
        this.brand = brand;
        this.model = model;
        this.yearz = yearz;
        this.garansi = gr;
        this.sit = sit;
        this.door = door;
        this.tyre = tyre;
        this.noMesin = CarFactory.MyUUID(); // Aggregation
    }
}

// Class yang digunakan untuk pemanggilan properti yang mana properti nya dimasukkan ke dalam constructor, isinya itu berupa informasi spesifikasi ban yang digunakan oleh mobil. Menggunakan property method
// Encapsulation
class Ban {
    constructor(size, TyreBrand) {
        this.size = size
        this.BrandTyre = TyreBrand
    }
}

// Inheritance, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class E30 extends Car {
    constructor() {
        // Composition
        super('BMW', 'E30', 1990, 5, 5, 5, new Ban(4, 'GT Radial'))
    }
}

// Inheritance, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class AE86 extends Car {
    constructor() {
        // Composition
        super('Toyota', 'AE86 Trueno', 1990, 10, 5, 5, new Ban(4, 'Goodyear'))
    }
}

// Inheritance atau pewarisan, yang isinya itu adalah untuk menginputkan data mobil berdasarkan dari properti yang ada di class Car
class Civic extends Car {
    constructor() {
        // Composition
        super('Honda', 'Civic SB3', 1990, 10, 5, 5, new Ban(4, 'Dunlop'))
    }
}

// Pemanggilan class dan parameternya  danjuga method2 nya  
let comp = new CarFactory('BMW', 'Toyota', 'Honda')
comp.produksi(1990)
comp.garansi(1996)