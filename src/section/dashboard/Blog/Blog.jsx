import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import BlogItem from './BlogItem';
import {
  useBlog,
  useHeart,
  useComment,
  useShare,
  useUser,
  useCensorships,
} from '../../../hooks/context';
import FormDialogEditBlog from '../../../Components/FormDialog/Blog/FormDialogEditBlog';
import FormDialogDeleteBlog from '../../../Components/FormDialog/Blog/FormDialogDeleteBlog';
import FormDialogCommentBlog from '../../../Components/FormDialog/Blog/FormDialogCommentBlog';

const Blog = () => {
  const { blogState, handleGetAllBlog } = useBlog();
  const { heartState, handleGetAllHearts } = useHeart();
  const { commentState, handleGetAllComments } = useComment();
  const { shareState, handleGetAllShares } = useShare();
  const { userState, handleGetAllUsers } = useUser();
  const { censorshipsState, handleGetAllCensorships } = useCensorships();

  useEffect(() => {
    handleGetAllBlog();
    handleGetAllHearts();
    handleGetAllComments();
    handleGetAllShares();
    handleGetAllUsers();
    handleGetAllCensorships();
  }, [
    handleGetAllBlog,
    handleGetAllHearts,
    handleGetAllComments,
    handleGetAllShares,
    handleGetAllUsers,
    handleGetAllCensorships,
  ]);

  const { blogs } = blogState;
  const { hearts } = heartState;
  const { comments } = commentState;
  const { shares } = shareState;
  const { users } = userState;
  const { censorships } = censorshipsState;

  const blogsWithStatus = blogs.map((blog) => {
    const heartArrays = hearts.filter((heart) => heart?.bvID === blog?._id);
    const commentArrays = comments.filter(
      (comment) => comment?.bvID === blog?._id
    );
    const shareArrays = shares.filter((share) => share?.bvID === blog?._id);
    const user = users.find((user) => user?._id === blog?.userID);
    const censorshipItem = censorships.find(
      (item) => item?.contentID === blog?._id
    );
    const status = censorshipItem ? censorshipItem.status : 'pending';
    return {
      ...blog,
      heartArrays,
      commentArrays,
      shareArrays,
      user,
      status,
    };
  });

  const blogApproveds = blogsWithStatus.filter(
    (blog) => blog?.status === 'approved'
  );

  return (
    <Box>
      {blogApproveds.length > 0 ? (
        blogApproveds.map((blog) => <BlogItem key={blog?._id} blog={blog} />)
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2">
            There are no posts to display yet
          </Typography>
        </Box>
      )}
      <FormDialogEditBlog />
      <FormDialogDeleteBlog />
      <FormDialogCommentBlog />
    </Box>
  );
};

export default Blog;
