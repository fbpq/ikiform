# راهنمای Deploy روی سرور

این راهنما نحوه Deploy کردن پروژه روی سرور با Docker را توضیح می‌دهد.

## ✅ بررسی‌های قبل از Deploy

### 1. فایل‌های مورد نیاز
- ✅ `Dockerfile` - برای ساخت image
- ✅ `docker-compose.yml` - برای اجرای کانتینر
- ✅ `.env.local` - متغیرهای محیطی (باید با مقادیر واقعی پر شود)
- ✅ `.dockerignore` - برای بهینه‌سازی build

### 2. بررسی متغیرهای محیطی
قبل از deploy، مطمئن شوید که فایل `.env.local` با مقادیر واقعی پر شده است:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_BASE_URL` (باید URL سرور شما باشد)

## 🚀 مراحل Deploy

### مرحله 1: آماده‌سازی سرور

```bash
# نصب Docker و Docker Compose (اگر نصب نیست)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# نصب Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### مرحله 2: انتقال فایل‌ها به سرور

```bash
# از کامپیوتر local
scp -r . user@your-server-ip:/path/to/project/

# یا با Git
git clone your-repo-url
cd your-project
```

### مرحله 3: تنظیم متغیرهای محیطی

```bash
# روی سرور
cd /path/to/project
nano .env.local  # یا vim .env.local

# مقادیر را با اطلاعات واقعی پر کنید
# به خصوص NEXT_PUBLIC_BASE_URL را به URL سرور خود تغییر دهید
```

### مرحله 4: ساخت و اجرای کانتینر

```bash
# ساخت image و اجرای کانتینر
docker-compose up -d --build

# بررسی لاگ‌ها
docker-compose logs -f app

# بررسی وضعیت
docker-compose ps
```

### مرحله 5: بررسی Health Check

```bash
# بررسی سلامت کانتینر
docker-compose ps

# تست دسترسی
curl http://localhost:3000
```

## 🔧 تنظیمات اضافی برای Production

### 1. استفاده از Nginx به عنوان Reverse Proxy (توصیه می‌شود)

```nginx
# /etc/nginx/sites-available/ikiform
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. تنظیم SSL با Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 3. تنظیم Firewall

```bash
# باز کردن پورت‌های لازم
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 📊 مانیتورینگ و Logging

### مشاهده لاگ‌ها

```bash
# لاگ‌های زنده
docker-compose logs -f app

# آخرین 100 خط لاگ
docker-compose logs --tail=100 app

# لاگ‌های از زمان خاص
docker-compose logs --since 30m app
```

### بررسی استفاده از منابع

```bash
# استفاده از CPU و Memory
docker stats ikiform-app

# بررسی فضای دیسک
docker system df
```

## 🔄 به‌روزرسانی

### به‌روزرسانی کد

```bash
# Pull آخرین تغییرات
git pull

# Rebuild و restart
docker-compose up -d --build

# یا فقط restart (اگر فقط متغیرهای محیطی تغییر کرده)
docker-compose restart
```

### پاک‌سازی

```bash
# حذف image های قدیمی
docker image prune -a

# حذف کانتینرهای متوقف شده
docker container prune
```

## 🛠️ عیب‌یابی

### مشکل: کانتینر start نمی‌شود

```bash
# بررسی لاگ‌ها
docker-compose logs app

# بررسی متغیرهای محیطی
docker-compose config

# اجرای دستی برای debug
docker-compose run --rm app sh
```

### مشکل: خطای Build

```bash
# پاک کردن cache و rebuild
docker-compose build --no-cache

# بررسی فایل‌های مورد نیاز
ls -la package.json pnpm-lock.yaml
```

### مشکل: خطای اتصال به Database

- بررسی `NEXT_PUBLIC_SUPABASE_URL` و کلیدها
- بررسی اتصال اینترنت سرور
- بررسی firewall و security groups

## 📝 نکات مهم

1. **امنیت:**
   - هرگز فایل `.env.local` را commit نکنید
   - از strong passwords استفاده کنید
   - SSL/TLS را فعال کنید

2. **Backup:**
   - به صورت منظم از `.env.local` backup بگیرید
   - از دیتابیس Supabase backup بگیرید

3. **Performance:**
   - Resource limits در docker-compose تنظیم شده است
   - برای ترافیک بالا، از load balancer استفاده کنید

4. **Monitoring:**
   - از سرویس‌های monitoring مثل UptimeRobot استفاده کنید
   - لاگ‌ها را به صورت منظم بررسی کنید

## ✅ چک‌لیست نهایی

- [ ] Docker و Docker Compose نصب شده
- [ ] فایل `.env.local` با مقادیر واقعی پر شده
- [ ] `NEXT_PUBLIC_BASE_URL` به URL سرور تنظیم شده
- [ ] کانتینر با موفقیت اجرا شده
- [ ] Health check موفق است
- [ ] سایت از اینترنت قابل دسترسی است
- [ ] SSL/TLS تنظیم شده (توصیه می‌شود)
- [ ] Firewall تنظیم شده
- [ ] Backup strategy تعریف شده

## 🆘 پشتیبانی

اگر مشکلی پیش آمد:
1. لاگ‌ها را بررسی کنید: `docker-compose logs -f app`
2. وضعیت کانتینر را بررسی کنید: `docker-compose ps`
3. Health check را بررسی کنید: `docker inspect ikiform-app`

