import '../styles/globals.css';
import '../styles/globalsmain.css';
import { UserContext } from '../lib/context';

import { useUserData } from '../lib/hooks';
import Navmain from '../components/Navmain';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navmain />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
