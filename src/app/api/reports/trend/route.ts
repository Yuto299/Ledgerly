import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getMonthlyTrend } from "@/application/usecases/reports/getMonthlyTrend";
import { handleApiError } from "@/lib/api/errorHandler";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const monthsParam = searchParams.get("months");
    const months = monthsParam ? parseInt(monthsParam, 10) : 6;

    if (isNaN(months) || months < 1 || months > 24) {
      return NextResponse.json(
        { error: "months parameter must be between 1 and 24" },
        { status: 400 }
      );
    }

    const data = await getMonthlyTrend(session.user.id, months);

    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
