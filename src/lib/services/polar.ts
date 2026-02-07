import { Polar } from "@polar-sh/sdk";

// فقط اگر توکن موجود باشد، Polar API را initialize می‌کنیم
const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

export const api = POLAR_ACCESS_TOKEN
	? new Polar({
			accessToken: POLAR_ACCESS_TOKEN,
			server: "production",
		})
	: null;
