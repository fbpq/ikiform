"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
	const cookieStore = await cookies();

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	// اگر متغیرهای محیطی موجود نباشند، یک client dummy می‌سازیم
	// که در runtime خطا می‌دهد اما در build time مشکلی ایجاد نمی‌کند
	if (!(supabaseUrl && supabaseAnonKey)) {
		console.warn(
			"Missing Supabase environment variables. Using dummy client. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
		);
		// استفاده از مقادیر dummy برای جلوگیری از خطا در build time
		return createServerClient(
			supabaseUrl || "https://dummy.supabase.co",
			supabaseAnonKey || "dummy-key",
			{
				cookies: {
					getAll() {
						return cookieStore.getAll();
					},
					setAll(cookiesToSet) {
						try {
							for (const { name, value, options } of cookiesToSet) {
								cookieStore.set(name, value, options);
							}
						} catch {
							// Ignore cookie setting errors
						}
					},
				},
			}
		);
	}

	return createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options);
					}
				} catch {
					// Ignore cookie setting errors
				}
			},
		},
	});
}
