import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getDashboardData } from "@/application/usecases/reports/getDashboardData";
import { handleApiError } from "@/lib/api/errorHandler";
import { format } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") || format(new Date(), "yyyy-MM");

    // 月フォーマットのバリデーション
    if (!/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { error: "Invalid month format. Use YYYY-MM" },
        { status: 400 }
      );
    }

    const data = await getDashboardData(session.user.id, month);

    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
