import { types, getParent } from "mobx-state-tree";

export const Person = types.model("Person", {

        // Try to add id counter ( static variable for a class )
        id: types.identifierNumber,
        name: types.optional(types.string, ""),
        height: types.maybe(types.integer, 0),
        mass: types.maybe(types.integer, 0),
    })
    .actions(self => ({
        setName(name) {
            self.name = name;
        },
        setHeight(height) {
            self.height = height;
        },
        setMass(mass) {
            self.mass = mass;
        },
        removePerson() {
            console.log("Remove from model");
            getParent(self, 2).removePerson(self);
        }
    }));

export default Person;