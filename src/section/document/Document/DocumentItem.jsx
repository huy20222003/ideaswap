//mui
import { Box, Typography, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//propTypes
import PropTypes from 'prop-types';
//context
import { useDocument } from '../../../hooks/context';
//----------------------------------------------------------------

const DocumentItem = ({ document }) => {
  const { _id, title, imageUrl, user, countDownload, fileUrl } = document;
  const { handleUpdateCountDownloadDocument } = useDocument();
  const shortenedTitle =
    title.length > 70 ? title.substring(0, 70) + '...' : title;

  const handleUpdateCountDownload = async () => {
    await handleUpdateCountDownloadDocument(_id, {
      countDownload: countDownload + 1,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#EEEEEE',
        borderRadius: '0.4rem',
        p: '0.5rem',
        my: '0.5rem',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          component={'img'}
          src={imageUrl}
          sx={{
            width: '5rem',
            height: '5rem',
            borderRadius: '0.4rem',
            mx: '1rem',
            objectFit: 'cover',
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Typography variant="body1">{shortenedTitle}</Typography>
          <Typography variant="body2">
            {' '}
            Author: {user?.firstName + ' ' + user?.lastName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            p: '0.5rem',
          }}
        >
          <Button
            sx={{ bgcolor: 'primary.main', color: 'white', mb: '0.5rem' }}
            variant="contained"
            size="small"
            startIcon={<FileDownloadIcon sx={{ color: 'white' }} />}
            href={fileUrl}
            target="_blank"
            onClick={handleUpdateCountDownload}
          >
            Download
          </Button>
          <Typography variant="body2">
            {countDownload}
            {countDownload > 1 ? ' downloads' : ' download'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    countDownload: PropTypes.number.isRequired,
    countVote: PropTypes.number.isRequired,
    fileUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

export default DocumentItem;
