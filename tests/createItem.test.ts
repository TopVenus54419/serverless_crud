import { handler } from '../src/handlers/createItem';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockPutItem = jest.fn();
jest.mock('../src/services/dynamoService', () => ({
  putItem: (...args: any[]) => mockPutItem(...args),
}));

describe('createItem Lambda', () => {
  beforeEach(() => {
    mockPutItem.mockReset();
  });

  it('should return 201 and the created menu item for valid input', async () => {
    mockPutItem.mockResolvedValueOnce({ id: '1', name: 'Latte', price: 4.5, category: 'coffee', available: true, createdAt: 'now', updatedAt: 'now' });
    const event = {
      body: JSON.stringify({ name: 'Latte', price: 4.5, category: 'coffee', available: true }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {}) as any;
    expect(result && result.statusCode).toBe(201);
    const body = JSON.parse((result as any).body);
    expect(body.name).toBe('Latte');
    expect(body.price).toBe(4.5);
    expect(body.category).toBe('coffee');
    expect(body.available).toBe(true);
  });

  it('should return 400 if required fields are missing', async () => {
    const event = {
      body: JSON.stringify({ name: 'Latte' }), // missing price, category, available
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });
});
