"use client";

import { useRouter } from "next/navigation";
import { useCreateProject } from "@/features/projects/hooks/useProjects";
import ProjectForm from "@/features/projects/components/ProjectForm";
import Card from "@/components/atoms/Card";
import { CreateProjectDto } from "@/features/projects/schemas/projectSchema";

export default function NewProjectPage() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateProject();

  const handleSubmit = (data: CreateProjectDto) => {
    mutate(data);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">新規案件登録</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error.message}
        </div>
      )}

      <Card>
        <ProjectForm onSubmit={handleSubmit} isSubmitting={isPending} />
      </Card>
    </div>
  );
}
