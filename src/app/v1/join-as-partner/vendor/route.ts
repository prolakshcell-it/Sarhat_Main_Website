import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://sarhat.prolaksh.com/v1/join-as-partner/vendor";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data || {
      success: false,
      message: err?.message || "Failed to submit vendor application",
    };
    return NextResponse.json(data, { status });
  }
}

