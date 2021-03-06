import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const companyID = uuid.v1();
  const params = {
    TableName: "originate",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      companyId: companyID,
      sortkey: companyID,
      companyname: data.companyname,
      companycountry: data.companycountry,
      companyaddress: data.companyaddress,
      dateofincorporation: data.dateofincorporation,
      registrationcertattachment: data.registrationcertattachment,
      companyregisternumber: data.companyregisternumber,
      companyindustry: data.companyindustry,
      companywebsite: data.companywebsite,
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
