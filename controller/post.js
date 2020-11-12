
const Category = require("../models/category");
const Commit = require("../models/commit");
const Post = require("../models/post");
const User = require("../models/user");

var getIndex = async (req, res, next) => {
    //Databaseden Tüm Postlar Indexlerine Göre Alınıp Gönderilecek
    try {
        const posts = await Post.findAll({ include: User });//User ı da yükler
        res.send({
            posts,
        })
    } catch (error) {
        console.log(error);
    }

};

var getPostById = async (req, res, next) => {
    //Id ye göre post gönderilecek
    try {
        console.log(req.params.id)
        const post = await Post.findByPk(req.params.id);
        const commits = await post.getCommits({ include: ["user"] });
        res.send({
            post,
            commits
        })
    } catch (error) {
        console.log(error);
    }
};
var getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.send({
            categories,
        })
    } catch (error) {
        console.log(error);
    }
};

var getProductByCategory = async (req, res, next) => {
    const catId = req.params.id;
    try {
        const category = await Category.findByPk(catId);
        const posts = await category.getPosts({ include: ["user"] })//Postlarla kullanıcılarda gelsin

        res.send({
            posts
        })
    } catch (error) {
        console.log(error);
    }
}
var getMyPost = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const posts = await Post.findAll({ where: { userId: userId } });
        res.send({
            posts
        })
    } catch (error) {
        console.log(error);
    }
}

var createPost = async (req, res, next) => {
    console.log(req.body)
    // const file = req.file
    const post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    post.userId = req.user.id
    //post.imageUrl=file.filename
    console.log(req.body.selectedCategory)
    let selectedCategory = JSON.parse(req.body.selectedCategory);//Gelen jsonu parse ettik

    //Burada file varmı yokmu kontrolü yapılacak
    try {

        await post.save();

        //Categorisini ekleme
        console.log(selectedCategory);
        const categories = await Category.findAll({ where: { id: selectedCategory } });
        post.addCategories(categories);


        await post.update();

        res.send({
            isAuthenticated: req.session.isAuthenticated,
            success: "Post Eklendi !"
        })
    } catch (error) {
        res.send({
            error: error.message
        })
    }

}

const addCommitOnPost = async (req, res, next) => {
    console.log(req.body)
    console.log("bURAS")
    try {
        let commit = new Commit();
        commit.description = req.body.commit;
        commit.userId=req.user.id;
        await commit.save();
        const post = await Post.findByPk(req.body.postId);
        await post.addCommit(commit);

        res.send({
            successCommit: "Commit Add This Post" + req.body.postId,
        })
    } catch (error) {
        res.send({
            error: error.message
        })
    }
}


module.exports = {
    getIndex,
    getPostById,
    getAllCategories,
    getProductByCategory,
    getMyPost,
    createPost,
    addCommitOnPost
}