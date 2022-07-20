interface ILaunchCore {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}

export interface ILaunch {
  fairings: any;
  links: {
    patch: {
      small: string;
      large: string;
    };
    reddit: {
      campaign: string;
      launch: string;
      media: string;
      recovery: null;
    };
    flickr: {
      small: any[];
      original: string[];
    };
    presskit: string;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
  };
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  tdb: boolean;
  net: boolean;
  window: number;
  rocket: string | object;
  success: boolean;
  failures: any[];
  details: string;
  crew: any[];
  ships: any[];
  capsules: string[];
  payloads: string[];
  launchpad: string | object;
  auto_update: boolean;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: ILaunchCore[];
  id: string;
}

/* getUpcomingLaunches() async function in api/index.ts has a `populate` property in request body.
SpaceX API uses it in order for MongoDB to populate with other specified documents */
// ! See here: https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md

export interface ILaunchQueryPopulated extends Omit<ILaunch, 'rocket' | 'launchpad'> {
  // NOTE: This can potentially grow as more fields from different documents are added via query
  rocket: {
    name: string;
    id: string;
  };
  launchpad: {
    name: string;
    id: string;
  };
}

export interface ILaunchQuery {
  docs: ILaunchQueryPopulated[];
}
