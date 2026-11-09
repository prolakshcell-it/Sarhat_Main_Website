import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sarhat.prolaksh.com/v1";

export interface CreateInquiryDto {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  state: string;
  projectSize?: string;
  projectDetails?: string;
}

export interface InquiryResponse {
  _id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  state: string;
  projectSize?: string;
  projectDetails?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Creates a project inquiry via POST /inquiry/create
 * Backend URL: https://sarhat.prolaksh.com/v1
 */
export const createInquiry = async (
  data: CreateInquiryDto
): Promise<InquiryResponse> => {
  const url = `${API_BASE_URL}/inquiry/create`;
  const response = await axios.post<InquiryResponse>(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
