import * as React from "react";
import { Component } from "react";
import Header from "./header";
import NewsItem from "./NewsItem";
import Comment from "./comment";
import { RouteComponentProps } from "react-router-dom";
import Loading from "./loading";
interface NewsListState {
  data: any[];
  isLoading: boolean;
}

export default class NewsList extends Component<
  RouteComponentProps & {},
  NewsListState
> {
  state: NewsListState = {
    data: [],
    isLoading: true,
  };
  componentDidMount() {
    const { match, location } = this.props;
    console.log(`localhost:3000/guardian${match.url}`);
    fetch(`http://localhost:3000/guardian${match.url}`)
      .then((result) => {
        return result.json();
      })
      // .then((result) => {
      //   console.log(result);
      //   return result;
      // })
      .then((result) =>
        this.setState({ data: result.returns, isLoading: false })
      );

    //  console.log("componentDidMount!");
  }
  componentDidUpdate() {
    // console.log("componentDidUpdate!");
  }

  render() {
    // console.log("render!");
    const { match, location } = this.props;
    // console.log("match", match);
    // console.log("location", location);
    // console.log("topic", match.url.substring(1));
    const section = match.url.substring(1);
    return (
      <div>
        <Header />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="news-list">
            {this.state.data
              // .filter((item) => item.section === section || section === "")
              .map(
                (
                  item: {
                    webTitle: string;
                    date: string;
                    description: string;
                    imgUrl: string;
                    id: string;
                    url: string;
                    section: string;
                  },
                  index: number
                ) => {
                  return <NewsItem key={index} item={item} />;
                }
              )}
            {/* {this.state.isLoaded ? (
          this.state.results.map((item, index) => {
            return <NewsItem key={index} item={item} />;
          })
        ) : (
          <Loading></Loading>
        )} */}
          </div>
        )}

        <Comment />
      </div>
    );
  }
}
