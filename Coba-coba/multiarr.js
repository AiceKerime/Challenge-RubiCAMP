const kotak = []
let count = 1

for (let i = 0; i < 3; i++){
    kotak[i] = []
    for (let j = 0; j < 3; j++){
        kotak[i][j] = count++
    }
}

console.log(kotak)