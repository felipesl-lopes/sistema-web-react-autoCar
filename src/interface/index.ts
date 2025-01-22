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
  whatsapp: string;
  city: string;
  uf: string;
  urlPhoto: string;
}

export interface IFormNewCar {
  inputFile?: string;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string;
  city: string;
  uf: string;
  whatsapp: string;
  description: string;
  fuel: string;
  transmission: string;
  engine: string;
  documentationStatus: string;
  maintenanceHistory: string;
  generalCondition: string;
  created: string;
  owner: string;
  uidUser: string;
  images: CarImages[];
}

export interface ICarList {
  uidUser: string;
  id: string;
  name: string;
  model?: string;
  year: string;
  price: string;
  uf?: string;
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
  uf: string;
  name: string;
  owner: string;
  price: string;
  uidUser: string;
  whatsapp: string;
  year: string;
}

export interface ISliders_Home {
  route: string;
  url: string;
  color: string;
}

export interface IImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}
