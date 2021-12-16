import React from 'react';
import NavBar from './NavBar';

const HomeLayout = () => {
    return (
        <React.Fragment>
            <div className='navWrapper'>
                <NavBar />
                <main></main>
            </div>

        </React.Fragment>
    );
};
export default HomeLayout;