"use client";

import axios from "axios";

const MED_API_BASE_URL = process.env.NEXT_PUBLIC_MED_API_URL || "http://localhost:8000";

const medApi = axios.create({
  baseURL: MED_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export interface MedicalChatResponse {
  response?: {
    message?: string;
    formatted?: boolean;
    medical_grade?: boolean;
  };
  confidence?: number;
  source?: string;
  timestamp?: string;
  disclaimer?: string;
  user_id?: string;
  error?: string;
}

export async function sendMedicalChat(message: string, userId: string = "anonymous"): Promise<MedicalChatResponse> {
  try {
    console.log("Sending medical chat request:", { message, userId, baseURL: MED_API_BASE_URL });
    const res = await medApi.post("/api/medical-chat", { message, user_id: userId });
    console.log("Medical chat response:", res.data);
    return res.data as MedicalChatResponse;
  } catch (error: any) {
    console.error("Medical chat error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    throw new Error(error.response?.data?.error || error.message || "Failed to connect to medical AI");
  }
}


