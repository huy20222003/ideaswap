//mui

import { Stack, Box, Typography } from "@mui/material";

//--------------------------------------------------------

const FooterEco = ()=> {
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>IdeaSwap Ecosystem</Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Social media IdeaSwap</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>IdeaSwap AI</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>IdeaSwap Cloud</Typography>
            </Box>
        </Stack>
    );
}

export default FooterEco;