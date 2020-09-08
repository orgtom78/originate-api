import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "projects",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'projectId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      projectId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET companyname= :companyname, companycountry = :companycountry, companyaddress= :companyaddress, dateofincorporation= :dateofincorporation registrationcertattachment= :registrationcertattachment companyindustry= :companyindustry financialaccountsattachment= :financialaccountsattachment bankaccountstatementattachment= :bankaccountstatementattachment companywebsite= :companywebsite companylastyearrevenue= :companylastyearrevenue companylastyearprofit= :companylastyearprofit",
    ExpressionAttributeValues: {
      ":companyname": data.companyname || null,
      ":companycountry": data.companycountry || null,
      ":companyaddress": data.companyaddress || null,
      ":dateofincorporation": data.dateofincorporation || null,
      ":registrationcertattachment": data.registrationcertattachment || null,
      ":companyindustry": data.companyindustry || null,
      ":financialaccountsattachment": data.financialaccountsattachment || null,
      ":bankaccountstatementattachment": data.bankaccountstatementattachment || null,
      ":companywebsite": data.companywebsite || null,
      ":companylastyearrevenue": data.companylastyearrevenue || null,
      ":companylastyearprofit": data.companylastyearprofit || null,

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
