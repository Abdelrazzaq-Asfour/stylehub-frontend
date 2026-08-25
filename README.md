# StyleHub & IronCore Platform 🚀

<img width="1858" height="940" alt="stylehub-abdelrazzaq (2)" src="https://github.com/user-attachments/assets/dc290006-23b9-48d2-badc-d0c56ea02d40" />


---

```markdown
# StyleHub - Enterprise Salon Management System

> **StyleHub** is an enterprise-grade Salon & Spa Management System designed for high-concurrency booking, role-based access control (RBAC), and smooth salon operations.

---

## 🏗️ Technology Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS (Dark UI), and an abstracted API layer supporting mock data.
* **Backend:** Spring Boot (Java), Spring Security, RESTful APIs, DTO mappers, and JPA repositories.
* **Database:** MySQL 8.0+ (InnoDB) with strict transaction modes and composite indexes to prevent double-booking race conditions.

---

## 📂 Project Directory Structure

```text
stylehub/
├── stylehub-frontend/ (Next.js)
│   ├── app/                # App Router pages (admin, booking, client, login, staff, profile)
│   ├── components/         # Reusable UI components (Navbar, Footer, Modal)
│   ├── data/               # Local mock database for offline fallback
│   └── services/           # API communication layer
│
└── src/main/java/com/stylehub/ (Spring Boot)
    ├── config/             # Security and Web configurations
    ├── controller/         # REST Controllers (Appointments, Auth, Services, Users)
    ├── dto/                # Request & Response data transfer objects
    ├── mapper/             # Entity-to-DTO mappers
    ├── model/              # JPA Entities (User, Appointment, Service, StaffSchedule, SalonSetting)
    ├── repository/         # Spring Data JPA repositories & projections
    └── service/            # Business logic layer

```

---

## 🗄️ Database Schema (`stylehub_db`)

1. **`users`:** Stores user identity, contact details, hashed passwords, and RBAC roles (`SUPER_ADMIN`, `STAFF`, `CUSTOMER`).
2. **`services`:** Manages the salon service catalog, pricing, and exact service durations.
3. **`staff_schedules`:** Defines working days and operational shift hours for each staff member.
4. **`appointments`:** Manages booking transactions with composite indexes (`idx_appt_concurrency_guard`) to prevent race conditions.
5. **`salon_settings`:** Global configuration singleton for salon info and opening hours.

---

## 🚀 Quick Start

1. **Database Setup:**
Create the database and execute the schema script on MySQL 8.0+.
```sql
CREATE DATABASE stylehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

```


2. **Run Backend (Spring Boot):**
```bash
mvn spring-boot:run

```


3. **Run Frontend (Next.js):**
```bash
cd stylehub-frontend
npm install
npm run dev

```



```

```
