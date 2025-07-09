export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    age: string;
    avatar: string;
    address: string;
    codeId: string; 
    createBy: string; 
    createdAt?: Date;
    updatedAt?: Date;
    isActived ?: boolean; 
    status ?: boolean; 
  }