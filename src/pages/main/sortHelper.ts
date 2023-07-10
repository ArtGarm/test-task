import { Order, OrderByEnum } from '../../interfaces/table';
import { TournamentInTableWithSumm } from '../../interfaces';

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

export default sortFunction;
