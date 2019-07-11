import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../../store/news/actions";
import NewsPage from "./NewsPage";
import Loading from "../Layouts/Loading";
import Message from "../Layouts/Message";

class NewsContainer extends React.Component {
  render() {
    if (this.props.error) {
      return <Message type="error" text={this.props.errorMessage} />;
    } else if (this.props.loading) {
      return (
        <div style={{ margin: "auto", width: "10%", marginTop: "10%" }}>
          <Loading />
        </div>
      );
    } else {
      return <NewsPage news={this.props.news} />;
    }
  }
  componentDidMount() {
    this.props.fetchData();
  }
}

const mapStateToProps = state => {
  return {
    news: state.NewsReducers.news,
    loading: state.NewsReducers.loading,
    error: state.NewsReducers.error,
    errorMessage: state.NewsReducers.errorMessage
  };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
