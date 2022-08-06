import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='App'>
      <Header />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
