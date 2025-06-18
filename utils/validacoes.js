// VALIDA;ÃO DO E-MAIL
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// VALIDA;ÃO DA SENHA
function validatePassword(password) {
  return password && password.length >= 8;
}

// const validRoles = ['admin', 'gerente', 'user'];
// if (!validRoles.includes(funcao)) {
//   return res.status(400).json({
//     success: false,
//     error: `Função inválida. Use: ${validRoles.join(', ')}`
//   });
// }

module.exports = {
  validateEmail,
  validatePassword,
//   validateRole
};