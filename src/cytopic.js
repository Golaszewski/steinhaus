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
import { store, NameForm, Button, Simpletextarea, OrientLabel } from './App.js'
import {
    addTarget,
    updateDesc,
    b64ToBlob,
    selNode,
    getDesc,
    getRandomInt,
    updateNodeColor,
    updateEdgeColor,
    updateEdgeWidth,
    updateNodeSize,
} from './App.js'


var elements = [];


var cytoscape = require('cytoscape');
var cyCanvas = require('cytoscape-canvas')
cyCanvas(cytoscape)

const mapStateToProps = state => ({
    node: state.node,
    target: state.target,
    destination: state.destination,
    network: state.network,
    description: state.description,
    getdescription: state.getdescription,
    nodecolor: state.nodecolor,
    edgecolor: state.edgecolor,
    edgewidth: state.edgewidth,
    nodesize: state.nodesize,
})


class MyAppWithBackground extends React.Component {
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
        this.OrientNodeLabel = this.OrientNodeLabel.bind(this)
    }

    componentDidMount() {
        console.log('Image Component DID MOUNT!')
        //this.cy.destroy()
    }

    handleChangeTarget(event) {
        store.dispatch(addTarget(event.target.value));
        //console.log('step 1')
        //console.log(this.props.target)
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
        const node = this.props.node
        var horizontal = ''
        var vertical = ''
        switch (id) {
            case "0":
                horizontal = 'left'
                vertical = 'top'
                break;
            case "1":
                horizontal = 'center'
                vertical = 'top'
                break;
            case "2":
                horizontal = 'right'
                vertical = 'top'
                break;
            case "3":
                horizontal = 'right'
                vertical = 'center'
                break;
            case "4":
                horizontal = 'right'
                vertical = 'bottom'
                break;
            case "5":
                horizontal = 'center'
                vertical = 'bottom'
                break;
            case "6":
                horizontal = 'left'
                vertical = 'bottom'
                break;
            case "7":
                horizontal = 'left'
                vertical = 'center'
                break;

            default:
                horizontal = 'center'
                vertical = 'top'
        }
        this.cy.$('#' + node).style('text-halign', horizontal)
        this.cy.$('#' + node).style('text-valign', vertical)
        console.log(this.cy.$('#' + node).style())
        console.log(typeof id)
        console.log(vertical)
        console.log(horizontal)
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

        const background = new Image();
        background.src = this.props.imageurl
        const currentnode = this.props.node
        const description = this.props.description
        const network = this.props.network
        const getdescription = this.props.getdescription
        return (
            <div>

                <CytoscapeComponent
                    //CytoSize={this.state.CytoSize}
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


                        const bottomLayer = this.cy.cyCanvas({ zIndex: -1, })
                        const canvas = bottomLayer.getCanvas()
                        const ctx = canvas.getContext("2d")

                        cy.on("render cyCanvas.resize", (evt) => {
                            bottomLayer.resetTransform(ctx);
                            bottomLayer.clear(ctx);
                            bottomLayer.setTransform(ctx);

                            ctx.save();
                            // Draw a background
                            ctx.drawImage(background, 0, 0);


                            ctx.restore();


                        });

                    }}
                    elements={this.state.elements}

                    style={{ width: '750px', height: '600px' }}
                    wheelSensitivity={0.6}
                /*             stylesheet={[
                                {
                                  selector: 'node',
                                  style: {
                                    //width: 20,
                                    //height: 20,
                                    //'background-color': '#666',
                                    label: 'data(label)',
                /*                     'text-halign':'right',
                                    'text-valign':'top', */
                /*                   }
                                }
                            ]
                
                        } //*/
                // stylesheet={[{
                //  selector:'node',
                //style:{
                //    'text-halign':'right'
                ///     'text-valign':'top'
                // }
                // ]}
                /*             stylesheet={[
                                {
                                  //selector: 'node',
                                  //style: {
                                    //width: 20,
                                    //height: 20,
                                    'background-color': '#666',
                                    //label: 'data(label)'
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
                <OrientLabel onChange={this.OrientNodeLabel} />

            </div>
        );
    }
}
MyAppWithBackground = connect(mapStateToProps)(MyAppWithBackground)
export default MyAppWithBackground;

