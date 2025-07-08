import wonders, { Wonder } from "../../data";
import Modal from "@/components/Modal";
export default async function InterceptedImageModal({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    // Here you can fetch the image data based on the id if needed
    const wonder: Wonder | undefined = wonders.find((wonder: Wonder) => wonder.id.toString() === id);

    if (!wonder) {
        return <div className="text-center text-red-500">Wonder not found</div>;
    }
    return (
        <Modal>
        <div className="flex flex-col gap-4 p-4 items-center justify-center rounded-2xl  bg-gray-100">
            <h1 className='font-bold text-4xl bg-amber-600 py-2 w-full text-center rounded-xl'>{wonder.name}</h1>
            <div className='flex flex-col items-center gap-4 bg-white shadow-lg rounded-lg p-4 mt-4'>
                <img src={wonder.image} alt={wonder.name} style={{ width: '600px', height: '400px' }} className='rounded-lg shadow-lg' />
                <p className='text-md text-gray-500'>Location: {wonder.location}</p>
                <p className='text-lg text-gray-700'>{wonder.description}</p>
            </div>
        </div>
        </Modal>
    );
}