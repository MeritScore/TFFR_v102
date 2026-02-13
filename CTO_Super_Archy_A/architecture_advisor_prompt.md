# PROMPT FOR ADVISORS: CLAUDE 3.5/4.5 & GPT-O1

**Project**: TheFunFanReporter (V4.0 Production)
**Context**: "Burst-Scale" Event App (0 to 75,000+ Concurrent Users)
**Constraint**: $0 cost when idle. Bootstrapped Startup (Pre-seed).

---

### THE ARCHITECTURAL CHALLENGE

We are building a "Liquid" (Offline-First) massive chat and marketplace. The app activates for 36-48 hours (e.g., Super Bowl) then goes dormant. Total budget cap: $295/event.

#### 1. DATABASE DILEMMA: FIRESTORE VS. SPANNER VS. HYBRID

* **The Conflict**: Firestore is free/cheap at idle but we fear latency or "hotspotting" at 75k concurrent users during a Super Bowl "Burst." Spanner is "Infinite," but current pricing models charge per hour (approx. $60+/month minimum), which violates our $0 idle mandate.
* **The Task**: Compare Firestore (Native) vs. Cloud Spanner.
  * Can Firestore handle 75k+ concurrent writes/reads for a "Liquid" state app if properly sharded?
  * Is there a "Hybrid" model where we migration data to Spanner strictly during the 48-hour event window and export to Firestore/Cloud Storage when idle?
  * Is there a Serverless Spanner or AlloyDB tier in 2026 that we missed which costs $0 at idle?

#### 2. DATA SCHEMA FOR "LIQUID STATE"

* **The Problem**: Cellular networks fail at stadiums. We need "Offline-First" parity.
* **The Task**: Propose a Firestore schema for "Users," "Transactions," and "MeritScore" that utilizes bundles/snapshots to ensure the app functions with intermittent connectivity.

#### 3. REAL-TIME ENGINE: PUB/SUB + WEBSOCKETS

* **The Question**: Is Pub/Sub + Cloud Run WebSockets (Gen 2) the most cost-efficient way to handle 75k concurrent chat streams, or should we use Firebase Realtime DB or a Managed Service?

#### 4. WORDPRESS-TO-HUB BRIDGE

* **The Task**: What is the most secure, high-performance way to connect a PHP/WordPress site (Hostinger) to this GCP Serverless Hub?
  * Should we use a custom App Engine proxy?
  * A GraphQL layer?
  * A specific secure JWT-based API plugin?

#### 5. SECURITY & ATTACK RESPONSE

* **The Question**: Is Cloud Armor Standard sufficient for DDoS protection at this scale, or do we risk bankruptcy from egress costs?
* **The Edge Case**: If the WordPress site is attacked, can we automate a "Maintenance Mode" signal from the GCP Hub to the external WP site via API?

---
**GOAL**: Provide a technical roadmap that maximizes performance for 75,000 users while strictly adhering to a $0 idle burn rate.
