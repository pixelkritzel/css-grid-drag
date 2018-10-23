import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Button } from 'src/App/Components/Button';
import { InputField } from 'src/App/Components/InputField';

import { ElementForm } from '../ElementForm';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { IGridModel } from 'src/store/gridModel';
import { IUiStore } from 'src/store/uiStore';

import CSS from './GridForm.module.scss';

@inject('uiStore')
@observer
export class GridForm extends React.Component<{ gridStore: IGridModel; uiStore?: IUiStore }> {
  onValueChange = (name: string, value: string) => {
    const { gridStore } = this.props;
    gridStore.updateField(name, value);
  };

  render() {
    const { gridStore, uiStore } = this.props;
    return (
      <>
        <form>
          <h4>Grid styles</h4>
          <div>
            Columns:
            <div className={CSS.changeGridColumns}>
              <div>
                <Button icon onClick={() => gridStore.changeGridItems('columns', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => gridStore.changeGridItems('columns', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {gridStore.columns.length - 1}
              <div>
                <Button icon onClick={() => gridStore.changeGridItems('columns', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => gridStore.changeGridItems('columns', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <div>
            Rows:
            <div className={CSS.changeGridRows}>
              <div>
                <Button icon onClick={() => gridStore.changeGridItems('rows', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => gridStore.changeGridItems('rows', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {gridStore.rows.length - 1}
              <div>
                <Button icon onClick={() => gridStore.changeGridItems('rows', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => gridStore.changeGridItems('rows', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <InputField
            inline
            label="Grid Gap"
            name="gridGap"
            value={gridStore.gridGap}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Width"
            name="cellWidth"
            type="number"
            value={gridStore.cellWidth.toString()}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Height"
            name="cellHeight"
            type="number"
            value={gridStore.cellHeight.toString()}
            onValueChange={this.onValueChange}
          />
        </form>
        <h4>Elements</h4>
        {gridStore.elements.map((element, index) => (
          <ElementForm
            key={`element-form-${element.id}`}
            element={element}
            gridStore={gridStore}
            index={index}
            open={uiStore!.selectedElement === element}
          />
        ))}
      </>
    );
  }
}
