const supabase = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        req.user = null;
        return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if(error){
        req.user = null;
    } else {
        req.user = user;
    }

    next();
}

module.exports = authMiddleware;