# HOW TO USE

#### 1. Set up your realtime database in Firebase with the following rules

```
{
  "rules": {
    ".read": true,
    ".write": true,
    "categories": {
      ".indexOn": ["createdAt", "name"]
    },
    "discounts": {
      ".indexOn": ["createdAt", "name"]
    },
    "menu": {
      ".indexOn": ["updatedAt"]
    },
    "orders": {
      ".indexOn": ["updatedAt"]
    },
    "cart": {
      "$cartId": {
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

#### 2. Set up your storage in Firebase with the following rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

#### 3. Set up your authentication in Firebase and allow email/password

```
example
```

#### 4. Set up .env file in your local machine

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSEGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_DATABSE_URL=
```

#### 5. Install all the dependencies with Docker

```
docker-compose run --rm pnpm install
```

#### 6. Start the application with Docker

```
docker-compose up --build watch-client
```

## Overview

#### Transaction Page

![screenshot](/src/assets/sc.jpg)
