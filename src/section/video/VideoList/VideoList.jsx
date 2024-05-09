//react
import { useEffect, useState } from 'react';

//mui
import { Box, Typography } from '@mui/material';
//component
import VideoListItem from './VideoListItem';
//context
import { useVideo, useCensorships } from '../../../hooks/context';
//---------------------------------------

const VideoList = () => {
  const {
    videoState: { videos },
    handleGetAllVideo,
  } = useVideo();
  const [courseId, setCourseId] = useState('');
  const { censorshipsState, handleGetAllCensorships } = useCensorships();
  useEffect(() => {
    // Lấy đường dẫn URL hiện tại
    const currentPath = window.location.pathname;

    // Chia nhỏ đường dẫn URL thành các phần bằng dấu '/'
    const pathParts = currentPath.split('/');

    // Lấy phần tử thứ 2 từ mảng phân chia
    const courseIdFromPath = pathParts[2];

    // Thiết lập state cho courseId
    setCourseId(courseIdFromPath);
  }, []); // Chỉ chạy một lần khi component được tạo

  useEffect(() => {
    handleGetAllVideo();
    handleGetAllCensorships();
  }, [handleGetAllVideo, handleGetAllCensorships]);

  const videoFilters = videos.filter((video) => video.courseID == courseId);
  const { censorships } = censorshipsState;
  const videosWithStatus = videoFilters.map((video) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === video?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...video,
      status,
    };
  });

  const videoApproveds = videosWithStatus.filter((video)=>video.status === 'approved');

  return (
    <Box sx={{ mt: '5rem', ml: '1rem' }}>
      <Box>
        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
          Course video
        </Typography>
      </Box>
      <Box>
        {videoApproveds.map((video) => (
          <VideoListItem key={video._id} video={video} />
        ))}
      </Box>
    </Box>
  );
};

export default VideoList;
