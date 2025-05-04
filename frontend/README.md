# Frontend

## Setup and Installation

1. **Clone the repository if not done so already**

```bash
git clone <https://github.com/YaqubRahman/SecureNotes.git>
```

2. **Navigate to the frontend directory**

```bash
cd frontend
```

3. **Install dependencies**

```
npm install
```

# Running the frontend

### `npm start`

- The app will run at [http://localhost:3000](http://localhost:3000)

## Authentication Flow

- Users must log in using a hardcoded account:
  - **Username**: `intern`
  - **Password**: `password123`
- On successful login:
  - A JWT token is returned by the backend.
  - The token is stored in `localStorage`.
  - It is automatically included in the `Authorization` header of protected requests.
- Unauthenticated users attempting to access protected routes (e.g., the dashboard) will be redirected to the login page.
