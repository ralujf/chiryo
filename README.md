## Chiryo 
### Abstract  

Mental health is becoming an increasingly prevalent issue in society, this project explores how to address this using a novel GenAI approach.

#### Setup 

In order to run the project locally, you will require the following:
MongoDB Cluster - Account (with set up Mongo Atlas Cluster)
Google API Key (Google Console/Google AI Studio)
Node - LTS

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
// ObjectId of admin for Mongodb User
ADMIN=value
// Google account password for admin user
ADMIN_PASS=value

// Frontend
// Random UUID
VITE_CRYPTO_KEY=value
```
NOTE: MONGO_URL is for PRODUCTION only, your cluster url with admin password can be found when setting up MongoDB

EXTRA SECURITY MEASURES: ADMIN can only be created with access to the DB

Ensure you have Node's LTS installed and a MongoDB Cluster with a database that has the following collections before proceeding: 

applications
dashboards
therapists
users

After, navigate to the main directory of the project and use the following custom scripts to download and run all the dependencies required to run the project.

```powershell
cd client ; npm install ; npm run dev

cd ../server ; npm install ; npm run start
```

Randomized JSON data can be added to your local collection by running the command:

```powershell
npm run setup
```
in the /server directory to populate the database with an admin and predefined data in used in the /fixtures directory

Within your MongoDB cluster, ensure that the ADMIN environment variable and adminID of the admin user match

Due to the nature of this project and the rapid speed of innovation, the Gemini API may be deprecated and therefore the setup will be visible on the documentation

#### Assets 

Image assets were edited and either created or sourced from free to use creators on Pexels

#### Asset References 
- https://www.pexels.com/@hillaryfox/
- https://www.pexels.com/@edmond-dantes/
- https://www.pexels.com/@ketut-subiyanto/
- https://www.pexels.com/@ian-panelo/
- https://www.pexels.com/@sachuzayn/

#### Other (Key)
- https://github.com/molefrog/wouter/issues/132
- https://www.npmjs.com/package/wouter
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/mongoose
- https://www.npmjs.com/package/express-validator
- https://www.npmjs.com/package/bcrypt
- https://www.npmjs.com/package/zustand
- https://www.npmjs.com/package/string-comparison
- https://www.npmjs.com/package/react-tooltip
- https://www.npmjs.com/package/react-toastify
- https://www.npmjs.com/package/react-hook-form
- https://www.npmjs.com/package/react-datepicker
- https://www.npmjs.com/package/motion
- https://www.npmjs.com/package/axios
- https://www.npmjs.com/package/crypto-js
- https://www.npmjs.com/package/json-server