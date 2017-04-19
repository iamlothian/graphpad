import {Node} from "./node"
import {SimulationLinkDatum} from 'd3-force';
import {Selection, BaseType} from 'd3-selection';

export class Link implements SimulationLinkDatum<Node> {

    source:Node
    target:Node
    strength:number

}

export interface D3LinkSelection extends Selection<BaseType, Link, HTMLElement, any> {}