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
    const menuItem = await getItemById(id);
    if (!menuItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Menu item not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(menuItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get menu item', error: (error as Error).message }),
    };
  }
};
