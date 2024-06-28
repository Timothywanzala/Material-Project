import { Helmet } from 'react-helmet-async'; // or 'react-helmet-async'
import RegisterView  from 'src/sections/registration/view';


const RegisterPage = () => 
    <>
        <Helmet>
            <title> Registration Form </title>
        </Helmet>

        <RegisterView />
    </>


export default RegisterPage
