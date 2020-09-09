import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "originate",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'sortkey': path projectId parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      sortkey: event.pathParameters.projectId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET title = :title, buyercompanyname = :buyercompanyname, buyercountry =:buyercountry, buyeraddress =:buyeraddress, financeamountrequest =:financeamountrequest, soldgoodsdescription =:soldgoodsdescription, paymentterms =:paymentterms, pastyearvolume =:pastyearvolume, nextyearvolume =:nextyearvolume, currency =:currency, salescontractattachment =:salescontractattachment, purchaseorderattachment =:purchaseorderattachment, purchaseorderamount =:purchaseorderamount, purchaseorderdate =:purchaseorderdate",
    ExpressionAttributeValues: {
      ":title": data.title || null,
      ":buyercompanyname": data.buyercompanyname || null,
      ":buyercountry": data.buyercountry || null,
      ":buyeraddress": data.buyeraddress || null,
      ":financeamountrequest": data.financeamountrequest || null,
      ":soldgoodsdescription": data.soldgoodsdescription || null,
      ":paymentterms": data.paymentterms || null,
      ":pastyearvolume": data.pastyearvolume || null,
      ":nextyearvolume": data.nextyearvolume || null,
      ":currency": data.currency || null,
      ":salescontractattachment": data.salescontractattachment || null,
      ":purchaseorderattachment": data.purchaseorderattachment || null,
      ":purchaseorderamount": data.purchaseorderamount || null,
      ":purchaseorderdate": data.purchaseorderdate || null
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
