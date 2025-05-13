import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey"
  }
});

async function listTables() {
  const result = await client.send(new ListTablesCommand({}));
  console.log("✅ Tablas disponibles:", result.TableNames);
}

listTables();
