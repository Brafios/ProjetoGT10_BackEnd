// VALIDA;ÃO DO E-MAIL
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// VALIDA;ÃO DA SENHA
function validatePassword(password) {
  return password.length >= 8 && 
         /[0-9]/.test(password) && 
         /[a-zA-Z]/.test(password);
}

// VALIDA;ÃO DE NÍVEIS DE ACESSO
function validateRole(role) {
  return ['admin', 'gerente', 'user'].includes(role);
}

module.exports = {
  validateEmail,
  validatePassword,
  validateRole
};