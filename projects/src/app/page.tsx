
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center dark:text-white my-8">
        Welcome to Project section
      </h1>
      <div className="flex flex-wrap justify-around items-center gap-8 mb-8">
        <Link
          href={"/routing-photo-feed"}
          className="flex flex-col items-center bg-white hover:bg-[#dedede] dark:bg-[#525252] text-black dark:text-white p-4 rounded-lg shadow-lg dark:hover:bg-[#3a3a3a] transition-colors"
        >
          <img
            src="/routing-photo-feed.png"
            alt="Photo Feed"
            className="mx-auto rounded-lg shadow-lg w-96 mb-4"
          />
          <h2 className=" text-xl font-bold"> Routing Photo Feed </h2>
        </Link>
        <Link
          href={"/authentication-clerk"}
          className="flex flex-col items-center bg-white hover:bg-[#dedede] dark:bg-[#525252] text-black dark:text-white p-4 rounded-lg shadow-lg dark:hover:bg-[#3a3a3a] transition-colors"
        >
          <img
            src="/authentication-clerk.png"
            alt="Photo Feed"
            className="mx-auto rounded-lg shadow-lg w-96 mb-4"
          />
          <h2 className=" text-xl font-bold"> Authentication clerk App</h2>
        </Link>
                <Link
          href={"/aceternity-music"}
          className="flex flex-col items-center bg-white hover:bg-[#dedede] dark:bg-[#525252] text-black dark:text-white p-4 rounded-lg shadow-lg dark:hover:bg-[#3a3a3a] transition-colors"
        >
          <img
            src="/aceternityui-music.png"
            alt="Photo Feed"
            className="mx-auto rounded-lg shadow-lg w-96 mb-4"
          />
          <h2 className=" text-xl font-bold">
            Aceternity Music Courses App
          </h2>
        </Link>
      </div>

    </div>
  );
}
