//몽고db  shell 쿼리들

const { db } = require("./models/Urls");

// 필드 이름 바꾸기
db.urls.updateMany(
  {},
  {
    $rename: {
      title: "url_title",
      hashTags: "url_hashTags",
      id: "url_id",
    },
  }
);
// 필드 추가하기
db.urls.updateMany(
  {},
  {
    $set: {
      url_memo: "",
      url_clickedNumber: "0",
      url_likedUrl: 0,
    },
  }
);

// 삭제하기
db.urls.deleteMany(
  { url_title: "CRUD Tutorial Using MERN Stack" } // specifies the documents to delete
);

// db.urls.deleteMany({ url_id $in list});
db.urls.deleteMany({ name: { $in: ["viki", "vino", "naranyamoorthy"] } });
db.urls.deleteMany({ url_id: { $in: list } });

db.urls.find({}).sort({ _id: -1 });

db.urls.find({}, { url_id: 1 }).limit(20).sort({ _id: -1 });
// 리스트에 원하는 정보만 담는 기능
var list = [];
db.urls.find({}).forEach((doc) => {
  if (Number(doc.url_id) >= 123) {
    list.push(doc.url_id);
  }
});

// 리셋시키는 기능
urls.resetCount((err, next) => {
  console.log(next);
});

// 리스트에 있는 것들 제거하는 쿼리
db.urls.deleteMany({ url_id: { $in: list } });

//필드 삭제
db.urls.updateMany({}, { $unset: { memo: true } });

// mongosh에서 바꾸는 방법
// use ururl

// 딱 10개만 뽑아오라는 의미
db.urls.find({}).limit(10);

// 검색 쿼리
db.urls.find({ url_title: /Mern/ });

// 대소문자 구분 없애는 법
db.myCollection.find({ sitename: { $regex: "web", $options: "i" } });
// 대소문자 없애는 법
db.urls.find({ url_title: { $regex: /mern/, $options: "i" } });
