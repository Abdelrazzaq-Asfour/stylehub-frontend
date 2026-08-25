# StyleHub & IronCore Platform 🚀

<img width="1858" height="940" alt="stylehub-abdelrazzaq (2)" src="https://github.com/user-attachments/assets/dc290006-23b9-48d2-badc-d0c56ea02d40" />

```markdown

---

## 🏛️ Executive Overview

An enterprise-grade, high-concurrency multi-tenant ecosystem combining **StyleHub** (Salon Operations & Queue Management Engine) and **IronCore** (Fitness Facility & Membership Management Platform). Engineered with a **Zero-Trust security model**, strict database-level concurrency safeguards, and an optimized modular architecture designed to scale seamlessly under extreme traffic loads.

---

## 🧩 Monorepo & System Architecture

```text
stylehub/
├── stylehub-frontend/ (Next.js)
│   ├── .next/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.jsx
│   │   ├── booking/
│   │   │   └── page.jsx
│   │   ├── client/
│   │   │   └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── profile/
│   │   │   └── page.jsx
│   │   ├── signup/
│   │   │   └── page.jsx
│   │   ├── staff/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── mockDatabase.js
│   ├── services/
│   │   ├── api.js
│   │   └── api copy.js
│   ├── public/
│   ├── node_modules/
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   └── favicon.ico
│
└── src/main/java/com/stylehub/ (Spring Boot)
    ├── config/
    │   ├── SecurityConfig
    │   └── WebConfig
    ├── controller/
    │   ├── AppointmentController
    │   ├── AuthController
    │   ├── ServiceController
    │   └── UserController
    ├── dto/
    │   ├── request/
    │   │   ├── AppointmentRequest
    │   │   ├── LoginRequest
    │   │   ├── RegisterRequest
    │   │   ├── ServiceRequest
    │   │   ├── UserRegisterRequest
    │   │   └── UserUpdateRequest
    │   └── response/
    │       ├── AppointmentResponse
    │       ├── AuthResponse
    │       ├── ServiceResponse
    │       └── UserResponse
    ├── mapper/
    │   ├── AppointmentMapper
    │   ├── ServiceMapper
    │   └── UserMapper
    ├── model/
    │   ├── Appointment
    │   ├── SalonSetting
    │   ├── Service
    │   ├── StaffSchedule
    │   └── User
    ├── repository/
    │   ├── projection/
    │   │   ├── AppointmentProjection
    │   │   ├── ServiceProjection
    │   │   ├── UserProfileProjection
    │   │   └── UserProjection
    │   ├── AppointmentRepository
    │   ├── ScheduleRepository
    │   ├── ServiceRepository
    │   └── UserRepository
    ├── service/
    │   ├── AppointmentService
    │   ├── AuthService
    │   ├── BookingService
    │   ├── SalonService
    │   └── UserService
    ├── stylehub_db.sql
    └── StylehubApplication

```

---

## ⚡ Core Technical Specifications

* **Frontend Engine:** Built with **Next.js (App Router)** and **React**, leveraging custom hooks, dynamic route protection via `middleware.js`, and real-time state synchronization (`authChange` events).
* **Backend Core:** Developed using **Spring Boot 3 (Java)** with stateless **JWT authentication**, Spring Security filters, global exception handling, and strict DTO input payload mapping.
* **Database Optimization:** Hosted on **MySQL 8.0+ / InnoDB**, featuring kernel-level **Composite Indexing** (`idx_appt_concurrency_guard`) to completely neutralize double-booking race conditions and ensure transaction isolation (`Repeatable Read`).
* **Design Pattern:** Implements an enterprise **Mock/Real Toggle Switch** architecture, allowing developers to switch seamlessly between live backend REST routes and local mock repositories without modifying UI components.

---

## 🔐 Security & RBAC Implementation

* **Zero-Trust Access Control:** Enforces strict role isolation separating `SUPER_ADMIN`, `STAFF`, `COACH`, and `CUSTOMER` permissions across both web middleware and backend endpoints.
* **Credential Protection:** Passwords securely hashed via industry-standard algorithms, complemented by token-based session caching and request header interceptors.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* Java JDK 17+
* MySQL Server 8.0+

### Quick Setup

1. **Clone the Repositories:**

```bash
git clone [https://github.com/Abdelrazzaq-Asfour/stylehub-frontend.git](https://github.com/Abdelrazzaq-Asfour/stylehub-frontend.git)
git clone [https://github.com/Abdelrazzaq-Asfour/stylehub-backend.git](https://github.com/Abdelrazzaq-Asfour/stylehub-backend.git)

```

2. **Run Frontend Application:**

```bash
cd stylehub-frontend
npm install
npm run dev

```

3. **Configure & Run Backend:**

* Import the provided SQL schemas (`stylehub_db.sql`) into your MySQL server.
* Configure database credentials in `application.properties`.
* Start the Spring Boot application via your IDE or terminal:

```bash
./mvnw spring-boot:run

```

---

## 📄 License

This project is proprietary and built as an enterprise engineering showcase. Unauthorized commercial duplication is strictly prohibited.

```

```
