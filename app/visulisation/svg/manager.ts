import * as Simulation from '../../simulation'
import * as Visulisation  from '../manager';
import {NodeRenderer}  from './node';
import {LinkRenderer}  from './link';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class Manager implements Visulisation.Manager {

    private svg:Selection
    private nodeRoot:Selection
    private linkRoot:Selection

    private nodeRenderer:NodeRenderer;
    private linkRenderer:LinkRenderer;

    constructor(svg:Selection){

        this.svg = svg;
        this.nodeRoot = this.svg.append("g").attr("id","nodes");
        this.linkRoot = this.svg.append("g").attr("id","links");   

        this.nodeRenderer = new NodeRenderer(this.nodeRoot);
        this.linkRenderer = new LinkRenderer(this.linkRoot);

    }

    public data(nodes:Simulation.Node[], links:Simulation.FlatLink[]){
        
        this.linkRenderer.update(links);
        this.nodeRenderer.update(nodes);
        
    }

    public render(nodes:Simulation.Node[], links:Simulation.FlatLink[]){

        this.linkRenderer.draw(links);
        this.nodeRenderer.draw(nodes);
        
    }

}