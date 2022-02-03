import styled from "styled-components";

export const LoginStyles = {
  main_btn_size: "250px",
  main_border_radius: "8px",
  main_btn_height: "43px",
  btn_padding: "0 1rem",
  btn_font_color: "#757575",
  btn_font_size: "font-size: 14px;",
};

export const LoginWrapper = styled.div`
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;
