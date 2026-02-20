---
name: firebase-auth-domain-fix
description: Expert system for configuring and deploying a custom authDomain for Firebase Authentication. Use this skill whenever a user reports that the default firebaseapp.com URL is showing during Google Sign-in or OAuth redirects, or when explicitly requested to configure a custom domain for Firebase Auth.
---

# Firebase Authentication Custom Domain Configuration Expert

## Mission Statement

This skill instructs the agent to systematically resolve the issue where Firebase Authentication displays the default `.firebaseapp.com` domain instead of the user's custom domain (e.g., `thefunfanreporter.com`) during federated OAuth flows. It enforces a strict, 5-phase architectural workflow to update the client SDK, the Firebase Auth whitelist, Firebase Hosting DNS, GCP OAuth credentials, and email templates.

## When to use this skill

- The user asks how to remove `firebaseapp.com` from their Google Sign-In popup or iframe.
- The user is experiencing `auth/unauthorized-continue-uri`, `redirect_uri_mismatch`, or `NET::ERR_CERT_COMMON_NAME_INVALID` errors after attempting to change their authentication domain.
- The user asks to configure `thefunfanreporter.com` (or any custom domain) as the `authDomain` in their Firebase SDK configuration.

## Core Knowledge & Architectural Constraints

- **Pricing Reality**: Custom domains for Firebase Authentication and Firebase Hosting are completely FREE under the Spark (no-cost) tier. Do not tell the user they need to upgrade to fix this issue.
- **Routing Conflict Prevention**: If the main frontend application is hosted OUTSIDE of Firebase Hosting (e.g., on Vercel, Netlify, or Cloud Run directly), you **MUST** instruct the user to create a dedicated subdomain (like `auth.thefunfanreporter.com`) to prevent 404 routing errors. If the app is hosted natively ON Firebase Hosting, the root apex domain is acceptable.
- **OAuth Callback Strictness**: The exact trailing path `/__/auth/handler` is unconditionally mandatory for Google Cloud Platform redirect URIs.

## How to execute the configuration (Step-by-Step)

### Phase 1: Client-Side SDK Autonomous Update

1. Scan the workspace to locate the Firebase initialization code (search for `firebase.js`, `firebase.ts`, or the `firebaseConfig` object).
2. Identify the `authDomain` property within the configuration object.
3. Replace the default `.firebaseapp.com` with the custom domain requested by the user (e.g., `auth.thefunfanreporter.com`).

### Phase 2: Firebase Hosting DNS Mapping (Guide the User)

Instruct the user to perform the following:

1. Navigate to **Firebase Console -> Build -> Hosting**.
2. Click **Add custom domain** and input `auth.thefunfanreporter.com`. Ensure they **do not** check the redirect box.
3. Copy the provided TXT record and add it to their domain registrar's DNS settings.
4. Add the provided CNAME record to point the domain to Firebase.

### Phase 3: Firebase Auth Authorized Domains (Guide the User)

Instruct the user to:

1. Navigate to **Firebase Console -> Authentication -> Settings**.
2. Scroll to **Authorized domains**.
3. Click **Add Domain** and type `auth.thefunfanreporter.com`.

### Phase 4: Google Cloud Console OAuth 2.0 Credentials (Guide the User)

Instruct the user to:

1. Navigate to **Google Cloud Console -> APIs & Services -> Credentials**.
2. Edit the **Web client (auto created by Google Service)**.
3. Add **`https://auth.thefunfanreporter.com`** to **Authorized JavaScript origins**.
4. Add **`https://auth.thefunfanreporter.com/__/auth/handler`** to **Authorized redirect URIs**.

### Phase 5: Brand Consistency Verification

1. Ask the user if they wish to update their Authentication Email Templates to also use the custom domain.
2. Verify the popup URL now displays the custom domain during a real sign-in flow.
