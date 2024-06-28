import { Helmet } from 'react-helmet-async'; // or 'react-helmet-async'
import ReportView  from 'src/sections/report/view/view';


const ReportPage = () => 
    <>
        <Helmet>
            <title> Reports </title>
        </Helmet>

        <ReportView />
    </>


export default ReportPage
