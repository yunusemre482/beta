import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/Products/ProductList';
import useBoundStore from './store';
import { Container } from '@mui/material';

function App() {
  const { createSession, isAuthenticated, viewCart } = useBoundStore(state => state);

  const handleStart = async () => {
    await createSession();
    await viewCart();
  }


  useEffect(() => {
    if (!isAuthenticated) {
      handleStart();
    }
  }, [isAuthenticated]);


  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
