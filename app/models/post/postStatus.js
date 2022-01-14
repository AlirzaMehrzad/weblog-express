const postStatuses = {
    DRAFT: 0,
    REVIEW: 1,
    PUBLISHED: 2
}

exports.statuses = () =>{
    return postStatuses
}

exports.readableStatuses = () => {
    return {
        [postStatuses.DRAFT]: 'پیش نویس',
        [postStatuses.REVIEW]: 'در حال بررسی',
        [postStatuses.PUBLISHED]: 'منتشر شده'
    }
};