import * as React from 'react';

import { ResourcesList } from 'src/App/ResourcesPanel/ResourcesList';
import { ResourcesTools } from 'src/App/ResourcesPanel/ResourcesTools';

import CSS from './ResourcesPanel.module.scss';

export class ResourcesPanel extends React.Component {
  render() {
    return (
      <div className={CSS.resourcesPanel}>
        <ResourcesTools />
        <ResourcesList />
      </div>
    );
  }
}
