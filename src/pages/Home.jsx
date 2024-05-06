import React from 'react'
import homeImage from '../assets/home.png'

const Home = () => {
    return (
        <div className='flex h-screen w-full items-center justify-center'>
            <div className='flex flex-col gap-10 p-10 items-center'>
                <img src={homeImage} alt="logo" className='block w-[300px] h-[300px] object-cover' />
                <p className='text-main-color text-center'>
                    Türkiye genelinde aylık konferanslar ile küresel şirket çalışanları ve kişisel gelişim uzmanlarından eğitimler olarak kendinizi geliştirebilirsiniz ve puan tablonuza puanlar ekleyebilirsiniz
                </p>
            </div>
        </div>
    )
}

export default Home