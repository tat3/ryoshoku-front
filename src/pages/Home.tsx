import React from 'react';
import Schedule from '../components/Schedule'
import MdLink from '../components/MdLink';

class Home extends React.Component {
  render () {
    return (
      <div>
        <Schedule />
        <MdLink />
      </div>
    )
  }
}

export default Home