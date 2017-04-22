import * as Simulation from '../simulation'

export interface Manager {

    render(nodes:Simulation.Node[], links:Simulation.FlatLink[]):void;

}