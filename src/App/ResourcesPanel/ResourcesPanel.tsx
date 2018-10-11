import * as React from 'react';

import { ResourcesList } from 'src/App/ResourcesPanel/ResourcesList';

export class ResourcesPanel extends React.Component {
  render() {
    return (
      <>
        <em>ResourcesPanel</em>
        <ResourcesList />
      </>
    );
  }
}
