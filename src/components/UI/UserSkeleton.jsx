import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center border-gray-400 border gap-3 h-[300px]'>
        <Skeleton circle className='w-[170px] aspect-square'/>
        <Skeleton className='w-10'/>
        <Skeleton className='w-14'/>
    </div>
  )
}

export default UserSkeleton