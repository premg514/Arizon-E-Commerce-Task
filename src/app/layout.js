import './globals.css';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

export const metadata = {
  title: 'My Store',
  description: 'FakeStoreAPI Product App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* Toast Container added globally */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Header />
          <main className="p-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
