export interface ILotsQuery {
  data: {
    lotCollection: {
      items: ILotData[];
    };
  };
}

export interface IAuthorsQuery {
  data: {
    authorCollection: {
      items: IAuthor[];
    };
  };
}

export interface ICollectorsQuery {
  data: {
    collectorCollection: {
      items: ICollector[];
    };
  };
}
export interface IAuctionsQuery {
  data: {
    auctionCollection: {
      items: IAuction[];
    };
  };
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
export interface IAuthor {
  sys: {
    publishedAt: string;
  };
  name: string;
  about: string;
  avatar: {
    title: string;
    url: string;
  };
  linkedFrom: {
    lotCollection: {
      items: {
        title: string;
      }[];
    };
  };
  twitterLink: string;
  slug: string;
}

export interface IAuction {
  sys: {
    publishedAt: string;
  };
  description: string;
  duration: string;
  lotsCollection: {
    items: ILotData[];
  };
  name: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  slug: string;
}

export interface IImageItem {
  url: string;
  title: string;
  contentType: string;
}
