"use client";

import { use } from "react";
import {
  useProject,
  useUpdateProject,
} from "@/features/projects/hooks/useProjects";
import ProjectForm from "@/features/projects/components/ProjectForm";
import Card from "@/components/atoms/Card";
import { UpdateProjectDto } from "@/features/projects/schemas/projectSchema";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error: fetchError } = useProject(id);
  const { mutate, isPending, error: updateError } = useUpdateProject(id);

  const handleSubmit = (formData: UpdateProjectDto) => {
    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (fetchError || !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600">
          エラーが発生しました: {fetchError?.message || "案件が見つかりません"}
        </p>
      </div>
    );
  }

  const { project } = data;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">案件編集</h1>

      {updateError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {updateError.message}
        </div>
      )}

      <Card>
        <ProjectForm
          defaultValues={{
            customerId: project.customerId,
            name: project.name,
            description: project.description || "",
            contractType: project.contractType,
            contractAmount: project.contractAmount || undefined,
            startDate: project.startDate
              ? new Date(project.startDate).toISOString().split("T")[0]
              : "",
            endDate: project.endDate
              ? new Date(project.endDate).toISOString().split("T")[0]
              : "",
            status: project.status,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </Card>
    </div>
  );
}
