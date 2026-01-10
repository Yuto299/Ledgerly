import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/infrastructure/db/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    // 期限切れ請求書（未払いのみ）
    const overdueInvoices = await prisma.invoice.findMany({
      where: {
        userId,
        deletedAt: null,
        status: {
          in: ["DRAFT", "SENT"],
        },
        dueAt: {
          lt: today,
        },
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueAt: "desc",
      },
    });

    // 7日以内に期限が来る請求書（未払いのみ）
    const upcomingInvoices = await prisma.invoice.findMany({
      where: {
        userId,
        deletedAt: null,
        status: {
          in: ["DRAFT", "SENT"],
        },
        dueAt: {
          gte: today,
          lt: sevenDaysFromNow,
        },
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueAt: "asc",
      },
    });

    // 3日以内に期限が来る請求書（緊急）
    const urgentInvoices = await prisma.invoice.findMany({
      where: {
        userId,
        deletedAt: null,
        status: {
          in: ["DRAFT", "SENT"],
        },
        dueAt: {
          gte: today,
          lt: threeDaysFromNow,
        },
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueAt: "asc",
      },
    });

    return NextResponse.json({
      overdue: overdueInvoices,
      upcoming: upcomingInvoices,
      urgent: urgentInvoices,
      summary: {
        overdueCount: overdueInvoices.length,
        upcomingCount: upcomingInvoices.length,
        urgentCount: urgentInvoices.length,
        overdueAmount: overdueInvoices.reduce(
          (sum, inv) => sum + (inv.totalAmount - inv.paidAmount),
          0
        ),
      },
    });
  } catch (error) {
    console.error("Get alerts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
