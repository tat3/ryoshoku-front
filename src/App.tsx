import React from 'react';
import Container from '@material-ui/core/Container';
import TopBar from './components/TopBar'
import Schedule from './components/Schedule'

export default function App() {
  return (
    <div>
      <TopBar />
      <Container maxWidth="sm">
        <Schedule />
      </Container>
    </div>
  )
}
