import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { UnauthorizedError } from "@/lib/api/errors";

/**
 * 現在のユーザーセッションを取得
 * @returns セッション情報
 * @throws UnauthorizedError - 未認証の場合
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new UnauthorizedError("ログインが必要です");
  }

  return session.user;
}

/**
 * ユーザーIDを取得
 * @returns ユーザーID
 * @throws UnauthorizedError - 未認証の場合
 */
export async function getUserId(): Promise<string> {
  const user = await getCurrentUser();
  return user.id;
}
