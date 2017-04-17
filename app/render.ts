import * as d3selection from 'd3-selection';
import { GraphNode, GraphNodeSelection } from 'graphNode';
import { GraphLink, GraphLinkSelection } from 'graphLink';

class GraphManager{

    private nodes:GraphNode[]
    private links:GraphLink[]
    private rootElement:d3selection.Selection<d3selection.BaseType, undefined, HTMLElement, any>

    private renderManager:GraphRenderManager;

    constructor(
        rootElement:d3selection.Selection<d3selection.BaseType, undefined, HTMLElement, any>, 
        nodes:GraphNode[] = [], 
        links:GraphLink[] = []
    ) {

        this.rootElement = rootElement;
        this.nodes = nodes;
        this.links = links;

        this.renderManager = new GraphRenderManager(this.rootElement)

    }

}

export class GraphRenderManager {

    private rootElement:d3selection.Selection<d3selection.BaseType, undefined, HTMLElement, any>
    private linkSelection:d3selection.Selection<d3selection.BaseType, GraphLink, HTMLElement, any>
    private nodeSelection:d3selection.Selection<d3selection.BaseType, GraphNode, HTMLElement, any>

    constructor(rootElement:d3selection.Selection<d3selection.BaseType, undefined, HTMLElement, any>){
        this.rootElement = rootElement;
    }

    public apply(nodes:GraphNode[],links:GraphLink[]){


    }

    private renderLinks(links:GraphLink[]){

        // Link
        this.linkSelection = this.rootElement.selectAll("#links")
        .selectAll("line")
        .data(links);
        
        this.linkSelection.exit()
        .attr("class", "exit")
        .style("opacity", 0)
            .remove();
        
        this.linkSelection.attr("class", "update")
            .style("opacity", 1);
        
        let link_enter = this.linkSelection.enter()
        .append("line")
            .attr("class", "enter")
            .attr("stroke-width", 2)
            .style("stroke-opacity", 0.6)
        
        this.linkSelection = link_enter.merge(this.linkSelection);

    }

}