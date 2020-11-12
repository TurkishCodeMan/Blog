const Category = require("../models/category");
const User = require("../models/user");
const Post = require("../models/post");
const Post_Category = require("../models/Post_Category")
const Commit = require("../models/commit");
const CommitPost = require("../models/commit_post.");
function relationShip(){
    Post.belongsTo(User);
    User.hasMany(Post);

    Post.belongsToMany(Category,{through:Post_Category});
    Category.belongsToMany(Post,{through:Post_Category})


    Commit.belongsTo(User);
    User.hasMany(Commit);

    Commit.belongsToMany(Post,{through:CommitPost});
    Post.belongsToMany(Commit,{through:CommitPost});
   
}

module.exports=relationShip;