# PROJECT MASTER BLUEPRINT: THEFUNFANREPORTER (V4.0 - FULL SPEC)

STATUS: ACTIVE | SCALE: BURST (0 to 75,000+) | ARCHITECTURE: LIQUID/SERVERLESS |
MODE: CYBERPUNK

## 1. THE MISSION & CORE PROBLEM (THE "WHY")

We are solving two massive global problems simultaneously using a "Trojan Horse" strategy:

- **Logistical Blackout:** Massive events (Super Bowl, World Cup) cause cellular failure and logistical chaos. We solve this with a "Liquid" (Offline-First) app.
- **The "Credit Invisible" Crisis:** 262 Million NEET (Not in Education, Employment, or Training) youth are invisible to banks. We convert their real-time gig performance (valet parking, line holding) into a "Merit Score" (Credit Readiness) to give them financial dignity.

## 2. THE ECOSYSTEM ARCHITECTURE (HUB & SPOKES)

The system consists of three distinct platforms that share a single "Passport" (Universal Login).

### A. THE HUB: "TheFunFanReporter" (The Temporary Event App)

- **Frontend:** <https://super-chat-hive-hub-639779264890.us-central1.run.app/>
- **Activation:** Only "lives" for 36-48 hours during massive events.
- **Scale:** 0 to 75,000+ Concurrent Users.
- **Connectivity:** Must work with intermittent/zero internet ("Liquid State") using Firestore local persistence.
- **Connection:** Connects to WordPress via API/Plugin for content, runs as standalone PWA.

### B. THE INDEPENDENT MINI-APP: "Merit Score" (The Fintech Layer)

- **Independence:** Acts as standalone "Credit Readiness Oracle."
- **Tech:** WordPress Plugin (any site), Chrome Extension (profile overlay), API feed.
- **Use Case:** Trust layer for Gig Economy. External behavioral collateral for banks.

### C. THE B2B TOOL: "FlashPromoter"

- **Frontend:** <https://funfanreporter-live-223594773840.us-central1.run.app/>
- **Function:** Management tool for Nightclub Promoters/Organizers.

## 3. THE HUB MECHANICS: "THE PULSING MARKETPLACE"

Inside The Hub, users transact in real-time. The Agent must build:

- **Hyper-Local Tipping (Info):** Users pay Meritocracy Coins for intel.
- **Service Market (Gigs):** Users offer physical labor (Valet, Line Holding).
- **Real-Time Bidding (Auctions):** 30-minute timers for items like tickets.
- **Social Lottery (Engagement):** Winner drawn randomly from Likes/Comments.
- **Backup Monetization:** Google AdMob (Native/Interstitial).

## 4. THE ECONOMIC ENGINE: "MERITOCRACY COIN"

- **Nature:** Centralized Credit (NOT crypto).
- **Fixed Value:** 1 Meritocracy Coin = $7.25 USD.
- **The Split:** 50% to User / 50% to Platform (Revenue).
- **The Vault (Escrow):** 7-Day anti-fraud hold. Minimum cash-out: $100 USD.

## 5. THE FINTECH SPEC: "MERIT SCORE" DETAILS

- **Scale:** 0 to 300 scale.
- **Algorithm Factors:**
  1. Consistency (Did they show up?)
  2. Complexity (Bathroom line vs. Valet parking)
  3. Velocity (Speed of completion)
- **Privacy:** "Permissioned Handshake" (user decides visibility).

## 6. TECHNICAL ARCHITECTURE & "BUDGET RESCUE"

- **Compute:** Google Cloud Run (Gen 2). Min-Instances = 0.
- **Goal:** Bill < $10 monthly when idle.
- **Database:** Firestore (Native Mode) preferred for "Liquid" sync and cost. Spanner for ACID-compliant scoring if needed.
- **Real-Time:** Pub/Sub + WebSockets.

## 7. IMMEDIATE "KILL SWITCH" PROTOCOL

- **Dev Budget Cap:** $50 USD (now until Feb 8, 2026).
- **Event Budget Cap:** $295 USD (Feb 8-9, 2026).
- **Mechanism:** Cloud Function kills Cloud Run Invoker permissions if budget exceeded.

## 8. VISUAL IDENTITY (DESIGN SYSTEM)

- **Theme:** "Live Ops Command Center" / Cyberpunk.
- **Colors:** Background #050505, Accents #39ff14, #00f3ff, #ffee00.
- **Typography:** Orbitron (Headers), Roboto (Body).

## 9. NEXT STEPS FOR AGENTS (DIRECTIVES)

- **ARCHITECT:** Delete bleeding Spanner. Initialize Firestore schema (Users, Transactions, MeritScore). Draft WordPress Bridge API specs.
- **CMO:** Plan Lottery strategy.
- **DEALMAKER:** Sell FlashPromoter to nightclub owners.
- **DATA SCIENTIST:** Prepare AdMob strategy.
- **FINOPS:** Activate Hibernation Mandate ($0.00 idle cost).
