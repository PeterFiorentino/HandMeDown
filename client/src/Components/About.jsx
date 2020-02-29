import React from 'react';
import { Link } from 'react-router-dom';


const About = () => {
    return (
        <div className='about'>
            <h1> About </h1>
            <p> HandMeDown is a social media engagement project to promote sustainability in the fashion industry and encourage the preservation of lineage through garment, thus incentivizing customers to buy more sustainable clothing so they can preserve them.</p>
            <p> Created by Hupaul Camacho, Johanne Enama, Peter Fiorentino, Douglas MacKrell</p><br/>

            <Link to='/Home'>
                <button className='submit-button'>Back to Home</button>
            </Link>
        </div>
    )
}

export default About;