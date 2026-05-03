import '../css/HomePage.css'
import Footer from './PublicCmp/Footer'

import myImage from '../img/203A1749AA-removebg-preview-3.png'
import davos from '../img/OP035348.webp'

import React from 'react';
import { Button } from 'primereact/button';

const HomePage = () => {
    return (
        <>
            <div className='container'>
                <div className='divJewel'>
                    <h2 className='jewel'>THE JEWEL</h2>
                </div>
                <div className='ofHouse'>
                    <h2 className='house'>of the house</h2>
                </div>
                <div className='myImage'><img src={myImage} alt='davos'></img></div>

                <div className="m-6 text-left">
                    <Button className='hover:text-0 text-white ' label="קח אותי לחנות  ←" link onClick={() => window.open("/ProdOnlyCategory")} style={{ borderRadius: "50px", textDecoration: 'none' }} />

                </div>
            </div>

            <div className=' flex flex-row  justify-content-center	 gap-8 mx-10 my-8 p-6'>
                <div className=' max-w-xl text-left max-w-30rem	flex align-items-center flex-column gap-5'>
                    <h2 className='text-2xl font-bold mb-4'>אנחנו כאן כדי להנעים לכם!</h2>
                    <p className='mb-4 text-lg leading-relaxed'>
                        הביאו את כוחו של הריח לחייכם עם מגוון המוצרים הריחניים הבלעדי שלנו. המוצרים שלנו מיוצרים בקפידה תוך שימוש במרכיבים המשובחים ביותר כדי להבטיח ריח יוקרתי ועמיד לאורך זמן.
                    </p>
                    <p className='text-lg leading-relaxed'>
                        אנו מציעים מבחר נרחב של פריטים ריחניים. הריחות הייחודיים שלנו ימלאו את ביתכם בניחוח מענג ויביאו תחושה של רוגע ונוחות. בין אם אתם מחפשים ליצור אווירה לבית, למשרד או לאירוע מיוחד – יש לנו את כל מה שאתם צריכים!
                    </p>
                </div>

                <div className='col ' style={{ height: "60vh", maxWidth: "40vw" }}>
                    <div className=' h-full  overflow-hidden' ><img src={davos} alt='davos'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }} className="bg-cover w-12 h-full w-full h-full object-cover"></img></div>
                </div>
                {/* <div class="overflow-hidden">
                    <div class="bg-cover w-full h-30rem w-30rem" ><img src={davos} alt='davos' ></img></div>
                </div> */}
            </div>
            <Footer />
        </>
    )
}
export default HomePage

