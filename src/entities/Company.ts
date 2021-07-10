export interface CompanyInterface {
  id?: string;
  name: string;
  logo: string;
  cnpj: string;
  email: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CompanyCreatedInterface {
  id: string;
  user: {
    id: string;
    user: string;
    email: string;
    password: string;
  };
}

export interface CompanyListInterface {
  id: string;
  name: string;
  logo: string;
  cnpj: string;
  email: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CompanyUpdateInterface {
  id: string;
  name: string;
  logo: string;
  cnpj: string;
  email: string;
  active: boolean;
}

export interface CompanyDeleteInterface {
  id: string;
}

export interface CompanyResponseClientInterface {
  rows: CompanyListInterface[];
  count: number;
}

export interface CompanyFilterInterface {
  page: number;
  limit: number;

  name?: string;
  cnpj?: string;
}
