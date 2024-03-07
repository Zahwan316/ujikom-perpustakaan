import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';
import Router from 'src/routes/sections';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../../state/user';
import useFormStore from '../../../../state/form';

// ----------------------------------------------------------------------




// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);
  const user = useUserStore((state) => state.user)
  const resetform = useFormStore((state) => state.resetform)

  const MENU_OPTIONS = [
    {
      label:"Peminjaman Saya",
      level:[3],
      onclick:() => {navigate("/peminjaman")}
    },
    {
      label:"Buku Favorit",
      level:[3],
      onclick:() => {navigate("/koleksi")}
    },
    {
      label:"Pengaturan",
      onclick:() => {navigate("/setting")},
      level:[0,1,2,3],
    },
    {
      label:"Dashboard",
      level:[0,1],
      onclick:() => {navigate("/dashboard")}
    },
  ];

  const handleLogout = () => {
    Cookies.remove('token')
    resetform()
    setTimeout(() => {
      //navigate("/login")
      window.location.href = '/login'
    },400)
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const redirectToSetting = () => {
    navigate("setting/")
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={`${import.meta.env.VITE_APP_URL_API}img/${user.img}`}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => {
          if(option.level.includes(user.access_level)){
            return(
              <MenuItem key={option.label} page='settings' onClick={option.onclick}>
                {option.label}
              </MenuItem>   

            )
          }
        })}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
