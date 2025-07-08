import wonders, { Wonder } from "../data";
import Link from "next/link";

export default async function ImageMainPage(params: { params: Promise<{ id: string }> }) {

    const { id } = await params.params;
    const wonder: Wonder | undefined = wonders.find((wonder: Wonder) => wonder.id.toString() === id);

    if (!wonder) {
        return <div>Wonder not found</div>;
    }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className='font-bold text-4xl bg-amber-600 py-2 w-full text-center rounded-xl'>{wonder.name}</h1>
        <div className='flex flex-col items-center gap-4 bg-white shadow-lg rounded-lg p-4 mt-4'>
            <img src={wonder.image} alt={wonder.name} style={{ width: '600px', height: '400px' }} className='rounded-lg shadow-lg' />
            <p className='text-lg text-gray-700'>{wonder.description}</p>
            <p className='text-md text-gray-500'>Location: {wonder.location}</p>
            <Link href="/routing-photo-feed" className='text-blue-500 hover:underline'>Back to Photo Feed</Link>
        </div>
        <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-center'>More Information</h2>
            <p className='text-md text-gray-600'>This is a detailed page about {wonder.name}. It includes information about its history, significance, and other interesting facts.</p>
        </div>
    </div>
  );
}