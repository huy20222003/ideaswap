//react
import { useState, useEffect } from 'react';
//mui
import { Card, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
//component
import DocumentItem from './DocumentItem';
//context
import { useDocument, useCensorships, useUser } from '../../../hooks/context';
//---------------------------------------------------

const Document = () => {
  const [displayedItems, setDisplayedItems] = useState(5); // Số item hiện đang được hiển thị
  const {
    documentState: { documents },
    handleGetAllDocuments,
  } = useDocument();
  const {
    censorshipsState: { censorships },
    handleGetAllCensorships,
  } = useCensorships();

  const {userState: {users}, handleGetAllUsers} = useUser();

  useEffect(() => {
    handleGetAllDocuments();
    handleGetAllCensorships();
    handleGetAllUsers();
  }, [handleGetAllDocuments, handleGetAllCensorships, handleGetAllUsers]);

  const newDocuments = documents
  .map((document) => {
    const censorshipItem = censorships.find(
      (item) => item?.contentID === document?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...document,
      status,
    };
  })
  .filter((document) => document?.status === 'approved')
  .map((document) => {
    const user = users.find((user) => user?._id === document?.userID);
    return {
      ...document,
      user,
    };
  });


  const handleShowMore = () => {
    setDisplayedItems((prev) => prev + 2); // Hiển thị thêm 2 item
  };

  return (
    <Card sx={{ p: '1rem' }}>
      <Box
        sx={{
          textAlign: 'center',
          bgcolor: 'primary.main',
          borderRadius: '0.4rem',
          py: '0.5rem',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white' }}>
          DOWNLOAD DOCUMENT FREE
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', my: '1.5rem' }}
      >
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<FilterAltOutlinedIcon />}
        >
          FILTER
        </Button>
      </Box>
      <Box>
        <Box>
          {newDocuments.length > 0 ? (
            newDocuments
              .slice(0, displayedItems)
              .map((document) => (
                <DocumentItem key={document?._id} document={document} />
              ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              There are no documents to download yet
            </Typography>
          )}
        </Box>
        {displayedItems < newDocuments.length && (
          <Box sx={{ textAlign: 'center', mt: '1rem' }}>
            <Typography
              onClick={handleShowMore}
              variant="caption"
              sx={{ fontStyle: 'italic', cursor: 'pointer' }}
            >
              Show More
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Document;
