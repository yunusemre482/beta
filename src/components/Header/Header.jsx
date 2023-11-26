import React from 'react';
import SearchBar from './SearchBar';
import Logo from './Logo';
import { AppBar, Box, Toolbar } from '@mui/material';
import theme from '../../config/theme';

const Header = () => {
	return (
		<Box
			sx={{
				padding: ' 0.5rem 1rem',
				boxShadow: '0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)',
			}}
		>
			<AppBar
				position='static'
				sx={{
					backgroundColor: 'white',
					boxShadow: 'none',
				
				}}
			>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Logo />
					<SearchBar />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
