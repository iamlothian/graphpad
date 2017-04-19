import {SimulationNodeDatum} from 'd3-force';

export interface Renderable {

    draw(sprite:SimulationNodeDatum): void;

}