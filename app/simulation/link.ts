import {Node} from "./node"
import {SimulationLinkDatum} from 'd3-force';
import {Selection, BaseType} from 'd3-selection';

export class FlatLink implements SimulationLinkDatum<Node> {

    source:number
    target:number
    strength:number

}

export class DeepLink implements SimulationLinkDatum<Node> {

    source:Node
    target:Node
    strength:number

}

export interface D3LinkSelection extends Selection<BaseType, DeepLink, HTMLElement, any> {}