
import CoverImage from '@/Components/CoverImage';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen   bg-blue-100  sm:justify-center sm:pt-0">
            <CoverImage src='images/coverimage.svg' className="h-100vh object-cover hidden md:block w-4/6"></CoverImage>
            <div className='flex flex-col sm:justify-center items-center w-full md:w-2/6'>
                <div>
                    {/* <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link> */}
                </div>
                
                <div className=" w-full h-full p-20   bg-white px-6 shadow-md  sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
