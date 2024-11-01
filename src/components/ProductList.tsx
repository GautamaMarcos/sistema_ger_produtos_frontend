// /src/components/ProductList.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts } from '../services/Api';
import '../styles/ProductList.css';

interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade_em_estoque: number;
  data_criacao: string;
}

interface ProductListProps {
  data: Product[] | null;
}
const ProductList: React.FC<ProductListProps> = ({ data }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    }
  }, [data]);

  const fetchProducts = async (page: number) => {
    try {
      const fetchedProducts = await getProducts({ page, page_size: productsPerPage });
      console.log('Fetched products:', fetchedProducts);

      if (Array.isArray(fetchedProducts.results)) {
        setProducts(fetchedProducts.results);
        setFilteredProducts(fetchedProducts.results);
        setNextPage(fetchedProducts.next);
        setPrevPage(fetchedProducts.previous);
        setTotalProducts(fetchedProducts.count);
      } else {
        console.error("A resposta não contém um array de produtos:", fetchedProducts);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
    setFilteredProducts(filteredProducts.filter(product => product.id !== id));
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (prevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchProducts(pageNumber);
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list">
      <h1>Lista de Produtos</h1>
      <div className="search-bar">
        <input className='search-input'
          type="text"
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className='search-button'>Buscar</button>
      </div>
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product.id} className="product-item">
              <Link to={`/produtos/${product.id}`}>{product.nome}</Link>
              <button onClick={() => navigate(`/produtos/${product.id}/editar`)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(product.id)} className="delete-button">Excluir</button>
            </li>
          ))
        ) : (
          <p>Não há produtos disponíveis.</p>
        )}
      </ul>
      <Link to="/produtos/novo" className="add-product-button">Adicionar Produto</Link>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={!prevPage} className="page-button"> Anterior</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}> {index + 1}</button>
        ))}
        <button onClick={handleNextPage} disabled={!nextPage} className="page-button">Próxima</button>
      </div>
    </div>
  );
};

export default ProductList;




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { deleteProduct, getProducts } from '../services/Api';
// import '../styles/ProductList.css';

// interface Product {
//   id: number;
//   nome: string;
//   categoria: string;
//   preco: number;
//   quantidade_em_estoque: number;
//   data_criacao: string;
// }

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [nextPage, setNextPage] = useState<string | null>(null);
//   const [prevPage, setPrevPage] = useState<string | null>(null);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const productsPerPage = 10;
//   const navigate = useNavigate();

//   const fetchProducts = async (page: number) => {
//     try {
//       const fetchedProducts = await getProducts({ page, page_size: productsPerPage });
//       console.log('Fetched products:', fetchedProducts);

//       if (Array.isArray(fetchedProducts.results)) {
//         setProducts(fetchedProducts.results);
//         setFilteredProducts(fetchedProducts.results);
//         setNextPage(fetchedProducts.next);
//         setPrevPage(fetchedProducts.previous);
//         setTotalProducts(fetchedProducts.count);
//       } else {
//         console.error("A resposta não contém um array de produtos:", fetchedProducts);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar produtos:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   const handleDelete = async (id: number) => {
//     await deleteProduct(id);
//     setProducts(products.filter(product => product.id !== id));
//     setFilteredProducts(filteredProducts.filter(product => product.id !== id));
//   };

//   const handleNextPage = () => {
//     if (nextPage) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (prevPage) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   const paginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     fetchProducts(pageNumber);
//   };

//   const handleSearch = () => {
//     const filtered = products.filter(product =>
//       product.nome.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="product-list">
//       <h1>Lista de Produtos</h1>
//       <div className="search-bar">
//         <input className='search-input'
//           type="text"
//           placeholder="Buscar por nome"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch} className='search-button'>Buscar</button>
//       </div>
//       <ul>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map(product => (
//             <li key={product.id} className="product-item">
//               <Link to={`/produtos/${product.id}`}>{product.nome}</Link>
//               <button onClick={() => navigate(`/produtos/${product.id}/editar`)} className="edit-button">Editar</button>
//               <button onClick={() => handleDelete(product.id)} className="delete-button">Excluir</button>
//             </li>
//           ))
//         ) : (
//           <p>Não há produtos disponíveis.</p>
//         )}
//       </ul>
//       <Link to="/produtos/novo" className="add-product-button">Adicionar Produto</Link>
//       <div className="pagination">
//         <button onClick={handlePrevious} disabled={!prevPage} className="page-button"> Anterior</button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}> {index + 1}</button>
//         ))}
//         <button onClick={handleNextPage} disabled={!nextPage} className="page-button">Próxima</button>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


