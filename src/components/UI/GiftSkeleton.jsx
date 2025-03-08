import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const GiftSkeleton = () => {
    return (
        <div className='h-[300px] border border-gray-500'>
            <Skeleton className='h-[200px]' />
            <div className='flex flex-col gap-3 px-2'>
                <div className='flex items-center justify-between'>
                    <Skeleton className='w-20' />
                    <div className='flex gap-2'>
                        <Skeleton className='w-5 aspect-square' />
                        <Skeleton className='w-5 aspect-square' />
                    </div>
                </div>
                <Skeleton className='w-20'/>
                <Skeleton className='w-32'/>
            </div>
        </div>
    )
}

export default GiftSkeleton