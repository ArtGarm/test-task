import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { TournamentInTableWithSumm } from '../../interfaces';
import CopyToClipboard from '../../components/CopyToClipboard';

interface Props {
  row: TournamentInTableWithSumm;
  handleRemove: () => void;
}

function Row({ row, handleRemove }: Props) {
  return (
    <TableRow
      key={row.id}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell component="th" scope="row">
        <CopyToClipboard copyText={row.id}>
          {row.id}
        </CopyToClipboard>
      </TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.numberOfPlayers}</TableCell>
      <TableCell>{row.entryFee}</TableCell>
      <TableCell>{row.totalPrize}</TableCell>
      <TableCell>{row.winners}</TableCell>
      <TableCell>
        <Button component={NavLink} to={`/${row.id}`}>link</Button>
        <Button onClick={handleRemove}>Remove a Prize</Button>
      </TableCell>
    </TableRow>
  );
}

export default Row;
