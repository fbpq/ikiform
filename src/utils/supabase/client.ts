import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	// اگر متغیرهای محیطی موجود نباشند، یک client dummy می‌سازیم
	// که در runtime خطا می‌دهد اما در build time مشکلی ایجاد نمی‌کند
	if (!(supabaseUrl && supabaseAnonKey)) {
		console.warn(
			"Missing Supabase environment variables. Using dummy client. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
		);
		// استفاده از مقادیر dummy برای جلوگیری از خطا در build time
		return createBrowserClient(
			supabaseUrl || "https://dummy.supabase.co",
			supabaseAnonKey || "dummy-key"
		);
	}

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
