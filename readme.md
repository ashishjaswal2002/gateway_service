# Gateway Service (GraphQL)

Welcome to the Gateway Service! This is the central entry point for our microservices architecture. It uses **GraphQL** to aggregate data from backend services (like the Follow Service) and provides a unified, efficient API for our clients.

## 🚀 Live Demo
- **Live URL**: [https://gateway-service-ruddy.vercel.app](https://gateway-service-ruddy.vercel.app)
- **Backend Follow Service**: [https://follow-service.vercel.app](https://follow-service.vercel.app)

---

## 🛠️ Tech Stack & Decisions

I chose this specific stack to balance performance, scalability, and ease of development:

- **Runtime: Node.js**: I went with Node.js because its non-blocking I/O model is perfect for a gateway that handles multiple network requests simultaneously. It keeps the service lightweight and fast.
- **API Standard: GraphQL (Apollo Server v4)**: Instead of a traditional REST API, I used GraphQL. This allows clients to ask for exactly what they need—no more, no less. It solves the problem of over-fetching and under-fetching data, which is common when aggregating from multiple sources.
- **HTTP Client: Axios**: Used for communicating with the backend microservices. I prefer Axios for its clean API, automatic JSON transformation, and easy error handling.
- **Deployment: Vercel**: I deployed on Vercel because it's fantastic for serverless Node.js applications. It handles scaling automatically and integrates seamlessly with our Git workflow.

---

## 🏗️ Architecture & Database

This Gateway implementation follows the **API Gateway Pattern**. 

- **Role**: It acts as a middleman. It doesn't connect directly to a database.
- **Data Source**: It fetches data from the **Follow Service** (REST API) and transforms it into a GraphQL graph.
- **Schema**: The data structure is defined in `src/schema.js` and resolves data via `src/resolvers.js`.

### GraphQL Schema Overview
The "database" structure here is technically the graph we expose:

```graphql
type User {
  id: ID!
  username: String
}

type Query {
  getFollowers(userId: ID!): [User]
  getFollowing(userId: ID!): [User]
}

type Mutation {
  followUser(followerId: ID!, followingId: ID!): FollowResponse
  unfollowUser(followerId: ID!, followingId: ID!): FollowResponse
}
```

---

## 💻 Local Setup Guide

Follow these steps to get the Gateway Service running on your local machine.

### Prerequisites
- **Node.js**: Make sure you have Node (v14 or higher) installed.
- **Follow Service**: This gateway depends on the Follow Service. Ensure it's running locally (usually on port 4001) or point to the live URL.

### 1. Installation
Clone the repo and install the dependencies:

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory. You can copy the template below:



```bash
# Create .env file
touch .env
```

**Content for `.env`:**
```env
PORT=4000
# Link to your running Follow Service (Local or Live)
FOLLOW_SERVICE_URL=http://localhost:4001/api/v1
# OR if you want to test against the live backend immediately:
# FOLLOW_SERVICE_URL=https://follow-service.vercel.app/api/v1


```



### 3. Running the Server
Start the development server:

```bash
npm run dev
```
The server will start at `http://localhost:4000/`.

---

## 🧪 How to Test API Endpoints

Once the server is running, you can test the API using the **Apollo GraphQL Playground** available at `http://localhost:4000/`.

### 1. Get Followers
Retrieve a list of users who follow a target user.

```graphql
query {
  getFollowers(userId: "user_id_here") {
    id
    username
  }
}
```

### 2. Get Following
See who a user is following.

```graphql
query {
  getFollowing(userId: "user_id_here") {
    id
    username
  }
}
```

### 3. Follow a User
Create a new relationship.

```graphql
mutation {
  followUser(followerId: "your_user_id", followingId: "target_user_id") {
    success
    message
  }
}
```

### 4. Unfollow a User
Remove an existing relationship.

```graphql
mutation {
  unfollowUser(followerId: "your_user_id", followingId: "target_user_id") {
    success
    message
  }
}
```

---

I have taken this steps to deploy on vercel 

## 🌍 Deployment (Vercel)
This project is pre-configured for Vercel using `vercel.json`.

1. **Push to GitHub**: Ensure your code is in a repository.
2. **New Project in Vercel**: Import the repo.
3. **Environment Variables**: Add `FOLLOW_SERVICE_URL` in the Vercel dashboard settings to point to your production backend.
4. **Deploy**: Vercel handles the build and serverless function deployment.
