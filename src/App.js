import React from 'react';
import ReactDOM from 'react-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import { useState, useEffect } from 'react';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'



var elements = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const ADD_TODO = 'ADD_TODO'
const SEL_NODE = 'SEL_NODE'
const ADD_TAR = 'ADD_TAR'
const CRE_EDGE = 'CRE_EDGE'

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

function createEdge(destination) {
  return {
    type: CRE_EDGE,
    destination
  }
}



const mapStateToProps = state => ({
  node: state.node,
  target: state.target,
  destination: state.destination,
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

    case CRE_EDGE:
      return Object.assign({}, state, {
        destination: action.destination
      })

    default:
      return state
  }
}


const store = createStore(cytoReduce)


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

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    store.dispatch(addTarget(event.target.value))
    this.setState({ value: event.target.value });
  }




  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        this.props.AddCyConnection()
      }}>
        <label>
          
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add new node" />
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
  }


  RemoveCyNode() {
    const node=this.props.node
    this.cy.remove(this.cy.$(node));
  }



  AddCyConnection() {

    const nodee = this.props.node
    const target = this.props.target

    if (nodee==''){
      this.cy.add([
        { group: 'nodes', data: { id: this.state.CytoSize.toString(), label: target }, position: { x: 230, y: 300 } },
      ]);
    }
    else{
    this.cy.add([
      { group: 'nodes', data: { id: this.state.CytoSize.toString(), label: target }, position: { x: 230, y: 300 } },
      { group: 'edges', data: { id: 'e' + this.state.CytoSize.toString(), source: this.state.CytoSize.toString(), target: nodee } }
    ]);
  }
    this.setState({ CytoSize: this.state.CytoSize + 1 })

  }

  AddCyEdge(destination) {
    const nodee = this.props.node

    this.cy.add([
      { group: 'edges', data: { id: 'e' + this.state.CytoSize.toString(), source: nodee, target: destination } }
    ]);
  }


  render() {

    const currentnode = this.props.node

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

                console.log('clicked ' + node.id())

                console.log('log' + store.getState().node)

                store.dispatch(selNode(node.id()))
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
          style={{ width: '600px', height: '600px' }}

        />
      
        <span>Target node: {currentnode}</span>
        <NameForm AddCyConnection={this.AddCyConnection} />
        <Button onClick={this.RemoveCyNode} className="Remove Node"/>





      </div>
    );
  }
}
export { store };
export default connect(mapStateToProps)(MyApp);
