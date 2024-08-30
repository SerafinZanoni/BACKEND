//FUNCION PARA EXTRAER LAS COOKIES

export const cookieExtrator = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }

  return token;
};