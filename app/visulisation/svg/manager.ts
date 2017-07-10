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

    private simulationManager:Simulation.Manager

    constructor(svg:Selection, simulationManager:Simulation.Manager){

        this.svg = svg;
        this.linkRoot = this.svg.append("g").attr("id","links");
        this.nodeRoot = this.svg.append("g").attr("id","nodes");

        this.nodeRenderer = new NodeRenderer(this, this.nodeRoot);
        this.linkRenderer = new LinkRenderer(this, this.linkRoot);

        this.simulationManager = simulationManager;

    }

    public data(nodes:Simulation.Node[], links:Simulation.FlatLink[]){
        
        this.nodeRenderer.update(nodes, this.simulationManager);
        this.linkRenderer.update(links, this.simulationManager);
        
    }

    public render(nodes:Simulation.Node[], links:Simulation.FlatLink[]){

        this.nodeRenderer.draw(nodes, this.simulationManager);
        this.linkRenderer.draw(links, this.simulationManager);
        
    }

    public nodeDragstarted(d:Simulation.Node) {
        if (!d3.event.active){ 
            this.simulationManager.warmSimTime();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    public nodeDragged(d:Simulation.Node) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    public nodeDragended(d:Simulation.Node) {
        if (!d3.event.active) {
            this.simulationManager.heatSimTime();
        }
        d.fx = null;
        d.fy = null;
    }

    public nodeEnter(d:Simulation.Node) {
        d.r = d.r*1.5;
        //this.update(undefined, simulationManager);     
        // if (!d3.event.active){ 
        //     this.simulationManager.warmSimTime();
        // }
    }
    public nodeLeave(d:Simulation.Node) {
        d.r = d.r/1.5; 	
        //this.update(undefined, simulationManager);
        // if (!d3.event.active) {
        //     this.simulationManager.heatSimTime();
        // }
    }

}