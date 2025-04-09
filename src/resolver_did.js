import { getAgent } from './core/remote_node.js';
import {
  REMOTE_NODE_BASE_URL,
  REMOTE_NODE_API_KEY,
  RECIPIENT_DID,
} from './core/config.js';

const resolverDID = async () => {
  try {
    const agent = await getAgent(REMOTE_NODE_BASE_URL, REMOTE_NODE_API_KEY);

    const did = await agent.resolveDid({
      didUrl: RECIPIENT_DID,
    });

    console.log('didDoc', JSON.stringify(did, null, 2));
  } catch (err) {
    console.log(err);
  }
};

resolverDID();
