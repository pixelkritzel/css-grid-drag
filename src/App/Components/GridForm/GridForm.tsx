import * as React from 'react';
import { observer } from 'mobx-react';

import { InputField } from 'src/App/Components/InputField';

import { IGridModel } from 'src/store/gridModel';

@observer
export class GridForm extends React.Component<{ gridStore: IGridModel }> {
  onValueChange = (name: string, value: string) => {
    const { gridStore } = this.props;
    gridStore.updateField(name, value);
  };

  render() {
    const { gridStore } = this.props;
    return (
      <form>
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
    );
  }
}
