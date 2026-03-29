# SubKitt Firebase Security Rules

## Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin Check: Restricted to muhammadsaadc49@gmail.com
    function isAdmin() {
      return request.auth != null && request.auth.token.email == "muhammadsaadc49@gmail.com";
    }

    // Plans: Anyone can view, only Admin can write
    match /plans/{planId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Purchases: Users can create and read their own. Admin manages all.
    match /purchases/{purchaseId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && (request.auth.uid == resource.data.userId || isAdmin());
      allow update, delete: if isAdmin();
    }

    // Notifications: Logged in users can send, only Admin can read
    match /notifications/{notificationId} {
      allow create: if request.auth != null;
      allow read, write: if isAdmin();
    }
    
    // Default Deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Admin Check
    function isAdmin() {
      return request.auth != null && request.auth.token.email == "muhammadsaadc49@gmail.com";
    }

    // Software Files (EXE): Admin can upload. Logged-in users can download.
    match /plans/{fileName} {
      allow write: if isAdmin();
      allow read: if request.auth != null;
    }

    // Default Deny
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```
