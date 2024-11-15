import { NextResponse } from "next/server";
import { getSystemDetails } from "@/lib/system";

export async function GET() {
  const systemInfo = await getSystemDetails();
  return NextResponse.json(systemInfo);
}
