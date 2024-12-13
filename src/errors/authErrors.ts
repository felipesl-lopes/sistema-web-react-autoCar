const errorMessages: { [key: string]: string } = {
  "auth/invalid-email": "O e-mail fornecido não é válido.",
  "auth/user-not-found": "Nenhum usuário encontrado com este e-mail.",
  "auth/wrong-password": "Senha incorreta. Tente novamente.",
  "auth/email-already-in-use": "Este e-mail já está em uso.",
  "auth/weak-password": "A senha precisa ter pelo menos 8 caracteres.",
  "auth/invalid-credential": "Ocorreu um erro. Tente novamente.",
  "auth/too-many-requests": "Você tentou muitas vezes. Aguarde um pouco e tente novamente."
};

export const getErrorMessage = (code: string) =>
  errorMessages[code] || "Ocorreu um erro. Tente novamente.";
