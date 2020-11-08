const User = require("../models/user")

const bcrypt = require("bcryptjs");


var postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    try {
        const user = await User.findOne({where: {
            email: email
        }})
        if (!user) {

            await req.session.save();
            return res.send({
                login: false,
                errorMessage: "Bu Email de kullanıcı bulunamadı !"
            })
        }
        const response = await bcrypt.compare(password, user.password);
        if (response) {

            req.session.user = user;
            req.session.isAuthenticated=true;
            let isAdmin = false;
            if (user.isAdmin) {
                isAdmin = true;
            }
            await req.session.save();
            return res.send({
                isAuthenticated: true,
                isAdmin,
                user,
            })
        }

    } catch (error) {
        console.log(error.message);
    }
}

var postRegister = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;


    try {
        console.log(email)
        const savedUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (savedUser) {
            res.send({
                savedUser: true,
                errorMessage: "Bu Email de Kayıtlı Kullanıcı Mevcut !"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        await user.save();
        res.send({
            newUser: true,
            errorMessage: "OK"
        })
    } catch (error) {
        console.log(error)
    }
}

var logout = async (req, res, next) => {
    req.session.destroy();
    res.send({
        logout: true,
    })
}

module.exports = {
    postLogin,
    postRegister,
    logout
}