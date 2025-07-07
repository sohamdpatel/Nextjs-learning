import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1> Hello Everyone Soham Patel Here</h1>
      <div>
        <Link href={`/articles/b-1234?lang=en`}>English</Link>
        <Link href={`/articles/b-1234?lang=es`}>Spanish</Link>
        <Link href={`/articles/b-1234?lang=fr`}>Franch</Link>
      </div>
    </div>
  );
}
