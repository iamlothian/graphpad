import {SimulationNodeDatum} from 'd3-force';
import {Selection, BaseType} from 'd3-selection';

export class Node implements SimulationNodeDatum {

    id:number
    r:number
    x:number
    y:number
    charge:number
    group:number
    
}

export interface D3NodeSelection extends Selection<BaseType, Node, HTMLElement, any> {}