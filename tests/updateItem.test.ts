import { handler } from '../src/handlers/updateItem';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockUpdateItem = jest.fn();
jest.mock('../src/services/dynamoService', () => ({
  updateItem: (...args: any[]) => mockUpdateItem(...args),
}));

describe('updateItem Lambda', () => {
  beforeEach(() => {
    mockUpdateItem.mockReset();
  });

  it('should return 200 and the updated menu item for valid input', async () => {
    mockUpdateItem.mockResolvedValueOnce({ id: '1', name: 'Latte', price: 4.5, category: 'coffee', available: false, updatedAt: 'now' });
    const event = {
      pathParameters: { id: '1' },
      body: JSON.stringify({ available: false }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(200);
    expect(result && JSON.parse(result.body).available).toBe(false);
  });

  it('should return 400 if id is missing', async () => {
    const event = {
      pathParameters: null,
      body: JSON.stringify({ available: false }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });

  it('should return 400 if no update fields provided', async () => {
    const event = {
      pathParameters: { id: '1' },
      body: JSON.stringify({}),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });

  it('should return 500 on error', async () => {
    mockUpdateItem.mockRejectedValueOnce(new Error('fail'));
    const event = {
      pathParameters: { id: '1' },
      body: JSON.stringify({ available: false }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(500);
  });
});
