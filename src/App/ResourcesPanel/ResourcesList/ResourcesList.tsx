import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { ResourceItem } from 'src/App/ResourcesPanel/ResourcesList/ResourceItem';

import { IStore } from 'src/store';

import css from './ResourcesList.module.scss';

@inject('store')
@observer
export class ResourcesList extends React.Component<{ store?: IStore }> {
  render() {
    const { store } = this.props;
    return (
      <div className={css.resourcesList}>
        {store!.data.resources.map(resource => (
          <ResourceItem key={`resources-list-item-${resource.id}`} resource={resource} />
        ))}
      </div>
    );
  }
}
