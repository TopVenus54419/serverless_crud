import { APIGatewayProxyHandler } from 'aws-lambda';
import { getItemById } from '../services/dynamoService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id parameter' }),
      };
    }
    const item = await getItemById(id);
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get item', error: (error as Error).message }),
    };
  }
};
