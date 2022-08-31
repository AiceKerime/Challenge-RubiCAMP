function indexPrime(num) {
    let arr=[]
    let result = [];
    for (let i=2; i; i++) {
        let prime=true
        for (let j=2; j<i; j++) {
            if(i!=j && i%j===0){
                prime=false
                break;
            }
        }
        if(prime){
            arr.push(i)
        }
        if(arr.length===num){
            break;
        }
    }
    let hasilAkhir=result.push(result[result.length-1])
    arr.push(hasilAkhir)
    return arr
}
console.log(indexPrime(4))
console.log(indexPrime(500))
console.log(indexPrime(37786))