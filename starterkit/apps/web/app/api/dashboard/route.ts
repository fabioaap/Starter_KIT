import { NextResponse } from "next/server";

const dashboardSnapshot = {
  users: 2840,
  revenue: 129500
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await sleep(300);
  return NextResponse.json(dashboardSnapshot);
}
