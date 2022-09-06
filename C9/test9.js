const spiral = (param1) => {
    let arrMatrix = [];
    let arrSpiral = [];
    let val = 0;
    let atas = 0;
    let kiri = 0;
    let kanan = param1 - 1;
    let bawah = param1 - 1;

    for (let i = 0; i < param1; i++) {
        arrMatrix[i] = []
        for (let j = 0; j < param1; j++) {
            arrMatrix[i].push(val++)
        }
    }

    while (atas <= bawah && kiri <= kanan) {
        for (let j = atas; j <= kanan; j++) {
             arrSpiral.push(arrMatrix[atas][j])
        }
        atas++
        // console.log(arrSpiral, "ATAS")
         for (let k = atas; k <= bawah; k++) {
            arrSpiral.push(arrMatrix[k][kanan])
        }
        kanan--
    //     // console.log(arrSpiral, "KANAN")
        for (let l = kanan; l >= kiri; l--) {
            arrSpiral.push(arrMatrix[bawah][l])
        }
        bawah--
    //     // console.log(arrSpiral, "BAWAH")
        for (let m = bawah; m >= atas; m--) {
            arrSpiral.push(arrMatrix[m][kiri])
        }
        kiri++
        // console.log(arrSpiral, "KIRI")
    }
    console.log(arrSpiral);
}
spiral(5) //Output sampai nilai 24
// spiral(6) //Output sampai nilai 35
// spiral(7) //Output sampai nilai 48