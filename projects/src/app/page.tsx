import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to Project section
      </h1>
      <div className="flex justify-around items-center gap-8">
        <Link
          href={"/routing-photo-feed"}
          className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          <img
            src="/routing-photo-feed.png"
            alt="Photo Feed"
            className="mx-auto rounded-lg shadow-lg w-96 mb-4"
          />
          <h2 className=" text-xl font-bold"> Routing Photo Feed </h2>
        </Link>
      </div>
    </div>
  );
}
