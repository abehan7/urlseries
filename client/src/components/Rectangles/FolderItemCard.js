import React, { useContext, useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainStates } from "../../routers/MainPage";
import HoverModal from "../styled/HoverModal.styled";
import { modalHover } from "./TotalUrlMap";
const FolderItemCardEl = styled.div`
  > img,
  > div {
    pointer-events: none;
  }
`;

const FolderItemCard = ({ clickFolders }) => {
  // useState
  const [height, setHeight] = useState(0);
  const [folderContents, setFolderContents] = useState([]);

  // redux
  const folders = useSelector((state) => state.folders.folders);

  const getFolderContents = () => {
    const selectedFolders = folders.filter((folder) => {
      return clickFolders.includes(folder._id);
    });

    const selectedContents = selectedFolders.map((folder) => {
      return folder.contents;
    });

    const contentsFlatten = selectedContents.flat(Infinity);

    const uniqueContents = [...new Set(contentsFlatten)];

    return uniqueContents;
  };

  useEffect(() => {
    const uniqueContents = getFolderContents();
    console.log("uniqueContents: ", uniqueContents);

    setFolderContents(uniqueContents);
  }, [folders, clickFolders]);

  //   useContext
  const { editMode, deleteMode } = useContext(MainStates);

  // functions
  const onMouseOut = (e) => {
    modalHover.cancel();
    e.target.lastChild.classList.remove("hover-on");
  };
  const onMouseOver = (e) => {
    modalHover(e, setHeight, height);
  };

  return (
    <>
      {folderContents.map((url) => {
        return (
          <FolderItemCardEl onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
            {!editMode && deleteMode && <Box url={url} />}
            <img
              className="urlFavicon"
              src={`http://www.google.com/s2/favicons?domain=${url.url}`}
              alt=""
            />
            <div className="just-bar">|</div>
            <div className="urlTitle">{url.url_title}</div>
            <HoverModal Height={height} url={url} />
          </FolderItemCardEl>
        );
      })}
    </>
  );
};

const BoxEl = styled.div`
  svg {
    padding-left: 10px;
  }
`;

const Box = ({ url }) => {
  return (
    <BoxEl className="select-box">
      {url.clicked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
    </BoxEl>
  );
};

export default FolderItemCard;
