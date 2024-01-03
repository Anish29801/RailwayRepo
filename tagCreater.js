const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

// Replace these values with your own
const keyFilePath = 'keyfile.json';
const gtmContainerId = '173799065'; // Replace with your GTM container ID

async function createTag(orderid) {
  const auth = new JWT({
    keyFile: 'keyfile.json',
    scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers'],
  });

  const tagManager = google.tagmanager({
    version: 'v2',
    auth,
  });

  const tagBody = {
    name: `${orderid}`,
    type: "ua",
    parameter: [
      {
        key: "trackingId",
        type: "template",
        value: "UA-1234-5",
      }
    ]
  }

  try {
    const response = await tagManager.accounts.containers.workspaces.tags.create({
      path: `accounts/6210496641/containers/173799065/workspaces/2/tags`,
      parent: "accounts/6210496641/containers/173799065/workspaces/2",
      requestBody: tagBody,
    });

    console.log('Tag created:', response.data);
  } catch (error) {
    console.error('Error creating tag:', error.message);
  }
}

module.exports = createTag;
