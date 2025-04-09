import dotenv from 'dotenv';
dotenv.config();

const {
  REMOTE_NODE_BASE_URL,
  REMOTE_NODE_API_KEY,
  RECIPIENT_DID,
  MEDIATOR_DID,
  RECEIVER_DID,
} = process.env;

export {
  REMOTE_NODE_BASE_URL,
  REMOTE_NODE_API_KEY,
  RECIPIENT_DID,
  MEDIATOR_DID,
  RECEIVER_DID,
};
