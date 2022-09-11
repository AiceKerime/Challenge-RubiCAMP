console.log(''.toLowerCase())

function sentecesManipulation(sentence){
        let str = ' '
        let wordSplit = sentence.split(' ')

        for (let i = 0; i < wordSplit.length; i++) {
            let word = wordSplit[i]
            let hurufAwal = wordSplit[i].charAt(0);
                    
            if (word.toLowerCase().startsWith('a') || word.toLowerCase().startsWith('i') || word.toLowerCase().startsWith('u') || word.toLowerCase().startsWith('e') || word.toLowerCase().startsWith('o')) {
                str += wordSplit[i] + ' '
            } else {
                if(wordSplit[i] != ''){
                  str += wordSplit[i].substr(1) + hurufAwal + 'nyo '
                }
            }
        } 
        return str
}


const readline = require('readline') 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tulis kalimat mu disini> '
});

rl.prompt();

rl.on('line', line => {
  console.log(`hasil konversi : ${sentecesManipulation(line)}`);
  
  rl.prompt();
}).on('close', () => {
  console.log('Dadah xD');
  process.exit(0);
});