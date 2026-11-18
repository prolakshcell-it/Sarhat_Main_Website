import axios from "axios";

export const BACKEND_REMOTE_URL = "https://sarhat.prolaksh.com/v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL &&
  !process.env.NEXT_PUBLIC_API_URL.includes("localhost") &&
  !process.env.NEXT_PUBLIC_API_URL.includes("5001")
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "")
    : BACKEND_REMOTE_URL;

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

export interface CreateSupportTicketDto {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceCategory: string;
  priority: string;
  description: string;
}

export interface SupportTicketResponse {
  _id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceCategory: string;
  priority: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Creates a project inquiry via POST /v1/inquiry/create
 * Backend URL: https://sarhat.prolaksh.com/v1
 */
export const createInquiry = async (
  data: CreateInquiryDto
): Promise<InquiryResponse> => {
  const isBrowserLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const targetUrl = isBrowserLocalhost
    ? "/v1/inquiry/create"
    : `${API_BASE_URL}/inquiry/create`;

  try {
    const response = await axios.post<InquiryResponse>(targetUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err: any) {
    if (!isBrowserLocalhost && typeof window !== "undefined") {
      const fallback = await axios.post<InquiryResponse>(
        "/v1/inquiry/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return fallback.data;
    }
    throw err;
  }
};

/**
 * Creates a customer support ticket via POST /v1/customer-support/create
 * Backend URL: https://sarhat.prolaksh.com/v1
 */
export const createSupportTicket = async (
  data: CreateSupportTicketDto
): Promise<SupportTicketResponse> => {
  const isBrowserLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const targetUrl = isBrowserLocalhost
    ? "/v1/customer-support/create"
    : `${API_BASE_URL}/customer-support/create`;

  try {
    const response = await axios.post<SupportTicketResponse>(targetUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err: any) {
    if (!isBrowserLocalhost && typeof window !== "undefined") {
      const fallback = await axios.post<SupportTicketResponse>(
        "/v1/customer-support/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return fallback.data;
    }
    throw err;
  }
};

export interface CareerApplicationResponse {
  success: boolean;
  message: string;
  data?: {
    _id?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    roleOfInterest?: string;
    cvUrl?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  applicationId?: string;
}

/**
 * Submits a career application via POST /v1/career/apply
 * Backend URL: https://sarhat.prolaksh.com/v1
 * Body: FormData containing fullName, email, phone, roleOfInterest, and cv file
 */
export const applyCareer = async (
  formData: FormData
): Promise<CareerApplicationResponse> => {
  const isBrowserLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const targetUrl = isBrowserLocalhost
    ? "/v1/career/apply"
    : `${API_BASE_URL}/career/apply`;

  try {
    const response = await axios.post<CareerApplicationResponse>(
      targetUrl,
      formData
    );
    return response.data;
  } catch (err: any) {
    if (!isBrowserLocalhost && typeof window !== "undefined") {
      const fallback = await axios.post<CareerApplicationResponse>(
        "/v1/career/apply",
        formData
      );
      return fallback.data;
    }
    throw err;
  }
};

export interface RegisterPartnerDto {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  state: string;
  partnerType: string;
  solarExperience: string;
  message?: string;
}

export interface PartnerRegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    _id?: string;
    registrationType: "Partner";
    fullName: string;
    email: string;
    phone: string;
    city: string;
    profession: string;
    state: string;
    partnerType: string;
    solarExperience: string;
    message?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface VendorRegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    _id?: string;
    registrationType: "Vendor";
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    city: string;
    primarySupplyCategory: string;
    companyBrochure?: string | null;
    message?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

/**
 * Registers a new partner via POST /v1/join-as-partner/partner
 * Backend URL: https://sarhat.prolaksh.com/v1
 */
export const registerPartner = async (
  data: RegisterPartnerDto
): Promise<PartnerRegistrationResponse> => {
  const isBrowserLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const targetUrl = isBrowserLocalhost
    ? "/v1/join-as-partner/partner"
    : `${API_BASE_URL}/join-as-partner/partner`;

  try {
    const response = await axios.post<PartnerRegistrationResponse>(
      targetUrl,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err: any) {
    if (!isBrowserLocalhost && typeof window !== "undefined") {
      const fallback = await axios.post<PartnerRegistrationResponse>(
        "/v1/join-as-partner/partner",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return fallback.data;
    }
    throw err;
  }
};

/**
 * Registers a new vendor via POST /v1/join-as-partner/vendor
 * Backend URL: https://sarhat.prolaksh.com/v1
 * Body: FormData containing companyName, contactPerson, email, phone, city, primarySupplyCategory, message, and optional companyBrochure PDF
 */
export const registerVendor = async (
  formData: FormData
): Promise<VendorRegistrationResponse> => {
  const isBrowserLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const targetUrl = isBrowserLocalhost
    ? "/v1/join-as-partner/vendor"
    : `${API_BASE_URL}/join-as-partner/vendor`;

  try {
    const response = await axios.post<VendorRegistrationResponse>(
      targetUrl,
      formData
    );
    return response.data;
  } catch (err: any) {
    if (!isBrowserLocalhost && typeof window !== "undefined") {
      const fallback = await axios.post<VendorRegistrationResponse>(
        "/v1/join-as-partner/vendor",
        formData
      );
      return fallback.data;
    }
    throw err;
  }
};
