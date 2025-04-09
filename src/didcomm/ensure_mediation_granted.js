import {
  CoordinateMediation,
  createV3MediateRequestMessage,
  createV3RecipientUpdateMessage,
  UpdateAction,
} from '@veramo/did-comm';

const ensureMediationGranted = async (recipientDID, mediatorDID, agent) => {
  const request = createV3MediateRequestMessage(recipientDID, mediatorDID);
  const packedRequest = await agent.packDIDCommMessage({
    packing: 'authcrypt',
    message: request,
  });
  const mediationResponse = await agent.sendDIDCommMessage({
    packedMessage: packedRequest,
    recipientDidUrl: mediatorDID,
    messageId: request.id,
  });

  if (
    mediationResponse.returnMessage?.type !== CoordinateMediation.MEDIATE_GRANT
  ) {
    throw new Error('mediation not granted');
  }
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

  if (
    updateResponse.returnMessage?.type !==
      CoordinateMediation.RECIPIENT_UPDATE_RESPONSE ||
    updateResponse.returnMessage?.data?.updates[0].result !== 'success'
  ) {
    throw new Error('mediation update failed');
  }
  console.log('mediation granted');
};

export { ensureMediationGranted };
