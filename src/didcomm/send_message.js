import { v4 as uuidv4 } from 'uuid';

const sendMessage = async (body, sender, subject, agent) => {
  try {
    const messageId = uuidv4();
    const message = {
      type: 'https://didcomm.org/basicmessage/2.0/message',
      from: sender,
      to: [subject],
      id: messageId,
      body: body,
    };

    const packedMessage = await agent?.packDIDCommMessage({
      packing: 'authcrypt',
      message,
    });

    if (packedMessage) {
      const result = await agent?.sendDIDCommMessage({
        messageId: messageId,
        packedMessage,
        recipientDidUrl: subject,
      });
      console.log('Message sent');
      return 'Message sent';
    }
    throw new Error('Error sending message');
  } catch (err) {
    console.log(err);
  }
};

export { sendMessage };
