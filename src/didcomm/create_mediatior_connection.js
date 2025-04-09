import {
  createV3MediateRequestMessage,
  createV3RecipientUpdateMessage,
  UpdateAction,
  createV3RecipientQueryMessage,
} from '@veramo/did-comm';

const createMediatorConnection = async (recipientDID, mediatorDID, agent) => {
  try {
    // Create mediate request
    const mediateRequestMessage = createV3MediateRequestMessage(
      recipientDID,
      mediatorDID
    );

    const packedMessage = await agent.packDIDCommMessage({
      packing: 'authcrypt',
      message: mediateRequestMessage,
    });

    const sentMessage = await agent.sendDIDCommMessage({
      messageId: mediateRequestMessage.id,
      packedMessage,
      recipientDidUrl: mediatorDID,
    });

    // Update mediate request
    const update = createV3RecipientUpdateMessage(recipientDID, mediatorDID, [
      {
        recipient_did: recipientDID,
        action: UpdateAction.ADD,
      },
    ]);

    const packedUpdate = await agent.packDIDCommMessage({
      packing: 'authcrypt',
      message: update,
    });

    const updateResponse = await agent.sendDIDCommMessage({
      packedMessage: packedUpdate,
      recipientDidUrl: mediatorDID,
      messageId: update.id,
    });

    const query = createV3RecipientQueryMessage(recipientDID, mediatorDID);

    const packedQuery = await agent.packDIDCommMessage({
      packing: 'authcrypt',
      message: query,
    });
    const queryResponse = await agent.sendDIDCommMessage({
      packedMessage: packedQuery,
      recipientDidUrl: mediatorDID,
      messageId: query.id,
    });

    console.log('queryResponse', queryResponse);
  } catch (err) {
    console.log(err);
  }
};

export { createMediatorConnection };
