import React from "react";
import { css } from "@emotion/react";
import CSS from "csstype";
// import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from "react-spinners/BounceLoader";
// import { Bounce } from "react-toastify";
import "./Loading.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const style: CSS.Properties = {
  // Add a missing property
  ["display" as any]: "block",

  // Add a CSS Custom Property
  ["margin" as any]: "0 auto",
  ["border-color" as any]: "red",
};

export default class AwesomeComponent extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       loading: true,
  //     };
  //   }

  render() {
    return (
      <div className="sweet-loading">
        <BounceLoader
          cssOverride={style}
          size={40}
          color={"#123abc"}
          loading={true}
        />
        <p>loading</p>
      </div>
    );
  }
}
