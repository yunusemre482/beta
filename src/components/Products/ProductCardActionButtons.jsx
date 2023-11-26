import { Add, Remove } from '@mui/icons-material';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import useBoundStore from '../../store';
import { useMemo } from 'react';

const ButtonStyled = styled(Button)(({ theme }) => ({
	minWidth: 30,
	minHeight: 30,
	height: 30,
	width: 30,
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: '6px',
}));

const ProductCardActionsButtons = ({ id }) => {
	const { getProductQuantity, cart, addToCart, removeFromCart } = useBoundStore((state) => state);

	const quantity = useMemo(() => {
		return getProductQuantity(id);
	}, [id, cart]);

	const isRemoveActionEnabled = Boolean(quantity && quantity > 0);
	console.log('quantity', quantity, isRemoveActionEnabled);

	const handleRemoveFromCart = () => {
		removeFromCart(id);
	};

	const handleAddToCart = () => {
		addToCart(id);
	};

	return (
		<Box>
			<Grid
				container
				flexDirection={'column'}
				justifyContent={'flex-end'}
				alignItems={'center'}
				height={'100%'}
				gap={0.5}
			>
				{isRemoveActionEnabled && (
					<>
						<ButtonStyled
							color='primary'
							onClick={handleRemoveFromCart}
							aria-label='Decrement Quantity'
						>
							<Remove fontSize='small' />
						</ButtonStyled>
						<Typography fontWeight={500}>{quantity}</Typography>
					</>
				)}
				<ButtonStyled
					color='primary'
					onClick={handleAddToCart}
					aria-label='Increment Quantity'
				>
					<Add fontSize='small' />
				</ButtonStyled>
			</Grid>
		</Box>
	);
};

export default ProductCardActionsButtons;
