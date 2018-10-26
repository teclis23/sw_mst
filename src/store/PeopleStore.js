import { types, getEnv, getParent, applySnapshot, getSnapshot, destroy } from "mobx-state-tree";
import { reaction } from "mobx";
import { Person } from "./model/Person";
import { getPeople } from "../request";
import createDebug from "debug";

const debug = createDebug("SWAPI: Model -> People");


export const PeopleStore = types.model("PeopleStore", {
        idCounter: types.optional(types.integer, 0),
        isLoading: false,
        persons: types.optional(types.array(Person), []),
        selectedPerson: types.maybe(types.reference(Person)),
    })
    .views(self => ({
        get app() {
            return getParent(self)
        }
    }))
    .actions(self => ({
        afterCreate() {

            if (typeof window.localStorage !== "undefined" && window.localStorage.getItem(`sw-people`) != null) {
                self.readFromLocalStorage();
                reaction(
                    () => getSnapshot(self.persons),
                    snapshot => {
                        window.localStorage.setItem(`sw-people`, JSON.stringify(snapshot));
                    }
                );
            } else {
                self.refreshPeople();
            }
        },
        resetIdCounter() {
            self.idCounter = 0;
        },
        useIdCounter() {
            console.log("before", self.idCounter);
            return self.idCounter++;
        },
        refreshPeople() {
            self.toggleLoading(true);
            getPeople().then(responce => {
                self.resetIdCounter();
                let personArr = responce.results.map((person, i) => {
                    return ({
                        id: self.useIdCounter(),
                        name: person.name,
                        height: parseInt(person.height),
                        mass: parseInt(person.mass)
                    });
                });
                self.setPersons(personArr);
                self.toggleLoading(false);

                window.localStorage.setItem(`sw-people`, JSON.stringify(getSnapshot(self)));

            }).catch(err => {
                self.toggleLoading(false);
            });

        },
        getPerson(id) {
            return self.persons[id];
        },
        setPersons(personArr) {
            self.persons = personArr;
        },
        toggleLoading(newValue = false) {
            self.isLoading = newValue;
        },
        readFromLocalStorage() {
            let state = localStorage.getItem(`sw-people`);
            if (state) {
                applySnapshot(self, JSON.parse(state))
            }
        },
        selectPerson(id) {
            self.selectedPerson = id;
        },
        clear() {
            self.selectedPerson = undefined;
        },
        deletePerson(person) {
            console.log("delete person: ", person);
            self.clear();
            self.persons.remove(person);
        },
        // removePerson() {
        //     console.log("remove from store");
        //     self.persons.splice(self.persons.indexOf(self.selectedPerson), 1);
        // },
        savePerson(data) {

            if (data) {
                self.selectedPerson.setName(data.name ? data.name : "");
                self.selectedPerson.setHeight(data.height ? data.height : 0);
                self.selectedPerson.setMass(data.mass ? data.mass : 0);
            }
        },
        addPerson() {
            let temp = {
                id: self.useIdCounter(),
                name: "",
                height: 0,
                width: 0
            }
            self.persons.push(temp);
            self.selectedPerson = self.persons[self.persons.length - 1];
        }
    }));