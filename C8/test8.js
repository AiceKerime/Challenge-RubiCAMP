let pola = (str) => {
    let arr = []
    let splitStr = str.split(' ')

    let angkaSatu = splitStr[0]
    let angkaDua = splitStr[2]
    let angkaTiga = splitStr[4]

    for (let f = 0; f < 10; f++) {
        let firstNum = angkaSatu.replace(/#/, f)
        for (let n = 0; n < 10; n++) {
            let thirdNum = angkaTiga.replace(/#/, n)
            if (Number(firstNum) * angkaDua === Number(thirdNum)) {
                arr.push(f, n)
            }
        }
    }
    return arr;
}

console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));