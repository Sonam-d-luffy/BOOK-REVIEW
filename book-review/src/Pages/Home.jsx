import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { UserContext } from '../Context/UserContext'
import InfoCard from '../Components/InfoCard'

const Home = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    const addBooks = (id) => {
        navigate(`/${id}/addBooks`)
    }
    const review = (userId) => {
        navigate(`/${userId}/yourReviews`)
    }
    const books = (userId) => {
        navigate(`/${userId}/yourBooks`)
    }
    return (
        <div className="relative min-h-screen w-full">
            {/* Blurred background */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm -z-10"
                style={{ backgroundImage: `url(${assets.b3})` }}
            ></div>

            {/* Overlay content */}
            <div className="relative z-10 flex flex-col min-h-screen px-4 py-6">
                {/* Navbar scrolls with page */}
                <Navbar
                    title={'Library'}
                    buttonName={currentUser ? currentUser.name : 'Login'}
                    onButtonClick={() => navigate('/login')}
                    logo={assets.logo}
                />

                {/* Spacer to shift cards down */}
                <div className="mt-48"></div>

                {/* InfoCards container */}
                <div className="flex flex-wrap justify-center gap-6">
                    <InfoCard 
                        image={assets.b5} 
                        title={'Create Book'} 
                        description={'Describe your favourite books here'}  
                        onClick={() => addBooks(currentUser?._id)} 
                        buttonName={'Add Books'}  
                    />
                    <InfoCard 
                        image={assets.a5} 
                        title={'Explore Books'} 
                        description={'Explore your favourite books here'}  
                        onClick={() => navigate('/reviewBooks')} 
                        buttonName={'Explore'}  
                    />
                    <InfoCard 
                        image={assets.a2} 
                        title={'Your Ratings & Reviews'} 
                        description={'Edit and delete your ratings and reviews'}  
                        onClick={() => review(currentUser?._id)} 
                        buttonName={'Your Reviews'}  
                    />
                    <InfoCard 
                        image={assets.a3} 
                        title={'Your Books'} 
                        description={'Edit and delete books added by you'}  
                        onClick={() => books(currentUser?._id)} 
                        buttonName={'Your Books'}  
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
