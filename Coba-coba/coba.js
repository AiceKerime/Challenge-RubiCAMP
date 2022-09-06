let angka =[
    [
        [123]
        [567]
    ]
]
for (let i = 0; i < angka.length; i++) {
    let arr1 = angka[i]
    for (let j = 0; j < angka[i].length; j++) {
        const element = angka[j]
        for (let k = 0; k < element.length; k++) {
            const element1 = element[k];
            for (let l = 0; l < element1.length; l++) {
                const element2 = element1[l];
                
                console.log(element2)
            }
            
        }
    }
}