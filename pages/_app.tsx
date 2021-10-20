import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from 'next/dist/client/router';
import DialogProvider from '../context/DialogContext';
import AuthProvider from '../context/AuthContext';

const progress = new ProgressBar({
  size:4,
  color:'#FF585D',
  className:'z-50',
  delay:100
});

Router.events.on('routeChangeStart',progress.start)
Router.events.on('routeChangeComplete',progress.finish)
Router.events.on('routeChangeError',progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
  <DialogProvider>
    <Component {...pageProps} />
  </DialogProvider>
  </AuthProvider>
  )
    
}
export default MyApp
