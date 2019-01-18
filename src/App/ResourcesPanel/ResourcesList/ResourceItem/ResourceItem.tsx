import * as React from 'react';
import { inject, observer } from 'mobx-react';

import DeleteIcon from '@material-ui/icons/Delete';

import { Button } from 'src/App/Components/Button';

import { IStore } from 'src/store';
import { IResource } from 'src/store/resourceModel';

import css from './ResourceItem.module.scss';

@inject('store')
@observer
export class ResourceItem extends React.Component<{ resource: IResource; store?: IStore }> {
  deleteResource = () => {
    const { resource, store } = this.props;
    const { data: dataStore } = store!;
    if (confirm('Yo you really want to remove the resource from the project?')) {
      dataStore!.deleteResource(resource);
    }
  };

  onDragStart = () => {
    const store = this.props.store!;
    store.setCurrentAction('RESOURCE_DRAG');
    store.setDraggedResource(this.props.resource);
  };

  render() {
    const { resource } = this.props;
    return (
      <div className={css.resourceItem}>
        <img className={css.resourceImage} draggable onDragStart={this.onDragStart} alt="" src={resource.url} />
        <div className={css.resourceItemTools}>
          <Button icon onClick={this.deleteResource} disabled={resource.isUsed}>
            <DeleteIcon />
          </Button>
        </div>
      </div>
    );
  }
}
