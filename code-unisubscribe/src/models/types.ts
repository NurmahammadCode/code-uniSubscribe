export enum Category {
  FILM = "FILM",
  GAME = "GAME",
  SPORT = "SPORT",
}

export interface ISubscription {
  _id?: Number;
  CompanyName: String;
  Price: String;
  Detail: String;
  ExpiryDate: Date;
  NotifyDate: Number;
}

export interface ISubArr {
  subscriptions: ISubscription[];
  filteredSubscriptions: ISubscription[];
}

export interface IDeleteSub {
  userId: Number;
  subId: Number;
}

export interface IFilterSubs {
  pageNumber: Number;
  countOfData: Number;
}

// export type ICardDispatch = (arg: ICard) => ICard;
