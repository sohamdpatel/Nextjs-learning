import Link from 'next/link';
import wonders from './data';

export default function PhotoFeed() {
  return (
    <div className='container mx-auto px-4 flex flex-col gap-2 items-center'>
      
      <div className='flex flex-wrap gap-5 justify-around'>
        {
            wonders.map((wonder) => (
              <Link href={`/routing-photo-feed/${wonder.id}`} key={wonder.id} className='bg-white shadow-lg rounded-lg p-4 gap-3.5 flex flex-col items-center hover:shadow-xl transition-shadow duration-300'>
                <img src={wonder.image} alt={wonder.name} style={{ width: '300px', height: '200px' }} />
                <h2 className=' text-[#202020] font-bold text-xl'>{wonder.name}</h2>
              </Link>
            ))
        }
      </div>
    </div>
  );
}