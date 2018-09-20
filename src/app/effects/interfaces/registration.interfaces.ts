export interface PostCredentialsRequest {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  birthday: any;
}

export interface PostCredentialsResponse {
  data?: any;
}
