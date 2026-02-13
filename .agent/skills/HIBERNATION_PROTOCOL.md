# SKILL: Hibernation Protocol (Cost Control)

## Description

This skill empowers the agent to manage the "Zero-to-Hero" infrastructure lifecycle. It strictly governs the creation and destruction of expensive idle resources (Load Balancers, Redis) to ensure the $0 idle mandate is respected.

## Instructions

1. **Pre-Nuke Backup (MANDATORY)**:
    * Before ANY deletion, execute a local backup to `TheFunFanReporter-OFFICIAL-BACKUP-VAULT/`.
    * Format: `backup_{YYYY-MM-DD}_before_hibernation_{version}`.
    * **Verify** backup exists locally before proceeding.

2. **Nuke Protocol (`app-nuke.sh`)**:
    * Identify all Forwarding Rules (Global Load Balancers).
    * Identify all Memorystore (Redis) instances.
    * **DELETE** them immediately upon "Hibernation" signal.
    * Do NOT delete the Cloud Run services or Databases (Spanner/Firestore).

3. **Launch Protocol (`app-launch.sh`)**:
    * Re-provision Global Load Balancer (Classic or ALB).
    * Re-provision Memorystore (Redis) if needed for caching.
    * Verify connectivity before declaring "Live".

4. **Safety Checks**:
    * Never run `app-nuke.sh` during an active event window (check `MASTER_BLUEPRINT` dates).
    * Always log the estimated money saved to the console.

## Merit

* Consistency: Zero idle cost.

* Complexity: Automating infrastructure tear-down/spin-up.
* Velocity: < 30 min restore time.
