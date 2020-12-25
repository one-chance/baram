import React from 'react';

import Container from '@material-ui/core/Container';

import ArcheologyList from 'components/Dictionary/ArcheologyList';

function Archeology() {
  
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <ArcheologyList />
      </Container>
    </React.Fragment>
  );
}

export default Archeology;