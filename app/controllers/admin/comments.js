const commentsModel = require('@models/comment')
//----
const userService = require('@services/userService');
const dateService = require('@services/dateService');
const langService = require('@services/langService');

const commentStatus = require('@models/comment/commentStatus');

exports.index = async (req, res) => {

    const comments = await commentsModel.findAll();

    const persentedComments = comments.map(comment => {
        comment.userAvatar = userService.gravatar(comment.user_email);
        comment.jalali_created_at = langService.toPersianNumbers(dateService.toPersianDate());
        return comment;
    });

    res.adminRender('admin/comments/index', {layout:'admin', comments: persentedComments, helpers: {
        
        commentStatus: function (status, options){
            let cssClass = "badge-";
            switch(true){

                case status === commentStatus.APPROVED: cssClass +='success';
                    break;

                case status === commentStatus.REJECTED: cssClass +='danger';
                    break;

                case status === commentStatus.REVIEW: cssClass +='warning';
                break;
            }
            return cssClass;

        },
        commentaStatusText: function (status, options){
            let text = "";
            switch(true){

                case status === commentStatus.APPROVED: text +='کامنت تایید شد';
                    break;

                case status === commentStatus.REJECTED: text +='کامت رد شد';
                    break;

                case status === commentStatus.REVIEW: text +='نیاز به بررسی';
                break;
            }
            return text;
        }
    }});
};

exports.approve = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentsModel.approve(commentID);
    return res.redirect('/admin/comments');
}

exports.reject = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentsModel.reject(commentID);
    return res.redirect('/admin/comments');
}

exports.delete = async (req, res) => {
    const commentID = req.params.commentID;
    const result = await commentsModel.delete(commentID);
    return res.redirect('/admin/comments');
}