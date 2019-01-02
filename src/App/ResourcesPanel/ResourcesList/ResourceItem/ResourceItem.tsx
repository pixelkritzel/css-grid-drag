import * as React from 'react';
import { inject } from 'mobx-react';

import DeleteIcon from '@material-ui/icons/Delete';

import { Button } from 'src/App/Components/Button';

import { IStore } from 'src/store';
import { IResource } from 'src/store/resourceModel';
import { IUiStore } from 'src/store/uiStore';

import css from './ResourceItem.module.scss';

@inject('store', 'uiStore')
export class ResourceItem extends React.Component<{ resource: IResource; store?: IStore; uiStore?: IUiStore }> {
  deleteResource = () => {
    const { resource, store } = this.props;
    if (confirm('Yo you really want to remove the resource from the project?')) {
      store!.deleteResource(resource);
    }
  };

  onDragStart = () => {
    const { resource, uiStore } = this.props;
    uiStore!.setCurrentAction('RESOURCE_DRAG');
    uiStore!.setDraggedResource(resource);
  };

  render() {
    const { resource } = this.props;
    return (
      <div className={css.resourceItem}>
        <img className={css.resourceImage} draggable onDragStart={this.onDragStart} alt="" src={resource.url} />
        <div className={css.resourceItemTools} onClick={this.deleteResource}>
          <Button icon>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    );
  }
}
