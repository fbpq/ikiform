import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	// اگر متغیرهای محیطی موجود نباشند، یک client dummy می‌سازیم
	// که در runtime خطا می‌دهد اما در build time مشکلی ایجاد نمی‌کند
	if (!(supabaseUrl && supabaseServiceRoleKey)) {
		console.warn(
			"Missing Supabase environment variables. Using dummy client. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
		);
		// استفاده از مقادیر dummy برای جلوگیری از خطا در build time
		return createClient(
			supabaseUrl || "https://dummy.supabase.co",
			supabaseServiceRoleKey || "dummy-key",
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false,
				},
			}
		);
	}

	return createClient(supabaseUrl, supabaseServiceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
