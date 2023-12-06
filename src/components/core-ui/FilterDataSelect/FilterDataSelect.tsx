import { useState, useEffect, MouseEvent } from 'react';
import {Box, Button, Typography, InputBase, Paper, List, Popover, Stack, useMediaQuery } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Search as SearchIcon, Close as CloseIcon} from '@mui/icons-material';
import { FilterDataSelectProps } from './FilterDataSelectDefinitions'
import { StyledBadge, StyledDrawer, StyledButton, StyledListItem } from './FilterDataSelectStyles'

const FilterDataSelect = (props: FilterDataSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [componentToOpen, setComponentToOpen] = useState<string>('menu');
  const [open, setOpen] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedData, setSelectedData] = useState<any | {}>({});
  const [options, setOptions] = useState<any | {}>({});
  // const open = Boolean(anchorEl);

  const isXs = useMediaQuery('(max-width:624px)');

  const handleClick = (event: MouseEvent<HTMLElement>) => { 
    if(isXs) { 
      setComponentToOpen('drawer'); 
    } else {
      setAnchorEl(event.currentTarget); 
      setComponentToOpen('menu');
    } 
    
    setOpen(!open);
  };

  const handleClose = () => { setAnchorEl(null); setOpen(false); };

  useEffect(() => {
    if (props.selectedData) {
      setSelectedData(props.selectedData);
    }
  }, [props.selectedData]);


  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
    }
  }, [props.options?.length]);

  useEffect(() => {
    if (searchValue.length > 0 && props.options) {
      const filteredData = props.options?.filter((item:any) => {
        return item.label.toLowerCase().includes(searchValue.toLowerCase());
      });
      setOptions(filteredData);
    } else if (props.options) {
      setOptions(props.options);
    } 
  }, [searchValue]);

  const getList = () => {
      return  <List dense={true} sx={{ minWidth:400 }}>
        { options?.length > 0 && options.map((item:any) => {
          return <StyledListItem className={ selectedData?.value == item.value ? 'selectedItem' : '' } onClick={ev => {  props.onSelect(item); setOpen(false);  }}>
            {item.label}
          </StyledListItem>
          })
        }
        { !options?.length &&
         <StyledListItem className='noDataItem'>{props.noDataFoundLabel || 'No data found!'}</StyledListItem>
        }
        </List>
  }

  const getSearchInput = () => {

    if(!props.showCounter || !props.showSearch) return null;

    return <Box sx={{ padding:'1rem 1rem 0.5rem 1rem', width:'100%' }}>
          { (props.showCounter === true) &&
          <StyledBadge badgeContent={options?.length || 0} sx={{mt:0, mb:1}}>
            <Typography style={{ color:'#0e224e', fontWeight:600, fontSize:'14px' }}>{props.counterLabel || 'Rezultate'}</Typography>
          </StyledBadge>
          }
          { (props.showSearch === true) &&
          <Paper className='srcInput' elevation={0} sx={{ boxShadow: 'none', padding:'3px', borderRadius:'18px', backgroundColor:'#e8f1fb', display: 'flex', alignItems: 'center', width: '100%' }}>
            <SearchIcon sx={{color:'#316ede', ml:1, fontSize:'1.4rem', fontWeight:800}} />
            <InputBase
              sx={{ ml: 1, mr:0, flex: 1, color:'#3f5982', fontSize:'14px' }}
              inputRef={input => input && input.focus()}
              tabIndex={0}
              value={searchValue}
              placeholder="Search"
              onChange={(e) => { setSearchValue(e.target.value); }}
              inputProps={{ 'aria-label': 'search' }}

            />
            {(searchValue.length > 0) && 
              <CloseIcon className='closeIcon' onClick={(e) => { setSearchValue(''); }} sx={{color:'#316ede', mr:1, cursor:'pointer', fontSize:'1.2rem'}} />
            }
          </Paper>
          }
        </Box>
  }

  let btnStyle: object = { backgroundColor:'#0970E6',borderRadius:6, lineHeight:2, padding:'.3rem 1.5rem', fontSize:'.8rem', fontWeight:600, minWidth:'250px', textTransform:'initial' }
  if(isXs) btnStyle = {...btnStyle, width:'100%'};

  return (
    <Box sx={{width:'100%'}}>
      <Stack direction="row" spacing={2}>
        {(!isXs && props.label) && 
        <Box sx={{ lineHeight:2, padding:'.3rem 1.5rem', color:'#575757', fontSize:'12px' }}>{props.label}</Box>
        }
        <Box sx={!isXs ? {} : {width:'100%'}}>
            <StyledButton
              id="main-button"
              aria-describedby={componentToOpen}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              disableRipple
              sx={btnStyle}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {selectedData?.label ? selectedData?.label : 'N/A'}
            </StyledButton>
        </Box>
      </Stack>
      {!isXs ? 
      <Popover id="menu"
        open={open && Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        { getSearchInput() }
        { getList() }
      </Popover>
      :
      <StyledDrawer anchor={'bottom'} open={Boolean(open)} onClose={ev => setOpen(false)}>
        { getSearchInput() }
        { getList() }
        <Box sx={{ pt:2, pb:2, pl:4, pr:4, textAlign:'center'}}>
          <Button variant="outlined" size="large" sx={{width:'100%', fontWeight:600, textTransform:'none'}} onClick={ev => setOpen(false)}>Anuleaza</Button>
        </Box>
      </StyledDrawer>
      }
    </Box>
  )
}

export default FilterDataSelect
