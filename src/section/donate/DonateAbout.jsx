//mui
import { Box, Typography, Divider } from '@mui/material';
//-----------------------------------------------------

const DonateAbout = () => {
  return (
    <Box sx={{ my: '2rem' }}>
      <Box sx={{ bgcolor: 'primary.main', borderRadius: '0.4rem' }}>
        <Typography variant="subtitle1" sx={{ color: 'white', p: '0.5rem' }}>
          IdeaSwap About
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'inline-block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
              IdeaSwap Team Member
            </Typography>
          </Box>
          <Box sx={{ ml: '2rem' }}>
            <Typography variant="subtitle2">Nguyễn Quang Huy</Typography>
            <Typography variant="subtitle2">Phùng Văn Dũng</Typography>
            <Typography variant="subtitle2">Lê Hoàng Anh</Typography>
            <Typography variant="subtitle2">Lại Hùng Mạnh</Typography>
            <Typography variant="subtitle2">Nguyễn Thị Huyền Trang</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Box
            component={'img'}
            sx={{ width: '15rem', height: '10rem', borderRadius: '0.4rem' }}
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_No3tldugUVxpf57sks2nBE9LLekF35qHnr_ieL7w8WmgCMIseLWnWnPu5iPOAFJHttDhm882ZuTuG6T2gqZbcQ2rZI-UecmJiDEjr6dKc6g81wW4t2tXYasiPWa6ZSYQ8KoM1-ENThA/s1600/1_0vWKsATw_uUzjZioJU8DyQ.png"
          ></Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <Box>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '0.4rem',
              display: 'inline-block',
              my: '1rem',
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ color: 'white', p: '0.5rem' }}
            >
                IdeaSwap Ecosystem
            </Typography>
          </Box>
          <Box sx={{ ml: '2rem' }}>
            <Typography variant="body2">IdeaSwap AI</Typography>
            <Typography variant="body2">IdeaSwap Cloud</Typography>
            <Typography variant="body2">Socail Media IdeaSwap</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          <Box
            component={'img'}
            sx={{ width: '15rem', height: '10rem', borderRadius: '0.4rem' }}
            src="https://topviecit.vn/blog/wp-content/uploads/2021/11/thumb-5.jpg"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DonateAbout;
