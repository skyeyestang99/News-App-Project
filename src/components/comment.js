import React from "react";
import commentBox from "commentbox.io";

export default class Comment extends React.Component {
  componentDidMount() {
    const { id } = this.props;
    this.removeCommentBox = commentBox(
      "5723096048730112-proj",
      {
        createBoxUrl(boxId, pageLocation) {
          pageLocation.search = ""; // removes query string!
          pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
          return pageLocation.href; // return url string
        },
      }
      // { tlcParam: id }
    );
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <div className="commentbox" id={id}></div>
      </div>
    );
  }
}
