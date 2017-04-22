import * as Simulation from '../../simulation'
import { Renderable } from '../renderable';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class NodeRenderer implements Renderable {

    private nodeRoot:Selection
    private nodes:Simulation.D3NodeSelection

    constructor(nodeRoot:Selection ){
        this.nodeRoot = nodeRoot;
    }

    public draw(nodes:Simulation.Node[]):void {
        this.nodes.style("transform", (d:Simulation.Node) => `translate3d(${d.x}px,${d.y}px, 0px)`)
    }

    public update(nodes:Simulation.Node[]):void {

        this.nodes = this.nodeRoot
        .selectAll("circle")
        .data(() => nodes, (d:Simulation.Node) => d.id.toString())
        
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
        /*
        node.on("mouseenter", (d, idx, nodes) => enter.call(nodes[idx],d,simulation ))
        node.on("mouseleave", (d, idx, nodes) => leave.call(nodes[idx],d,simulation ))	

        node
            .call(d3.drag()
            .on("start", (d) => dragstarted(d,simulation))
            .on("drag", (d) => dragged(d,simulation))
            .on("end", (d) => dragended(d,simulation)))
        */
        
    }

}