import * as React from 'react';
import { inject } from 'mobx-react';

import { IUiStore } from 'src/store/uiStore';
import { IResource } from 'src/store/resourceModel';

import css from './ResourceItem.module.scss';

@inject('uiStore')
export class ResourceItem extends React.Component<{ resource: IResource; uiStore?: IUiStore }> {
  render() {
    const { resource, uiStore } = this.props;
    return (
      <img
        draggable
        onDragStart={event => uiStore!.setDraggedResource(resource)}
        className={css.resourceItem}
        alt=""
        src={resource.url}
      />
    );
  }
}
