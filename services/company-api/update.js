import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "originate",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'sortkey': path companyId parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      sortkey: event.pathParameters.companyId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET companyname = :companyname, companycountry = :companycountry, companyregisternumber = :companyregisternumber, companyaddress =:companyaddress, dateofincorporation =:dateofincorporation, registrationcertattachment =:registrationcertattachment, companyindustry =:companyindustry, companywebsite =:companywebsite",
    ExpressionAttributeValues: {
      ":companyname": data.companyname || null,
      ":companycountry": data.companycountry || null,
      ":companyregisternumber": data.companyregisternumber || null,
      ":companyaddress": data.companyaddress || null,
      ":dateofincorporation": data.dateofincorporation || null,
      ":registrationcertattachment": data.registrationcertattachment || null,
      ":companyindustry": data.companyindustry || null,
      ":companywebsite": data.companywebsite || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
