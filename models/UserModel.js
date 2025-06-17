
const supabase = require("../config/supabase");

// TEM QUE ESTÁ COM NOME EXATAMENTE IGUAL NO SUPABASE
const criarPerfil = async (userId, nome, funcao) => {
  const { data, error } = await supabase
    .from('usuario') 
    .insert([
      
      { user_id: userId, nomecompleto: nome, funcao: funcao }
    ]);

  
  return error;
};


module.exports = { criarPerfil };