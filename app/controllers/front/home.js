const postModel = require('@models/post');
const postPresenter = require('@presenters/post');

exports.index = async (req, res) => {
    const page = 'page' in req.query ? parseInt(req.query.page) : 1;
    const perPage = 5;
    const posts = await postModel.findAll(page, perPage);
    const totalPosts = await postModel.count();
    const totalPages = Math.ceil(totalPosts / perPage);
    const pagination = {
        page,
        totalPages,
        nextPage: page < totalPages ? page + 1 : totalPages,
        prevPage: page > 1 ? page - 1 : 1,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    }

    const postsForPresent = posts.map(post => {
        const postPresenterInstance = new postPresenter(post);
        post.jalali_date = postPresenterInstance.jalaliCreatedAt();
        post.exceprt = postPresenterInstance.excerpt();
        return post;
    })
    res.frontRender('front/home/index', {posts: postsForPresent, pagination, helpers: {
        showDisabaled: function (isDisable, options) {
            return !isDisable ? 'disabled' : '';
        }
    }});
}