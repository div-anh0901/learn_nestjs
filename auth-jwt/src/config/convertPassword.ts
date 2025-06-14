import * as bcrypt from 'bcrypt';
export const hashPassword = (password : string)=>{
    return  bcrypt.hash(password, 10);
}

export const comparedPassword = (newPassword, oldPassword)=>{
    var isCheck = bcrypt.compare(newPassword, oldPassword);
    return isCheck
}