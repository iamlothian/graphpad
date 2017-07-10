import * as Simulation from '../../simulation'
import { Renderable } from '../renderable';
import { Manager } from './manager';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class NodeRenderer implements Renderable {

    private nodeRoot:Selection
    private nodes:Selection
    private manger:Manager;

    constructor(manager:Manager, nodeRoot:Selection ){
        this.manger = manager;
        this.nodeRoot = nodeRoot;
    }

    public draw(nodes:Simulation.Node[], simulationManager:Simulation.Manager):void {
        this.nodes.style("transform", (d:Simulation.Node) => `translate3d(${d.x}px,${d.y}px, 0px)`)
    }

    public update(nodes:Simulation.Node[], simulationManager:Simulation.Manager):void {

        // if nodes array is undefined do not update the dataset.
        if (nodes !== undefined){
            this.nodes = this.nodeRoot
            .selectAll("circle")
            .data(() => nodes, (d:Simulation.Node) => d.id.toString())
        }
        
        this.nodes.exit()
        .attr("class", "exit")
        .style("opacity", 0)
            .remove();
        
        this.nodes.attr("class", "update")
        .style("r", (d:Simulation.Node) => d.r)
        
        let nodes_enter = this.nodes.enter()
        .append("circle")
            .attr("class", "enter")
            .attr("fill", (d:Simulation.Node) => color(d.group.toString()));
        
        // 
        setTimeout(((n) => {
            n.style("r", (d:Simulation.Node) => d.r).style("opacity", 1);
        })(nodes_enter),1);
            
        this.nodes = nodes_enter.merge(this.nodes);

        // events
        
        this.nodes.on("mouseenter", (d:Simulation.Node) => this.manger.nodeEnter(d))
        this.nodes.on("mouseleave", (d:Simulation.Node) => this.manger.nodeLeave(d))	

        
        this.nodes.call(d3.drag()
            .on("start", (d:Simulation.Node) => this.manger.nodeDragstarted(d))
            .on("drag", (d:Simulation.Node) => this.manger.nodeDragged(d))
            .on("end", (d:Simulation.Node) => this.manger.nodeDragended(d))
        );
        
    }

}