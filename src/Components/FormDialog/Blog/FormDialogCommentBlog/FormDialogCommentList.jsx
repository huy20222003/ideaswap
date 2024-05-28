import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';
import FormDialogCommentItem from './FormDialogCommentItem';

const FormDialogCommentList = ({
  comments,
  parentCommentID = null,
  marginLeft = 0,
}) => {
  const childComments = comments.filter(
    (comment) => comment.parentCommentID === parentCommentID
  );

  return (
    <>
      {childComments.map((comment) => (
        <Box key={comment._id} ml={marginLeft}>
          <FormDialogCommentItem comment={comment} />
          <FormDialogCommentList
            comments={comments}
            parentCommentID={comment._id}
            marginLeft={marginLeft + 3}
          />
        </Box>
      ))}
    </>
  );
};

// Define PropTypes for props validation
FormDialogCommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  parentCommentID: PropTypes.string,
  marginLeft: PropTypes.number,
};

export default FormDialogCommentList;
