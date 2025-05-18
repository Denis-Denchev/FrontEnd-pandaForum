export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  birth_date: string;
  created_at: string;
  sex: 'MALE' | 'FEMALE';
  role: 'ADMIN' | 'REGULAR';
}

export interface UserRegisterData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  birth_date: string;
  sex: 'MALE' | 'FEMALE';
}