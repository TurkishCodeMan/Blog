const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs")
const session = require("express-session")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const multer = require("multer");
const { sync, connect, sequelizeSessionStore } = require("./database/database");
const relationShip = require("./database/relationShip");
const postRoute = require("./routes/api/post.js");
const adminRoute = require("./routes/api/admin")
const accountRoute = require("./routes/api/account")
const User = require("./models/user");
const Post = require("./models/post");
const Category = require("./models/category");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));//image-3223132.jpg olacak
    }
})

app.use(multer({ storage: storage }).single("file"));



app.use(cookieParser());
app.use(session({
    secret: "secretkey",
    cookie: {
        maxAge: 1200000,
    },
    saveUninitialized: false,
    resave: false,
    store: sequelizeSessionStore
}))
app.use(cors({
    origin: ["http://localhost:8080",
        "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public/"));; // for serving the HTML file


//Handle Production
if (process.env.NODE_ENV === "production") {
    console.log ("BUrada")
    app.use(express.static(__dirname + "/public/"));
    //Handle SPA
    // app.get(/.*/,(req,res)=>{
    //     res.sendFile(__dirname+"/public/","index.html");
    // })
}



//Routelere Girmeden Önce OLmalı
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user
            next();
        }).catch(err => {
            console.log(err);
        })

})


app.use("/api", postRoute);
app.use("/api", accountRoute);
app.use("/api/admin", adminRoute);



relationShip();
connect();
sync()
    .then(async (result) => {
        let port = process.env.PORT || 3000
        const admin = await User.findByPk(1);
        if (!admin) {
            const hashPassword = await bcrypt.hash("44", 10)
            const user = await User.create({ name: "admin", email: "cannoonur@gmail.com", password: hashPassword, isAdmin: true })
            await user.createPost({ title: "Deneme", description: "Bu bir deneme yazisidirrrrrr" })
            const post1 = await Post.create({ title: "Deneme", description: "Bu bir deneme yazisidir" });
            const post2 = await Post.create({ title: "Deneme", description: "Bu bir deneme yazisidir" })
            await user.addPosts([post1, post2]);
            const category1 = await Category.create({ name: "Saglik", description: "Saglik hakkinda" });
            const category2 = await Category.create({ name: "Bilim", description: "Bilim hakkinda" });
            //await post1.addCategories([category1,category2]);

            console.log("Created") //ASENKRON OLDUGGU İÇİN BUNU HER TÜRLÜ YAZDIRIR ÇÜNKÜ
            //BULMASINI BEKLEMEZ 

        }

        var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
        var server_host = process.env.YOUR_HOST || '0.0.0.0';
        app.listen(server_port, server_host, function() {
            console.log('Listening on port %d', server_port);
        });
    })










