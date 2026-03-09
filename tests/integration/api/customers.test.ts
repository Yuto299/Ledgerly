import { describe, it, expect, beforeAll, afterAll, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { prisma } from "@/infrastructure/db/prisma";
import { UnauthorizedError } from "@/lib/api/errors";

// モックを設定
vi.mock("@/lib/auth/session", () => ({
  getUserId: vi.fn(),
}));

import { GET, POST } from "@/app/api/customers/route";
import { GET as GET_DETAIL, PUT as PUT_DETAIL, DELETE as DELETE_DETAIL } from "@/app/api/customers/[id]/route";
import { getUserId } from "@/lib/auth/session";

describe("API Route Handlers - Customers", () => {
  let userId: string;
  let customerId: string;

  beforeAll(async () => {
    // テスト用ユーザーを作成
    const user = await prisma.user.create({
      data: {
        email: "api-test@example.com",
        password: "test-password",
        name: "API Test User",
      },
    });
    userId = user.id;
  });

  afterAll(async () => {
    // テストデータをクリーンアップ
    await prisma.customer.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトで認証済みとして設定
    vi.mocked(getUserId).mockResolvedValue(userId);
  });

  describe("認証チェック", () => {
    it("未認証の場合は401エラーを返す", async () => {
      vi.mocked(getUserId).mockRejectedValue(new UnauthorizedError("ログインが必要です"));

      const request = new NextRequest("http://localhost:3000/api/customers");
      const response = await GET(request);
      
      // エラーが発生することを確認（エラーハンドラーが処理する）
      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(data.error.code).toBe("UNAUTHORIZED");
    });
  });

  describe("バリデーションエラー", () => {
    it("POST: 不正なデータで400エラーを返す", async () => {
      const request = new NextRequest("http://localhost:3000/api/customers", {
        method: "POST",
        body: JSON.stringify({
          name: "", // 空文字は無効
          email: "invalid-email", // 無効なメールアドレス
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      
      // バリデーションエラーが発生することを確認
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(data.error.code).toBe("VALIDATION_ERROR");
    });

    it("PUT: 不正なデータで400エラーを返す", async () => {
      const customer = await prisma.customer.create({
        data: {
          userId,
          name: "テスト顧客",
          email: "test@example.com",
        },
      });

      const request = new NextRequest(
        `http://localhost:3000/api/customers/${customer.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: "", // 空文字は無効
            email: "invalid-email", // 無効なメールアドレス
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await PUT_DETAIL(request, {
        params: Promise.resolve({ id: customer.id }),
      });
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error.code).toBe("VALIDATION_ERROR");

      // クリーンアップ
      await prisma.customer.delete({ where: { id: customer.id } });
    });
  });

  describe("CRUD操作", () => {
    it("GET: 顧客一覧を取得できる", async () => {
      // テストデータを作成
      await prisma.customer.create({
        data: {
          userId,
          name: "テスト顧客1",
          email: "test1@example.com",
        },
      });

      const request = new NextRequest("http://localhost:3000/api/customers");
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeDefined();
      expect(Array.isArray(data.customers)).toBe(true);
    });

    it("POST: 顧客を作成できる", async () => {
      const request = new NextRequest("http://localhost:3000/api/customers", {
        method: "POST",
        body: JSON.stringify({
          name: "新規顧客",
          email: "new@example.com",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toBeDefined();
      expect(data.name).toBe("新規顧客");
      expect(data.email).toBe("new@example.com");

      customerId = data.id;
    });

    it("GET /:id: 顧客詳細を取得できる", async () => {
      const customer = await prisma.customer.create({
        data: {
          userId,
          name: "テスト顧客詳細",
          email: "detail@example.com",
        },
      });

      const request = new NextRequest(
        `http://localhost:3000/api/customers/${customer.id}`
      );
      const response = await GET_DETAIL(request, {
        params: Promise.resolve({ id: customer.id }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeDefined();
      expect(data.customer).toBeDefined();
      expect(data.customer.id).toBe(customer.id);
      expect(data.customer.name).toBe("テスト顧客詳細");
      expect(data.salesSummary).toBeDefined();
      expect(data.projectCount).toBeDefined();

      // クリーンアップ
      await prisma.customer.delete({ where: { id: customer.id } });
    });

    it("PUT: 顧客を更新できる", async () => {
      if (!customerId) {
        const customer = await prisma.customer.create({
          data: {
            userId,
            name: "テスト顧客",
            email: "test@example.com",
          },
        });
        customerId = customer.id;
      }

      const request = new NextRequest(
        `http://localhost:3000/api/customers/${customerId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: "更新された顧客",
            email: "updated@example.com",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await PUT_DETAIL(request, {
        params: Promise.resolve({ id: customerId }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeDefined();
      expect(data.name).toBe("更新された顧客");
      expect(data.email).toBe("updated@example.com");
    });

    it("DELETE: 顧客を削除できる", async () => {
      const customer = await prisma.customer.create({
        data: {
          userId,
          name: "削除対象顧客",
          email: "delete@example.com",
        },
      });

      const request = new NextRequest(
        `http://localhost:3000/api/customers/${customer.id}`,
        {
          method: "DELETE",
        }
      );

      const response = await DELETE_DETAIL(request, {
        params: Promise.resolve({ id: customer.id }),
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toBeDefined();

      // 論理削除されていることを確認
      const deletedCustomer = await prisma.customer.findUnique({
        where: { id: customer.id },
      });
      expect(deletedCustomer?.deletedAt).not.toBeNull();
    });
  });
});
