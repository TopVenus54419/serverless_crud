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

  it('should return 201 and the created item for valid input', async () => {
    mockPutItem.mockResolvedValueOnce({ id: '1', name: 'Test', createdAt: 'now', updatedAt: 'now' });
    const event = {
      body: JSON.stringify({ name: 'Test' }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(201);
    expect(result && JSON.parse(result.body).name).toBe('Test');
  });

  it('should return 400 if name is missing', async () => {
    const event = {
      body: JSON.stringify({}),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });
});
