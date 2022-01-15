exports.create = (request) => {
    const emptyField = [];

    const errors = [];

    if(request.title === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if(request.email === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if(request.password === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if(request.slug === ""){
        errors.push('نامک نمیتواند خالی باشد');
    }

    if(request.content === ""){
        errors.push('محتوا نمیتواند خالی باشد');
    }
    return errors;
};
