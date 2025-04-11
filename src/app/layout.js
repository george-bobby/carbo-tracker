import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from 'next/script';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Carbo',
	description: 'Next-gen Carbon Tracking',
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<Head>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<body className={inter.className}>
					{/* Microsoft Clarity Tracking */}
					<Script id='microsoft-clarity' strategy='afterInteractive'>
						{`
							(function(c,l,a,r,i,t,y){
								c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
								t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
								y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
							})(window, document, "clarity", "script", "r2gvzbcrod");
						`}
					</Script>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
