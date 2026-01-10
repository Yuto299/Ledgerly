import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { getProjectById } from "@/application/usecases/projects/getProjectById";
import { updateProject } from "@/application/usecases/projects/updateProject";
import { deleteProject } from "@/application/usecases/projects/deleteProject";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * GET /api/projects/:id
 * 案件詳細取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const result = await getProjectById(userId, id);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/projects/:id
 * 案件更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;
    const body = await request.json();

    const project = await updateProject(userId, id, body);

    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/projects/:id
 * 案件削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    const { id } = await params;

    const result = await deleteProject(userId, id);

    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}
