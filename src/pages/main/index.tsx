import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import data from './moc';
import Head from './head';
import { Order, OrderByEnum } from '../../interfaces/table';
import { TournamentInTable } from '../../interfaces';
import Row from './row';
import sortFunction from './sortHelper';

function TablePage() {
  const [loadedData, setLoadedData] = useState<TournamentInTable[]>(data);

  const [sortOrder, setSortOrder] = useState<Order>('desc');
  const [sortOrderBy, setSortOrderBy] = useState<OrderByEnum>(OrderByEnum.id);

  const handleSortUpdate = (orderBy: OrderByEnum): void => {
    if (orderBy !== sortOrderBy) {
      setSortOrderBy(orderBy);
    } else {
      setSortOrder((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
    }
  };

  const handleRemoveLast = (id: number) => {
    setLoadedData((prevState) => prevState.map(
      (item) => (
        item.id === id ? { ...item, prizeDistribution: item.prizeDistribution.slice(0, -1) } : item
      ),
    ));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <Head orderBy={sortOrderBy} order={sortOrder} handleSort={handleSortUpdate} />
          <TableBody>
            {loadedData
              .map((d) => ({
                ...d,
                totalPrize: d.prizeDistribution.reduce((a, p) => a + p.prize, 0),
              }))
              .sort((a, b) => sortFunction(sortOrderBy, sortOrder, a, b))
              .map((row) => (
                <Row key={row.id} row={row} handleRemove={() => handleRemoveLast(row.id)} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablePage;
