import { Helmet } from 'react-helmet-async';

import EventView from 'src/sections/register/register-view';

// ----------------------------------------------------------------------

export default function RegisterEventPage() {
  return (
    <>
      <Helmet>
        <title> Register Event </title>
      </Helmet>

      <EventView />
    </>
  );
}