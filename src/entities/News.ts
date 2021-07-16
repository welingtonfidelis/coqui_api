export interface NewsInterface {
  id?: string;
  title: string;
  description: string;
  expires_in: Date;
  company_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface NewsListInterface {
  id: string;
  title: string;
  description: string;
  expires_in: Date;
  company_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface NewsUpdateInterface {
  id: string;
  title: string;
  description: string;
  expires_in: Date;
  company_id: string;
}

export interface NewsDeleteInterface {
  id: string;
  company_id: string;
}

export interface NewsResponseClientInterface {
  rows: NewsListInterface[];
  count: number;
}

export interface NewsFilterInterface {
  companyId: string;
  page: number;
  limit: number;

  title?: string;
}
