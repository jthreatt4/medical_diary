import React, { Component } from 'react';

import { EditorBlock, EditorState } from 'draft-js';

function updateDataOfBlock(editorState, block, newData) {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
}

export default class ToDoBlock extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    const { block, blockProps } = this.props;

    // This is the reason we needed a higher-order function for blockRendererFn
    const { onChange, getEditorState } = blockProps;
    const data = block.getData();
    const checked = (data.has('checked') && data.get('checked') === true);
    const newData = data.set('checked', !checked);
    console.log(checked, 'upd');
    onChange(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    const data = this.props.block.getData();
    const checked = data.get('checked') === true;
    return <div className={checked ? 'block-todo-completed' : ''}>
      <input type="checkbox" checked={checked} onChange={this.updateData} />
      <EditorBlock {...this.props} />
    </div>;
  }
}