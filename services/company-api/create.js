import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "projects",
      Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        projectId: uuid.v1(),
        companyname: data.companyname,
        companycountry: data.companycountry,
        companyaddress: data.companyaddress,
        dateofincorporation: data.dateofincorporation,
        registrationcertattachment: data.registrationcertattachment,
        companyregisternumber: data.companyregisternumber,
        companyindustry: data.companyindustry,
        financialaccountsattachment: data.financialaccountsattachment,
        bankaccountstatementattachment: data.bankaccountstatementattachment,
        companywebsite: data.companywebsite,
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
  