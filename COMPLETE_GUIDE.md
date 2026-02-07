# 🚀 راهنمای کامل: از Git تا Deploy روی سرور

این راهنما برای کسانی است که تازه شروع کرده‌اند. همه چیز را قدم به قدم توضیح داده‌ام.

---

## 📋 فهرست مطالب

1. [آماده‌سازی Git روی کامپیوتر](#1-آماده‌سازی-git-روی-کامپیوتر)
2. [آپلود پروژه به GitHub/GitLab](#2-آپلود-پروژه-به-githubgitlab)
3. [آماده‌سازی سرور](#3-آماده‌سازی-سرور)
4. [Clone کردن پروژه روی سرور](#4-clone-کردن-پروژه-روی-سرور)
5. [تنظیم متغیرهای محیطی](#5-تنظیم-متغیرهای-محیطی)
6. [اجرای پروژه با Docker](#6-اجرای-پروژه-با-docker)
7. [دسترسی به سایت](#7-دسترسی-به-سایت)

---

## 1️⃣ آماده‌سازی Git روی کامپیوتر

### مرحله 1.1: نصب Git (اگر نصب نیست)

**روی Mac:**
```bash
# Git معمولاً از قبل نصب است، بررسی کنید:
git --version

# اگر نصب نیست:
brew install git
```

**روی Windows:**
- از https://git-scm.com/download/win دانلود کنید
- فایل را اجرا کنید و Next را بزنید

**روی Linux:**
```bash
sudo apt update
sudo apt install git
```

### مرحله 1.2: تنظیم Git (فقط یک بار)

```bash
git config --global user.name "نام شما"
git config --global user.email "ایمیل شما"
```

مثال:
```bash
git config --global user.name "Farhad"
git config --global user.email "farhad@example.com"
```

### مرحله 1.3: ایجاد Repository روی GitHub

1. به https://github.com بروید و وارد شوید
2. روی **+** (بالا سمت راست) کلیک کنید
3. **New repository** را انتخاب کنید
4. یک نام برای repository انتخاب کنید (مثلاً `ikiform`)
5. **Public** یا **Private** را انتخاب کنید
6. **Create repository** را بزنید
7. **لینک repository را کپی کنید** (مثلاً: `https://github.com/username/ikiform.git`)

---

## 2️⃣ آپلود پروژه به GitHub/GitLab

### مرحله 2.1: باز کردن Terminal در پوشه پروژه

**روی Mac:**
- Terminal را باز کنید
- به پوشه پروژه بروید:
```bash
cd "/Users/farhad/Desktop/ikiform 2"
```

**روی Windows:**
- PowerShell یا CMD را باز کنید
- به پوشه پروژه بروید:
```bash
cd "C:\Users\YourName\Desktop\ikiform 2"
```

### مرحله 2.2: بررسی وضعیت Git

```bash
git status
```

اگر خطا داد که "not a git repository"، ادامه دهید.

### مرحله 2.3: Initialize کردن Git

```bash
git init
```

### مرحله 2.4: اضافه کردن فایل‌ها

```bash
# اضافه کردن همه فایل‌ها (به جز فایل‌های .env.local)
git add .
```

**⚠️ مهم:** فایل `.env.local` به صورت خودکار ignore می‌شود (در `.gitignore` است)

### مرحله 2.5: Commit کردن

```bash
git commit -m "اولین commit: اضافه کردن پروژه"
```

### مرحله 2.6: اتصال به GitHub

```bash
# لینک repository خود را اینجا بگذارید
git remote add origin https://github.com/username/ikiform.git
```

**⚠️ توجه:** `username` و `ikiform` را با نام واقعی خود عوض کنید!

### مرحله 2.7: Push کردن به GitHub

```bash
git branch -M main
git push -u origin main
```

اگر از شما username و password خواست:
- **Username:** نام کاربری GitHub شما
- **Password:** از GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - یک token بسازید و آن را به عنوان password استفاده کنید

---

## 3️⃣ آماده‌سازی سرور

### مرحله 3.1: اتصال به سرور

**روی Mac/Linux:**
```bash
ssh root@YOUR_SERVER_IP
```

**روی Windows:**
- از نرم‌افزار PuTTY یا Windows Terminal استفاده کنید
- IP سرور و پورت 22 را وارد کنید

مثال:
```bash
ssh root@45.67.89.123
```

### مرحله 3.2: به‌روزرسانی سیستم

```bash
# روی Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# روی CentOS/RHEL
sudo yum update -y
```

### مرحله 3.3: نصب Docker

```bash
# دانلود و اجرای اسکریپت نصب Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### مرحله 3.4: نصب Docker Compose

```bash
# دانلود Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# دادن مجوز اجرا
sudo chmod +x /usr/local/bin/docker-compose

# بررسی نصب
docker-compose --version
```

### مرحله 3.5: نصب Git (اگر نصب نیست)

```bash
# روی Ubuntu/Debian
sudo apt install git -y

# روی CentOS/RHEL
sudo yum install git -y
```

### مرحله 3.6: پیدا کردن IP سرور

```bash
curl ifconfig.me
```

**این IP را یادداشت کنید!** (مثلاً: `45.67.89.123`)

---

## 4️⃣ Clone کردن پروژه روی سرور

### مرحله 4.1: رفتن به پوشه مناسب

```bash
# رفتن به پوشه home
cd ~

# یا ایجاد یک پوشه برای پروژه‌ها
mkdir projects
cd projects
```

### مرحله 4.2: Clone کردن پروژه

```bash
# لینک repository خود را اینجا بگذارید
git clone https://github.com/username/ikiform.git
```

**⚠️ توجه:** `username` و `ikiform` را با نام واقعی خود عوض کنید!

### مرحله 4.3: رفتن به پوشه پروژه

```bash
cd ikiform
```

### مرحله 4.4: بررسی فایل‌ها

```bash
ls -la
```

باید فایل‌های زیر را ببینید:
- `Dockerfile`
- `docker-compose.yml`
- `package.json`
- `env.local.template`
- و سایر فایل‌ها

---

## 5️⃣ تنظیم متغیرهای محیطی

### مرحله 5.1: کپی کردن template

```bash
cp env.local.template .env.local
```

### مرحله 5.2: باز کردن فایل .env.local

```bash
nano .env.local
```

یا اگر `vim` را ترجیح می‌دهید:
```bash
vim .env.local
```

### مرحله 5.3: پر کردن مقادیر

در فایل باز شده، این مقادیر را پیدا کنید و عوض کنید:

#### 5.3.1: Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```
⬇️ این مقادیر را از Supabase Dashboard بگیرید

#### 5.3.2: Upstash Redis
```
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```
⬇️ این مقادیر را از Upstash Console بگیرید

#### 5.3.3: Resend
```
RESEND_API_KEY=re_your_resend_api_key_here
```
⬇️ این را از Resend Dashboard بگیرید

#### 5.3.4: IP سرور (مهم!)
```
NEXT_PUBLIC_BASE_URL=http://YOUR_SERVER_IP:8080
SITE_URL=http://YOUR_SERVER_IP:8080
```
⬇️ `YOUR_SERVER_IP` را با IP واقعی سرور عوض کنید (که در مرحله 3.6 گرفتید)

**مثال:**
اگر IP سرور شما `45.67.89.123` است:
```
NEXT_PUBLIC_BASE_URL=http://45.67.89.123:8080
SITE_URL=http://45.67.89.123:8080
```

### مرحله 5.4: ذخیره و خروج

**در nano:**
- `Ctrl + X` برای خروج
- `Y` برای تایید
- `Enter` برای ذخیره

**در vim:**
- `Esc` بزنید
- `:wq` تایپ کنید و Enter بزنید

---

## 6️⃣ اجرای پروژه با Docker

### مرحله 6.1: ساخت و اجرای کانتینر

```bash
docker-compose up -d --build
```

این دستور:
- ✅ Image را می‌سازد (build)
- ✅ کانتینر را اجرا می‌کند
- ✅ در background اجرا می‌شود (`-d`)

**⏱️ این مرحله ممکن است 5-10 دقیقه طول بکشد** (اولین بار)

### مرحله 6.2: بررسی لاگ‌ها

```bash
docker-compose logs -f app
```

اگر خطایی دیدید، `Ctrl + C` بزنید و مشکل را بررسی کنید.

### مرحله 6.3: بررسی وضعیت

```bash
docker-compose ps
```

باید چیزی شبیه این ببینید:
```
NAME          STATUS          PORTS
ikiform-app   Up 2 minutes     0.0.0.0:8080->3000/tcp
```

### مرحله 6.4: بررسی Health Check

```bash
docker inspect ikiform-app | grep Health -A 10
```

---

## 7️⃣ دسترسی به سایت

### مرحله 7.1: باز کردن Firewall (اگر نیاز است)

```bash
# روی Ubuntu/Debian
sudo ufw allow 8080/tcp
sudo ufw enable

# روی CentOS/RHEL
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
```

### مرحله 7.2: تست دسترسی

**روی سرور:**
```bash
curl http://localhost:8080
```

**از کامپیوتر خود:**
- مرورگر را باز کنید
- به آدرس `http://YOUR_SERVER_IP:8080` بروید
- باید سایت شما نمایش داده شود!

---

## 🔄 به‌روزرسانی پروژه (بعداً)

وقتی تغییری در کد دادید و به GitHub push کردید:

### روی سرور:

```bash
# رفتن به پوشه پروژه
cd ~/projects/ikiform

# گرفتن آخرین تغییرات
git pull

# Rebuild و restart
docker-compose up -d --build
```

---

## 🛠️ دستورات مفید

### مشاهده لاگ‌ها:
```bash
docker-compose logs -f app
```

### توقف کانتینر:
```bash
docker-compose stop
```

### شروع مجدد:
```bash
docker-compose start
```

### Restart:
```bash
docker-compose restart
```

### حذف کانتینر:
```bash
docker-compose down
```

### مشاهده استفاده از منابع:
```bash
docker stats ikiform-app
```

---

## ❌ عیب‌یابی

### مشکل: کانتینر start نمی‌شود

```bash
# بررسی لاگ‌ها
docker-compose logs app

# بررسی فایل .env.local
cat .env.local

# بررسی وضعیت
docker-compose ps -a
```

### مشکل: سایت باز نمی‌شود

1. بررسی کنید که کانتینر در حال اجرا است:
```bash
docker-compose ps
```

2. بررسی کنید که پورت 8080 باز است:
```bash
sudo netstat -tulpn | grep 8080
```

3. بررسی Firewall:
```bash
sudo ufw status
```

### مشکل: خطای Build

```bash
# پاک کردن cache و rebuild
docker-compose build --no-cache
docker-compose up -d
```

---

## ✅ چک‌لیست نهایی

- [ ] Git روی کامپیوتر نصب و تنظیم شده
- [ ] پروژه به GitHub push شده
- [ ] Docker و Docker Compose روی سرور نصب شده
- [ ] پروژه از GitHub clone شده
- [ ] فایل `.env.local` با مقادیر واقعی پر شده
- [ ] IP سرور در `.env.local` تنظیم شده
- [ ] کانتینر با موفقیت اجرا شده
- [ ] سایت از اینترنت قابل دسترسی است

---

## 🎉 تبریک!

اگر همه چیز کار کرد، سایت شما الان در آدرس `http://YOUR_SERVER_IP:8080` در دسترس است!

اگر مشکلی پیش آمد، لاگ‌ها را بررسی کنید:
```bash
docker-compose logs -f app
```

