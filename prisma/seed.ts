import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ユーザー作成
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@ledgerly.com" },
    update: {},
    create: {
      email: "demo@ledgerly.com",
      password: hashedPassword,
      name: "デモユーザー",
    },
  });

  console.log("✅ User created:", user.email);

  // 経費カテゴリ作成
  const categories = [
    { name: "通信費", color: "#3b82f6" },
    { name: "交通費", color: "#10b981" },
    { name: "ソフトウェア", color: "#8b5cf6" },
    { name: "広告費", color: "#f59e0b" },
    { name: "外注費", color: "#ef4444" },
    { name: "その他", color: "#6b7280" },
  ];

  for (const [index, category] of categories.entries()) {
    const existing = await prisma.expenseCategory.findFirst({
      where: {
        userId: user.id,
        name: category.name,
      },
    });

    if (!existing) {
      await prisma.expenseCategory.create({
        data: {
          userId: user.id,
          name: category.name,
          color: category.color,
          sortOrder: index,
        },
      });
    }
  }

  console.log("✅ Expense categories created");

  // 顧客作成
  const customer1 = await prisma.customer.create({
    data: {
      userId: user.id,
      name: "株式会社サンプル",
      contactName: "山田太郎",
      email: "yamada@example.com",
      phone: "03-1234-5678",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      userId: user.id,
      name: "株式会社テスト",
      contactName: "佐藤花子",
      email: "sato@example.com",
    },
  });

  console.log("✅ Customers created");

  // 案件作成
  const project1 = await prisma.project.create({
    data: {
      userId: user.id,
      customerId: customer1.id,
      name: "Webサイト制作",
      description: "コーポレートサイトのリニューアル",
      contractType: "FIXED",
      contractAmount: 500000,
      startDate: new Date("2026-01-01"),
      status: "IN_PROGRESS",
    },
  });

  const project2 = await prisma.project.create({
    data: {
      userId: user.id,
      customerId: customer2.id,
      name: "システム保守",
      description: "月次保守契約",
      contractType: "FIXED",
      contractAmount: 100000,
      startDate: new Date("2026-01-01"),
      status: "IN_PROGRESS",
    },
  });

  console.log("✅ Projects created");

  // 請求書作成
  const invoice1 = await prisma.invoice.create({
    data: {
      userId: user.id,
      customerId: customer1.id,
      projectId: project1.id,
      invoiceNumber: "INV-2026-001",
      status: "SENT",
      issuedAt: new Date("2026-01-05"),
      dueAt: new Date("2026-01-31"),
      totalAmount: 500000,
      items: {
        create: [
          {
            name: "Webサイト制作費",
            description: "コーポレートサイトリニューアル一式",
            quantity: 1,
            unitPrice: 500000,
            amount: 500000,
            sortOrder: 0,
          },
        ],
      },
    },
  });

  console.log("✅ Invoices created");

  // 入金作成
  await prisma.payment.create({
    data: {
      invoiceId: invoice1.id,
      amount: 250000,
      paidAt: new Date("2026-01-10"),
      paymentMethod: "BANK_TRANSFER",
      notes: "前金",
    },
  });

  // 入金額を更新
  await prisma.invoice.update({
    where: { id: invoice1.id },
    data: { paidAmount: 250000 },
  });

  console.log("✅ Payments created");

  // 経費作成
  const communicationCategory = await prisma.expenseCategory.findFirst({
    where: {
      userId: user.id,
      name: "通信費",
    },
  });

  if (communicationCategory) {
    await prisma.expense.create({
      data: {
        userId: user.id,
        categoryId: communicationCategory.id,
        date: new Date("2026-01-05"),
        amount: 5000,
        paymentMethod: "CREDIT_CARD",
        description: "インターネット回線",
      },
    });
  }

  console.log("✅ Expenses created");
  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
