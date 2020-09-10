import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { saveAs } from 'file-saver';
import MyAppWithBackground from './cytopic.js';

//var cytoscape = require('cytoscape');
//var cyCanvas = require('cytoscape-canvas')
//cyCanvas(cytoscape)
//import 'Blob'

export const b64ToBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

var elements = [];

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//function submitImage(imagelink){
const background = new Image();
background.src = window.o
//}

export const ADD_TODO = 'ADD_TODO'
export const SEL_NODE = 'SEL_NODE'
export const ADD_TAR = 'ADD_TAR'
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const ADD_NET = 'ADD_NET'
export const GET_DESCRIPTION = 'GET_DESCRIPTION'
export const UPDATE_NODECOLOR = 'UPDATE_NODECOLOR'
export const UPDATE_EDGECOLOR = 'UPDATE_EDGECOLOR'
export const UPDATE_EDGEWIDTH = 'UPDATE_EDGEWIDTH'
export const UPDATE_NODESIZE = 'UPDATE_NODESIZE'

const initialState = {
  node: '',
  todos: ['',]
}

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function selNode(node) {
  return {
    type: SEL_NODE,
    node
  }
}

export function addTarget(target) {
  return {
    type: ADD_TAR,
    target
  }
}

export function updateNodeColor(nodecolor) {
  return {
    type: UPDATE_NODECOLOR,
    nodecolor
  }
}

export function updateEdgeColor(edgecolor) {
  return {
    type: UPDATE_EDGECOLOR,
    edgecolor
  }
}

export function updateEdgeWidth(edgewidth) {
  return {
    type: UPDATE_EDGEWIDTH,
    edgewidth
  }
}

export function updateNodeSize(nodesize) {
  return {
    type: UPDATE_NODESIZE,
    nodesize
  }
}

export function addNetwork(network) {
  return {
    type: ADD_NET,
    network
  }
}

export function updateDesc(description) {
  return {
    type: UPDATE_DESCRIPTION,
    description
  }
}

export function getDesc(getdescription) {
  return {
    type: GET_DESCRIPTION,
    getdescription
  }
}



export const mapStateToProps = state => ({
  node: state.node,
  target: state.target,
  destination: state.destination,
  network: state.network,
  description: state.description,
  getdescription: state.getdescription,
  nodecolor: state.nodecolor,
  edgecolor: state.edgecolor,
  edgewidth: state.edgewidth,
  nodesize: state.nodesize
})



function cytoReduce(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })

    case SEL_NODE:
      return Object.assign({}, state, {
        node: action.node
      })

    case ADD_TAR:
      return Object.assign({}, state, {
        target: action.target
      })

    case UPDATE_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.description
      })

    case ADD_NET:
      return Object.assign({}, state, {
        network: action.network
      })

    case GET_DESCRIPTION:
      return Object.assign({}, state, {
        getdescription: action.getdescription
      })

    case UPDATE_NODECOLOR:
      return Object.assign({}, state, {
        nodecolor: action.nodecolor
      })

    case UPDATE_EDGECOLOR:
      return Object.assign({}, state, {
        edgecolor: action.edgecolor
      })

    case UPDATE_EDGEWIDTH:
      return Object.assign({}, state, {
        edgewidth: action.edgewidth
      })

    case UPDATE_NODESIZE:
      return Object.assign({}, state, {
        nodesize: action.nodesize
      })

    default:
      return state
  }
}


const store = createStore(cytoReduce)

