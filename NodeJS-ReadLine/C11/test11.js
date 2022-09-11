const fs = require('fs')
const readline = require('readline');

const file = fs.readFileSync('./C11/data.json')
const data = JSON.parse(file)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Jawabanmu: '
});

console.log("Hey, yo! Selamat datang di uji pengetahuan tentang sejarah negara Indonesia!\n")

let count = 0;

console.log(`Pertanyaan : ${data[count].definition}`); // .definition untuk memanggil value dari properti yang bernama definition
rl.prompt();

rl.on('line', line => {
  if (count < data.length - 1) {
    if (line.toLowerCase() !== data[count].term) { // .term untuk memanggil properti dari object di data.json yang 
      console.log('Wkwkwwkwk, jawabanmu kurang tepat!')
      rl.prompt()
    } else {
      count++
      console.log('Naise, jawabanmu benar!\n')
      console.log(`Pertanyaan: ${data[count].definition}`)
      rl.prompt()
    }
  } else if (line.toLowerCase() !== data[count].term) {
    console.log('Wkwkwwkwk, jawabanmu kurang tepat!')
    rl.prompt()
  } else {
    console.log('Naise, jawabanmu benar!\n')
    console.log('Yow mantap, kamu menang quiz nya :D\n')
    process.exit(0)
  }
}).on('close', () => {
  console.log('Dadah xD');
  process.exit(0);
});