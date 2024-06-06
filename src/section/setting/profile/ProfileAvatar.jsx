import { Avatar, Box, Typography, Button } from '@mui/material';
import { useAuth, useUser } from '../../../hooks/context';
import Swal from 'sweetalert2';
//i18n
import { useTranslation } from 'react-i18next';
//----------------------------------------------

const ProfileAvatar = () => {
  const { authState: { user }, loadUser } = useAuth();
  const {handleUpdateUser} = useUser();
  const {t} = useTranslation('setting');

  // Hàm xử lý khi có sự thay đổi trong input file
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên từ sự kiện

    // Tạo đối tượng FileReader
    const reader = new FileReader();

    // Xử lý sự kiện load của FileReader
    reader.onload = async function (e) {
      const base64String = e.target.result; // Chuỗi base64 của file đã chọn
      const respone = await handleUpdateUser(user?._id, {imageBase64: base64String});
      if(respone.success) {
        Swal.fire({title: t("Success"), text: t("Successfully updated profile picture"), icon: 'success'});
      } else {
        Swal.fire({title: t("Error"), text: t("Updating profile picture failed"), icon: 'error'});
      }
      await loadUser();
    };

    // Đọc file dưới dạng ArrayBuffer (chuỗi base64)
    reader.readAsDataURL(file);
  };

  // Hàm xử lý khi nhấp vào nút Change
  const handleChangeButtonClick = () => {
    // Kích hoạt sự kiện click cho thẻ input file
    document.getElementById('fileInput').click();
  };

  return (
    <Box
      sx={{ bgcolor: 'primary.lighter', p: '0.4rem', borderRadius: '0.4rem' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt={user?.firstName}
          src={user?.avatar}
          sx={{ width: '6rem', height: '6rem' }}
        />
        <Box sx={{ flex: 1, ml: '1rem', py: '0.5rem' }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            {user?.firstName + ' ' + user?.lastName}
          </Typography>
          {/* Thẻ input file ẩn */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {/* Nút Change */}
          <Button
            variant="contained"
            size="small"
            sx={{ color: '#fff', mt: '1rem', px: '1.5rem' }}
            onClick={handleChangeButtonClick} // Khi nhấp vào nút, gọi hàm handleChangeButtonClick
          >
            {t("Change")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileAvatar;
