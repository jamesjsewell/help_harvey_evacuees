import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export default function (ComposedComponent) {

  class Authentication extends Component {
    
    constructor(props) {
    
      super(props);
      this.state = {
        color: 'red'
      };

      contextTypes = {
        router: PropTypes.object.isRequired
      }

    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}