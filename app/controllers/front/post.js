const postModel = require('@models/post');
const postPresenter = require('@presenters/post');

exports.showPost = async (req, res) => {

    const postSlug = req.params.post_slug;
    const post = await postModel.findBySlug(postSlug);
    if(!post){
        return res.redirect('/404');
    }
    res.frontRender('front/post/single', {post})
}