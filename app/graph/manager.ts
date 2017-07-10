import * as d3 from 'd3';
import * as Simulation from '../simulation';
import * as VisulisationSVG from '../visulisation/svg';
import * as VisulisationFabric from '../visulisation/fabric';

export class Manager {

    constructor(data:any){

        let svg:d3.Selection<d3.BaseType, {}, HTMLElement, undefined> = d3.select("svg"),
            width:number = +svg.attr("width"),
            height:number = +svg.attr("height");

        let simulationManager = new Simulation.Manager(width,height);
        let visulisationManagerSVG = new VisulisationSVG.Manager(svg, simulationManager);
        let visulisationManagerFabric = new VisulisationFabric.Manager('canvas', simulationManager);

        simulationManager.data(data.nodes, data.links);
        visulisationManagerSVG.data(data.nodes, data.links);
        visulisationManagerFabric.data(data.nodes, data.links);

        simulationManager.onUpdate = (nodes: Simulation.Node[], links: Simulation.FlatLink[]) => {
            visulisationManagerSVG.render(nodes,links);
            visulisationManagerFabric.render(nodes,links);
        }

    }

    public addNode(){}
    
    public addLink(){}

    public removeNode(){}

    public removeLink(){}

    

}