import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = "https://sarhat.prolaksh.com/v1/join-as-partner/partner";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(BACKEND_URL, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data =
      err?.response?.data || {
        success: false,
        message: err?.message || "Failed to submit partner application",
      };
    return NextResponse.json(data, { status });
  }
}

