export type LoginUser = {
    email: string,
    password: string,
}

export type RegisterUser = {
    email: string,
    name: string,
    password: string,
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
  }