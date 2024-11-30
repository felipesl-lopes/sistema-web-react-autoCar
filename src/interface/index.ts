export interface IFormLogin {
  email: string;
  password: string;
}

export interface IFormRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IFormRecoverPassword {
  email: string;
}

export interface IUser {
  name: string;
  email: string;
  uid: string;
}

export interface IFormNewCar {
  inputFile: string;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string;
  city: string;
  whatsapp: string;
  description: string;
}

export interface ICarList {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string;
  city: string;
  km: string;
  images: CarImages[];
}

interface CarImages {
  name: string;
  uid: string;
  url: string;
}
