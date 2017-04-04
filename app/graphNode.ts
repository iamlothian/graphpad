import {SimulationNodeDatum} from 'd3-force';
import {Selection, BaseType} from 'd3-selection';

export class GraphNode implements SimulationNodeDatum {

    id:number
    r:number
    x:number
    y:number
    charge:number
    group:number
    
}

export interface GraphNodeSelection extends Selection<BaseType, GraphNode, HTMLElement, any> {}