import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectApi";
import { CreateProjectDto, UpdateProjectDto } from "../schemas/projectSchema";

/**
 * 案件一覧取得フック
 */
export function useProjects(params?: {
  page?: number;
  limit?: number;
  customerId?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
}

/**
 * 案件詳細取得フック
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
}

/**
 * 案件作成フック
 */
export function useCreateProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateProjectDto) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/projects");
    },
  });
}

/**
 * 案件更新フック
 */
export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateProjectDto) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
      router.push(`/projects/${id}`);
    },
  });
}

/**
 * 案件削除フック
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/projects");
    },
  });
}
