import Link from 'next/link';
import { GraphQLClient, gql } from 'graphql-request';
import { JSX } from 'react';

const client = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  },
});

export default async function NewsListPage(): Promise<JSX.Element> {
  const query = gql`
    {
      allArticles {
        slug
        title: articletitle
      }
    }
  `;
  
  const data = await client.request<{ allArticles: { slug: string; title: string }[] }>(query);
  const articles = data.allArticles;
  
  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.slug}>
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
