// lib/datocms.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';
const token = process.env.DATOCMS_API_TOKEN; // Store your token in an environment variable

export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Example query for homepage content:
export const HOMEPAGE_QUERY = `
  {
    homepage {
      title: homepagetitle
      content: mainContent
    }
  }
`;