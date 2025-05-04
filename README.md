### Chiryo ###
#### Abstract #### 

Mental health is becoming an increasingly prevalent issue in society, this project explores how to address this using a novel GenAI approach.

#### Setup #####

In order to run the project locally, you will require the following:
MongoDB - Account (with set up Mongo Atlas Cluster)
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
NOTE: MONGO_URL is for PRODUCTION only
EXTRA SECURITY MEASURES: ADMIN can only be created with access to the DB

Ensure you have Node's LTS installed before preceding

After, navigate to the main directory of the project and use the following custom scripts to download and run all the dependencies required to run the project.

```powershell
cd client ; npm install ; npm run dev

cd ../server ; npm install ; npm run start
```

Randomized data can be added to your local cluster by running the command:

```powershell
npm run setup
```
in the /server directory to populate the database with an admin and predefined data in used in the /fixtures directory

Within your MongoDB cluster, ensure that the ADMIN environment variable and adminID of the admin user match

Due to the nature of this project and the rapid speed of innovation, the Gemini API may be deprecated and therefore the setup will be visible on the documentation

#### Assets ####

Image assets were either created or sourced from free to use creators on Pexels

Asset References 
https://www.pexels.com/@hillaryfox/
https://www.pexels.com/@edmond-dantes/
https://www.pexels.com/@ketut-subiyanto/
https://www.pexels.com/@ian-panelo/
https://www.pexels.com/@sachuzayn/