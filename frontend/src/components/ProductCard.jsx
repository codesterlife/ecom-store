import { React, useState, useEffect }  from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate} from 'react-router-dom'; 

function ProductCard({ product }) {

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user);
    console.log(localStorage.getItem(user))
  }, []);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate('/paymentdirect', { state: { product } });
  };

  return (
    <Card>
      <CardMedia component="img" height="250" image={product.image} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category} - <b>${product.price}</b>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' color='primary' onClick={() => addToCart(product)}>Add to Cart</Button>
        <Button size="small" variant='contained' color='success' onClick={() => handleBuyNow(product)} >
          Buy Now
        </Button> 
      </CardActions>
    </Card>
  );
}

export default ProductCard;
