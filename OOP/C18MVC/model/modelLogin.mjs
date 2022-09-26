import { db } from "../test18MVC.mjs"

export default class ModelLogin {
    static login(username, callback) {
        db.all('SELECT * FROM user WHERE user.username = ?', [username], (err, data) => {
            callback(err, data)
        })
    }
}