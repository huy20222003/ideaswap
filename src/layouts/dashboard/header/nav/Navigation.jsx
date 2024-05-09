//mui
import { Box } from '@mui/material';
//SvgColor
import SvgColor from '../../../../Components/svg-color';
//component
import NavSection from '../../../../Components/nav-section';
//context
import { useAuth } from '../../../../hooks/context';
//------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const Navigation = () => {
  const { authState: { user } } = useAuth();

  const navConfig = [
    {
      path: '/dashboard/app',
      icon: icon('ic_home'),
    },
    {
      path: '/dashboard/course',
      icon: icon('ic_play-alt'),
    },
    { path: '/dashboard/document', icon: icon('ic_folder-download') },
    {
      // Sử dụng user?._id để kiểm tra nếu user tồn tại thì sử dụng _id của user, ngược lại sử dụng '/'
      path: user ? `/account/${user._id}` : '/',
      icon: icon('ic_portrait'),
    },
    {
      path: '/dashboard/donate',
      icon: icon('ic_hands-heart'),
    },
  ];

  return (
    <Box>
      <NavSection data={navConfig} />
    </Box>
  );
};

export default Navigation;
