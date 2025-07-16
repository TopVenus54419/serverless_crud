
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { putItem } from '../services/dynamoService';
import { MenuItem } from '../models/item';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');
    if (!data.name || typeof data.price !== 'number' || !data.category || typeof data.available !== 'boolean') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: name, price (number), category, available (boolean)' }),
      };
    }
    const now = new Date().toISOString();
    const menuItem: MenuItem = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      available: data.available,
      createdAt: now,
      updatedAt: now,
    };
    await putItem(menuItem);
    return {
      statusCode: 201,
      body: JSON.stringify(menuItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create menu item', error: (error as Error).message }),
    };
  }
};
