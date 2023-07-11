import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { OrderByEnum, Order } from '../../interfaces/table';

interface Props {
  order: Order
  orderBy: OrderByEnum
  handleSort: (orderBy: OrderByEnum) => void
}

const tableHead = [
  {
    title: 'ID',
    orderKey: OrderByEnum.id,
  },
  {
    title: 'Title',
    orderKey: OrderByEnum.title,
  },
  {
    title: 'Description',
    orderKey: OrderByEnum.description,
  },
  {
    title: 'Number of Players',
    orderKey: OrderByEnum.players,
  },
  {
    title: 'Entry Fee',
    orderKey: OrderByEnum.entryFee,
  },
  {
    title: 'Total Prize Pool',
    orderKey: OrderByEnum.totalPrize,
  },
  {
    title: 'Number of Winners',
    orderKey: OrderByEnum.winners,
  },
  {
    title: 'Actions',
  },
];

function Head({ order, orderBy, handleSort }: Props) {
  return (
    <TableHead>
      <TableRow>
        {tableHead.map((th) => (
          <TableCell key={th.title} sortDirection={orderBy === th?.orderKey ? order : false}>
            {th?.orderKey ? (
              <TableSortLabel
                active={orderBy === th.orderKey}
                direction={orderBy === th.orderKey ? order : 'asc'}
                onClick={() => handleSort(th.orderKey)}
              >
                {th.title}
              </TableSortLabel>
            ) : th.title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Head;
