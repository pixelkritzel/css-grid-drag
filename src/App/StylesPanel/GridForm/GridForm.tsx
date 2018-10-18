import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { InputField } from 'src/App/Components/InputField';
import { ElementForm } from '../ElementForm';

import { IGridModel } from 'src/store/gridModel';
import { IUiStore } from 'src/store/uiStore';

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
          <p>
            Columns: {gridStore.columns.length - 1}
            <button type="button" onClick={() => gridStore.changeGridItems('columns', 'decrement')}>
              -
            </button>
            <button type="button" onClick={() => gridStore.changeGridItems('columns', 'increment')}>
              +
            </button>
          </p>
          <p>
            Rows: {gridStore.rows.length - 1}
            <button type="button" onClick={() => gridStore.changeGridItems('rows', 'decrement')}>
              -
            </button>
            <button type="button" onClick={() => gridStore.changeGridItems('rows', 'increment')}>
              +
            </button>
          </p>
          <InputField label="Grid Gap" name="gridGap" value={gridStore.gridGap} onValueChange={this.onValueChange} />
          <InputField
            label="Cell Width"
            name="cellWidth"
            type="number"
            value={gridStore.cellWidth.toString()}
            onValueChange={this.onValueChange}
          />
          <InputField
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
