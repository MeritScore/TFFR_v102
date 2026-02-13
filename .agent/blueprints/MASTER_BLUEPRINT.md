# PROJECT MASTER BLUEPRINT: THEFUNFANREPORTER (V4.0 - FULL SPEC)

**STATUS**: ACTIVE | **SCALE**: BURST (0 to 75,000+) | **ARCHITECTURE**: LIQUID/SERVERLESS | **MODE**: CYBERPUNK

---

## 1. THE MISSION & CORE PROBLEM (THE "WHY")

We are solving two massive global problems simultaneously using a "Trojan Horse" strategy:

1. **Logistical Blackout**: Massive events (Super Bowl, World Cup) cause cellular failure and logistical chaos. We solve this with a "Liquid" (Offline-First) app.
2. **The "Credit Invisible" Crisis**: 262 Million NEET youth are invisible to banks. We convert their real-time gig performance (valet parking, line holding) into a "Merit Score" (Credit Readiness) to give them financial dignity.

## 2. THE ECOSYSTEM ARCHITECTURE (HUB & SPOKES)

The system consists of three distinct platforms that share a single "Passport" (Universal Login).

### A. THE HUB: "TheFunFanReporter" (Temporary Event App)

* **Launch URL**: [Hive Hub Frontend](https://super-chat-hive-hub-639779264890.us-central1.run.app/)
* **Activation Profile**: Temporary "Burst" usage (e.g., 36-48 hours for Super Bowl). Scales from 0 to 75,000+ users instantly.
* **Connectivity**: "Liquid State" (Offline-First) using Firestore local persistence.
* **Integration**: Connects to Founder’s WordPress sites via API/Plugin.

### B. INDEPENDENT MINI-APP: "Merit Score" (Fintech Layer)

* **Independence**: Functions regardless of Hub status.
* **Tech**: WordPress Plugin, Chrome Extension, and API.
* **Use Case**: Trust layer for the Gig Economy (0-300 score scale). Behavioral collateral for banks.

### C. B2B TOOL: "FlashPromoter"

* **Launch URL**: [FlashPromoter Live](https://funfanreporter-live-223594773840.us-central1.run.app/)
* **Function**: Management tool for Nightclub Promoters/Organizers.

## 3. THE HUB MECHANICS: "THE PULSING MARKETPLACE"

* **Hyper-Local Tipping**: Users pay Meritocracy Coins for intel (e.g., "Road 101 closed").
* **Service Market (Gigs)**: Labor-based offers (e.g., Valet Parking).
* **Real-Time Bidding**: 30-minute auction timers for items like tickets.
* **Social Lottery**: Engagement-driven giveaways (virality engine).
* **Monetization**: Google AdMob (Native/Interstitial) during idle transaction periods.

## 4. THE ECONOMIC ENGINE: "MERITOCRACY COIN"

* **Type**: Centralized Credit (NOT Crypto).
* **Value**: 1 Coin = $7.25 USD.
* **Revenue Split**: 50% User / 50% Platform.
* **Escrow**: 7-day anti-fraud hold. Minimum $100 cash-out.

## 5. THE FINTECH SPEC: "MERIT SCORE" DETAILS

* **Scale**: 0 to 300.
* **Algorithm**: `Score = Consistency + Complexity + Velocity`.
* **Privacy**: "Permissioned Handshake" (User-controlled visibility).

## 6. TECHNICAL ARCHITECTURE (DUAL-ENGINE STRATEGY)

* **Pattern**: Hexagonal Architecture (Repository Pattern).
  * **Interface**: `IDatabaseRepository` (Decoupled logic).
  * **Switch Logic**: `DATABASE_MODE` environment variable.
* **Engine A: Spanner Trial (Demo Mode)**
  * **Trigger**: `DATABASE_MODE=spanner_trial`
  * **Goal**: Zero Cost using GCP 90-Day Free Trial.
  * **Limits**: 100 Processing Units (1/10 node), 10GB Storage.
  * **Use Case**: Investor Demos, VIP Rooms (< 2k users).
  * **Risk**: **DO NOT** click "Upgrade" without authorization.
* **Engine B: Firestore Native (Burst Mode)**
  * **Trigger**: `DATABASE_MODE=firestore_prod`
  * **Goal**: Hyper-Scale (75k+ users) for Event Launch.
  * **Limits**: Pay-as-you-go, Geo-sharded.
* **Compute**: Cloud Run (Gen 2) -> `Min-Instances: 0`.
* **Cost Control**:
  * **Hibernation Protocol**: Scripts (`app-nuke.sh`) to delete Load Balancers/Redis when idle.
  * **Predictive Kill Switch**: Hard stop at $295.

## 7. IMMEDIATE "KILL SWITCH" PROTOCOL (Predictive)

* **Dev Cap**: $50 (Until Feb 8, 2026, 5am).
* **Event Cap**: $295 (Feb 8, 5am to Feb 9, 9:30pm).
* **Logic**: Three-Stage Protection:
    1. **Warning**: at 85% of budget.
    2. **Throttle**: at 95% of budget (reduce write frequency).
    3. **Kill**: at 100% ($295) - Hard Stop Cloud Run Invokers.
* **Protected Zone (DO NOT TOUCH)**:
  * **Demo URL**: `https://funfanreporter-live-223594773840.us-central1.run.app/`
  * **Reason**: Active Hackathon evaluation.
* **WordPress Safety**: Signal external WordPress sites to enter **Maintenance Mode** on breach.

## 8. VISUAL IDENTITY (DESIGN SYSTEM)

* **Theme**: "Live Ops Command Center" / Cyberpunk.
* **Colors**: background: #050505, accents: #39ff14 (Green), #00f3ff (Cyan), #ffee00 (Yellow).
* **Typography**: "Orbitron" (Headers), "Roboto" (Body).

---
**ADMINISTRATIVE DIRECTIVE**:

* NEVER LIE.
* NO GUESSING. If confused or encountering contradictory instructions, **STOP** and ask Marilyn (Founder).
* Connect with **GEM: CTO ARCHY G** (NotebookLM) for deep context/documentation integration.
* Every new agent or skill must confirm reading this Master Blueprint.

---

## AMENDMENT 4.1: THE HYBRID DATA SOVEREIGNTY PROTOCOL

**Effective Date**: January 18, 2026
**Strategic Goal**: Achieve "Economic Unbreakability" during the Pre-Seed phase by utilizing a switchable backend.

### 1. Hybrid Architecture Specification

To maintain global standards while adhering to a $300 credit limit, the system utilizes a **Dual-Clone Repository Strategy**:

* **Primary Analytical Store (Trial)**: Cloud Spanner (GCP 90-Day Trial tier). Leveraged for ACID-compliant Merit Algorithm scoring (`$Score = Consistency + Complexity + Velocity$`) during low-traffic periods and investor demonstrations.
* **Primary Engagement Store (Production)**: Firestore Native Mode (Hyper-Scale). Leveraged for 75,000+ concurrent user events to ensure infinite write elasticity without provisioned cost floors.

### 2. FinOps "Hibernation" Mandate

* **Idle State ($0.00 Cost)**: The system shall exist in a "Cold State." Global Load Balancers and Memorystore Redis clusters are to be programmatically deleted between events. Firestore data persistence ensures no data loss during hibernation.
* **Burst State**: Scaling to 75k users utilizes Cloud Run Gen 2. The system must accept a 5-second "Cold Start" delay to avoid the costs of "Min-Instances."
* **MANDATORY SAFETY**: Always save a backup with different names/versions and with the date, locally on the laptop, **BEFORE** deleting anything on Google Cloud.

### 3. Sentinel Security Integration

* All database clones must utilize the same **Sentinel JWT (OAuth 2.0)** authentication layer.
* The "WordPress Bridge" must detect the active `DATABASE_MODE` to route API requests correctly without configuration changes to the WordPress CMS.
