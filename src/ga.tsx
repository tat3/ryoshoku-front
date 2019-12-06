import React from "react"
import ReactGA from "react-ga"
import { RouteComponentProps, withRouter } from "react-router-dom";

const { NODE_ENV } = process.env

if (NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA)
}

const withTracker = <T, >(WrappedComponent: React.ComponentType<T>, options = {}) => {
  type Props = T & RouteComponentProps
  const trackPage = (page: string) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  if (NODE_ENV !== 'production') {
    return withRouter(class extends React.Component<Props> {
      render () {
        return <WrappedComponent {...this.props} />
      }
    })
  }

  const HOC = class extends React.Component<Props> {
    componentDidMount() {
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page);
    }

    componentDidUpdate(prevProps: Props) {
      const currentPage = prevProps.location.pathname + prevProps.location.search;
      const nextPage = this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return withRouter(HOC);
};

export { withTracker }
