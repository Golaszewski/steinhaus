import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { saveAs } from 'file-saver'
//import 'Blob'

const b64ToBlob = (b64Data, contentType='', sliceSize=512) => {
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

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

var elements = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const ADD_TODO = 'ADD_TODO'
const SEL_NODE = 'SEL_NODE'
const ADD_TAR = 'ADD_TAR'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
const ADD_NET = 'ADD_NET'
const GET_DESCRIPTION = 'GET_DESCRIPTION'

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

function selNode(node) {
  return {
    type: SEL_NODE,
    node
  }
}

function addTarget(target) {
  return {
    type: ADD_TAR,
    target
  }
}

function addNetwork(network) {
  return {
    type: ADD_NET,
    network
  }
}

function updateDesc(description) {
  return {
    type: UPDATE_DESCRIPTION,
    description
  }
}

function getDesc(getdescription) {
  return {
    type: GET_DESCRIPTION,
    getdescription
  }
}



const mapStateToProps = state => ({
  node: state.node,
  target: state.target,
  destination: state.destination,
  network: state.network,
  description: state.description,
  getdescription: state.getdescription
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

    default:
      return state
  }
}


const store = createStore(cytoReduce)

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
    this.state = { value: '' };

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
      CytoSize: elements.length
    }


    this.RemoveCyNode = this.RemoveCyNode.bind(this)
    this.AddCyConnection = this.AddCyConnection.bind(this)
    this.UpdateCyDesc = this.UpdateCyDesc.bind(this)
    this.ExportCyImage = this.ExportCyImage.bind(this)
    this.ExportCyNet = this.ExportCyNet.bind(this)
  }

  handleChangeTarget(event) {
    store.dispatch(addTarget(event.target.value));
  }

  handleUpdateDesc(event) {
    store.dispatch(updateDesc(event.target.value));
  }

  RemoveCyNode() {
    const nodevar = "#" + this.props.node
    this.cy.remove(this.cy.$(nodevar));
  }

  UpdateCyDesc() {
    const newlabel = this.props.description
    const node = this.props.node
    console.log(newlabel)
    this.cy.$('#' + node).data('desc', newlabel)
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

        <CytoscapeComponent
          CytoSize={this.state.CytoSize}
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
          }}
          elements={this.state.elements}
          style={{ width: '900px', height: '800px' }}
          stylesheet={[
            {
              selector: 'node',
              style: {
                //width: 20,
                //height: 20,
                //shape: 'rectangle'
                label: 'data(label)'
              }
            },
            {
              selector: 'edge',
              style: {
                //width: 15,
                label: 'data(desc)',
                'text-margin-y': -10,
                'text-rotation': 'autorotate'
              }
            }
          ]}

        />

        <span>Description: {getdescription}</span>
        <NameForm
          Submit={this.AddCyConnection}
          handleChange={this.handleChangeTarget}
          className="Add new node"
        />

        <NameForm
          Submit={this.UpdateCyDesc}
          handleChange={this.handleUpdateDesc}
          className="Update Description"
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

      </div>
    );
  }
}
export { store };
export default connect(mapStateToProps)(MyApp);

