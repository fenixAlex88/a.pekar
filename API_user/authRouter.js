import Router from "express";
import AuthController from "./authController.js";
import {check} from 'express-validator';
const authRouter = new Router();

authRouter.post('/registration', [
check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 4 и до 10 символов").isLength({min:4,max:10})
], AuthController.registration);
authRouter.post('/login', AuthController.login);
authRouter.get('/users', AuthController.getUsers);
authRouter.put('/user', AuthController.update)


export default authRouter;