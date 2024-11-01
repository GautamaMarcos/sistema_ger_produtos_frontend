// /src/components/ProductForm.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, getProduct } from '../services/Api';
import '../styles/ProductForm.css';

interface Product {
  id?: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade_em_estoque: number;
}

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({ nome: '', categoria: '', preco: 0, quantidade_em_estoque: 0 });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await getProduct(parseInt(id, 10));
        setProduct(productData);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateProduct(parseInt(id, 10), product);
    } else {
      await addProduct(product);
    }
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input type="text" name="nome" placeholder="Nome" onChange={handleChange} value={product.nome || ''} required />
      <input type="text" name="categoria" placeholder="Categoria" onChange={handleChange} value={product.categoria || ''} required />
      <input type="number" name="preco" placeholder="Preço" onChange={handleChange} value={product.preco} required />
      <input type="number" name="quantidade_em_estoque" placeholder="Quantidade em Estoque" onChange={handleChange} value={product.quantidade_em_estoque || 0} required />
      <div className="buttons-group">
      <button type="submit" className="save-button">Salvar</button>
      <button type="button" className="back-button" onClick={handleBack}>Voltar</button> 
      </div>
    </form>
  );
};

export default ProductForm;









// import React, { useState } from 'react';
// import { createProduct, updateProduct, Product } from '../services/Api';
// import '../styles/ProductForm.css';

// interface Props {
//     initialProduct?: Product;
//     onSubmit: () => void;
// }

// const ProductForm: React.FC<Props> = ({ initialProduct, onSubmit }) => {
//     const [product, setProduct] = useState<Product>(initialProduct || {
//         id: 0,
//         nome: '',
//         categoria: '',
//         preco: 0,
//         quantidade_em_estoque: 0,
//         data_criacao: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (product.id === 0) {
//             await createProduct(product);
//         } else {
//             await updateProduct(product.id, product);
//         }
//         onSubmit();
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Nome:</label>
//                 <input name="nome" value={product.nome} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Categoria:</label>
//                 <input name="categoria" value={product.categoria} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Preço:</label>
//                 <input name="preco" type="number" value={product.preco} onChange={handleChange} />
//             </div>
//             <div>
//                 <label>Quantidade em estoque:</label>
//                 <input name="quantidade_em_estoque" type="number" value={product.quantidade_em_estoque} onChange={handleChange} />
//             </div>
//             <button type="submit">Enviar</button>
//             </form>
//     );
// };

// export default ProductForm;