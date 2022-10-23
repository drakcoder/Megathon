import { Link } from 'react-router-dom';
function Home() {
    const myStyle={
        backgroundImage: "url('https://wallpaperaccess.com/full/5552439.jpg')",
        height:'125vh',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    return (
        <div style={myStyle}>
            <Link to='/movie'> <button className='btn btn-info'> click!</button></Link> 
        </div>
    );
}

export default Home;