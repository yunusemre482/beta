import React, { useCallback, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Box, Button } from '@mui/material';
import useBoundStore from '../../store';
import useDebounce from '../../hooks/useDebounce';

const Search = styled(Box)(({ theme }) => ({
	position: 'relative',
	border: '1px solid #dddddd',
	borderRadius: '20px',
	display: 'flex',
	justifyContent: 'center',
	overflow: 'hidden',
	padding: 0,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
		border: `1px solid ${theme.palette.primary.main}`,
	},
	width: 'clamp(20rem, 100%, 60rem)',
	margin: '0 auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	left: '0',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	// change color of search icon
	color: '#9e9e9e',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	marginLeft: '3rem',
}));

const SearchButton = styled(Button)(({ theme }) => ({
	color: 'white',
	height: '100%',
	padding: theme.spacing(1, 3, 1, 3),
	borderRadius: '0',
	marginLeft: 'auto',
}));

const SearchBar = () => {
	const [searchValue, setSearchValue] = React.useState('');
	const searchProducts = useBoundStore((state) => state.searchProducts);

	// make sure that the search value is debounced before calling the searchProducts action creator function to avoid unnecessary re-renders and API calls to the backend
	const debouncedSearchValue = useDebounce(searchValue, 500);

	const handleSearchValueChange = (event) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchValue(value);
	};

	const handleSearch = useCallback(() => {
		searchProducts({
			name: debouncedSearchValue || '',
		});
	}, [debouncedSearchValue, searchProducts]);

	useEffect(() => {
		return () => {
			setSearchValue('');
		};
	}, []);

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder='Searching for…'
				value={searchValue}
				onChange={handleSearchValueChange}
			/>
			<SearchButton variant='contained' color='primary' onClick={handleSearch}>
				Search
			</SearchButton>
		</Search>
	);
};

export default SearchBar;
