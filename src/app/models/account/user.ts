export interface User extends UserForm {
  id: string;
}

export interface UserForm {
  name: string;
  surname: string;
  identification: number;
  email: string;
  type: number;
  municipality: string;
  password: string;
}
