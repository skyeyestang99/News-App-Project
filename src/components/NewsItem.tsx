import React from "react";
import "./NewsItem.css";
import NewsContext from "./NewsContext";
// import SimpleDialogDemo from "./Dialog";

interface NewsItemProp {
  item: {
    webTitle: string;
    date: string;
    description: string;
    imgUrl: string;
    id: string;
    url: string;
    section: string;
  };
}
interface NewsItemState {}

export default class NewsItem extends React.Component<
  NewsItemProp,
  NewsItemState
> {
  state = {};

  render() {
    // this.props.imgLink = "lake.jpg";
    const { item } = this.props;

    // console.log(item);
    const imgUrl = item.imgUrl;
    // console.log(imgUrl);
    return (
      <a href={`/article?id=${item.id}`} style={{ all: "unset" }}>
        <div className="news-container">
          <div className="img-container">
            <img src={imgUrl} alt="" />
          </div>
          {/*<img src={imgUrl} alt=""/>*/}
          <NewsContext item={item} />
        </div>
      </a>
    );
  }
}
