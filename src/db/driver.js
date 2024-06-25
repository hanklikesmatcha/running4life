const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = process.env.MONGODB_URI;

export class MongoDBClient {
    constructor() {
      this.uri = URI
      this.client = new MongoClient(this.uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
  
    async connect() {
      try {
        await this.client.connect();
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
  
    async disconnect() {
      try {
        await this.client.close();
      } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        throw error;
      }
    }
  
    getDb(dbName) {
      return this.client.db(dbName);
    }
  }
  