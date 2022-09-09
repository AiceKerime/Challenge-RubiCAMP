if (!process.argv[2]) {
    console.log('Tolong sertakan inputan soalnya')
    console.log('Misalnya \'node solution.js data.json\'')
    process.exit(0);
}

const fs = require('fs');
const readline = require('readline');

const file = fs.readFileSync('./C11/data.json')
const data = JSON.parse(file)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakanmu > '
});

console.log(`Hey, yo! Selamat datang di uji pengetahuan tentang sejarah bangsa Indonesia! Kamu akan diberikan pertanyaan dari file ini \'data.json\'

Jawablah dengan jawaban yang tepat.

Gunakan \'skip\' untuk menangguhkan pertanyaannya dan di akhir pertanyaan yang kamu skip akan ditanyakan kembali
`);

let count = 0;
let wrong = 0

console.log(`Pertanyaan : ${data[count].definition}`); // .definition untuk memanggil value dari properti yang bernama definition
rl.prompt();

rl.on('line', line => {
    if (count < data.length - 1) {
        if (line.toLowerCase() !== 'skip') {
            if (line.toLowerCase() !== data[count].term) {
                wrong++;
                console.log(`Wkwkwwkwk, jawabanmu kurang tepat! Kamu salah menjawab sebanyak ${wrong}. Coba lagi yaw!`)
                rl.prompt()
            } else {
                count++;
                console.log('Naise, jawabanmu benar!\n')
                wrong = 0
                console.log(`Pertanyaan: ${data[count].definition}`)
                rl.prompt()
            }
        } else if (line.toLowerCase() === 'skip') {
            const toEnd = data.splice(count, 2)
            data = data.concat(toEnd)

            console.log(`Pertanyaan: ${data[count].definition}`)
            rl.prompt()
        } else if (line.toLowerCase() !== data[count].term) {
            wrong++;
            console.log(`Wkwkwwkwk, jawabanmu kurang tepat! Kamu salah menjawab sebanyak ${wrong}. Coba lagi yaw!`)
            rl.prompt()
        } else {
            console.log('Naise, jawabanmu benar!\n')
            console.log('Yow mantap, kamu menang quiz nya :D')
            process.exit(0)
        }
    }
    rl.prompt();
}).on('close', () => {
    console.log('Dadah xD');
    process.exit(0);
});