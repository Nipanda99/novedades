// src/common/dynamoClient.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamoClient = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'fakeMyKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
  },
});
