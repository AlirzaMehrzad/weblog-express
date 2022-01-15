//----models
const postModel = require('@models/post');
const userModel = require('@models/user');
//----services
const dateService = require('@services/dateService');
const langService = require('@services/langService');
//----validators
const formValidator = require('@validators/auth');

const { statuses } = require('@models/post/postStatus');

exports.index = async (req, res) =>{

    const posts = await postModel.findAll();
    
    const persentedPosts = posts.map(post => {
        post.jalali_created_at = langService.toPersianNumbers(dateService.toPersianDate(post.created_at));
        post.persian_views = langService.toPersianNumbers(post.views);
        post.persian_rows = langService.toPersianNumbers(post.id);
        return post;
    });

    res.adminRender('admin/posts/index', {layout:'admin', posts: persentedPosts, helpers: {

        isStatus: function (status, options){
            let cssClass = "badge-";
            switch(true){
                case status === statuses().DRAFT: cssClass +='warning';
                break;

                case status === statuses().REVIEW: cssClass +='danger';
                break;

                case status === statuses().PUBLISHED: cssClass +='success';
                break;
            }
            return cssClass;
        },

        isText: function (status, options){
            let text = "";
            switch(true){
                case status === statuses().DRAFT: text +='پیش نویس';
                break;

                case status === statuses().REVIEW: text +='بازبینی شود';
                break;

                case status === statuses().PUBLISHED: text +='منتشر شده';
                break;
            }
            return text;
        }

    }});
}

exports.create = async (req, res) =>{

    const users = await userModel.findAll(['id', 'full_name']);

    res.adminRender('admin/posts/create', {layout: 'admin', users});
};

exports.store = async (req, res) => {

    const postData = {
        title: req.body.title,
        author_id: req.body.author,
        slug: req.body.slug,
        content: req.body.content,
        status: req.body.status
    };
    // ---validation
    const {title, slug, content} = req.body
    const errors = formValidator.create(title, slug, content);
    if(errors.length > 0) {
        const insertId = await postModel.create(postData);
        if(insertId){
           res.redirect('/admin/posts'); 
        };
    }else{
        const users = await userModel.findAll();
        req.flash('errors', ['ایمیل یا پسورد نمیتواند خالی باشد']);
        return res.adminRender('admin/posts/create', {users});
      
    }


};

exports.edit = async (req, res) => {

    const postID = req.params.postID;

    if(parseInt(postID) === 0) {
        res.redirect('/admin/posts');
    }

    const post = await postModel.find(postID);
    const users = await userModel.findAll(['id', 'full_name']);

    res.adminRender('admin/posts/edit', {layout: 'admin', users, post, postStatus: statuses(), helpers: {

        isPostAuthor: function (userID, options){
            return post.author_id === userID ? options.fn(this) : options.inverse(this);
        },

        isSelectedStatus: function (status, options){
            return post.status === status ? options.fn(this) : options.inverse(this);
        }
    }})
};

exports.update = async (req, res) => {

    const postID = req.params.postID;

    if(parseInt(postID) === 0) {
        res.redirect('/admin/posts');
    }

    const postData = {
        title: req.body.title,
        author_id: req.body.author,
        slug: req.body.slug,
        content: req.body.content,
        status: req.body.status
    };

    const result = await postModel.update(postID, postData);
    return res.redirect('/admin/posts');
};

exports.remove = async (req, res) => {
    const postID = req.params.postID;
    if(parseInt(postID) === 0) {
        res.redirect('/admin/posts');
    }
    const result = await postModel.delete(postID);
    res.redirect('/admin/posts')
};