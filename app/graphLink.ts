import {GraphNode} from "GraphNode"
import {SimulationLinkDatum} from 'd3-force';
import {Selection, BaseType} from 'd3-selection';

export class GraphLink implements SimulationLinkDatum<GraphNode> {

    source:GraphNode
    target:GraphNode
    strength:number
    
}

export interface GraphLinkSelection extends Selection<BaseType, GraphLink, HTMLElement, any> {}