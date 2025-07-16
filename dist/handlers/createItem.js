"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const uuid_1 = require("uuid");
const dynamoService_1 = require("../services/dynamoService");
const handler = async (event) => {
    try {
        const data = JSON.parse(event.body || '{}');
        if (!data.name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required field: name' }),
            };
        }
        const now = new Date().toISOString();
        const item = {
            id: (0, uuid_1.v4)(),
            name: data.name,
            description: data.description,
            createdAt: now,
            updatedAt: now,
        };
        await (0, dynamoService_1.putItem)(item);
        return {
            statusCode: 201,
            body: JSON.stringify(item),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to create item', error: error.message }),
        };
    }
};
exports.handler = handler;
