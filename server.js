const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];

app.get('/products', (req, res) => {
  res.json({
    status: 'success',
    message: 'Berhasil mengambil daftar produk',
    data: products
  });
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

//  res.send('Selamat datang di API Produk! Silakan akses /products');

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'Produk tidak ditemukan'
    });
  }

  res.json({
    status: 'success',
    data: product
  });
});


app.post('/products', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      status: 'error',
      message: 'Nama dan harga produk harus diisi'
    });
  }

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price: Number(price)
  };

  products.push(newProduct);

  res.status(201).json({
    status: 'success',
    message: 'Produk berhasil ditambahkan',
    data: newProduct
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

