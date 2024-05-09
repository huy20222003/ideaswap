//react
import { useEffect } from 'react';
//mui
import { Box, Typography } from '@mui/material';
//component
import VideoHotItem from './VideoHotItem';
//context
import { useVideo, useCensorships } from '../../../hooks/context';
//---------------------------------------

const VideoHot = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllCensorships, handleGetAllVideo]);

  const { censorships } = censorshipsState;
  const videosWithStatus = videos
    .map((video) => {
      const censorshipItem = censorships.find(
        (item) => item?.contentID === video?._id
      );
      const status = censorshipItem ? censorshipItem.status : 'approved';
      return {
        ...video,
        status,
      };
    })
    .filter((video) => video.status === 'approved')
    .sort((a, b) => b.view - a.view)
    .slice(0, 5);

  return (
    <Box sx={{ mt: '5rem' }}>
      <Box>
        <Typography variant="subtitle1">Top video</Typography>
      </Box>
      <Box>
        {videosWithStatus.length > 0 ? (
          videosWithStatus.map((video) => (
            <VideoHotItem key={video.id} video={video} />
          ))
        ) : (
          <Typography>No video reached the top</Typography>
        )}
      </Box>
    </Box>
  );
};

export default VideoHot;
