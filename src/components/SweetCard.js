import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SweetCard({ sweet }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (sweet.quantity === 0) {
      toast.error('Out of stock!');
      return;
    }

    dispatch(addToCart({
      id: sweet.id,
      name: sweet.name,
      price: sweet.price,
      image: sweet.image,
      quantity: quantity,
    }));

    toast.success(`${sweet.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {sweet.image && (
        <CardMedia
          component="img"
          height="200"
          image={sweet.image}
          alt={sweet.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {sweet.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {sweet.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Category: {sweet.category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            ₹{sweet.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color={sweet.quantity === 0 ? 'error' : 'success'}>
            {sweet.quantity === 0 ? 'Out of Stock' : `${sweet.quantity} in stock`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <Button
            size="small"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={sweet.quantity === 0}
          >
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button
            size="small"
            onClick={() => setQuantity(Math.min(sweet.quantity, quantity + 1))}
            disabled={sweet.quantity === 0}
          >
            +
          </Button>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={sweet.quantity === 0}
        >
          Purchase
        </Button>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}

export default SweetCard;