class OrientLabel extends React.Component {
  constructor() {
    super();
    this.state = {
      //name: "React"
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    this.props.onChange(event.target.value);
    console.log(event.target.value)
  }

  render() {
    return (
      <div onChange={this.onChangeValue}>
         <div><input type="radio" value="0" name="orient" /> Top Left</div>
         <div><input type="radio" value="1" name="orient" /> Top Middle</div>
        <div><input type="radio" value="2" name="orient" /> Top Right</div>
        <div><input type="radio" value="3" name="orient" /> Middle Right</div>
        <div><input type="radio" value="4" name="orient" /> Bottom Right</div>
        <div><input type="radio" value="5" name="orient" /> Bottom Middle</div>
        <div><input type="radio" value="6" name="orient" /> Bottom Left</div>
        <div><input type="radio" value="7" name="orient" /> Middle Left</div>
      </div>
    );
  }
}
OrientLabel = connect(mapStateToProps)(OrientLabel)

//export OrientLabel;

class Simpletextarea extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  handleChange(event) {
    store.dispatch(addNetwork(event.target.value))
    //this.setState({ value: event.target.value });
  }

  //handleChange(event) {
  //  console.log(event.target.value)
  //}

  render() {
    return (
      <div>
        <textarea type="textarea"
          name="textValue"
          //defaultvalue={1000}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
Simpletextarea = connect(mapStateToProps)(Simpletextarea)


class Button extends React.Component {
  render() {

    const {
      onClick,
      className,
      children,
    } = this.props;

    return (
      <button
        onClick={this.props.onClick}
        className={className}
        type="button"
      >
        {className}
      </button>
    );
  };
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handleChange(event) {
  //  store.dispatch(addTarget(event.target.value))
  //  this.setState({ value: event.target.value });
  //}

  render() {
    return (
      <form onSubmit={e => {

        e.preventDefault();
        this.props.Submit()

      }}>
        <label>

          <input type="text" value={this.state.value}
            onChange={e => {
              this.props.handleChange(e)
              this.setState({ value: e.target.value })
            }} />
        </label>
        <input type="submit" value={this.props.className} />
      </form>
    );
  }
}

NameForm = connect(mapStateToProps)(NameForm)

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elements,
      isclicked: '',
      CytoSize: elements.length,
      loaded: false
    }


    this.RemoveCyNode = this.RemoveCyNode.bind(this)
    this.AddCyConnection = this.AddCyConnection.bind(this)
    this.UpdateCyDesc = this.UpdateCyDesc.bind(this)
    this.ExportCyImage = this.ExportCyImage.bind(this)
    this.ExportCyNet = this.ExportCyNet.bind(this)
    this.SubmitNodeColor = this.SubmitNodeColor.bind(this)
    this.SubmitEdgeColor = this.SubmitEdgeColor.bind(this)
    this.handleUpdateEdgeColor = this.handleUpdateEdgeColor.bind(this)
    this.handleUpdateEdgeWidth = this.handleUpdateEdgeWidth.bind(this)
    this.SubmitEdgeWidth = this.SubmitEdgeWidth.bind(this)
    this.SubmitNodeSize = this.SubmitNodeSize.bind(this)
    this.handleUpdateNodeSize = this.handleUpdateNodeSize.bind(this)
    this.OrientNodeLabel=this.OrientNodeLabel.bind(this)
  }

  componentDidMount() {
    console.log('Regular Component DID MOUNT!')
    //this.cy.destroy()
  }

  handleChangeTarget(event) {
    store.dispatch(addTarget(event.target.value));
  }

  handleUpdateDesc(event) {
    store.dispatch(updateDesc(event.target.value));
  }

  handleUpdateNodeColor(event) {
    store.dispatch(updateNodeColor(event.target.value));
  }

  handleUpdateEdgeColor(event) {
    store.dispatch(updateEdgeColor(event.target.value));
  }

  handleUpdateEdgeWidth(event) {
    store.dispatch(updateEdgeWidth(event.target.value));
  }

  handleUpdateNodeSize(event) {
    store.dispatch(updateNodeSize(event.target.value));
  }

  RemoveCyNode() {
    const nodevar = "#" + this.props.node
    this.cy.remove(this.cy.$(nodevar));
  }

  OrientNodeLabel(id) {
    const node=this.props.node
    var horizontal=''
    var vertical=''
    switch (id) {
      case "0":
        horizontal='left'
        vertical='top'
        break;
      case "1":
        horizontal='center'
        vertical='top'
        break;
      case "2":
        horizontal='right'
        vertical='top'
        break;
      case "3":
        horizontal='right'
        vertical='center'
        break;
      case "4":
        horizontal='right'
        vertical='bottom'
        break;
      case "5":
        horizontal='center'
        vertical='bottom'
        break;
      case "6":
        horizontal='left'
        vertical='bottom'
        break;
      case "7":
        horizontal='left'
        vertical='center'
        break;

      default:
        horizontal='center'
        vertical='top'
    }
    this.cy.$('#' + node).style('text-halign', horizontal)
    this.cy.$('#' + node).style('text-valign',vertical)
    console.log(this.cy.$('#' + node).style())
    console.log(typeof id)
    console.log(vertical)
    console.log(horizontal)
  }

  UpdateCyDesc() {
    const newlabel = this.props.description
    const node = this.props.node
    console.log(newlabel)
    this.cy.$('#' + node).data('desc', newlabel)
  }

  SubmitEdgeWidth() {
    const newwidth = this.props.edgewidth
    //const node = this.props.node
    //console.log(newlabel)
    //this.cy.$('#' + node).data('desc', newlabel)
    this.cy.style()
      .selector('edge')
      .style({
        'width': newwidth
      }).update()


    console.log("submitted" + newwidth)
  }

  SubmitNodeColor() {
    const newcolor = this.props.nodecolor
    //const node = this.props.node
    //console.log(newlabel)
    //this.cy.$('#' + node).data('desc', newlabel)
    this.cy.style()
      .selector('node')
      .style({
        'background-color': newcolor
      }).update()


    console.log("submitted" + newcolor)
  }

  SubmitEdgeColor() {
    const newcolor = this.props.edgecolor
    //const node = this.props.node
    //console.log(newlabel)
    //this.cy.$('#' + node).data('desc', newlabel)
    this.cy.style()
      .selector('edge')
      .style({
        'line-color': newcolor
      }).update()


    console.log("submitted" + newcolor)
  }


  SubmitNodeSize() {
    const nodesize = this.props.nodesize
    //const node = this.props.node
    //console.log(newlabel)
    //this.cy.$('#' + node).data('desc', newlabel)
    this.cy.style()
      .selector('node')
      .style({
        'height': nodesize,
        'width': nodesize
      }).update()


    console.log("submitted" + nodesize)
  }

  ExportCyNet() {
    var jsonBlob = new Blob([JSON.stringify(this.cy.json())], { type: 'application/javascript;charset=utf-8' });
    saveAs(jsonBlob, 'graph.txt');

  }


  AddCyConnection() {

    const node = this.props.node
    const target = this.props.target

    if (node == '') {
      this.cy.add([
        { group: 'nodes', data: { id: "n" + this.state.CytoSize.toString(), label: target, desc: '' }, position: { x: 230, y: 300 } },
      ]);
    }
    else {
      this.cy.add([
        { group: 'nodes', data: { id: "n" + this.state.CytoSize.toString(), label: target }, position: { x: 230, y: 300 } },
        { group: 'edges', data: { id: 'e' + this.state.CytoSize.toString(), source: "n" + this.state.CytoSize.toString(), target: node, desc: '' } }
      ]);
    }
    this.setState({ CytoSize: this.state.CytoSize + 1 })

  }

  ExportCyImage() {
    var b64key = 'base64,';
    var b64 = this.cy.png().substring(this.cy.png().indexOf(b64key) + b64key.length);
    var imgBlob = b64ToBlob(b64, 'image/png');
    saveAs(imgBlob, 'graph.png');
  }

  AddCyEdge(destination) {
    const node = this.props.node

    this.cy.add([
      { group: 'edges', data: { id: 'e' + this.state.CytoSize.toString(), source: node, target: destination, desc: '' } }
    ]);
  }


  render() {

    const currentnode = this.props.node
    const description = this.props.description
    const network = this.props.network
    const getdescription = this.props.getdescription

    return (
      <div>
        <Button onClick={() => this.cy.unmount()} className="Destroy Graph" />
        <CytoscapeComponent
          cy={(cy) => {
            this.cy = cy
            cy.on('tap', function (evt) {

              if (evt.target === cy) {
                store.dispatch(selNode(''))
              }
              else {
                var node = evt.target;
                var selector = '#' + store.getState().node

                console.log('clicked ID' + node.data('label'))

                console.log('log ' + selector)
                console.log(cy.json())
                store.dispatch(selNode(node.id()))
                store.dispatch(getDesc(cy.$(selector).data('desc')))
              }
            })
            cy.on('cxttap', 'node', function (evt) {
              var nodetarget = evt.target.id();
              cy.add([
                {
                  group: 'edges', data: {
                    id: 'e' + getRandomInt(1000).toString(), //+ //this.state.CytoSize.toString(),
                    source: store.getState().node,
                    target: nodetarget
                  }
                }
              ])
            })
            //var layer = this.cy.cyCanvas();
            //var canvas = layer.getCanvas();
            //var ctx = canvas.getContext('2d');




          }}
          elements={this.state.elements}

          style={{ width: '750px', height: '600px' }}
          wheelSensitivity={0.6}
        /* stylesheet={[
          {
            selector: 'node',
            style: {
              width: 10,
              height: 10,
              'background-color': '#666',
              label: 'data(label)'
            }
          },
          {
            selector: 'edge',
            style: {
              width: 5,
              label: 'data(desc)',
              'text-margin-y': -10,
              'text-rotation': 'autorotate',
              'line-color': '#000000',
            }
          }
        ]} */




        />

        <span>Description: {getdescription}</span>
        <span>{this.props.node}</span>
        <NameForm
          Submit={this.AddCyConnection}
          handleChange={this.handleChangeTarget}
          className="Add new node"
          norender={true}
        />

        <NameForm
          Submit={this.UpdateCyDesc}
          handleChange={this.handleUpdateDesc}
          className="Update Description"
          norender={true}
        />

        <NameForm
          Submit={this.SubmitNodeColor}
          handleChange={this.handleUpdateNodeColor}
          className="Change Node Color"
          norender={true}
        />

        <NameForm
          Submit={this.SubmitEdgeColor}
          handleChange={this.handleUpdateEdgeColor}
          className="Change Edge Color"
          norender={true}
        />

        <NameForm
          Submit={this.SubmitEdgeWidth}
          handleChange={this.handleUpdateEdgeWidth}
          className="Change Edge Width"
          norender={true}
        />

        <NameForm
          Submit={this.SubmitNodeSize}
          handleChange={this.handleUpdateNodeSize}
          className="Change Node Size"
          norender={true}
        />

        <Button onClick={this.RemoveCyNode} className="Remove Node" />
        <Button onClick={this.ExportCyImage} className="Export Image" />

        <div>
          <Simpletextarea />
        </div>

        <div>
          <Button onClick={() => this.cy.json(JSON.parse(network))} className="Import Network" />
        </div>

        <div>
          <Button onClick={this.ExportCyNet} className="Export Network" />
        </div>

        <OrientLabel onChange={this.OrientNodeLabel}/>
      </div>
    );


  }
}







class OuterApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagelink: '',
      loadimage: 'empty',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ imagelink: event.target.value });
  }

  handleSubmit() {
    this.setState({ loadimage: this.state.imagelink })
  }

  render() {
    const loadimage = this.state.loadimage
    let cytograph;
    if (loadimage == 'empty') {
      cytograph = <span>Click submit</span>;
    }
    else if (loadimage == '') {
      cytograph = <MyApp />;
    }

    else {
      cytograph = <MyAppWithBackground imageurl={this.state.loadimage} />;
    }
    return (
      <div>
        <NameForm
          handleChange={this.handleChange}
          Submit={this.handleSubmit}
          norender={true}
        />
        {cytograph}
      </div>
    );
  };
}

MyApp = connect(mapStateToProps)(MyApp);
export default OuterApp;


export {
  NameForm,
  Button,
  Simpletextarea,
  OrientLabel,
}
export { store };

