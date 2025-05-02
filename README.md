### Chiryo ###
#### Abstract #### 

Mental health is becoming an increasingly prevalent issue in society, this project explores how to address this.

#### Setup #####

In order to run the project locally, you will require the following:
MongoDB - Account (with set up Mongo Cluster)
Google API Key (Google Console/Google AI Studio)

The above will provide the environment variable values for:

```javascript
// Backend
// Google AI Studio key
GEMINI_API_KEY=value
// MongoDB Cluster and DB Connection values
MONGO_TEST=value
MONGO_URL=value
// Random UUID 
JWT_SECRET=value
// Id of admin for mongodb user
ADMIN=value
// Google account password
ADMINPASS=value

// Frontend
// Random UUID
VITE_CRYPTO_KEY=value
```
NOTE: MONGO_URL is for PRODUCTION only
EXTRA SECURITY MEASURES: ADMIN can only be created with access to the DB

After, use the following custom scripts to download and run all the dependencies required to run the project.

```powershell
cd client ; npm install ; npm run dev

cd ../server ; npm install ; npm run start
```

