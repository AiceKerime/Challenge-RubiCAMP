class CarFactory {
    constructor(merk1, merk2) {
        this.merk1 = merk1
        this.merk2 = merk2

        this.cars = []
    }

    static random() {
        return Math.floor(Math.random() * 10) + 1;
    }

    produksi(year) {
        let A = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car1 = new E30(year)

            this.cars.push(car1)
            A++;
        }

        let B = 0;
        for (let i = 0; i < CarFactory.random(); i++) {
            const car2 = new AE86(year);

            this.cars.push(car2)
            B++
        }

        console.log(`Pada tahun ${year}, perusahaan ${this.merk1} memproduksi sebanyak ${A} unit mobil.
Pada tahun yang sama perusahaan ${this.merk2} juga memproduksi mobil sebanyak ${B} unit mobil.`)
    }

    static maUUID() {
        const { v4: uuidv4 } = require('uuid');
        uuidv4();

        return uuidv4()
    }

    garansi(year) {
        console.log('\nNama Produk :')

        for (let i = 0; i < this.cars.length; i++) {
            let y = year

            if (y > (this.cars[i].garansi + this.cars[i].yearz)) {
                console.log(`
==========================================================
                `)
                console.log(`Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model}
Nomor mesin: ${this.cars[i].noMesin}`)
                console.log(`Waktu garansi: ${this.cars[i].garansi} tahun.

Garansi akan tidak aktif pada tahun ${y}, karena diproduksi tahun ${this.cars[i].yearz}`)
            } else {
                console.log(`
==========================================================
                `)
                console.log(`Merk: ${this.cars[i].brand}
Model: ${this.cars[i].model}
Nomor mesin: ${this.cars[i].noMesin}`)
                console.log(`Waktu garansi: ${this.cars[i].garansi} tahun.
Garansi akan tidak aktif pada tahun ${y}, karena diproduksi tahun ${this.cars[i].yearz}`)
            }
        }
    }
}

class Car {
    constructor(brand, model, yearz, gr, sit, door, tyre) {
        this.brand = brand;
        this.model = model;
        this.yearz = yearz;
        this.garansi = gr;
        this.sit = sit;
        this.door = door;
        this.tyre = tyre;
        this.noMesin = CarFactory.maUUID();
    }
}

class Ban {
    constructor(size, TyreBrand) {
        this.size = size
        this.BrandTyre = TyreBrand
    }
}

class E30 extends Car {
    constructor() {
        super('BMW', 'E30', 1989, 10, 7, 5, new Ban(4, 'Bridgestone'))
    }
}

class AE86 extends Car {
    constructor() {
        super('Toyota', 'AE86 Trueno', 1984, 10, 7, 5, new Ban(4, 'Dunlop'))
    }
}

let comp = new CarFactory('BMW', 'Toyota')
let date = (Math.floor(Math.random() * 15) + 2000)
comp.produksi(date)
comp.garansi(date)