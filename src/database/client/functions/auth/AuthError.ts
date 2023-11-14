export const AuthErrorMessages = {
  'auth/invalid-email': {
    title: 'Email Inválido',
    description: 'Verifique seu email e tente novamente.',
  },
  'auth/wrong-password': {
    title: 'Senha Inválida',
    description: 'Verifique sua senha e tente novamente.',
  },
  'auth/user-not-found': {
    title: 'Conta não encontrada',
    description: 'Faça o seu cadastro e tente novamente.',
  },
  'auth/invalid-login-credentials': {
    title: 'Credenciais inválidas',
    description: 'Verifique seu login e tente novamente.',
  },
  'auth/email-already-in-use': {
    title: 'Email já cadastrado',
    description: 'Tente utilizar outro email e tente novamente.',
  },
  'auth/account-exists-with-different-credential': {
    title: 'Email já cadastrado',
    description: 'Tente utilizar outro email e tente novamente.',
  },
  'auth/user-disabled': {
    title: 'Conta desativada',
    description: 'Sua conta foi desativada. Contate o suporte.',
  },
  'auth/weak-password': {
    title: 'Senha muito fraca',
    description: 'Refaça a sua senha e tente novamente.',
  },
  'auth/too-many-requests': {
    title: 'Tentativas em excesso',
    description: 'Para sua segurança, tente novamente mais tarde.',
  },
  'auth/popup-blocked': {
    title: 'Popup bloqueado',
    description: 'O seu navegador bloqueou o popup do Google.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup já aberto',
    description: 'Finalize um popup antes de tentar novamente.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup fechado',
    description: 'Você fechou seu popup. Tente novamente.',
  },
  'auth/user-not-licensed': {
    title: 'Não licenciado',
    description: 'Considere assinar a plataforma.',
  },
  'auth/unknown-error': {
    title: 'Erro desconhecido',
    description: 'Tente novamente mais tarde',
  },
};

export type AuthError = keyof typeof AuthErrorMessages;

export function isAuthError(error: string): error is AuthError {
  return Object.keys(AuthErrorMessages).includes(error as any);
}
