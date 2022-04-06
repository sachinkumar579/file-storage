import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FolderSharpIcon from "@mui/icons-material/FolderSharp";
import styled from "@emotion/styled";
import CustomizedMenus from "./CustomizedMenus";
import TransitionAlerts from "../components/TransitionAlerts";

const CloseWrapper = styled.div`
  position: fixed;
  bottom: 1px;
  right: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 0.5rem 1rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin: 0 0.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin: 0 0.5rem;
  }
`;

function createData(name, extension, size, modified) {
  return { name, extension, size, modified };
}

const rows = [
  createData("Folder 1", "", "--", "--"),
  createData("Folder 2 ", "", "--", "--"),
  createData("Folder 3", "", "--", "--"),
  createData("Folder 4", "", "--", "--"),
  createData("Folder 5", "", "--", "--"),
];

export default function BasicTable(props) {
  const [addedFolder, setAddedFolder] = React.useState(false);
  const [rowsData, setRowsData] = React.useState(rows);

  const FileTable = () => {
    return (
      <>
        <ButtonWrapper>
          <div>
            <CustomizedMenus
              setRowsData={setRowsData}
              createData={createData}
              setAddedFolder={setAddedFolder}
            ></CustomizedMenus>
          </div>
        </ButtonWrapper>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: "60rem" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Extension</TableCell>
                  <TableCell align="center">Size</TableCell>
                  <TableCell align="center">Modified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsData.map((row) => (
                  <TableRow
                    key={row.name}
                    onClick={props.handleDrawerOpen}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      <NameWrapper>
                        <div>
                          <FolderSharpIcon></FolderSharpIcon>
                        </div>
                        <div>{row.name}</div>
                      </NameWrapper>
                    </TableCell>
                    <TableCell align="center">{row.extension}</TableCell>
                    <TableCell align="center">{row.size}</TableCell>
                    <TableCell align="center">{row.modified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {addedFolder && (
            <CloseWrapper>
              <TransitionAlerts
                folderName={rowsData[rowsData.length - 1].name}
              ></TransitionAlerts>
            </CloseWrapper>
          )}
        </div>
      </>
    );
  };

  return (
    <Wrapper>
      <FileTable
        rows={rowsData}
        setRowsData={setRowsData}
        createData={createData}
      ></FileTable>
    </Wrapper>
  );
}
