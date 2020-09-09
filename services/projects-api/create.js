import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const projectId = uuid.v1();
  const params = {
    TableName: "originate",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      projectId: projectId,
      sortkey: projectId,
      title: data.title,
      buyercompanyname: data.buyercompanyname,
      buyercountry: data.buyercountry,
      buyeraddress: data.buyeraddress,
      financeamountrequest: data.financeamountrequest,
      soldgoodsdescription: data.soldgoodsdescription,
      paymentterms: data.paymentterms,
      pastyearvolume: data.pastyearvolume,
      nextyearvolume: data.nextyearvolume,
      currency: data.currency,
      salescontractattachment: data.salescontractattachment,
      purchaseorderattachment: data.purchaseorderattachment,
      purchaseorderamount: data.purchaseorderamount,
      purchaseorderdate: data.purchaseorderdate,
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
