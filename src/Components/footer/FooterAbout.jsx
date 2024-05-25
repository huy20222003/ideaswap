//mui

import { Stack, Box, Typography } from "@mui/material";

//--------------------------------------------------------

const FooterAbout = ()=> {
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>About IdeaSwap </Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Introduction</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Contact</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Contributors</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Rules</Typography>
            </Box>
        </Stack>
    );
}

export default FooterAbout;