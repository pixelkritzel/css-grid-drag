import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Button } from 'src/App/Components/Button';
import { InputField } from 'src/App/Components/InputField';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { IStore } from 'src/store/store';

import CSS from './GridForm.module.scss';

@inject('store')
@observer
export class GridForm extends React.Component<{ store?: IStore }> {
  onValueChange = (name: string, value: string) => {
    const { shownGrid } = this.props.store!;
    shownGrid.updateField(name, value);
  };

  render() {
    const { shownGrid } = this.props.store!;
    return (
      <>
        <form>
          <h4>Grid styles</h4>
          <div>
            Columns:
            <div className={CSS.changeGridColumns}>
              <div>
                <Button icon onClick={() => shownGrid.changeGridItems('columns', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => shownGrid.changeGridItems('columns', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {shownGrid.columns.length - 1}
              <div>
                <Button icon onClick={() => shownGrid.changeGridItems('columns', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => shownGrid.changeGridItems('columns', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <div>
            Rows:
            <div className={CSS.changeGridRows}>
              <div>
                <Button icon onClick={() => shownGrid.changeGridItems('rows', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => shownGrid.changeGridItems('rows', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {shownGrid.rows.length - 1}
              <div>
                <Button icon onClick={() => shownGrid.changeGridItems('rows', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => shownGrid.changeGridItems('rows', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <InputField
            inline
            label="Grid Gap"
            name="gridGap"
            value={shownGrid.gridGap}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Width"
            name="cellWidth"
            type="number"
            value={shownGrid.cellWidth.toString()}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Height"
            name="cellHeight"
            type="number"
            value={shownGrid.cellHeight.toString()}
            onValueChange={this.onValueChange}
          />
          <InputField
            label="Use grid from width"
            name="startWidth"
            type="number"
            value={shownGrid.startWidth.toString()}
            onValueChange={this.onValueChange}
          />
        </form>
      </>
    );
  }
}
