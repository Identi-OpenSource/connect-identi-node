import { createV3DeliveryRequestMessage } from '@veramo/did-comm';

const receivedMessages = async (did, mediatorDID, message_id_list, agent) => {
  const messagesRequestMessage = {
    id: uuidv4(),
    type: MESSAGES_RECEIVED_MESSAGE_TYPE,
    to: [mediatorDID],
    from: did,
    return_route: 'all',
    body: {
      message_id_list: message_id_list,
    },
  };
  const packedMessage = await agent.packDIDCommMessage({
    packing: 'authcrypt',
    message: messagesRequestMessage,
  });
  await agent.sendDIDCommMessage({
    messageId: messagesRequestMessage.id,
    packedMessage,
    recipientDidUrl: mediatorDID,
  });
};

export { receivedMessages };
