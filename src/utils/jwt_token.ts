import { sign, verify } from 'jsonwebtoken';
const secret_jwt = process.env.jwt_secret || 'token.101010101';

const signToken = (id: string) => {
     const jwt = sign({ id }, secret_jwt, {
          expiresIn: '1d',
     });
     return jwt;
};

const verifyToken = async (jwt: string) => {
     if (!jwt) return "NOT_AUTH"
     
     const isOK = verify(jwt, secret_jwt);
     if (!isOK) return 'NOT_AUTH';
     return isOK;
};

export { signToken, verifyToken };
