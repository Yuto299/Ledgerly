import { NextRequest, NextResponse } from "next/server";
import { duplicateProject } from "@/application/usecases/projects/duplicateProject";
import { getUserId } from "@/lib/auth/session";
import { handleApiError } from "@/lib/api/errorHandler";

/**
 * POST /api/projects/[id]/duplicate
 * 案件複製
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserId();
    const projectId = params.id;

    const duplicatedProject = await duplicateProject(userId, projectId);

    return NextResponse.json(duplicatedProject, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
