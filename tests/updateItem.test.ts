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

  it('should return 200 and the updated item for valid input', async () => {
    mockUpdateItem.mockResolvedValueOnce({ id: '1', name: 'Updated', updatedAt: 'now' });
    const event = {
      pathParameters: { id: '1' },
      body: JSON.stringify({ name: 'Updated' }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(200);
    expect(result && JSON.parse(result.body).name).toBe('Updated');
  });

  it('should return 400 if id is missing', async () => {
    const event = {
      pathParameters: null,
      body: JSON.stringify({ name: 'Updated' }),
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
      body: JSON.stringify({ name: 'Updated' }),
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(500);
  });
});
