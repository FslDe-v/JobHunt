export interface BodyRequest {
  posted_at_max_age_days?: number;
  job_seniority_or?: string[];
  remote?: boolean;
  easy_apply?: boolean;
  job_country_code_or?: string[];
  industry_or?: string[];
  limit?: number;
  page?: number;

  order_by?: Array<{
    field: string;
    desc: boolean;
  }>;
}
