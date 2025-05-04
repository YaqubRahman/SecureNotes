# Backend

## Setup and Installation

1. **Clone the repository if not done so already**

```bash
git clone <https://github.com/YaqubRahman/SecureNotes.git>
```

2. **Navigate to the backend directory**

```bash
cd backend
```

3. **Install dependencies**

```
npm install
```

4. **Set enviroment variables**
   Create a .env file in the root of the backend project and add the following:

```env
JWT_SECRET=this_is_the_secret
```

# Running the backend

### `npm run dev`

Runs the backend in [http://localhost:5000]
The server will reload if you make edits and save

## Running tests

### `npm test`

This will run the two test of `auth.test.ts` and `note.test.ts`
