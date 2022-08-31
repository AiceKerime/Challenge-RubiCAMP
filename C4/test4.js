function indexPrime(param1) {
    let arr = [], result = [];
    for (let i = 2; i <= param1; i++){
        if (!arr[i]){
            result.push(i);
            for (let j = i; j <= param1; j+=i){
                arr[j] = true;
            }
        }
    }
    return result;
}

console.log(indexPrime(4)) //result => 7
console.log(indexPrime(500)) //result => 3571
console.log(indexPrime(37786)) //result => 450881