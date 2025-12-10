
Tech Stack - Node js, Mongoose, Express, Apollo Server, MongoDB
Deployment - Vercel

#### 1. Follow a User
```graphql
mutation {
  followUser(followerId: "user1", followingId: "user2") {
    success
    message
  }
}
```

#### 2. Get Followers
Check who is following `user2`.
```graphql
query {
  getFollowers(userId: "user2") {
    id
    username
  }
}
```

#### 3. Get Following
Check who `user1` is following.
```graphql
query {
  getFollowing(userId: "user1") {
    id
    username
  }
}
```

#### 4. Unfollow a User
```graphql
mutation {
  unfollowUser(followerId: "user1", followingId: "user2") {
    success
    message
  }
}
```

#### 5. Test Error Handling (Duplicate Follow)
Try to follow the same user again.
```graphql
mutation {
  followUser(followerId: "user1", followingId: "user2") {
    success
    message
  }
}
```
├── gateway/                # GraphQL Gateway
│   ├── src/
│   │   ├── schema.js       # GraphQL TypeDefs
│   │   ├── resolvers.js    # Resolvers (calls Follow Service)
│   │   └── index.js        # Apollo Server Entry point
│   ├── .env                # Config (Port, Service URL)
│   └── package.json