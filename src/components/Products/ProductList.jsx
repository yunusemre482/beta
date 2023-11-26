import React from 'react';
import ProductCard from './ProductCard';
import useBoundStore from '../../store';
import { Box, Container, Grid } from '@mui/material';
import Loader from '../Loader';

const ProductList = () => {
	const { loading, products, getProducts } = useBoundStore((state) => state);

	const handleGetProducts = () => {
		getProducts();
	};

	console.log(products);

	React.useEffect(() => {
		handleGetProducts();
	}, []);

	return (
		<Container
			maxWidth='lg'
			sx={{
				marginTop: '2rem',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				gap: 1,
			}}
		>
			{/* {loading && <Loader />} */}
			{products && products.length > 0 ? (
				<Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
					{products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</Grid>
			) : (
				<Box>
					<h1>No Products</h1>
				</Box>
			)}
		</Container>
	);
};

export default ProductList;
