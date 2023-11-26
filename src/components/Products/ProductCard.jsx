import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Chip, Grid, Rating } from '@mui/material';
import theme from '../../config/theme';
import ProductCardActionsButtons from './ProductCardActionButtons';
import { formatPrice } from '../../utils/productHelper';

const ProductContainer = styled(Grid)({
	position: 'relative',
	flexDirection: 'row',
	width: '18rem',
	overflow: 'hidden',
	borderRadius: '8px',
	margin: '0 auto',
	boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
});

const ImageContainer = styled(Grid)(({ theme }) => ({
	backgroundColor: theme.palette.grey[200],
	img: {
		display: 'block',
		objectFit: 'contain',
		pointerEvents: 'none',
	},
}));

const DetailsWrapper = styled(Grid)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	padding: '16px',
	flex: 1,
	alignItems: 'flex-end',
	minHeight: '124px',
}));

const ProductCard = ({ id, image, name, price, discount, originalPrice, rating }) => {
	return (
		<Grid
			item
			xs={4}
			sm={4}
			md={4}
			sx={{
				placeItems: 'center',
				justifyContent: 'center',
				marginTop: '1rem',
			}}
		>
			<ProductContainer>
				{discount && (
					<Chip
						sx={{
							position: 'absolute',
							top: '10px',
							left: '10px',
						}}
						color='primary'
						label={discount}
					/>
				)}
				<ImageContainer>
					<img src={image} width={290} height={300} alt={name} />
				</ImageContainer>

				<DetailsWrapper container>
					<Grid container item gap={1} flex={1}>
						<Typography fontWeight={600} variant='body2'>
							{name}
						</Typography>
						<Grid container gap={1} alignItems={'center'}>
							<Rating name='read-only' max={5} value={rating} readOnly size='small' />
							<Typography
								sx={(theme) => ({ color: theme.palette.grey[700] })}
								variant='body2'
							>
								{`(${rating})`}
							</Typography>
						</Grid>
						<Box>
							<Typography
								component={'span'}
								color={'primary.main'}
								fontWeight={600}
								variant='body2'
								marginRight={1}
							>
								{formatPrice(price)}
							</Typography>
							<Typography
								component={'span'}
								variant='body2'
								color={theme.palette.grey[700]}
								sx={(theme) => ({
									color: theme.palette.grey[700],
									textDecoration: 'line-through',
								})}
							>
								{formatPrice(originalPrice)}
							</Typography>
						</Box>
					</Grid>
					<ProductCardActionsButtons id={id} />
				</DetailsWrapper>
			</ProductContainer>
		</Grid>
	);
};

export default ProductCard;
