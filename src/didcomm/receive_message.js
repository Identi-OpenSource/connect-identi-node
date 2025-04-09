import { createV3DeliveryRequestMessage } from '@veramo/did-comm';

const receivedMessages = async (did, mediatorDID, agent) => {
  const deliveryRequest = createV3DeliveryRequestMessage(did, mediatorDID);
  const packedRequest = await agent.packDIDCommMessage({
    packing: 'authcrypt',
    message: deliveryRequest,
  });
  const deliveryResponse = await agent.sendDIDCommMessage({
    packedMessage: packedRequest,
    recipientDidUrl: mediatorDID,
    messageId: deliveryRequest.id,
  });

  const messages = [];
  for (const attachment of deliveryResponse?.returnMessage?.attachments ?? []) {
    const msg = await agent.handleMessage({
      raw: JSON.stringify(attachment.data.json),
    });
    messages.push(msg.data);
    console.log('message', msg.data);
  }

  return messages;
};

export { receivedMessages };
