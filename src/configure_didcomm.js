import { getAgent } from './core/remote_node.js';
import { createMediatorConnection } from './didcomm/create_mediatior_connection.js';
import { ensureMediationGranted } from './didcomm/ensure_mediation_granted.js';
import { sendMessage } from './didcomm/send_message.js';
import { receivedMessages } from './didcomm/receive_message.js';
import {
  REMOTE_NODE_BASE_URL,
  REMOTE_NODE_API_KEY,
  RECIPIENT_DID,
  MEDIATOR_DID,
  RECEIVER_DID,
} from './core/config.js';

const agent = await getAgent(REMOTE_NODE_BASE_URL, REMOTE_NODE_API_KEY);

// await createMediatorConnection(RECIPIENT_DID, MEDIATOR_DID, agent);
// await ensureMediationGranted(RECIPIENT_DID, MEDIATOR_DID, agent);
// await sendMessage('Hello world!', RECIPIENT_DID, RECEIVER_DID, agent);
// await receivedMessages(RECEIVER_DID, MEDIATOR_DID, agent);
