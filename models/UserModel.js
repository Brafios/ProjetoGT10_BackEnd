
const supabase = require("../config/supabase");

// TEM QUE ESTÁ COM NOME EXATAMENTE IGUAL NO SUPABASE
const criarPerfil = async (userId, nome, funcao) => {

  if (!userId || !nome || !funcao) {
  throw new Error("Dados incompletos: userId, nome e funcao são obrigatórios");
  }

  const funcoesPermitidas = ['admin', 'gerente', 'user'];
  if (!funcoesPermitidas.includes(funcao)) {
    throw new Error(`Função inválida. Use: ${funcoesPermitidas.join(', ')}`);
  }

  const { data, error } = await supabase
    .from('usuario') 
    .insert([{ 
      user_id: userId,
      nomecompleto: nome.trim(),
      funcao: funcao.toLowerCase() 
    }]);

  if (error) throw new Error(`Erro ao criar perfil: ${error.message}`);
  return data;
  
  // return error;
};

  const buscarPorId = async (userId) => {
    if (!userId) throw new Error("ID do usuário não fornecido");

    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(`Erro ao buscar usuário: ${error.message}`);
    return data;
  };


module.exports = { criarPerfil, buscarPorId };