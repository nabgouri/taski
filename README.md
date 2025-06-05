# taski
A web application with role-based authentication and user management.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the application URL (typically `http://localhost:5713`).

## Demo Accounts

The application comes with pre-seeded demo accounts for testing different user roles:

### Admin Account
- **Username:** ayman
- **Password:** password

### Regular Users
- **Username:** fadma
- **Password:** password

- **Username:** rachid
- **Password:** password

## Creating New Accounts

You can also create new user accounts by making a POST request to `/api/register` or through the application's registration interface (if available).

**Note:** If the demo accounts don't work, you may need to create new accounts as the backend sometimes erases previous user data. In this case, simply register new accounts with the same usernames and passwords listed above, or create your own test accounts.

## Notes

- If the demo accounts don't work, you may need to create new accounts as the backend sometimes erases previous user data
