// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import React, { useEffect, useState } from 'react';
import { supabase } from './services/supabase';

function App() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedData, error } = await supabase.from('nome_da_tabela').select('*');
      if (error) {
        console.error(error);
      } else {
        setData(fetchedData);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList data={data} />} />
        <Route path="/produtos/novo" element={<ProductForm />} />
        <Route path="/produtos/:id" element={<ProductDetails />} />
        <Route path="/produtos/:id/editar" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProductList />} />
//         <Route path="/produtos/novo" element={<ProductForm />} />
//         <Route path="/produtos/:id" element={<ProductDetails />} />
//         <Route path="/produtos/:id/editar" element={<ProductForm />} />
//       </Routes>
//     </Router>
//   );
// };
















