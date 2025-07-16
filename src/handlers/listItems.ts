import { APIGatewayProxyHandler } from 'aws-lambda';
import { listItems } from '../services/dynamoService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const items = await listItems();
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to list items', error: (error as Error).message }),
    };
  }
};
