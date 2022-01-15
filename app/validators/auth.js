exports.create = (par1, par2, par3) => {
    const errors = [];
    if(par1 === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    }

    if(par2 === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    } 

     if(par3 === ""){
        errors.push('عنوان نمیتواند خالی باشد');
    } 
    return errors;
};
