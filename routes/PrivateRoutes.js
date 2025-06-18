require('dotenv').config();
const express = require('express');

const UserRouter = require('./UserRoute');

const PrivateRoutes = express.Router();

PrivateRoutes.use((req, res, next) => {

    const key = process.env.JWT_SECRET;
    let token = req.headers.token;

    if (!token) {
        return res.status(403).send('Acesso não autorizado');
    }
    try {
        jwt.verify(token, key);
        next();
    } catch (error){
        return res.status(403).send('Token inválido ou expirado');
    }
        
})

PrivateRoutes.use(UserRouter);

module.exports = PrivateRoutes;