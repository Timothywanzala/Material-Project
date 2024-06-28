import { Helmet } from 'react-helmet-async'; // or 'react-helmet-async'
import NotificationView  from 'src/sections/notification/view/view';


const NotificationPage = () => 
    <>
        <Helmet>
            <title> Notifications </title>
        </Helmet>

        <NotificationView />
    </>


export default NotificationPage
