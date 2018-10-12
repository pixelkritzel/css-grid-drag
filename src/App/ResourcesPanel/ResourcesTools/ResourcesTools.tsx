import * as React from 'react';

import { AddResourceButton } from './AddResourceButton';

import CSS from './ResourcesTools.module.scss';

export class ResourcesTools extends React.Component {
  render() {
    return (
      <div className={CSS.resourcesTools}>
        <AddResourceButton />
      </div>
    );
  }
}
