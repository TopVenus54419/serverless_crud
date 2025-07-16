"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putItem = void 0;
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
