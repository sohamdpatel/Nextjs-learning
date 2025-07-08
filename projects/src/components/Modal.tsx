'use client'

import { useRouter } from "next/navigation";

export default function Modal({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const closeModal = () => {
        // Logic to close the modal
        router.back(); // Navigate back to the previous page
        console.log("Modal closed");

    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000066] bg-opacity-50 z-50">
            <button className=" fixed left-4 top-4 font-bold text-2xl " onClick={() => closeModal()}>X</button>
                {children}
        </div>
    )
        
} 