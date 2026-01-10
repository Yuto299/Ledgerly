import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { listProjects } from "@/application/usecases/projects/listProjects";
import { createProject } from "@/application/usecases/projects/createProject";
import { handleApiError } from "@/lib/api/errorHandler";
import { ProjectStatus } from "@prisma/client";

/**
 * GET /api/projects
 * 案件一覧取得
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId();

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const customerId = searchParams.get("customerId") || undefined;
    const status = searchParams.get("status") as ProjectStatus | undefined;

    const result = await listProjects(userId, {
      page,
      limit,
      customerId,
      status,
    });

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/projects
 * 案件作成
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();
    const body = await request.json();

    const project = await createProject(userId, body);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
