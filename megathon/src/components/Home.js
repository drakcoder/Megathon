import { Link, Navigate ,useHistory, useNavigate} from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import React from 'react';
import {useEffect} from 'react';

function Home() {
    const myStyle={
        backgroundImage: "url('https://wallpaperaccess.com/full/5552439.jpg')",
        height:'125vh',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    const Navigate = useNavigate();
    useEffect(() => {
        alanBtn({
            key: '5ceaf8fe35fd40b06c993ec658bc8c6d2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                Navigate("./map?type?=" + commandData.command);
            }
        });
      }, []);
    return (
        <div style={myStyle}>
            <Link to='/movie'> <button className='btn btn-info'> click!</button></Link> 
        </div>
    );
}


export default Home;