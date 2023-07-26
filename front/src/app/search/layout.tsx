"use client";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


const SearchLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Container fixed>
            <Box sx={{ minHeight: '100vh' }}>
                {children}
            </Box>
        </Container>
    )
}

export default SearchLayout;