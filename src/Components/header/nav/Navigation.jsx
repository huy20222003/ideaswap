//mui
import { Box } from '@mui/material';
//SvgColor
import SvgColor from '../../svg-color';
//component
import NavSection from '../../nav-section';
//context
import { useAuth } from '../../../hooks/context';
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
      title: 'Dashboard'
    },
    {
      path: '/dashboard/course',
      icon: icon('ic_play-alt'),
      title: 'Courses'
    },
    { path: '/dashboard/document', icon: icon('ic_folder-download'), title: 'Documents' },
    {
      path: user ? `/account/${user._id}` : '/',
      icon: icon('ic_portrait'),
      title: 'Account'
    },
    {
      path: '/dashboard/donate',
      icon: icon('ic_hands-heart'),
      title: 'Donate'
    },
  ];

  return (
    <Box>
      <NavSection data={navConfig} />
    </Box>
  );
};

export default Navigation;