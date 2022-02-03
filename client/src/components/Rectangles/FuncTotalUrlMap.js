import EditMode_ModalFunc from "../editModeFucs/EditMode_ModalFunc";
import Axios from "axios";
import { UrlDetailActions } from "../../store/reducers/ClickedUrlDetails";
import { ClickUrl } from "../Api";

const whenIclickUrl = ({
  oneUrl: value,
  deleteMode,
  editMode,
  setMyFav,
  setGetUrls: setUrls,
  getUrls: urls,
  where: hashOrTotal,
  dispatch,
}) => {
  // FIXME: 리덕스

  const setUrlDetail = (detail) => {
    dispatch(UrlDetailActions.SetClickedUrl(detail));
  };

  //FIXME: 삭제모드
  const DeleteMode = () => {
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

  //FIXME: 수정모드
  const FuncEditMode = () => {
    console.log("에디터모드입니다");
    if (deleteMode) {
      DeleteMode({
        oneUrl: value,
        setGetUrls: setUrls,
        getUrls: urls,
        where: hashOrTotal,
      });
    } else {
      EditMode_ModalFunc(value, setUrlDetail);
      setMyFav(value.url_likedUrl === 1);
      // 리덕스로 클릭한거 넣기
      // setUrlDetail({
      //   url: value.url,
      //   title: value.url_title,
      //   hashTags: value.url_hashTags,
      //   memo: value.url_memo,
      // });
    }
  };

  //FIXME: 일반모드
  const NormalMode = () => {
    window.open(value.url);
    ClickUrl(value);
    // Axios.put("http://localhost:3001/clickedURLInBox", { url: value });
  };

  // FIXME: 맨 처음 클릭

  !editMode ? FuncEditMode() : NormalMode();
};

export default whenIclickUrl;
