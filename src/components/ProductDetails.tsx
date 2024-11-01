// /src/components/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteProduct, getProduct } from '../services/Api';
import '../styles/ProductDetails.css';

interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade_em_estoque: number;
  data_criacao: string;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productData = await getProduct(parseInt(id, 10));
        setProduct(productData);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (product) {
      await deleteProduct(product.id);
      navigate('/');
    }
  };

  return (
    <div className="product-details">
      <h1>Detalhes do Produto</h1>
      {product ? (
        <div>
          <p>Nome: {product.nome}</p>
          <p>Categoria: {product.categoria}</p>
          <p>Preço: {product.preco}</p>
          <p>Quantidade em Estoque: {product.quantidade_em_estoque}</p>
          <p>Data de Criação: {product.data_criacao}</p>
          <button onClick={handleDelete} className="delete-button">Excluir</button>
          <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
        </div>
      ) : (
        <p>Produto não encontrado</p>
      )}
    </div>
  );
};

export default ProductDetails;