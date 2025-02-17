export interface AdzunaApiResponse {
  count: number;
  mean: number;
  results: JobOpportunity[];
}

export interface JobOpportunity {
  id: string;
  adref: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  created: string;
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
  location?: AdzunaLocation;
  category?: AdzunaCategory;
  company?: AdzunaCompany;
}

export interface AdzunaLocation {
  display_name: string;
  area: string[];
}

export interface AdzunaCategory {
  label: string;
  tag: string;
}

export interface AdzunaCompany {
  display_name: string;
}
