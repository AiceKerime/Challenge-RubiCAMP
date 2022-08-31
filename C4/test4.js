function indexPrime(param1) {
    let result = []
    let arr = [];

    for (let i = 2; i; i++){
        let isPrime = true
        for (let j = 2; j < i; j++){
            if (i % j === 0){
                isPrime = false;
                break;
            }
        }
        if (isPrime) arr.push(i);
        if (arr.length === param1) break;
    }
    result.push(arr[arr.length-1])
    return result;
}

console.log(indexPrime(4)) //result => 7
console.log(indexPrime(500)) //result => 3571
console.log(indexPrime(37786)) //result => 450881