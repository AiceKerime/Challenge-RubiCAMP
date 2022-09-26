import ViewLog from "../view/viewLog.mjs"
import ModelLogin from "../model/modelLogin.mjs"
import Login, { rl } from "../test18MVC.mjs"

export default class users {
    static username() {
        rl.question('username: ', (username) => {
            ModelLogin.login([username], (err, data) => {
                if (err) {
                    console.log('Gagal ambil data user', err)
                    process.exit(1)
                }
                if (data.length == 0) {
                    console.log('Username tidak terdaftar')
                    users.username()
                }
                users.password(data[0])
            })
        })
    }

    static password(user) {
        rl.question('password: ', (password) => {
            if (password == user.password) {
                ViewLog.line()
                console.log(`welcome, ${user.username}. Your access level is : ${user.role.toUpperCase()} `)
                Login.home()
            } else {
                console.log('password salah')
                users.password(user)
            }
        })
    }
}
