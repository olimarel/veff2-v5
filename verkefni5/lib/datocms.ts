import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';
const token = process.env.DATOCMS_API_TOKEN;

export const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const HOMEPAGE_QUERY = `
  {
    homepage {
      title: homepagetitle
      content: mainContent
    }
  }
`;