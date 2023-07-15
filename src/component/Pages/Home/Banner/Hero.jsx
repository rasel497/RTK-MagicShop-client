import React from 'react';

const Hero = () => {
    return (
        <div className='mt-10 mb-10 mx-10'>
            <div className="carousel w-full h-72">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://i.ibb.co/x5NRhKt/main-slider14.jpg" className="w-full rounded-md" alt='loading..' />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://i.ibb.co/wc9rwDf/main-slider12.jpg" className="w-full rounded-md" alt='loading..' />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://i.ibb.co/x5NRhKt/main-slider14.jpg" className="w-full rounded-md" alt='loading..' />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>
    );
};

export default Hero;