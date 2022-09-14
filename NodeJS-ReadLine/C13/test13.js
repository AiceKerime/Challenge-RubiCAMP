const fs = require('fs')
const input = process.argv;
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
let index = parseInt(input[3]) - 1

const text = `
>>>>>> JS TODO <<<<<

$ node test13.js <command>
$ node test13.js list
$ node test13.js task <task_id>
$ node test13.js add <task_content>
$ node test13.js delete <task_id>
$ node test13.js complete <task_id>
$ node test13.js uncomplete <task_id>
$ node test13.js list: complete asc|descs
$ node test13.js list: outstanding asc|desc
$ node test13.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node test13.js filter: <tag_name>
`

if (!process.argv[2]) {
    console.log(text)
    process.exit(0)
}

switch (process.argv[2]) {
    case 'help':
        console.log(text)
        process.exit(0)

    case 'add':         //menambahkan
        let output = '';
        for (let i = 3; i < input.length; i++) {
            output += input[i] + ' '
        };
        data.push({
            'tag': [],
            'content': output,
            'status': '[x]'
        })
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
        console.log(`"${output.trim()}" telah ditambahkan`)
        process.exit(0)

    case 'list':
        console.log('Daftar Kerjaan')
        for (let i = 0; i < data.length; i++) {
            console.log(`${i + 1}. ${data[i].status ? '[x]' : '[ ]'} ${data[i].content.trim()}.`)
        }
        break;

    case 'task':
        console.log('Daftar Pekerjaan')
        console.log(`${index + 1}. ${data[index].status ? '[x]' : '[ ]'} ${data[index].content}`)
        process.exit(0);

    case 'delete':
        console.log(`"${data[index]['content']}" telah dihapus`)
        data.splice(index, 1)
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
        process.exit(0);

    case 'complete':
        data[index].status = '[x]'
        console.log(`"${data[index]['content']}" telah selesai`)
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
        process.exit(0)

    case 'uncomplete':
        data[index].status = false
        console.log(`"${data[index]['content']}" tidak jadi selesai`)
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
        process.exit(0)

    case 'list:outstanding':    //list yang belum selesai
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')  //dari lama ke sebentar
            for (let i = 0; i < data.length; i++) {
                if (data[i].status == false) {
                    console.log(`${i + 1}. [ ] ${data[i].content}`);
                }
            };

        if (input[3] == 'desc') //dari sebentar ke lama
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].status == false) {
                    console.log(`${i + 1}. [ ] ${data[i].content}`);
                }
            };
        process.exit(0);

    case 'list:completed':  //list yang sudah selesai
        console.log('Daftar Pekerjaan')
        if (input[3] == 'asc')  //dari lama ke sebentar
            for (let i = 0; i < data.length; i++) {
                if (data[i].status == '[x]') {
                    console.log(`${i + 1}. ${data[i].status} ${data[i].content}`);
                }
            };

        if (input[3] == 'desc') //dari sebentar ke lama
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].status == '[x]') {
                    console.log(`${i + 1}. ${data[i].status} ${data[i].content}`);
                }
            };
        process.exit(0);


    case 'tag':
        for (let i = 4; i < input.length; i++) {
            if (!data[index].tag.includes(input[i])) {
                data[index].tag.push(input[i])
            }
        }
        data[index].tag.length - 1;
        console.log(`tag "${data[index].tag}" telah ditambahkan ke daftar ${data[index].content}`)
        fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
        process.exit(0);
};

filtering(process.argv[2])

function filtering() { //fungsi untuk Filter
    console.log('Daftar Pekerjaan')
    let kata = process.argv[2]
    let kata2 = kata.slice(0, 7)
    if (kata2 == 'filter:') {
        data.map((item, index) => {
            if (item.tag.includes(kata.slice(7))) {
                console.log(`${index + 1}. ${item.status ? '[x]' : '[ ]'} ${item.content}`);
            }
        })
    };
};