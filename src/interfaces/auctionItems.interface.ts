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

export interface ILotData {
  lotId: number;
  mojitoId: string;
  sys: {
    id: string;
    publishedAt: string;
  };
  title: string;
  imagesCollection: {
    items: IImageItem[];
  };
  author: {
    name: string;
    about: string;
    avatar: {
      url: string;
      title: string;
    };
    slug: string;
  };
  createdAt: string;
  estimatePrice: string;
  purchasedAt: string;
  smartContractAddress: string;
  tokenId: string;
  collector: ICollector;
  aboutLot: string;
  history: {
    buyerName: string;
    date: string;
    price: string;
    smartContractAddress: string;
  }[];
  video: string;
  conditionReportText: string;
  shortCollectorDescription: string;
  slug: string;
  nftLink: string;
  nftVideoIds: string[];
  mojitoLotData?: any;
  lotPreviewBackgroundColor: string;
  gridPreviewImage: {
    url: string;
  };
}

export interface ICollector {
  sys: {
    publishedAt: string;
  };
  name: string;
  about: string;
  avatar: {
    title: string;
    url: string;
  };
  smartContractAddress: string;
  linkedFrom: {
    lotCollection: {
      items: {
        title: string;
      }[];
    };
  };
  videoId: string;
  twitterLink: string;
  slug: string;
}

export interface IImageItem {
  url: string;
  title: string;
  contentType: string;
}
