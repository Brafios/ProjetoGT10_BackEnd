const supabase = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ error: 'Acesso não autorizado: token não fornecido ou expirado'});
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if(error || !user){
        return res.status(401).json({ error: 'Acesso não autorizado: token inválido'});
    } 

    req.user = user;
    next();
}

module.exports = authMiddleware;