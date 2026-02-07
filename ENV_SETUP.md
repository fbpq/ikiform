# راهنمای تنظیم متغیرهای محیطی

برای اجرای پروژه با Docker، باید یک فایل `.env.local` در ریشه پروژه ایجاد کنید.

## نحوه ایجاد فایل

در ریشه پروژه (همان جایی که `package.json` است)، یک فایل به نام `.env.local` ایجاد کنید:

```bash
touch .env.local
```

## متغیرهای مورد نیاز

فایل `.env.local` را با محتوای زیر پر کنید:

```bash
# ============================================
# Supabase Configuration (الزامی)
# این مقادیر را از تنظیمات پروژه Supabase خود دریافت کنید:
# https://app.supabase.com
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ============================================
# Upstash Redis (الزامی برای rate limiting)
# این مقادیر را از داشبورد Upstash دریافت کنید:
# https://console.upstash.com
# ============================================
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here

# ============================================
# Resend API (الزامی برای ارسال ایمیل)
# این کلید را از داشبورد Resend دریافت کنید:
# https://resend.com/api-keys
# ============================================
RESEND_API_KEY=re_your_resend_api_key_here

# ============================================
# Base URL (اختیاری - پیش‌فرض: https://www.ikiform.com)
# برای محیط local از localhost استفاده کنید
# ============================================
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ============================================
# Polar.sh (اختیاری - برای پرداخت و اشتراک)
# این مقادیر را از داشبورد Polar.sh دریافت کنید:
# https://polar.sh
# ============================================
POLAR_ACCESS_TOKEN=your_polar_access_token_here
POLAR_ORGANIZATION_ID=your_polar_org_id_here

# ============================================
# Site URL (اختیاری - برای تولید sitemap)
# ============================================
SITE_URL=https://www.ikiform.com
```

## نحوه دریافت مقادیر

### 1. Supabase
1. به [Supabase Dashboard](https://app.supabase.com) بروید
2. پروژه خود را انتخاب کنید
3. به Settings > API بروید
4. `Project URL` را به عنوان `NEXT_PUBLIC_SUPABASE_URL` کپی کنید
5. `anon public` key را به عنوان `NEXT_PUBLIC_SUPABASE_ANON_KEY` کپی کنید
6. `service_role` key را به عنوان `SUPABASE_SERVICE_ROLE_KEY` کپی کنید

### 2. Upstash Redis
1. به [Upstash Console](https://console.upstash.com) بروید
2. یک Redis database ایجاد کنید
3. در صفحه Redis، `UPSTASH_REDIS_REST_URL` و `UPSTASH_REDIS_REST_TOKEN` را کپی کنید

### 3. Resend
1. به [Resend Dashboard](https://resend.com/api-keys) بروید
2. یک API Key ایجاد کنید
3. کلید را به عنوان `RESEND_API_KEY` کپی کنید

### 4. Polar.sh (اختیاری)
1. به [Polar.sh Dashboard](https://polar.sh) بروید
2. Access Token و Organization ID را دریافت کنید

## نکات مهم

⚠️ **هشدار امنیتی:**
- هرگز فایل `.env.local` را در Git commit نکنید
- این فایل در `.gitignore` قرار دارد و نباید به repository اضافه شود
- مقادیر حساس را فقط در محیط local نگه دارید

## استفاده با Docker

پس از ایجاد فایل `.env.local`، Docker Compose به صورت خودکار این فایل را می‌خواند:

```bash
docker-compose up -d
```

## بررسی صحت تنظیمات

پس از اجرای کانتینر، می‌توانید لاگ‌ها را بررسی کنید:

```bash
docker-compose logs -f app
```

اگر متغیرهای محیطی به درستی تنظیم نشده باشند، خطاهای مربوطه در لاگ نمایش داده می‌شوند.

