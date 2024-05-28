//mui

import { Stack, Box, Typography } from "@mui/material";

//--------------------------------------------------------

const FooterInfo = ()=> {
    return (
        <Stack sx={{alignItems: {xs: 'center', sm: 'center'}}}>
            <Box sx={{my: '1.2rem'}}>
                <Typography sx={{fontSize: '1rem', fontWeight: 700, color: 'white'}}>IdeaSwap</Typography>
            </Box>
            <Box>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Phone: 0999999999</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Email: ideaswapsp@gmail.com</Typography>
            <Typography sx={{fontSize: '0.8rem', color: 'white'}}>Address: Ha Noi, Viet Nam</Typography>
            </Box>
        </Stack>
    );
}

export default FooterInfo;