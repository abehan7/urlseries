import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import { grabNowValue } from "./movingModalFuncs";
import Axios from "axios";

const DeleteMode = ({
  oneUrl: value,
  setGetUrls: setUrls,
  getUrls: urls,
  where: hashOrTotal,
}) => {
  value.clicked = !value.clicked;
  value.clicked === undefined && (value.clicked = true);
  setUrls(
    urls.map((url) => {
      return url._id === value._id ? value : url;
    })
  );

  console.log("여기는 테스트 url입니다");
  urls.forEach((val) => {
    val.clicked === true && console.log(val.url_title);
  });
};

const FuncEditMode = ({
  oneUrl: value,
  deleteMode,
  setMyFav,
  setGetUrls: setUrls,
  getUrls: urls,
  where: hashOrTotal,
}) => {
  console.log("에디터모드입니다");
  if (deleteMode) {
    DeleteMode({
      oneUrl: value,
      setGetUrls: setUrls,
      getUrls: urls,
      where: hashOrTotal,
    });
  } else {
    EditMode_ModalFunc(value);
    grabNowValue.cancel();
    setMyFav(value.url_likedUrl === 1);
  }
};

const NormalMode = ({ oneUrl: value }) => {
  window.open(value.url);
  Axios.put("http://localhost:3001/clickedURLInBox", { url: value });
};

export const whenIclickUrl = ({
  oneUrl: value,
  deleteMode,
  editMode,
  setMyFav,
  setGetUrls: setUrls,
  getUrls: urls,
  where: hashOrTotal,
}) => {
  !editMode
    ? FuncEditMode({
        oneUrl: value,
        deleteMode,
        setMyFav,
        setGetUrls: setUrls,
        getUrls: urls,
        where: hashOrTotal,
      })
    : NormalMode({ oneUrl: value });
};
