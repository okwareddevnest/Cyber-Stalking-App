import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { ClientEncryption } from 'mongodb-client-encryption';

const uri = process.env.MONGODB_URI;

// Encryption settings (simplified example)
const encryptionOptions = {
  keyVaultNamespace: 'encryption.__keyVault',
  kmsProviders: {
    local: {
      key: Buffer.from(process.env.MONGODB_LOCAL_MASTER_KEY!, 'base64'),
    },
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (!process.env.MONGODB_LOCAL_MASTER_KEY) {
  throw new Error('Please add your MongoDB Local Master Key to .env.local');
}

const options: MongoClientOptions = {
  // ... other options ...
  autoEncryption: {
    ...encryptionOptions,
    // Specify schema map for encrypted fields
  },
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri!, options);
  clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}
