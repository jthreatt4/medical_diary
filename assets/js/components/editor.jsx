import React, { Component } from 'react';
import { Map } from 'immutable';
import TodoBlock from './todo_block.jsx';
import WeightBlock from './weight_block.jsx';
import AppointmentBlock from './appointment_block.jsx';
import ExerciseBlock from './exercise_block.jsx';
import DietBlock from './diet_block.jsx';

import {
  Editor,
  EditorState,
  DefaultDraftBlockRenderMap,
  RichUtils
} from 'draft-js';

export class BulletJournalEditor extends Component {
  constructor(props) {
    super(props);

    this.blockRenderMap = Map({
      [TODO_BLOCK]: {
        element: 'div'
      },
      [DIET]: {
        element: 'div'
      },
      [EXERCISE]: {
        element: 'div'
      },
      [APPOINTMENT]: {
        element: 'div'
      },
      [WEIGHT]: {
        element: 'div'
      },
    }).merge(DefaultDraftBlockRenderMap);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => this.setState({editorState});


    this.blockRendererFn = this.props.blockRendererFn(() => this.state.editorState, this.onChange);

    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  handleBeforeInput(char) {
    // previous text + current character matches
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const currentBlock = editorState.getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    for (let [match, handle_match] of this.props.matchers) {
      const match_result = match(currentText + char, currentBlock);
      if (match_result) {
        this.onChange(handle_match(match_result, editorState, currentBlock));
        return true;
      }
    }
    return false;
  }

  blockStyleFn(block) {
    switch(block.getType()) {
      case TODO_BLOCK:
        return 'block block-todo';
      default:
        return 'block';
    }
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  handleReturn(e, editorState) {
    this.props.handleReturn(e, editorState);
    editorState = EditorState.createEmpty();
    this.setState({editorState});
    return 'handled';
  }

  render() {
    return <Editor ref='editor'
                   editorState={this.state.editorState}
                   onChange={this.onChange}
                   blockRendererFn={this.blockRendererFn}
                   blockRendererMap={this.blockRenderMap}
                   blockStyleFn={this.blockStyleFn}
                   handleKeyCommand={this.handleKeyCommand}
                   handleBeforeInput={this.handleBeforeInput}
                   handleReturn={this.handleReturn}
    />
  }
}

// export default class NoteBookListEditor extends Component {
//   constructor (props) {
//     super(props);
//
//     this.blockRenderMap = Map({
//       [TODO_BLOCK]: {
//         element: 'div'
//       }
//     }).merge(DefaultDraftBlockRenderMap);
//
//     this.state = {
//       editorState: EditorState.createEmpty()
//     };
//
//     this.onChange = (editorState) => this.setState({editorState});
//
//     this.getEditorState = () => this.state.editorState;
//
//     this.blockRendererFn = getBlockRendererFn(this.getEditorState, this.onChange);
//
//     this.handleBeforeInput = this.handleBeforeInput.bind(this);
//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//   }
//
//   componentDidMount() {
//     this.refs.editor.focus();
//   }
//
//   blockStyleFn(block) {
//     switch(block.getType()) {
//       case TODO_BLOCK:
//         return 'block block-todo';
//       default:
//         return 'block';
//     }
//   }
//
//   handleBeforeInput(str) {
//     if (str !== ']') {
//       return false;
//     }
//     const { editorState } = this.state;
//     // Get the selection
//     const selection = editorState.getSelection();
//
//     // get the current block
//     const currentBlock = editorState.getCurrentContent()
//       .getBlockForKey(selection.getStartKey());
//     const blockType = currentBlock.getType();
//     const blockLength = currentBlock.getLength();
//     if (blockLength === 1 && currentBlock.getText() === '[') {
//       this.onChange(resetBlockType(editorState, blockType !== TODO_BLOCK ? TODO_BLOCK : 'unstyled'));
//       return true;
//     }
//     return false;
//   }
//
//   handleKeyCommand(command) {
//     const { editorState } = this.state;
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }
//
//   render() {
//     return <Editor
//       ref="editor"
//       placeholder="Write here. Type [ ] to add a todo..."
//       editorState={this.state.editorState}
//       onChange={this.onChange}
//       blockRenderMap={this.blockRenderMap}
//       blockRendererFn={this.blockRendererFn}
//       blockStyleFn={this.blockStyleFn}
//       handleBeforeInput={this.handleBeforeInput}
//       handleKeyCommand={this.handleKeyCommand}
//     />
//   }
// }


const TODO_BLOCK = 'todo';
const EXERCISE = 'exercise';
const DIET = 'diet';
const APPOINTMENT = 'appointment';
const WEIGHT = 'weight';

export function getBlockRendererFn(getEditorState, onChange) {
  return block => {
    const type = block.getType();
    switch(type) {
      case TODO_BLOCK:
        return {
          component: TodoBlock,
          props: {
            getEditorState,
            onChange,
          }
        };
        case EXERCISE:
        return {
          component: ExerciseBlock,
          props: {
            getEditorState,
            onChange,
          }
        };
        case DIET:
        return {
          component: DietBlock,
          props: {
            getEditorState,
            onChange,
          }
        };
        case APPOINTMENT:
        return {
          component: AppointmentBlock,
          props: {
            getEditorState,
            onChange,
          }
        };
        case WEIGHT:
        return {
          component: WeightBlock,
          props: {
            getEditorState,
            onChange,
          }
        };
      default:
        return null;
    }
  }
}

// function getDefaultBlockData(blockType, initialData={}) {
//   switch(blockType) {
//     case TODO_BLOCK: return {checked:false};
//     default: return initialData;
//   }
// }

// function resetBlockType(editorState, newType='unstyled') {
//   const contentState = editorState.getCurrentContent();
//   const selectionState = editorState.getSelection();
//   const key = selectionState.getStartKey();
//   const blockMap = contentState.getBlockMap();
//   const block = blockMap.get(key);
//   let newText = '';
//   const text = block.getText();
//   if (block.getLength() >= 2) {
//     newText = text.substr(1);
//   }
//   const newBlock = block.merge({
//     text: newText,
//     type: newType,
//     data: getDefaultBlockData(newType)
//   });
//   const newContentState = contentState.merge({
//     blockMap: blockMap.set(key, newBlock),
//     selectionAfter: selectionState.merge({
//       anchorOffset: 0,
//       focusOffset: 0
//     })
//   });
//   return EditorState.push(editorState, newContentState, 'change-block-type');
// }