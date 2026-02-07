import { Checkout } from "@polar-sh/nextjs";

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

// اگر توکن موجود نباشد، یک handler ساده برمی‌گردانیم
export const GET = POLAR_ACCESS_TOKEN
	? Checkout({
			accessToken: POLAR_ACCESS_TOKEN,
			successUrl: process.env.POLAR_SUCCESS_URL,
			server: "production",
		})
	: async () => {
			return new Response(
				JSON.stringify({ error: "Polar API is not configured" }),
				{
					status: 503,
					headers: { "Content-Type": "application/json" },
				}
			);
		};
