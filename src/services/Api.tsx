// /src/services/Api.tsx

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Substitua pela URL da sua API
});


export const getProducts = async (params?: { nome?: string; categoria?: string; page?: number; page_size?: number }) => {
  const response = await api.get('produtos/', { params });
  return response.data;
};

export const getProduct = async (id: number) => {
  const response = await api.get(`produtos/${id}/`);
  return response.data;
};

export const addProduct = async (data: { nome: string; categoria: string; preco: number; quantidade_em_estoque: number }) => {
  const response = await api.post('produtos/', data);
  console.log(response)
  return response.data;
};

export const updateProduct = async (id: number, data: { nome: string; categoria: string; preco: number; quantidade_em_estoque: number }) => {
  const response = await api.put(`produtos/${id}/`, data);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`produtos/${id}/`);
  return response.data;
};




// import axios from 'axios';

// const addProduct = async (product: { title: string; description: string }) => {
//   try {
//     const response = await axios.post('http://localhost:8000/api/produtos/', product);
//     console.log('Produto adicionado com sucesso:', response.data);
//   } catch (error) {
//     console.error('Erro ao adicionar produto:', error);
//   }
// };

// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();
//   const product = {
//     title: 'Novo Produto',
//     description: 'Descrição do novo produto',
//   };
//   await addProduct(product);

// };

// export default addProduct