# 📡 ANTIGRAVITY ARCHITECTURE: DUAL-CORE PROTOCOL
**Confidential Design Brief | Authorized by: DESY (CPDO)**
**Target Recipient: CTO ARCHY**

## 🎯 EXECUTIVE SUMMARY
To achieve maximum performance for 75,000+ live users while maintaining military-grade security for the backend, the **The Fun Fan Reporter (TFFR)** ecosystem is split into two distinct, integrated projects.

---

## 1️⃣ PROJECT A: "THE HIVE MIND" (Current Repository)
**Role:** Frontend Client (PWA) & Visual Experience
**Owner:** DESY
**Context:** This Google AI Studio Project.

**Responsibilities:**
*   **High-Frequency UI:** Rendering the Global Chat (`ChatBubble`), Animations, and Fan Interactions.
*   **Optimistic UI:** Immediate feedback for Tipping, Bidding, and Messaging.
*   **Visual Modules:**
    *   `FanDashboard` (The Feed)
    *   `WalletScreen` (Visual balance)
    *   `Marketplace` (Gig Board UI)
    *   `MeritView` (Score Visualization)
*   **Simulation:** Contains *mock* Login/Admin screens (`LoginSimulation`, `AdminPersonnelSelect`) solely for UI/UX testing.

**🚫 EXCLUSIONS:** This project does **NOT** hold real user data, auth tokens, or the complex business logic for Admin permissions.

---

## 2️⃣ PROJECT B: "ANTIGRAVITY CONTROL CORE" (External Project)
**Role:** Backend Logic, Auth & Security Core
**Owner:** ARCHY
**Context:** Secondary Google AI Studio / Backend Environment.

**Responsibilities:**
*   **Identity Provider:** Real **Sign Up**, **Login**, and **Onboarding** logic.
*   **The "Iron Vault":**
    *   **RESTRICTED ADMIN ACCESS:** The *real* logic for God Mode, Agent Dashboards, and Permission Handling lives here.
    *   **Database:** Master User Records (Merit Scores, Roles).
*   **API Gateway:** Handles socket connections and data persistence.

---

## 🔗 INTEGRATION STRATEGY: "THE DOCKING SEQUENCE"

When deploying the final application, these two projects merge via the following flow:

1.  **User Entry:** User lands on **Project B** (Auth Layer).
2.  **Authentication:** User logs in via Project B.
3.  **Handoff:**
    *   **IF ADMIN:** Stay in Project B (Secure Admin Dashboard).
    *   **IF FAN:** Project B loads **Project A (Hive Mind)** and injects the `UserSessionToken`.
4.  **Runtime:** Project A takes over the visual experience, sending API calls back to Project B.

---

*Verified by Desy. Ready for Archy implementation.*
