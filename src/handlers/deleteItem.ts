import { APIGatewayProxyHandler } from 'aws-lambda';
import { deleteItem } from '../services/dynamoService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing id parameter' }),
      };
    }
    await deleteItem(id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted', id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete item', error: (error as Error).message }),
    };
  }
};
