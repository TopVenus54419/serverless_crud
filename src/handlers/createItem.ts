
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { putItem } from '../services/dynamoService';
import { Item } from '../models/item';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');
    if (!data.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required field: name' }),
      };
    }
    const now = new Date().toISOString();
    const item: Item = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    };
    await putItem(item);
    return {
      statusCode: 201,
      body: JSON.stringify(item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create item', error: (error as Error).message }),
    };
  }
};
