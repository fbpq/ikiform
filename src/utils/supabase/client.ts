import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	// اگر متغیرهای محیطی موجود نباشند، خطا throw می‌کنیم
	// تا کاربر بداند که مشکل از کجاست
	if (!supabaseUrl || !supabaseAnonKey) {
		const error = new Error(
			"Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
		);
		console.error(error.message);
		throw error;
	}

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
