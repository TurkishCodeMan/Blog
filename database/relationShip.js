const Category = require("../models/category");
const User = require("../models/user");
const Post = require("../models/post");
const Post_Category = require("../models/Post_Category")
function relationShip(){
    Post.belongsTo(User);
    User.hasMany(Post);

    Post.belongsToMany(Category,{through:Post_Category});
    Category.belongsToMany(Post,{through:Post_Category})
}

module.exports=relationShip;