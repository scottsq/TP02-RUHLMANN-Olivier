import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store'
import { Connect, Disconnect } from "../actions/connection.action";
import { ConnectionStateModel } from "./connectionStateModel";

@State<ConnectionStateModel>({
    name: 'connection',
    defaults: {
        connection: null
    }
})
@Injectable()
export class ConnectionState {

    @Selector()
    static getConnectedUser(state: ConnectionStateModel) {
        return state.connection;
    }

    @Action(Connect) connect(
        { getState, patchState }: StateContext<ConnectionStateModel>, 
        { payload }: Connect) {
            const state = getState();
            state.connection = payload;
            patchState({ connection: state.connection });
        }
    

    @Action(Disconnect) disconnect(
        { getState, patchState }: StateContext<ConnectionStateModel>, 
        { }: Disconnect) {
            const state = getState();
            state.connection = null;
            patchState({ connection: state.connection });
        }
}