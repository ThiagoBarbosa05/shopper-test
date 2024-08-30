import { z } from "zod";
import 'dotenv/config'

const envSchema = z.object({
  GEMINI_API_KEY: z.string().default("GEMINI_API_KEY")
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error(console.error('❌ Invalid environment variables', _env.error.format()))

  throw new Error("Variáveis de ambientes inválidas.")
}

export const env = _env.data