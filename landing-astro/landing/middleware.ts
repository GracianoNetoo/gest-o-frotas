import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  // Ler o cookie de autenticação
  const token = context.cookies.get("auth_token");

  // Verificar se o usuário está tentando acessar uma rota protegida
  if (context.url.pathname.startsWith("/dashboard")) {
    // Se não tiver token, manda de volta pro login
    if (!token) {
      return context.redirect("/login");
    }
  }

  return next();
});