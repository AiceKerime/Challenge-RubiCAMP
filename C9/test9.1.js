const spiral = (param1) => {
  let arr = []
  let count = 0
  let temp = param1 * param1

  for (let i = 0; i < param1; i++) {
    arr[i] = []
    for (let j = 0; j < param1; j++) {
      arr[i][j] = count++
    }  
  }
  
  let x = 0,
      y = 0

      let atas = param1
      let bawah = 0
      
      let result = []

  while(result.length < temp){
    for (; x < atas; x++) {
      result.push(arr[y][x])
    }
    x--
    y++
    for (; y < atas; y++) {
      result.push(arr[y][x])
    }
    x--
    y--
    for (; x >= bawah; x--) {
      result.push(arr[y][x])
    }
    x++
    y--
    for (; y > bawah; y--) {
      result.push(arr[y][x])
    }
    x++
    y++
  }
  console.log(result)
}

spiral(5)
// spiral(6)
// spiral(7)