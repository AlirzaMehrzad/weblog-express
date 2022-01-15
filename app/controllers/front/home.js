const postModel = require('@models/post');
const postPresenter = require('@presenters/post');

exports.index = async (req, res) => {
    const posts = await postModel.findAll();
    const postsForPresent = posts.map(post => {
        const postPresenterInstance = new postPresenter(post);
        post.jalali_date = postPresenterInstance.jalaliCreatedAt();
        post.exceprt = postPresenterInstance.excerpt();
        return post;
    })
    res.frontRender('front/home/index', {posts: postsForPresent});
}