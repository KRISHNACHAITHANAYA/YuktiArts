# Yukti Artful

Premium handmade arts and crafts website with React frontend, Express API, JWT authentication, role-based admin access, and MongoDB Atlas integration.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```bash
copy .env.example .env
```

3. Replace the placeholder MongoDB URI in `.env` with your real MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/yukti-artful
JWT_SECRET=use-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

4. Start frontend and backend:

```bash
npm run dev:full
```

## Admin Login Setup

Admin login will not work until the backend is running and an admin user exists in MongoDB.

Create an admin user:

```bash
npm run create:admin -- "Admin Name" admin@yuktiartful.com +919999999999 "StrongPass@123"
```

Then open:

```txt
http://localhost:5173/admin/login
```

Use the email and password you created with the command above.

## Hosting Notes

Deploy the frontend and backend separately.

Frontend environment variable:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_API_ORIGIN=https://your-backend-domain.com
```

Backend environment variables:

```env
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-long-secret
JWT_EXPIRES_IN=7d
```

After hosting, admin login is:

```txt
https://your-frontend-domain.com/admin/login
```

If admin login shows an error, check:

- Backend server is deployed and running.
- `MONGODB_URI` is real, not the placeholder.
- `VITE_API_URL` points to the deployed backend `/api`.
- Admin user has been created in MongoDB.
