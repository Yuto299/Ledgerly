import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NEXTAUTH_SECRET must be at least 32 characters")
    .refine(
      (val) => val !== "your-secret-key-here-change-in-production",
      "NEXTAUTH_SECRET must be changed from default value"
    ),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export function validateEnv() {
  try {
    envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
      throw new Error("Environment validation failed");
    }
    throw error;
  }
}

// アプリケーション起動時に検証（本番環境のみ）
if (process.env.NODE_ENV === "production") {
  validateEnv();
}
