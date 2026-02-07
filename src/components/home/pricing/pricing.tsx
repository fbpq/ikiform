import { api } from "@/lib/services";
import PricingClient from "./client";

export default async function Pricing() {
	// اگر Polar API پیکربندی نشده باشد، products خالی برمی‌گردانیم
	if (!api) {
		return <PricingClient products={[]} />;
	}

	try {
		const products = await api.products.list({ isArchived: false });
		return <PricingClient products={products.result.items} />;
	} catch (error) {
		// در صورت خطا، products خالی برمی‌گردانیم
		console.error("Error fetching Polar products:", error);
		return <PricingClient products={[]} />;
	}
}
