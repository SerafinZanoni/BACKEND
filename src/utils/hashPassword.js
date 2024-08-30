import bcrypt from "bcrypt";

//CIFRAMOS EL PASS
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

///VALIDAMOS EL PASS HASHEADO CON EL INGRESADO
export const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};