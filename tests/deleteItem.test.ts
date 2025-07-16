import { handler } from '../src/handlers/deleteItem';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockDeleteItem = jest.fn();
jest.mock('../src/services/dynamoService', () => ({
  deleteItem: (...args: any[]) => mockDeleteItem(...args),
}));

describe('deleteItem Lambda', () => {
  beforeEach(() => {
    mockDeleteItem.mockReset();
  });

  it('should return 200 and confirmation for valid id', async () => {
    mockDeleteItem.mockResolvedValueOnce({ id: '1' });
    const event = {
      pathParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(200);
    expect(result && JSON.parse(result.body).id).toBe('1');
  });

  it('should return 400 if id is missing', async () => {
    const event = {
      pathParameters: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });

  it('should return 500 on error', async () => {
    mockDeleteItem.mockRejectedValueOnce(new Error('fail'));
    const event = {
      pathParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(500);
  });
});
