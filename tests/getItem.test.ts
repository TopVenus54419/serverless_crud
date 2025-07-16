import { handler } from '../src/handlers/getItem';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockGetItemById = jest.fn();
jest.mock('../src/services/dynamoService', () => ({
  getItemById: (...args: any[]) => mockGetItemById(...args),
}));

describe('getItem Lambda', () => {
  beforeEach(() => {
    mockGetItemById.mockReset();
  });

  it('should return 200 and the item if found', async () => {
    mockGetItemById.mockResolvedValueOnce({ id: '1', name: 'Test' });
    const event = {
      pathParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(200);
    expect(result && JSON.parse(result.body).id).toBe('1');
  });

  it('should return 404 if item not found', async () => {
    mockGetItemById.mockResolvedValueOnce(null);
    const event = {
      pathParameters: { id: '2' },
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(404);
  });

  it('should return 400 if id is missing', async () => {
    const event = {
      pathParameters: null,
    } as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(400);
  });
});
