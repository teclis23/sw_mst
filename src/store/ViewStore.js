import { types, getParent } from "mobx-state-tree"
import queryString from "qs";
import createDebug from "debug";

const debug = createDebug("SWAPI: Store -> View");

export const ViewStore = types.model({
    page: "home",
});