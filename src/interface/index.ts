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
  uid: string;
  id: string;
  name: string;
  year: string;
  price: string;
  city: string;
  km: string;
  images: string;
}

interface CarImages {
  name: string;
  uid: string;
  url: string;
}

export interface ICar {
  city: string;
  created: string;
  description: string;
  images: CarImages[];
  km: string;
  model: string;
  name: string;
  owner: string;
  price: string;
  uid: string;
  whatsapp: string;
  year: string;
}

export interface ISliders_Home {
  route: string;
  url: string;
  color: string;
}
