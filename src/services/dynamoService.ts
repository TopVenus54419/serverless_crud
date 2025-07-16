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
