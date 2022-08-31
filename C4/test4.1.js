function indexPrime(num) {
    let arr=[]
    let result = [];
    for (let i=2; i; i++) {
        let prime=true
        for (let j=2; j<i; j++) {
            if(i%j==0){
                prime=false
            }
        }
        if(prime){
            result.push(i)
        }
        if(result.length==num){
            break;
        }
    }
    let hasilAkhir=result [result.length-1]
    arr.push(hasilAkhir)
    return arr
}
console.log(indexPrime(4))
console.log(indexPrime(500))
console.log(indexPrime(37786))