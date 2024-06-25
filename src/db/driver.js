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
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
  
    async disconnect() {
      try {
        await this.client.close();
        console.log("Disconnected from MongoDB");
      } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        throw error;
      }
    }
  
    getDb(dbName) {
      return this.client.db(dbName);
    }
  }
  