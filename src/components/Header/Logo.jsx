import { Box } from '@mui/material';
import React from 'react';
import theme from '../../config/theme';

const Logo = () => {
	return (
		<Box
			component='img'
			sx={{
				// hide on mobile devices
				[theme.breakpoints.down('sm')]: {
					display: 'none',
				},
				width: theme.spacing(22),
				[theme.breakpoints.down('lg')]: {
					mr: 1,
				},
				[theme.breakpoints.down('md')]: {
					width: theme.spacing(17),
					mb: 2,
				},
			}}
			src='https://beta.limited/assets/images/logo-dark.png'
		/>
	);
};

export default Logo;
