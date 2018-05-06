import React, { Component } from 'react';
import { EditorBlock, EditorState } from 'draft-js';

import { updateDataOfBlock } from "../utils.jsx";

export default class AppointmentBlock extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    const { block, blockProps } = this.props;

    // This is the reason we needed a higher-order function for blockRendererFn
    const { onChange, getEditorState } = blockProps;
    const data = block.getData();
    // const checked = (data.has('checked') && data.get('checked') === true);
    const newData = data.set('tag', data.get('tag'));
    console.log(checked, 'upd');
    onChange(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    const data = this.props.block.getData();
    return <div>
      <EditorBlock {...this.props} />
      <span className="appointment-tag">#Appointment</span>
    </div>;
  }
}
