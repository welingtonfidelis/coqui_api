export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  user: string;
  birth: Date;
  password: string;
  address?: string;
  profile_image?: string;
  active: boolean;
  company_id: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserLoginInterface {
  token: string;
  role: string;
}

export interface UserListInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  user: string;
  birth: Date;
  profile_image: string;
  address: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserListForChatInterface {
  id: string;
  name: string;
  profile_image: string;
}

export interface UserCreatedInterface {
  id: string;
  user: string;
  email: string;
  password: string;
  profile_image: string;
}

export interface UserUpdateInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  user: string;
  birth: Date;
  address: string;
  active: boolean;
  company_id: string;
}

export interface UserUpdateStatusInterface {
  id: string;
  active: boolean;
  company_id: string;
}

export interface UserUpdateProfileInterface {
  id: string;
  name: string;
  phone: string;
  birth: Date;
  address: string;
  active: boolean;
  company_id: string;
}

export interface UserProfileInterface {
  name: string;
  user: string;
  email: string;
  phone: string;
  birth: Date;
  profile_image: string;
  address: string;
  active: boolean;
}

export interface UserUpdatePasswordInterface {
  id: string;
  company_id: string;
  old_password?: string;
  new_password: string;
}

export interface UserDeleteInterface {
  id: string;
  company_id: string;
}

export interface UserResponseClientInterface {
  rows: UserListInterface[];
  count: number;
}

export interface UserForChatResponseClientInterface {
  rows: UserListForChatInterface[];
  count: number;
}

export interface UserFilterInterface {
  companyId: string;
  page: number;
  limit: number;

  name?: string;
  email?: string;
}

export interface UserForChatFilterInterface {
  companyId: string;
  userId: string;
}
