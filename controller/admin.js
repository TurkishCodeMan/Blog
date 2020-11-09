
const User = require("../models/user");
const Category = require("../models/category");
const Post = require("../models/post");
const Post_Category = require("../models/Post_Category");
const fs =require("fs")

var getAllUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send({
            users,
        })
    } catch (error) {
        console.log(error)
    }
}


var createCategory = async (req, res, next) => {
    const category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    try {
        await category.save();
        res.send({
            success: "Category Eklendi !"
        })
    } catch (error) {
        console.log(error.message)
    }
}
var deletePost = async (req, res, next) => {
    var postId = req.params.id;

    try {
        const post = await Post.findByPk(postId)
        fs.unlink("../public/img/" + post.imageUrl, err => {
            if (err)
                console.log(err);
        });

        await Post.destroy({ where: { id: postId } });
        res.send({
            deletePost: true,
        })
    } catch (error) {
        console.log(error.message)
    }
}
var getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll({ include: User });//User ı da yükler
        res.send({
            posts,
        })
    } catch (error) {
        console.log(error);
    }
}
var getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.send({
            categories,
        })
    } catch (error) {
        console.log(error);
    }
}
var deleteUser = async (req, res, next) => {
    var userId = req.params.id;

    try {
        await Post.destroy({ where: { userId: userId } });



        await User.destroy({ where: { id: userId } });
        res.send({
            deleteUser: true,
        })


    } catch (error) {
        console.log(error);
    }
}

var deleteCategory = async (req, res, next) => {
    var catId = req.params.id;

    try {

        await Category.destroy({ where: { id: catId } });
        res.send({
            deleteCategory: true,
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createCategory,
    getAllUser,
    deletePost,
    getPosts,
    getCategories,
    deleteUser,
    deleteCategory
}   