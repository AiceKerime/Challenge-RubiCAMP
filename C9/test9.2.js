const spiral = (param1) => {
    const matriks = []
    let count = 0
    let counter = param1 * param1

    for (let i = 0; i < param1; i++) {
        matriks[i] = []
        for (let j = 0; j < param1; j++) {
            matriks[i][j] = count++;
        }
    }
    
    let x = 0, 
        y = 0;
    let atas = param1;
    let bawah =  0;

    let result = []

    while(result.length < counter) {
        // Kanan
        for (; x < atas; x++) {
            result.push(matriks[y][x])
        }
        x--;
        y++;
        // Bawah
        for (; y < atas; y++) {
            result.push(matriks[y][x])
        }
        x--;
        y--;
        // Kiri
        for (; x >= bawah; x--) {
            result.push(matriks[y][x])
        }
        x++;
        y--;
        // Atas
        for (; y > bawah; y--) {
            result.push(matriks[y][x])
        }
        x++;
        y++;
        bawah++;
        atas--;
    }
    console.log(result)
}

spiral(5)
spiral(6)
spiral(7)
