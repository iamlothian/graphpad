import * as d3 from 'd3';
import graph from './data.js';

import * as Graph from './graph';
import * as Simulation from './simulation';
import * as Visulisation from './visulisation/svg'

//import * as fabric from 'fabric/index.js';

let data = graph;

window.onload = () => {

    let svg:d3.Selection<d3.BaseType, {}, HTMLElement, undefined> = d3.select("svg"),
        width:number = +svg.attr("width"),
        height:number = +svg.attr("height");

    let graphManager = new Graph.Manager();

    let simulationManager = new Simulation.Manager(width,height);
    let visulisationManager = new Visulisation.Manager(svg);

    simulationManager.data(data.nodes, data.links);
    visulisationManager.data(data.nodes, data.links);

    simulationManager.onUpdate = (nodes: Simulation.Node[], links: Simulation.FlatLink[]) => {
        visulisationManager.render(nodes,links);
    }
   

}
