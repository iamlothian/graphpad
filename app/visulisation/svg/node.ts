import { Renderable } from '../renderable';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

export class Node implements Renderable {

    private svg:any;  

    constructor(){

    }

    public draw():void {
        /*
        let node = this.svg.selectAll("#nodes")
        .selectAll("circle")
        .data(data.nodes, (d) => d.id)
        
        node.exit()
        .attr("class", "exit")
        .style("opacity", 0)
            .remove();
        
        node.attr("class", "update")
        .style("r", (d) => d.r)
        
        let node_enter = node.enter()
        .append("circle")
            .attr("class", "enter")
            .attr("fill", (d) => color(d.group));
        
        // 
        setTimeout(((n) => {
            n.style("r", (d) => d.r).style("opacity", 1);
        })(node_enter),1);
            
        node = node_enter.merge(node);
        */
    }

}