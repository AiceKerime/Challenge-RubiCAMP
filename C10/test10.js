function sentecesManipulation(sentence){
        let str = ' '
        let wordSplit = sentence.split(' ')
    
        for (let i = 0; i < wordSplit.length; i++) {
            let word = wordSplit[i]
            let hurufAwal = wordSplit[i].charAt(0);
                    
            if (word[0].toLowerCase() == 'a' || word[0].toLowerCase() == 'i' || word[0].toLowerCase() == 'u' || word[0].toLowerCase() == 'e' || word[0].toLowerCase() == 'o') {
                str += wordSplit[i] + ' '
            } else {
                str += wordSplit[i].substr(1) + hurufAwal + 'nyo '
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