import { APIGatewayProxyHandler } from 'aws-lambda';
import { updateItem } from '../services/dynamoService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id parameter' }),
      };
    }
    const updates = JSON.parse(event.body || '{}');
    if (Object.keys(updates).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No update fields provided' }),
      };
    }
    updates.updatedAt = new Date().toISOString();
    const updated = await updateItem(id, updates);
    return {
      statusCode: 200,
      body: JSON.stringify(updated),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update item', error: (error as Error).message }),
    };
  }
};
