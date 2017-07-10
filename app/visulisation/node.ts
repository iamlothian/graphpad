import * as Simulation from '../simulation'
import {SimulationNodeDatum} from 'd3-force';
import { Renderable } from './renderable';
import { Manager } from './manager';
import * as d3 from 'd3';

let color = d3.scaleOrdinal(d3.schemeCategory20);

interface Selection extends d3.Selection<d3.BaseType, {}, HTMLElement, undefined> {}

export interface RenderableNode extends Renderable {
    
    update(nodes: SimulationNodeDatum, simulationManager: Simulation.Manager): void 
    draw(sprite: SimulationNodeDatum, simulationManager: Simulation.Manager): void 

    onMouseEnter(node:Simulation.Node):void
    onMouseLeave(node:Simulation.Node):void
    onDargStart(node:Simulation.Node):void
    onDargMove(node:Simulation.Node):void
    onDargEnd(node:Simulation.Node):void

}

