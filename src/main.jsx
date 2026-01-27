import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes/router.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Lenis from 'lenis'
import { AuthProviderNew } from './AuthProvider/AuthProviderNew.jsx'
import { AnimatePresence } from 'framer-motion';
import AnimatedRoutes from './routes/AnimatedRoutes.jsx';

const queryClient = new QueryClient();


// const lenis = new Lenis();
// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProviderNew>
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      {/* <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter> */}
    </AuthProviderNew>
  </QueryClientProvider>
)
