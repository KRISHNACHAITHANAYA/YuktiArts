# Yukti Artful REST API

Base URL: `/api`

## Health

- `GET /health` - API health check.

## Authentication

- `POST /auth/signup` - Register a user.
  - Body: `fullName`, `email`, `phoneNumber`, `password`
- `POST /auth/login` - Login user or admin with email and password.
  - Body: `email`, `password`
- `POST /auth/admin/login` - Admin-only login endpoint.
  - Body: `email`, `password`
- `POST /auth/logout` - Logout acknowledgement.
- `POST /auth/forgot-password` - Generate reset token.
  - Body: `email`
- `PATCH /auth/reset-password/:token` - Reset password.
  - Body: `password`
- `GET /auth/me` - Current authenticated user.
  - Auth: Bearer token
- `PATCH /auth/change-password` - Change current password.
  - Auth: Bearer token
  - Body: `currentPassword`, `newPassword`

## Users

- `PUT /users/profile` - Update profile details and optional profile image.
  - Auth: Bearer token
  - Form fields: `fullName`, `email`, `phoneNumber`, `profileImage`
- `PUT /users/change-password` - Frontend-compatible password change route.
  - Auth: Bearer token
  - Body: `currentPassword`, `newPassword`

## Admin

- `POST /admin/login` - Admin login alias.
  - Body: `email`, `password`
- `GET /admin/dashboard` - Admin dashboard stats.
  - Auth: admin Bearer token

## Orders

- `POST /orders` - Create an order.
  - Auth: Bearer token
  - Form fields: `artworkType`, `description`, `budget`, `referenceImage`
- `GET /orders/my` - View logged-in user's orders.
  - Auth: Bearer token
- `GET /orders` - View all orders.
  - Auth: admin Bearer token
- `GET /orders/:id` - View one order. Users can only view their own order.
  - Auth: Bearer token
- `PUT /orders/:id` - Edit a pending user order.
  - Auth: Bearer token
- `PATCH /orders/:id/status` - Update order status.
  - Auth: admin Bearer token
  - Body: `orderStatus` as `Pending`, `In Progress`, `Completed`, or `Delivered`
- `DELETE /orders/:id` - Delete an order.
  - Auth: admin Bearer token

## Gallery

- `GET /gallery` - View all artworks. Optional query: `category`
- `GET /gallery/:id` - View one artwork.
- `POST /gallery` - Add artwork.
  - Auth: admin Bearer token
  - Form fields: `title`, `category`, `image`, `description`, `price`
- `PUT /gallery/:id` - Edit artwork.
  - Auth: admin Bearer token
- `DELETE /gallery/:id` - Delete artwork.
  - Auth: admin Bearer token

## Contact

- `POST /contact` - Save a contact inquiry.
  - Body: `name`, `email`, `phone`, `subject`, `message`
- `GET /contact` - View all inquiries.
  - Auth: admin Bearer token
- `GET /contact/:id` - View one inquiry.
  - Auth: admin Bearer token
- `DELETE /contact/:id` - Delete inquiry.
  - Auth: admin Bearer token

## Testimonials

- `GET /testimonials` - View published testimonials.
- `GET /testimonials/:id` - View one testimonial.
- `POST /testimonials` - Add testimonial.
  - Auth: admin Bearer token
  - Body: `name`, `message`, `rating`, `isPublished`
- `PUT /testimonials/:id` - Edit testimonial.
  - Auth: admin Bearer token
- `DELETE /testimonials/:id` - Delete testimonial.
  - Auth: admin Bearer token

## Authentication Header

Use this header for protected routes:

```http
Authorization: Bearer <jwt-token>
```
