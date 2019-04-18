import React, { Component } from 'react';
import {Card, CardText, CardTitle} from "material-ui/Card/index";


export default class Card extends Component {
  render() {
    return (<Card>
      <CardTitle>{this.props.title}</CardTitle>
      <CardText>{this.props.text}</CardText>
      <CardText>{this.props.additional_text}</CardText>
    </Card>);
  }
}

