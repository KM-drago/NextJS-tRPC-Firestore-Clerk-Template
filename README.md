# NextJS-tRPC-Firestore-Clerk-Template

Template for Typescript fullstack development.
Fully integrated frontend, backend, and database with user authentication through Clerk, along with Clerk webhook handling.

Uses following,

|          |                                                                                |
| -------- | ------------------------------------------------------------------------------ |
| Frontend | [NextJS](https://nextjs.org/) 14.2.17                                          |
| Backend  | [tRPC](https://trpc.io/) 11.0.0                                                |
| Database | [Firestore](https://firebase.google.com/docs/firestore)(Firebase-admin 12.7.0) |
| Auth     | [Clerk](https://clerk.com/) 6.2.1                                              |

Inspired by [T3-Stack](https://create.t3.gg/)

To run template,

- Create a Firebase app and get private key file for server environments.
- Create a Clerk app and get keys.
- Create Clerk webhook endpoint and get keys.
- Finally set the following env variables.

```
/.env
GOOGLE_APPLICATION_CREDENTIALS="<Private Key file path>"
CLERK_WEBHOOK_SECRET="<key>"

/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<key>"
CLERK_SECRET_KEY="<key>"
```

- Then run,

```
npm init
npm run dev
```

For more info,

**NextJS**

- https://nextjs.org/

**tRPC**

- https://trpc.io/

**Firestore**

- https://firebase.google.com/docs/firestore
- Admin sdk setup - https://firebase.google.com/docs/admin/setup

**Clerk**

- https://clerk.com/
- Setup - https://clerk.com/docs/quickstarts/nextjs
- Middleware - https://clerk.com/docs/references/nextjs/clerk-middleware
- Clerk Webhooks
  - https://clerk.com/docs/integrations/webhooks/overview
  - https://clerk.com/docs/integrations/webhooks/sync-data
