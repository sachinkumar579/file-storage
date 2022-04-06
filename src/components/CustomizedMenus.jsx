import * as React from "react";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin: 0 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  margin: 10px;
  position: relative;
  float: right;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreateFolderHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > * {
    margin: 1rem 0.5rem;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  borderRadius: "3px",
  p: 4,
};

const StyledMenu = muiStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const folderName = React.useRef("");
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const addFolder = () => {
    props.setRowsData((prev) => {
      prev.push(props.createData(folderName.current.value, "", "--", "--"));
      return [...prev];
    });
    props.setAddedFolder(true);
    setOpenModal(false);
  };

  function UseFormControl() {
    return (
      <Box component="form" noValidate autoComplete="off">
        <FormControl
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <OutlinedInput
            placeholder="Folder name"
            inputRef={folderName}
            autoFocus
          />
        </FormControl>
      </Box>
    );
  }

  function FullWidthTextField() {
    return (
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Search files"
          id="fullWidth"
          sx={{
            background: "#f1f3f4",
            outline: "none",
          }}
        />
      </Box>
    );
  }

  return (
    <div>
      <SearchWrapper>
        <FullWidthTextField></FullWidthTextField>
        <Button
          id="demo-customized-    button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            background: "linear-gradient(to bottom right, #4253D1, #AE9EE2)",
            color: "white",
          }}
        >
          Create
        </Button>
      </SearchWrapper>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            setOpenModal(true);
            handleClose(e);
          }}
          disableRipple
        >
          <FolderOpenIcon />
          New Folder
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileUploadIcon />
          File Upload
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFolderHeading>
            <RowWrapper>
              <Typography id="modal-modal-title">New folder</Typography>
            </RowWrapper>
            <div onClick={handleCloseModal}>
              <CloseIcon />
            </div>
          </CreateFolderHeading>
          <UseFormControl></UseFormControl>
          <ButtonWrapper>
            <Button variant="contained" onClick={addFolder}>
              Create
            </Button>
          </ButtonWrapper>
        </Box>
      </Modal>
    </div>
  );
}
