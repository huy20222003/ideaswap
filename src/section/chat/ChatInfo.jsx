import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Avatar, Stack, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AbcIcon from '@mui/icons-material/Abc';
import { useConversation, useAuth } from '../../hooks/context';
import { useTranslation } from 'react-i18next';
import FormDeleteConversation from '../../Components/FormDialog/chat/FormDialogDeleteConversation';

const ChatInfo = () => {
  const {
    conversationState: { conversation },
    setOpenFormDeleteConversation,
    handleGetOneConversations,
  } = useConversation();

  const {
    authState: { user },
  } = useAuth();

  const { _id } = useParams();

  const { t } = useTranslation(['chat']);

  const navigate = useNavigate();

  const handleNavigateToAccount = (userId) => {
    navigate(`/account/${userId}`);
  };

  const otherMember = conversation?.members?.find(
    (member) => member?._id !== user?._id
  );

  const handleDeleteConversation = useCallback(async () => {
    const response = await handleGetOneConversations(_id);
    if (response.success) {
      setOpenFormDeleteConversation(true);
    }
  }, [_id, handleGetOneConversations, setOpenFormDeleteConversation]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
      <Box sx={{ mt: { xs: 2, sm: 4, md: 4, xl: 6 } }}>
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={otherMember?.avatar}
            alt={otherMember?.firstName + ' ' + otherMember?.lastName}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6">
            {otherMember?.nickName
              ? otherMember?.nickName
              : `${otherMember?.firstName} ${otherMember?.lastName}`}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Stack>
            <IconButton
              onClick={() => handleNavigateToAccount(otherMember?._id)}
            >
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography variant="body2">{t('Account')}</Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AbcIcon />
            <Typography variant="subtitle1">{t('Edit nickName')}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ cursor: 'pointer' }}
            onClick={handleDeleteConversation}
          >
            <DeleteIcon sx={{ color: 'red' }} />
            <Typography variant="subtitle1" sx={{ color: 'red' }}>
              {t('Delete conversation')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <FormDeleteConversation />
    </Box>
  );
};

export default ChatInfo;
