const User = require ('../models/User')
const Role = require ('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require ("../config")

const signinLogger = require('../loggers/signinLogger');
const signupLogger = require('../loggers/signupLogger');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword})
            await user.save()

            signupLogger(user);

            return res.json("Пользователь успешно зарегистрирован")
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)

            signinLogger(user);

            return res.json("Вы успешно вошли в аккаунт")

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try{
            //const userRole = new Role()
            //const adminRole = new Role({value: "ADMIN"})
            //await userRole.save()
            //await adminRole.save()

            const users = await User.find()
            res.json(users)

        } catch(e){
            console.log(e)
            
        }
    }
}

module.exports = new authController()