// app/page.tsx
import { client, HOMEPAGE_QUERY } from '@/lib/datocms';
import { HomepageResponse } from '@/lib/types';

export default async function HomePage() {
  const data = await client.request<HomepageResponse>(HOMEPAGE_QUERY);
  const homepage = data.homepage;
  
  return (
    <main>
      <h1>{homepage.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: homepage.content }} />
    </main>
  );
}
