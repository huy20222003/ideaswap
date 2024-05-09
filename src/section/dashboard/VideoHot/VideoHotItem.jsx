//react-router-dom
import { useNavigate } from 'react-router-dom';
//mui
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
//propType
import PropTypes from 'prop-types';
//utils
import {fShortenNumber} from '../../../utils/formatNumber';
//----------------------------------------------------

const VideoHotItem = (props) => {
  const { _id, imageUrl, title, view, courseID } = props.video;
  const navigate = useNavigate();

  const truncatedTitle =
    title && title.length > 25 ? `${title.slice(0, 25)}...` : title;

  const handleNavigate = ()=> {
    navigate(`/course/${courseID}?videoId=${_id}`);
  }

  return (
    <Card
      sx={{
        my: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        p: '0.25rem'
      }}
      onClick={handleNavigate}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        sx={{
          width: '5rem',
          height: '5rem',
          borderRadius: '0.4rem',
          objectFit: 'contain',
        }}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {truncatedTitle}
        </Typography>
        <Box sx={{ display: 'flex', my: '0.2rem', alignItems: 'center' }}>
          <VisibilityIcon sx={{ width: '1rem', mr: '0.5rem' }} />
          <Typography variant="body2" color="text.secondary">
            {fShortenNumber(view)} views
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

VideoHotItem.propTypes = {
  video: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    courseID: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoHotItem;
