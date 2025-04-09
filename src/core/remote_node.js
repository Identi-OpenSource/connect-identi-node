import { createAgent } from '@veramo/core';
import { AgentRestClient } from '@veramo/remote-client';

export async function getAgent(remoteNodeBaseUrl, remoteNodeApiKey) {
  const response = await fetch(`${remoteNodeBaseUrl}/open-api.json`);
  const schema = await response.json();
  const agent = createAgent({
    plugins: [
      new AgentRestClient({
        url: `${remoteNodeBaseUrl}/agent`,
        headers: {
          Authorization: `Bearer ${remoteNodeApiKey}`,
        },
        enabledMethods: Object.keys(schema['x-methods']),
        schema,
      }),
    ],
  });

  return agent;
}
