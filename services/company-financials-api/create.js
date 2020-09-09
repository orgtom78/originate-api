import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const companyfinancialsID = uuid.v1();
  const params = {
    TableName: "originate",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      companyfinancialsId: companyfinancialsID,
      sortkey: companyfinancialsID,
      financialaccountsattachment: data.financialaccountsattachment,
      bankaccountstatementattachment: data.bankaccountstatementattachment,
      companylastyearrevenue: data.companylastyearrevenue,
      companylastyearprofit: data.companylastyearprofit,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
