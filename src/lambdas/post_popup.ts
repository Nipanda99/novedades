import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../common/dynamoClient'; // cliente centralizado

const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const { startDate_index, title, description, commerce_id, endDate, module } = body;

    // Validación base
    if (!startDate_index || !title || !description || !commerce_id || !module) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: '❌ Faltan campos obligatorios' }),
      };
    }

    // Validación específica si el módulo es popup
    if (module === 'popup' && !endDate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: '❌ El campo endDate es obligatorio para módulo popup' }),
      };
    }

    const item: Record<string, any> = {
      module,
      startDate_index,
      title,
      description,
      commerce_id,
      createdAt: new Date().toISOString(),
    };

    // Solo agregar endDate si es necesario
    if (module === 'popup') {
      item.endDate = endDate;
    }

    const command = new PutCommand({
      TableName: 'informations',
      Item: item,
    });

    await docClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `✅ ${module} creado exitosamente`,
        data: item,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: '❌ Error al insertar',
        error: err.message || err,
      }),
    };
  }
};