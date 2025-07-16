import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_TABLE!;

export const putItem = async (item: any) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  await dynamoDb.put(params).promise();
  return item;
};

export const getItemById = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item || null;
};

export const listItems = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await dynamoDb.scan(params).promise();
  return result.Items || [];
};

export const updateItem = async (id: string, updates: any) => {
  const updateExpressions = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, any> = {};
  for (const key of Object.keys(updates)) {
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = updates[key];
  }
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };
  const result = await dynamoDb.update(params).promise();
  return result.Attributes;
};

export const deleteItem = async (id: string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  await dynamoDb.delete(params).promise();
  return { id };
};
