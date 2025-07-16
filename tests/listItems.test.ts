import { handler } from '../src/handlers/listItems';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockListItems = jest.fn();
jest.mock('../src/services/dynamoService', () => ({
  listItems: (...args: any[]) => mockListItems(...args),
}));

describe('listItems Lambda', () => {
  beforeEach(() => {
    mockListItems.mockReset();
  });

  it('should return 200 and a list of items', async () => {
    mockListItems.mockResolvedValueOnce([
      { id: '1', name: 'Test1' },
      { id: '2', name: 'Test2' },
    ]);
    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(200);
    const items = JSON.parse((result as import('aws-lambda').APIGatewayProxyResult).body);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(2);
  });

  it('should return 500 on error', async () => {
    mockListItems.mockRejectedValueOnce(new Error('fail'));
    const event = {} as unknown as APIGatewayProxyEvent;
    const result = await handler(event, {} as any, () => {});
    expect(result && result.statusCode).toBe(500);
  });
});
