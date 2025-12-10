# Gateway Service (GraphQL)

This is the GraphQL Gateway Service for the Microservices Architecture. It aggregates data from backend services (specifically the **Follow Service**) and exposes a unified GraphQL API to clients.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Apollo Server (v4)
- **Language**: GraphQL
- **HTTP Client**: Axios
- **Deployment**: Vercel

## Decision Making & Architecture
 I m very familiar with this stack
 GraphQL
 Node JS 
 Axios
 Vercel

## Setup & Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- The **Follow Service** must be running (default expected URL: `http://localhost:4001/api/v1`)

### Installation
1. Clone the repository (if not already done).
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Ensure your `.env` file is set up:
```env
PORT=4000
FOLLOW_SERVICE_URL=http://localhost:4001/api/v1  # Update if Follow Service is elsewhere
```

### Running the Service
Start the development server:
```bash
npm run dev
# OR
npm start
```
The GraphQL Playground will be available at `http://localhost:4000/`.

## Deployment

### Vercel Deployment
This service is configured for deployment on Vercel.

1.  Push this code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com/) and click "Add New... -> Project".
3.  Import the GitHub repository.
4.  **Environment Variables**: In the Vercel project settings, add:
    - `FOLLOW_SERVICE_URL`: The production URL of your deployed Follow Service.
5.  Click **Deploy**.

The `vercel.json` file handles the routing to `src/index.js` for serverless function execution.

## API Documentation (GraphQL)

Here are the available queries and mutations.

### Queries

#### 1. Get Followers
Retrieve a list of users who follow a specific user.
```graphql
query {
  getFollowers(userId: "user_id_here") {
    id
    username
  }
}
```

#### 2. Get Following
Retrieve a list of users that a specific user is following.
```graphql
query {
  getFollowing(userId: "user_id_here") {
    id
    username
  }
}
```

### Mutations

#### 1. Follow a User
```graphql
mutation {
  followUser(followerId: "user1", followingId: "user2") {
    success
    message
  }
}
```

#### 2. Unfollow a User
```graphql
mutation {
  unfollowUser(followerId: "user1", followingId: "user2") {
    success
    message
  }
}
```

## Folder Structure
```
├── src/
│   ├── schema.js       # GraphQL Type Definitions
│   ├── resolvers.js    # Resolvers (Integration with Follow Service)
│   └── index.js        # Server Entry point
├── .env                # Environment variables
├── vercel.json         # Vercel configuration
└── package.json
```