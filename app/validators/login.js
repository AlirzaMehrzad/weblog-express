exports.login = (request) => {

    const errors = [];

    if(request.email === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if(request.password === ""){
        errors.push('نامک نمیتواند خالی باشد');
    }

    return errors;
};