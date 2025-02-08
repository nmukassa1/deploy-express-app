import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const generateAccessToken = (user: {id: number}) => {
    if (!process.env.JWT_SECRET) {
        console.log('JWT_SECRET is not defined');
        
        throw new Error('JWT_SECRET is not defined');
    }
    //sign jwt token with user id and secret key with 10sec expiration
    // return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
}

export const generateRefreshToken = (user: any) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        console.log('JWT_REFRESH_SECRET is not defined');
        throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export const verifyAccessToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  };
  
  export const verifyRefreshToken = (token: string) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  };