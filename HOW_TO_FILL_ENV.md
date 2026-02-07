# راهنمای ساده: چطور فایل .env.local را پر کنم؟

## 📝 قدم به قدم

### مرحله 1: فایل را کپی کنید
```bash
cp env.local.template .env.local
```

### مرحله 2: فایل .env.local را باز کنید و این مقادیر را جایگزین کنید:

---

## 🔴 قسمت 1: Supabase (الزامی)

**از کجا بگیرم؟**
1. به https://app.supabase.com بروید
2. پروژه خود را انتخاب کنید
3. به **Settings** → **API** بروید

**چی رو عوض کنم؟**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```
⬇️ این رو با **Project URL** از Supabase عوض کنید
⬇️ مثال: `https://abcdefghijklmnop.supabase.co`

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```
⬇️ این رو با **anon public** key از Supabase عوض کنید
⬇️ مثال: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```
⬇️ این رو با **service_role** key از Supabase عوض کنید
⬇️ مثال: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🔴 قسمت 2: Upstash Redis (الزامی)

**از کجا بگیرم؟**
1. به https://console.upstash.com بروید
2. یک Redis database بسازید
3. در صفحه Redis، **REST URL** و **REST TOKEN** را ببینید

**چی رو عوض کنم؟**

```
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
```
⬇️ این رو با **REST URL** از Upstash عوض کنید
⬇️ مثال: `https://usw1-xxx-xxx.upstash.io`

```
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```
⬇️ این رو با **REST TOKEN** از Upstash عوض کنید
⬇️ مثال: `AXxxxxxxASxxxxxxASxxxxxx`

---

## 🔴 قسمت 3: Resend (الزامی)

**از کجا بگیرم؟**
1. به https://resend.com/api-keys بروید
2. یک API Key بسازید

**چی رو عوض کنم؟**

```
RESEND_API_KEY=re_your_resend_api_key_here
```
⬇️ این رو با **API Key** از Resend عوض کنید
⬇️ مثال: `re_1234567890abcdefghijklmnop`

---

## 🟡 قسمت 4: IP آدرس سرور (الزامی برای شما)

**IP سرور خود را پیدا کنید:**
- روی سرور خود SSH کنید
- دستور `curl ifconfig.me` یا `hostname -I` را اجرا کنید
- یا از پنل هاستینگ خود IP را ببینید

**چی رو عوض کنم؟**

```
NEXT_PUBLIC_BASE_URL=http://YOUR_SERVER_IP:3000
```
⬇️ `YOUR_SERVER_IP` را با IP واقعی سرور عوض کنید
⬇️ مثال: `http://192.168.1.100:3000` یا `http://45.67.89.123:3000`

```
SITE_URL=http://YOUR_SERVER_IP:3000
```
⬇️ همین IP را اینجا هم بگذارید
⬇️ مثال: `http://192.168.1.100:3000`

---

## 🟢 قسمت 5: Polar.sh (اختیاری - اگر استفاده نمی‌کنید، بگذارید همینطور)

اگر از Polar.sh استفاده نمی‌کنید، این دو خط را می‌توانید حذف کنید یا بگذارید.

---

## ✅ مثال کامل (بعد از پر کردن)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9.xxxxx

UPSTASH_REDIS_REST_URL=https://usw1-xxx-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxxxxASxxxxxxASxxxxxx

RESEND_API_KEY=re_1234567890abcdefghijklmnop

NEXT_PUBLIC_BASE_URL=http://45.67.89.123:3000
SITE_URL=http://45.67.89.123:3000
```

---

## 🚀 بعد از پر کردن

```bash
# روی سرور
docker-compose up -d --build
```

سپس سایت شما در آدرس `http://YOUR_SERVER_IP:3000` در دسترس خواهد بود!

