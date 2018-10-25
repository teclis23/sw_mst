import { types, applySnapshot, getSnapshot, getParent } from "mobx-state-tree";
import _ from "lodash";
import { PeopleStore } from "./PeopleStore";
import { getPeople } from "../request";
import { reaction } from "mobx";
import createDebug from "debug";
import { debuglog } from "util";

const debug = createDebug("SWAPI: Store -> App");

export const AppStore = types.model("AppStore", {
        isLoading: true,
        people: types.optional(PeopleStore, {})
    })
    .views(self => ({

    }))
    .actions(self => ({
        afterCreate() {
            console.log("AppStore created");
            self.toggleLoading();
        },
        toggleLoading(newValue = false) {
            self.isLoading = newValue;
        }
    }));