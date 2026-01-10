import { NextRequest } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { handleApiError, handleApiSuccess } from "@/lib/api/errorHandler";
import { updateCustomerSchema } from "@/features/customers/schemas/customerSchema";
import { getCustomerById } from "@/application/usecases/customers/getCustomerById";
import { updateCustomer } from "@/application/usecases/customers/updateCustomer";
import { deleteCustomer } from "@/application/usecases/customers/deleteCustomer";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/customers/:id
 * 顧客詳細取得
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id } = await context.params;
    const result = await getCustomerById(id, userId);

    return handleApiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT /api/customers/:id
 * 顧客更新
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id } = await context.params;
    const body = await request.json();

    // バリデーション
    const validatedData = updateCustomerSchema.parse(body);

    const customer = await updateCustomer(id, userId, validatedData);

    return handleApiSuccess(customer);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE /api/customers/:id
 * 顧客削除（論理削除）
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const userId = await getUserId();
    const { id } = await context.params;
    const customer = await deleteCustomer(id, userId);

    return handleApiSuccess(customer);
  } catch (error) {
    return handleApiError(error);
  }
}
