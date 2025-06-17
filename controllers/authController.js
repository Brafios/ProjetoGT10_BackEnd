
const supabase = require("../config/supabase");
const { criarPerfil } = require('../models/UserModel');

const registro = async (req, res) => {
  const { email, password, nome, funcao } = req.body;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return res.status(400).json({ error: authError.message });
  }

  if (!authData.user) {
    return res.status(500).json({ error: "Erro: Usuário não foi criado na autenticação." });
  }

  const userId = authData.user.id;

  const profileError = await criarPerfil(userId, nome, funcao);

  if (profileError) {
    console.error("Erro ao criar perfil:", profileError);
    return res.status(400).json({ error: `Usuário criado, mas falha ao salvar perfil: ${profileError.message}` });
  }

  return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({
    message: "Login bem-sucedido!",
    user: data.user,
    session: data.session,
  });
};


module.exports = { registro, login };