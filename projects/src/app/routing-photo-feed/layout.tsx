export default function PhotoFeedLayout({
  children,
  modal
}: {   children: React.ReactNode, modal?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-center min-h-screen bg-gray-100">
        <h1 className=' font-bold text-4xl bg-amber-600 py-2 w-full text-center rounded-xl'>Photo Feed</h1>
      <p className=' font-bold text-4xl bg-blue-600 py-2 w-full text-center rounded-xl'>Explore the wonders of the world through stunning photographs.</p>
        <div className="container mx-auto px-4">
            {modal}
            {children}
        </div>
    </div>
  );
}