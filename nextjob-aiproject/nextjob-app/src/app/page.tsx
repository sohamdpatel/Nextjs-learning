import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to NextJob</h1>
      <p className="mt-4 text-lg text-gray-700">Find your next opportunity!</p>
      <Link
        href={"/login"}
        className=" bg-blue-400 hover:bg-blue-600 px-6 py-2  rounded-2xl mt-8 text-white"
      >
        Login here
      </Link>
      <div className="mt-1">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </div>
    </main>
  );
}
