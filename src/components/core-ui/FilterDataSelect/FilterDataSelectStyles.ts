import { Button, ButtonProps, Badge, BadgeProps, Drawer, DrawerProps, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -20,
      backgroundColor: '#0e224e',
      top: 11,
      borderRadius:'3px',
      padding: '0 4px',
      color:'#ffffff'
    },
  }));
  
export const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: '10px 10px 0 0',
      '&.srcInput' : {borderRadius:'18px', 
      }
    },
  }));
  
export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '& .MuiButton-endIcon': {
      position:'absolute', right:'20px', float:'right'
    },
  }));
  
  
export const StyledListItem = styled(ListItem)({
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor: '#f7f8fa',
    color: '#3375f0',
    borderBottom: '1px solid #ececec',
    padding:'.6rem 1.5rem',
    '&:hover': {
      backgroundColor: '#e8f1fb',
      color:'#3375f0'
    },
    '&.selectedItem': {
      backgroundColor: '#ffffff',
      color:'#ea4124'
    },
    '&.noDataItem': {
      backgroundColor: '#ffffff',
      color:'#989898',
      fontStyle: 'italic',
      fontSize: '14px',
      cursor: 'default', 
      lineHeight: '10rem',
      textAlign:'center',
      display:'block',
      borderBottom:'none'
    }
  });