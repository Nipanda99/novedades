import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../common/dynamoClient';

const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const { startDate_index, title, description, commerce_id, endDate } = body;

    if (!startDate_index || !title || !description || !commerce_id || !endDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: '❌ Faltan campos obligatorios para popup por commerce' }),
      };
    }

    const item = {
      module: 'popup',
      startDate_index,
      title,
      description,
      commerce_id,
      endDate,
      createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: 'informations',
      Item: item,
    });

    await docClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `✅ popup creado exitosamente para comercio ${commerce_id}`,
        data: item,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: '❌ Error al insertar popup por commerce',
        error: err.message || err,
      }),
    };
  }
};
