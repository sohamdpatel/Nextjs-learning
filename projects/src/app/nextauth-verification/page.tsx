import Link from "next/link";

export default function LandingPage() {
    return (
        <div className=" flex flex-col justify-center items-center min-h-screen text-black dark:text-white font-bold text-2xl gap-5">
            <h1>This is Next.js Authentication app</h1>
            <Link href={"/nextauth-verification/login"} className=" bg-blue-400 hover:bg-blue-600 rounded py-2 px-5">Click here for Login</Link>
            <Link href={"/nextauth-verification/signup"} className=" bg-blue-400 hover:bg-blue-600 rounded py-2 px-5">Click here for Sign up</Link>
        </div>
    )
}