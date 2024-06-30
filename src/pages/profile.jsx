import { Helmet } from 'react-helmet-async'; // or 'react-helmet-async'
import ProfileView  from 'src/sections/profile/view';


const ProfilePage = () => 
    <>
        <Helmet>
            <title> Profile </title>
        </Helmet>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <ProfileView />
        </div>
    </>
export default ProfilePage
