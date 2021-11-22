export interface IAuctionLot {
  // id: number;
  title: string;
  subtitle: string;
  data: string;
}

export interface IAuctionLots {
  [id: string]: IAuctionLot;
}
