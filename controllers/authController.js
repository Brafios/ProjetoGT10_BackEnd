const supabase = require("../config/supabase");
const { criarPerfil } = require('../models/UserModel');
const { validateEmail, validatePassword } = require('../utils/validacoes');

const registro = async (req, res) => {
  try {
    const { email, password, nome, funcao } = req.body;

    if (!email || !password || !nome || !funcao) {
      return res.status(400).json({ 
        success: false,
        error: "Todos os campos são obrigatórios" 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Formato de e-mail inválido"
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: "A senha deve ter no mínimo 8 caracteres"
      });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ 
        success: false,
        error: authError.message 
      });
    }

    try {
      await criarPerfil(authData.user.id, nome, funcao);
      
      return res.status(201).json({ 
        success: true,
        message: 'Usuário registrado com sucesso!',
        userId: authData.user.id
      });

    } catch (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      
      return res.status(400).json({
        success: false,
        error: profileError.message
      });
    }

  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ 
      success: false,
      error: "Erro durante o registro",
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "E-mail e senha são obrigatórios" 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Formato de e-mail inválido"
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorMessage = error.message.includes('Invalid login credentials') 
        ? "E-mail ou senha incorretos" 
        : error.message;
      
      return res.status(401).json({ 
        success: false,
        error: errorMessage
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login bem-sucedido!",
      user: {
        id: data.user.id,
        email: data.user.email
      },
      session: data.session
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ 
      success: false,
      error: "Erro durante o login",
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};

const recuperarSenha = async (req, res) => {
  const { email } = req.body;

  if (!email){
    return res.status(400).json({ error: "O e-mail é obrigatório."})
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://projeto-gt-10-full-stack.vercel.app/update-password',
  });

  if (error){
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar a solicitação."});
  }

  return res.status(200).json({ message: "Se o e-mail estiver cadastrado, um link será enviado"})
}

const atualizarSenha = async (req, res) => {
  
  const { password, accessToken, refreshToken } = req.body;

  if (!password || !accessToken || !refreshToken) {
    return res.status(400).json({ error: "Nova senha e tokens são obrigatórios." });
  }

  
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (sessionError) {
    console.error("Erro ao estabelecer sessão:", sessionError);
    return res.status(401).json({ error: "Sessão inválida ou expirada." });
  }

  
  const { error: updateError } = await supabase.auth.updateUser({
    password: password,
  });

  if (updateError) {
    console.error("Erro ao atualizar usuário:", updateError);
    return res.status(400).json({ error: "Não foi possível atualizar a senha." });
  }

  return res.status(200).json({ message: "Senha atualizada com sucesso!" });
};

const getMe = (req, res) => {
  if (req.user){
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ error: 'Não autenticado'});
  }
}

const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token){
    await supabase.auth.signOut(token);
  }
  res.status(200).json({ message: 'Logout realizado com sucesso'});
}

module.exports = { 
  registro, 
  login,
  atualizarSenha,
  recuperarSenha,
  getMe,
  logout
};