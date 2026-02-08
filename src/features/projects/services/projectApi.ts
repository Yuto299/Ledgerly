import {
  ProjectListResponse,
  ProjectDetailResponse,
  ProjectResponse,
  CreateProjectDto,
  UpdateProjectDto,
} from "../schemas/projectSchema";

const BASE_URL = "/api/projects";

/**
 * APIクライアント
 */
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Network error" }));
    throw new Error(error.error?.message || error.message || "API Error");
  }

  return response.json();
}

/**
 * 案件一覧を取得
 */
export async function getProjects(params?: {
  page?: number;
  limit?: number;
  customerId?: string;
  status?: string;
}): Promise<ProjectListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.customerId) searchParams.append("customerId", params.customerId);
  if (params?.status) searchParams.append("status", params.status);

  const url = searchParams.toString()
    ? `${BASE_URL}?${searchParams}`
    : BASE_URL;
  return fetchApi(url);
}

/**
 * 案件詳細を取得
 */
export async function getProject(id: string): Promise<ProjectDetailResponse> {
  return fetchApi(`${BASE_URL}/${id}`);
}

/**
 * 案件を作成
 */
export async function createProject(
  data: CreateProjectDto,
): Promise<ProjectResponse> {
  return fetchApi(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * 案件を更新
 */
export async function updateProject(
  id: string,
  data: UpdateProjectDto,
): Promise<ProjectResponse> {
  return fetchApi(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * 案件を削除
 */
export async function deleteProject(id: string): Promise<{ success: boolean }> {
  return fetchApi(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

/**
 * 案件を複製
 */
export async function duplicateProject(id: string): Promise<ProjectResponse> {
  return fetchApi(`${BASE_URL}/${id}/duplicate`, {
    method: "POST",
  });
}
