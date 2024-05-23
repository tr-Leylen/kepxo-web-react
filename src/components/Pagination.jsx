import React from 'react'
import ReactPaginate from 'react-paginate'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = ({ pageCount, activePage, setActivePage }) => {
    const onPageChange = (selectedPage) => {
        setActivePage(selectedPage.selected);
    };
    return (
        <ReactPaginate
            activeClassName='bg-main-color text-white'
            pageCount={pageCount}
            pageClassName='rounded border border-main-color w-10 h-10 [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center text-main-color'
            className='flex gap-5 my-10 mx-auto w-fit items-center'
            previousLabel={<GrFormPrevious className='text-2xl text-main-color' />}
            nextLabel={<GrFormNext className='text-2xl text-main-color' />}
            forcePage={activePage}
            onPageChange={onPageChange}
        />
    )
}

export default Pagination