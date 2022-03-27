export let searchedUrls = [];

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

const dbName = "search_history";
const dbVersion = 1;
const dbStoreName = "searched_urls";

const db = indexedDB.open(dbName, dbVersion);

db.onsuccess = function (e) {
  const db = e.target.result;
  const transaction = db.transaction(dbStoreName, "readwrite");
  const store = transaction.objectStore(dbStoreName);
  const request = store.getAll();
  request.onsuccess = function (e) {
    searchedUrls = e.target.result.map((item) => {
      return { url: item.url, _id: item.id, url_title: item.title };
    });
  };
};

// FIXME: 코파일럿
// export const fn = {
//   addUrl: function (url) {
//     searchedUrls.push(url);
//     const db = indexedDB.open(dbName, dbVersion);
//     db.onsuccess = function (e) {
//       const db = e.target.result;
//       const transaction = db.transaction(dbStoreName, "readwrite");
//       const store = transaction.objectStore(dbStoreName);
//       const request = store.add(url);
//       request.onsuccess = function (e) {
//         console.log(e.target.result);
//       };
//     };
//   },
//   getUrls: function () {
//     return searchedUrls;
//   },
//   clearUrls: function () {
//     searchedUrls = [];

//     const db = indexedDB.open(dbName, dbVersion);
//     db.onsuccess = function (e) {
//       const db = e.target.result;
//       const transaction = db.transaction(dbStoreName, "readwrite");
//       const store = transaction.objectStore(dbStoreName);
//       const request = store.clear();
//       request.onsuccess = function (e) {
//         console.log(e.target.result);
//       };
//     };
//   },
// };

// export
