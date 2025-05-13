import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from './common/dynamoClient'; // tu cliente centralizado

// ...tu handler
const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (event: any) => {
  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body;

    const params = {
      TableName: "informations",
      Item: {
        module: body.module,
        startDate_index: body.startDate_index,
        title: body.title,
        description: body.description,
        commerce_id: body.commerce_id || null,
        createdAt: new Date().toISOString()
      }
    };

    await docClient.send(new PutCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `✅ ${body.module} Item insertado correctamente`})
    };
 } catch (err: any) {
  console.error("❌ Error al insertar:", err.message || err);
  return {
    statusCode: 500,
    body: JSON.stringify({ error: err.message })
  };
}
};
