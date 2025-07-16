"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.listItems = exports.getItemById = exports.putItem = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE;
const putItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
    };
    await dynamoDb.put(params).promise();
    return item;
};
exports.putItem = putItem;
const getItemById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
};
exports.getItemById = getItemById;
const listItems = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
};
exports.listItems = listItems;
const updateItem = async (id, updates) => {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
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
exports.updateItem = updateItem;
const deleteItem = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { id },
    };
    await dynamoDb.delete(params).promise();
    return { id };
};
exports.deleteItem = deleteItem;
