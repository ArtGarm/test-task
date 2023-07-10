import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import data from './moc';
import Head from './head';
import { Order, OrderByEnum } from '../../interfaces/table';
import { TournamentInTableWithSumm } from '../../interfaces';
import Row from './row';

function sortFunction(
  sortOrderBy: OrderByEnum,
  sortOrder: Order,
  a: TournamentInTableWithSumm,
  b: TournamentInTableWithSumm,
) {
  const accesor = (sortOrderBy === OrderByEnum.title && 'title')
    || (sortOrderBy === OrderByEnum.description && 'description')
    || (sortOrderBy === OrderByEnum.id && 'id')
    || (sortOrderBy === OrderByEnum.players && 'numberOfPlayers')
    || (sortOrderBy === OrderByEnum.entryFee && 'entryFee')
    || (sortOrderBy === OrderByEnum.totalPrize && 'totalPrize');

  // @ts-ignore
  let normalizeA = a?.[`${accesor}`];
  // @ts-ignore
  let normalizeB = b?.[`${accesor}`];

  if ([OrderByEnum.title, OrderByEnum.description].includes(sortOrderBy)) {
    // @ts-ignore
    normalizeA = a[`${accesor}`].toLowerCase();
    // @ts-ignore
    normalizeB = b[`${accesor}`].toLowerCase();
  }

  if (normalizeA > normalizeB) {
    return sortOrder === 'desc' ? 1 : -1;
  }
  if (normalizeA < normalizeB) {
    return sortOrder === 'desc' ? -1 : 1;
  }
  return 0;
}

function TablePage() {
  const [sortOrder, setSortOrder] = useState<Order>('desc');
  const [sortOrderBy, setSortOrderBy] = useState<OrderByEnum>(OrderByEnum.id);

  const handleSortUpdate = (orderBy: OrderByEnum): void => {
    if (orderBy !== sortOrderBy) {
      setSortOrderBy(orderBy);
    } else {
      setSortOrder((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <Head orderBy={sortOrderBy} order={sortOrder} handleSort={handleSortUpdate} />
          <TableBody>
            {data
              .map((d) => ({
                ...d,
                totalPrize: d.prizeDistribution.reduce((a, p) => a + p.prize, 0),
              }))
              .sort((a, b) => sortFunction(sortOrderBy, sortOrder, a, b))
              .map((row) => (
                <Row key={row.id} row={row} handleRemove={() => console.log('remove')} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TablePage;
