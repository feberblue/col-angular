// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_LOGIN: "ws://10.236.4.20:9000",
  URL_QUERY_SWAP: "http://10.236.4.20:1421/blotter",
  URL_PROCESS_SWAP: "http://10.236.4.20:1421/reprocess",
  URL_QUERY_FORWARD: "http://10.236.4.20:1421/forward"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
