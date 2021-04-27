import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store'
import { AddReference, DelReference } from "../actions/panier.action";
import { PanierStateModel } from "./panierStateModel";

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})
@Injectable()
export class PanierState {

    @Selector()
    static getNbReferences(state: PanierStateModel) {
        return state.panier.length;
    }

    @Action(AddReference) add(
        { getState, patchState }: StateContext<PanierStateModel>, 
        { payload }: AddReference) {
            const state = getState();
            if (payload.count == null) payload.count = 1;
            for (let i=0; i<payload.count; i++) state.panier.push(payload);
            patchState({ panier: state.panier });
        }
    

    @Action(DelReference) del(
        { getState, patchState }: StateContext<PanierStateModel>, 
        { payload }: DelReference) {
            const state = getState();
            let index = state.panier.findIndex(x => x.ref == payload.ref);
            if (payload.count == null) payload.count = 1;
            state.panier.splice(index, payload.count);
            patchState({ panier: state.panier });
        }
}