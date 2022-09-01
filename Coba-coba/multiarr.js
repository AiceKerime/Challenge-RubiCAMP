const kotak = []
let count = 1

for (let i = 0; i < 3; i++){
    kotak[i] = []
    for (let j = 0; j < 3; j++){
        kotak[i][j] = []
        for (let k = 0; k < 3; k++) {
            kotak[i][j][k] = count++
        }
    }
}

console.log(kotak)