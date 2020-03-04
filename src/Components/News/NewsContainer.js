import React from "react";
import PropTypes from "prop-types";
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

const mapStateToProps = ({ NewsReducers }) => {
  return {
    news: NewsReducers.news,
    loading: NewsReducers.loading,
    error: NewsReducers.error,
    errorMessage: NewsReducers.errorMessage
  };
};

const mapDispatchToProps = {
  fetchData
};

NewsContainer.propTypes = {
  news: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
