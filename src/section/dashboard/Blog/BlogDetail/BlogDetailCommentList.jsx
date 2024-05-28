import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';
import BlogDetailCommentItem from './BlogDetailCommentItem';

const BlogDetailCommentList = ({
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
          <BlogDetailCommentItem comment={comment} />
          <BlogDetailCommentList
            comments={comments}
            parentCommentID={comment._id}
            marginLeft={marginLeft + 2}
          />
        </Box>
      ))}
    </>
  );
};

// Define PropTypes for props validation
BlogDetailCommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  parentCommentID: PropTypes.string,
  marginLeft: PropTypes.number,
};

export default BlogDetailCommentList;
