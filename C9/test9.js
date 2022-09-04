let spiral = (param1) => {
    let arr = []
    let val = 0

    for (let i = 0; i < param1; i++) {
        arr[i] = []
        for (let j = 0; j < param1; j++) {
            arr[i].push(val++)
        }
        console.log(arr)
    }
    
    

}

spiral(5) //Output sampai nilai 27
spiral(6) //Output sampai nilai 41
spiral(7) //Output sampai nilai 48