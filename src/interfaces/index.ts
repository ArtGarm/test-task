export interface PrizeDistribution {
  place: number;
  prize: number;
}

export interface Tournament {
  title: string;
  description: string;
  numberOfPlayers: number;
  entryFee: number;
  prizeDistribution: PrizeDistribution[];
}

export interface TournamentInTable extends Tournament {
  id: number;
}

export interface TournamentInTableWithSumm extends TournamentInTable {
  totalPrize: number;
}
