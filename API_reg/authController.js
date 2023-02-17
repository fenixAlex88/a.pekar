import User from "./models/Users.js";
import bcrypt from "bcryptjs";
import {validationResult} from 'express-validator';


class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации'});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) return res.status(400).json({message: 'Пользователь с таким именем уже существует'});
            const hashPassword = bcrypt.hashSync(password, 3);
            const user = new User({username, password: hashPassword});
            const newUser = await user.save();
            return res.json({username: newUser._doc.username, id: newUser._doc._id, message: 'Пользователь успешно зарегистрирован',auth: true})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error!!!'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден!!!`})
            }
            const validPass = bcrypt.compareSync(password, user.password);
            if (!validPass) {
                return res.status(400).json({message: `Пароль не верен!!!`})
            }
            return res.json({username: user._doc.username, id: user._doc._id, message:"Вы успешно авторизованы",auth: true})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error!!!'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const {_id, score} = req.body;
            if(!_id) return res.status(400).json({message: `Ошибка идентификации`})
            await User.findByIdAndUpdate(_id, {$set: {score}});
            return res.json({message: 'Информация успешно обновлена'});
        } catch (e) {
            console.log(e);
            return res.status(500).json(e.message);
        }
    }
}

export default new AuthController();