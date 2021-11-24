export interface IAuctionLot {
  // id: number;
  title: string;
  subtitle: string;
  data: string;
}

export interface IAuctionLots {
  [id: string]: IAuctionLot;
}

export interface IAuctionLotBidView {
  isPreSale: boolean;
  isDuringSale: boolean;
  isPostSale: boolean;
}
