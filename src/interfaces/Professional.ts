
export interface IProfessionalBasic {
  name: string;
  email: string;
  position:string;
}

export interface IProfessionalLogged extends IProfessionalBasic {
  token: string;
}

export interface IProfessionalSecurity {
  email: string;
  password: string;
}

export interface IProfessionalRegister extends IProfessionalBasic, IProfessionalSecurity {
  cep: number;
  phone: number;  
}

export interface IProfessionalBasicData {
  position: any;
  _id:any;
  name: string;
}


