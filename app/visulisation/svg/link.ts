import * as Simulation from '../../simulation'
import { Renderable } from '../renderable';
import { Manager } from './manager';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class LinkRenderer implements Renderable {

    private linkRoot:Selection
    private links:Simulation.D3LinkSelection

    constructor(manager:Manager, linkRoot:Selection ){
        this.linkRoot = linkRoot;
    }

    public draw(links:Simulation.FlatLink[], simulationManager:Simulation.Manager):void {
        this.links
        .attr("x1", function(d:Simulation.DeepLink) { return d.source.x; })
        .attr("y1", function(d:Simulation.DeepLink) { return d.source.y; })
        .attr("x2", function(d:Simulation.DeepLink) { return d.target.x; })
        .attr("y2", function(d:Simulation.DeepLink) { return d.target.y; });
    }

    public update(links:Simulation.FlatLink[], simulationManager:Simulation.Manager):void {
        
        // Link
        this.links = this.linkRoot.selectAll("line")
        .data(() => links);
        
        this.links.exit()
        .attr("class", "exit")
        .style("opacity", 0)
            .remove();
        
        this.links.attr("class", "update")
            .style("opacity", 1);
        
        let links_enter = this.links.enter()
        .append("line")
            .attr("class", "enter")
            .attr("stroke-width", 2)
            .style("stroke-opacity", 0.6)
        
        this.links = links_enter.merge(this.links);
        
    }

}