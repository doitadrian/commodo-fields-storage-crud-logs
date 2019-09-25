import { withCrudLogs } from "commodo-fields-storage-crud-logs";
import { withFields, string } from "@commodo/fields";
import { withProps } from "repropose";
import { compose } from "ramda";

describe("crud log fields test", () => {
    test("should set and update fields accordingly", () => {
        const Model = compose(
            withCrudLogs(),
            withFields({
                name: string()
            }),
            withProps({
                existing: false,
                save() {
                    if (this.existing) {
                        this.hook("beforeUpdate");
                    } else {
                        this.hook("beforeCreate");
                    }

                    this.hook("beforeSave");

                    // Do save.
                    this.existing = true;

                    // In a real-life scenario, additional processing / events...
                }
            })
        )();

        const instance = new Model();

        let createdOn = instance.createdOn;
        let savedOn = instance.savedOn;
        let updatedOn = instance.updatedOn;

        expect(createdOn).toBe(null);
        expect(updatedOn).toBe(null);
        expect(savedOn).toBe(null);

        instance.save();
        createdOn = instance.createdOn;
        savedOn = instance.savedOn;
        updatedOn = instance.updatedOn;

        expect(createdOn instanceof Date).toBe(true);
        expect(savedOn instanceof Date).toBe(true);
        expect(updatedOn).toBe(null);

        instance.save();

        expect(instance.createdOn instanceof Date).toBe(true);
        expect(instance.savedOn instanceof Date).toBe(true);
        expect(instance.updatedOn instanceof Date).toBe(true);

        expect(instance.createdOn).toBe(createdOn);

        createdOn = instance.createdOn;
        savedOn = instance.savedOn;
        updatedOn = instance.updatedOn;

        instance.save();
        expect(instance.createdOn).toBe(createdOn);
        expect(instance.savedOn).not.toBe(savedOn);
        expect(instance.updatedOn).not.toBe(updatedOn);
    });
});
