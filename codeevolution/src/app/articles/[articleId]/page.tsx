// "use Client"
import Link from 'next/link';
import React from 'react'
// import { use } from 'react' // when we need to handle promise in client folder that time we can use "use".

async function page({
    params, searchParams
}: {
    params: Promise<{articleId: string}>,
    searchParams: Promise<{lang?: "en"| "es" | "fr"}>
}) {

    // with Server components
    const {articleId} = await params;
    const {lang = "en"} = await searchParams;

    // with Client components
    // const {articleId} = use(params);
    // const {lang = "en"} = use(searchParams);
  return (
    <div>
      <div>
        <h1>You are reading Article {articleId} in {lang} language</h1>

        <div>
            <Link href={`/articles/${articleId}?lang=en`}>English</Link>
            <Link href={`/articles/${articleId}?lang=es`}>Spanish</Link>
            <Link href={`/articles/${articleId}?lang=fr`}>Franch</Link>
        </div>
      </div>
    </div>
  )
}

export default page;
