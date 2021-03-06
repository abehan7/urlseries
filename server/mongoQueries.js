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

// 문자열 인트로 바꾸는 방법
// 아싸 드디어
db.urls.find({
  $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 10] },
});

db.urls.find({
  $expr: { $toDouble: "$url_clickedNumber" },
});
//이거는 구버전
db.urls.find({ $where: "parseInt(this.url_clickedNumber) >=1000" });

//여기서 collation하니까 되네

//이거가 클릭수 많은 url
db.urls
  .find({ $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 1] } })
  .sort({ url_clickedNumber: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(10);

db.urls
  .find({ $expr: { $lt: [{ $toDouble: "$url_id" }, 78] } })
  .sort({ url_id: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(21);

//업데이트ok
db.urls.updateOne(
  {
    url_id: "1",
  },
  {
    $set: { url_title: "검색창 디자인 수정 완료" },
  }
);

UrlModel.findOneAndRemove({ _id: id });

db.urls
  .find({ $expr: { $lt: [{ $toDouble: "$url_id" }, 76] } })
  .sort({ url_id: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .skip(2 * 21)
  .limit(21);

// 날짜 있는것들만 우선 뽑기
db.urls.find({ url_date: { $regex: /2021/ } }).sort({ url_date: -1 });
db.urls.find({}).sort({ url_date: -1 });

// 특정 필드만 출력하는 방법
db.urls.find({}, { url_date: 1 });
// 1이 있는거인듯

db.urls.find({}, { url_date: 1 }).forEach((val) => {
  if (val.url_date) {
    console.log(val);
    console.log(typeof val.url_date);
  }
});

// 시간 쿼리하는 방법

db.urls.find({
  url_date: { $gte: "2014-10-09T13:32:37Z", $lte: "2014-10-09T13:32:38Z" },
});

db.urls
  .find({
    url_date: { $gte: new Date("2014-10-09T13:32:37Z") },
  })
  .sort({ url_date: -1 });

// 날짜 없는것들에 날짜넣기

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
};

db.urls.updateMany(
  {},
  {
    $set: {
      url_date: getCurrentDate(),
    },
  }
);

db.urls.updateMany(
  {},
  { $unset: { url_firstDate: true, url_updatedDate: true } }
);

// 업데이트된 날짜 넣기
// updatedDate

db.urls.updateMany(
  {},
  {
    $set: {
      url_firstDate: getCurrentDate(),
      url_updatedDate: getCurrentDate(),
    },
  }
);

// 각 url마다 useId넣기
db.urls.updateMany(
  {},
  {
    $set: {
      user_id: "hanjk123@gmail.com",
    },
  }
);

// 전체 해쉬태그만 뽑아내기

var uniqueTags = [];
db.urls.find({}, { url_hashTags: 1 }).forEach((val) => {
  val.url_hashTags.forEach((oneTag) => {
    if (!uniqueTags.includes(oneTag)) uniqueTags.push(oneTag);
  });
});

db.userdatas.updateMany(
  {},
  {
    $set: {
      user_totalTags: uniqueTags,
    },
  }
);

db.urls
  .find(
    {
      $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 1] },
    },
    { url_clickedNumber: 1 }
  )
  .sort({ url_clickedNumber: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(6);

db.urls
  .find({ $expr: { $lt: [{ $toDouble: "$url_id" }, 165] } })
  .sort({ url_id: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(21);

db.urls
  .find({ $expr: { $lt: [{ $toDouble: "$url_id" }, 165] } })
  .sort({ url_id: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(21);

var list = [];
db.urls.find({}, { url_id: 1 }).forEach((val) => {
  list.push(val.url_id);
});

// 스트링으로 했던거 인트로 바꾸는 방법
db.urls.find().forEach(function (data) {
  db.urls.update(
    {
      _id: data._id,
      moop: data.moop,
    },
    {
      $set: {
        url_id: parseInt(data.url_id),
      },
    }
  );
});
// 내 버전
db.urls.find().forEach(function (data) {
  db.urls.update({
    $set: {
      url_id: parseInt(data.url_id),
    },
  });
});

// 여기 쿼리 넣으면 될 듯
db.urls.find().forEach((data) => {
  db.urls.update(
    { _id: data._id }, // 여기가 일치하는 아이디
    {
      $set: {
        url_clickedNumber: parseInt(data.url_clickedNumber),
      },
    }
  );
});

db.urls
  .find()
  .limit(20)
  .forEach((data) => {
    console.log(data.url_id);
  });

db.urls.updateMany(
  {},
  {
    $set: {
      url_id: parseInt(data.url_id),
    },
  }
);

// db.urls.update(
//   {
//     user_id: "hanjk123@gmail.com",
//   },
//   {
//     $set: {
//       user_recentSearchedIds: [
//         { url_id: 222, url_clickedDate: "2021-12-12T17:07:24.140Z" },
//         { url_id: 1, url_clickedDate: "2021/9" },
//         { url_id: 4, url_clickedDate: "2021/8" },
//         { url_id: 21, url_clickedDate: "2021/7" },
//         { url_id: 51, url_clickedDate: "2021/6" },
//       ],
//     },
//   }
// );

// db.urls.find({ url_id: { $in: [222, 1, 4, 21, 51] } },{url_id:1,url_clickedDate:1}).forEach((val) => {
//   val.url_id
// });

// 전체 검색 넣기
db.urls.updateMany(
  {},
  {
    $set: {
      url_search: {
        url_searchClicked: 0,
        url_searchedDate: getCurrentDate(),
      },
    },
  }
);

// json 형태에서 find하는 방법
db.urls
  .find({ "url_search.url_searchClicked": 1 })
  .sort({ url_searchedDate: 1 });

// 컬렉션 이름 바꾸는 방법

// use ururl 이걸 가장먼저 해야함

db.userdatas.renameCollection("users");

// 필드 삭제하는 방법
db.URL_table.update(
  {},
  { $unset: { desc_anal2: 1, title_anal2: 1 } },
  { multi: true }
);

db.users.updateMany({}, { $unset: { user_recentSearchedIds: true } });

// 해쉬태그 중복 없이 뽑기

let hashList = [];
db.urls.find({}, { url_hashTags: 1 }).forEach((val) => {
  val.url_hashTags.forEach((tag) => {
    if (!hashList.includes(tag)) {
      hashList.push(tag);
    }
  });
});

// 해쉬태그 새걸로 교체하긴
db.users.updateMany(
  { user_id: "hanjk123@gmail.com" },
  {
    $set: {
      user_totalTags: hashList2,
    },
  }
);

let hashList2 = [];
hashList.forEach((val) => {
  hashList2.push({ name: val, assigned: 0 });
});

// 제이슨 파일 쿼리하는 방법
db.Jobs.find({ "Tests.names": "Art Test" });

let list = [];
db.users.find({}, { user_totalTags: 1 }).forEach((val) => {
  console.log(val.assigned);
});

db.users.updateMany(
  { user_id: "hanjk123@gmail.com" },
  {
    $set: {
      user_totalTags: list2,
    },
  }
);

var list2 = list.map((val) => {
  return {
    name: val.name,
    assigned: val.assigned,
    assignedOrigin: val.assigned,
  };
});

// 기존 필드에 값 +1하기 인티저
db.urls.updateOne({ _id: url._id }, { $inc: { url_clickedNumber: 1 } });

// shared 필드 추가
let list1;
list1 = list2.map((val) => {
  return {
    name: val.name,
    assigned: val.assigned,
    assignedOrigin: val.assignedOrigin,
    shared: 0,
  };
});

db.users.updateMany(
  { user_id: "hanjk123@gmail.com" },
  {
    $set: {
      user_totalTags: list1,
    },
  }
);

// 이렇게 하니까 된다
db.users
  .find({ user_id: "hanjk123@gmail.com" }, { user_totalTags: 1 })
  .toArray()[0].user_totalTags;

db.users.update(
  { users_id: "hanjk123@gmail.com" },
  {
    $set: {
      user_totalTags: list2,
    },
  }
);

// hashtag컬렉션 만들기 코드
// ok 성공
let list = [];

db.urls.find().forEach((url) => {
  url.url_hashTags.forEach((tag) => {
    if (list.includes(tag)) {
      db.hashtags.updateOne(
        { name: tag },
        {
          $push: {
            url_id: url._id,
          },
        }
      );
    }
  });
});

// 오브젝트 id 쿼리하는 법
db.urls.find({ _id: ObjectId("61ae230e5e92a9f7c55a9c94") });

// 업데이트
db.hashtags.updateMany(
  {},
  {
    $set: {
      clicked: 0,
    },
  }
);

// 이름바꾸기
db.hashtags.updateMany(
  {},
  {
    $rename: {
      name: "tag_name",
      assigned: "tag_assigned",
      assignedOrigin: "tag_assignedOrigin",
      shared: "tag_shared",
      clicked: "tag_clicked",
    },
  }
);

// 두번째 hashtag컬렉션_id urls 컬렉션에 넣기
// 성공
//

db.hashtags.find().forEach((tag) => {
  tag.url_id.forEach((url) => {
    db.urls.updateOne(
      { _id: url },
      {
        $push: {
          hashtags_id: tag._id,
        },
      }
    );
  });
});

// 쿼리 저장해놓기
await db.Urls.find({
  $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 1] },
})
  .sort({ url_clickedNumber: -1 })
  .collation({ locale: "en_US", numericOrdering: true })
  .limit(20)
  .then((response) => {
    rightURL = response;
  });

db.folders.updateMany(
  {},
  {
    $set: {
      folder_liked: false,
    },
  }
);

db.folders.updateMany(
  {},
  {
    $unset: {
      Liked: 1,
    },
  }
);

db.folders.updateMany(
  { user_id: "hanjk123@gmail.com" },
  {
    $set: {
      user_id: ObjectId("61dab50ad3063e55d1d781c3"),
    },
  }
);

// $set: {
//   url_memo: "",
//   url_clickedNumber: "0",
//   url_likedUrl: 0,
// },

// 필드 이름 바꾸기
db.folders.updateMany(
  {},
  {
    $rename: {
      folder_liked: "like",
    },
  }
);

// 필드 추가하기
db.folders.updateMany(
  {},
  {
    $set: {
      share: false,
    },
  }
);

const folderItems = await db.Folder.findOne(query)
  .populate("folder_contents")
  .populate("folder_contents.item_id");
