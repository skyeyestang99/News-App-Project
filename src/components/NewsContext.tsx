import React from "react";
import "./NewsContext.css";
// import SimpleDialogDemo from "./Dialog";

interface NewsContextProps {
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
interface NewsContextState {}

export default class NewsContext extends React.Component<
  NewsContextProps,
  NewsContextState
> {
  render() {
    // object deconstruct
    const { item } = this.props;
    const source = "http://www.theguardian.com";
    return (
      <div className="news-context">
        <h1 style={{ display: "inline-block" }}>
          {item.webTitle}
          {/* <SimpleDialogDemo  newsTitle={item.webTitle} shareUrl={item.url} /> */}
        </h1>

        <p>{item.description}</p>
        {/* <img src={item.imgUrl}></img> */}
        <div className="context-foot">
          <span className="date">{item.date.substring(0, 10)}</span>
          <div id={item.section}>{item.section.toUpperCase()}</div>
        </div>
      </div>
    );
  }
}
