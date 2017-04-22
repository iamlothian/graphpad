import * as Simulation from '../../simulation'
import * as Visulisation  from '../manager';
import {NodeRenderer}  from './node';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export class Manager implements Visulisation.Manager {

    private svg:Selection
    private nodeRoot:Selection
    private linkRoot:Selection

    private nodeRendere:NodeRenderer;

    constructor(svg:Selection){

        this.svg = svg;
        this.nodeRoot = this.svg.append("g").attr("id","nodes");
        this.linkRoot = this.svg.append("g").attr("id","links");   

        this.nodeRendere = new NodeRenderer(this.svg, this.nodeRoot);

    }

    public data(nodes:Simulation.Node[], links:Simulation.FlatLink[]){
        this.nodeRendere.update(nodes);
    }

    public render(nodes:Simulation.Node[], links:Simulation.FlatLink[]){
        this.nodeRendere.draw(nodes);
    }

}