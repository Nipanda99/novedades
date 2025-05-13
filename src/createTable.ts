import {
  DynamoDBClient,
  CreateTableCommand,
  ScalarAttributeType,
  KeyType,
  BillingMode // <- importante
} from "@aws-sdk/client-dynamodb";


const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  },
});

const params = {
  TableName: "informations",
  AttributeDefinitions: [
    { AttributeName: "module", AttributeType: "S" as ScalarAttributeType },
    { AttributeName: "startDate_index", AttributeType: "N" as ScalarAttributeType }
  ],
  KeySchema: [
    { AttributeName: "module", KeyType: "HASH" as KeyType },
    { AttributeName: "startDate_index", KeyType: "RANGE" as KeyType }
  ],
  BillingMode: BillingMode.PAY_PER_REQUEST

};

async function createTable() {
  try {
    await client.send(new CreateTableCommand(params));
    console.log("✅ Tabla 'informations' creada.");
  } catch (err: any) {
    console.error("❌ Error al crear la tabla:", err.message || err);
  }
}

createTable();
