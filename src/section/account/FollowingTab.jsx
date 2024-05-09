//react
import { useState, useEffect } from 'react';
//react-router-dom
import { useNavigate, useParams } from 'react-router-dom';
//mui
import {
  Stack,
  Typography,
  Card,
  Box,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
//utils
import { fShortenNumber } from '../../utils/formatNumber';
//context
import { useFollow, useUser } from '../../hooks/context';
//----------------------------------------------------------

const FollowingTab = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    followState: { follows },
    handleGetAllFollows,
  } = useFollow();

  const {
    userState: { users },
    handleGetAllUsers,
  } = useUser();

  const { _id } = useParams();
  const [followArrays, setFollowArrays] = useState([]);

  useEffect(() => {
    handleGetAllFollows();
    handleGetAllUsers();
  }, [handleGetAllFollows, handleGetAllUsers]);

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    // Cập nhật trạng thái với giá trị mới từ input
    setSearchValue(event.target.value);
  };

  const followsWithUser = follows
    .map((follow) => {
      // Tìm user tương ứng với followerID từ mảng users
      const user = users.find((user) => user?._id === follow?.userID);
      // Trả về một đối tượng mới gồm thông tin từ follow và user
      return { ...follow, user };
    })
    .filter((follow) => {
      // Lọc ra những đối tượng có user không null và followerID trùng với _id của user
      return follow.user && follow.followerID === _id;
    });

  const handleNavigate = (userID) => {
    navigate(`/account/${userID}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (searchValue === '') {
      setFollowArrays(followsWithUser);
    } else {
      setFollowArrays(
        followsWithUser.filter((folow) =>
          folow.user.firstName.toLowerCase().includes(searchValue.toLowerCase())
        ) ||
          followsWithUser.filter((folow) =>
            folow.user.lastName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
      );
    }
  }, [followsWithUser, searchValue]);

  return (
    <Box>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: '0.5rem',
        }}
      >
        <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
          Following
        </Typography>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          value={searchValue}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <hr />
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {followArrays.length > 0 ? (
          followArrays &&
          followArrays.map((follow) => (
            <Card
              key={follow?._id}
              sx={{ p: '0.5rem', width: '21rem', m: '1rem', cursor: 'pointer' }}
              onClick={() => handleNavigate(follow?.userID)}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack sx={{ flexDirection: 'row', gap: '0.5rem' }}>
                  <img
                    src={follow?.user?.avatar}
                    alt={follow?.user?.firstName + follow?.user?.lastName}
                    style={{
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '0.4rem',
                    }}
                  />
                  <Stack sx={{ justifyContent: 'center' }}>
                    <Typography variant="subtitle1">
                      {follow?.user?.firstName + ' ' + follow?.user?.lastName}
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Typography variant="caption">
                        {fShortenNumber(followsWithUser.length)}
                      </Typography>
                      <PersonIcon fontSize="0.5rem" sx={{ color: 'gray' }} />
                    </Stack>
                  </Stack>
                </Stack>
                <MoreHorizIcon
                  sx={{ cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Follow</MenuItem>
                  <MenuItem onClick={handleClose}>About</MenuItem>
                </Menu>
              </Stack>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '3rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2">No users found</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default FollowingTab;
