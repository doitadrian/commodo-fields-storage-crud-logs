import { withFields, skipOnPopulate } from "@commodo/fields";
import { withHooks } from "@commodo/hooks";
import { date } from "commodo-fields-date";

export const withCrudLogs = () => baseFn => {
    let fn = withFields({
        createdOn: skipOnPopulate()(date()),
        updatedOn: skipOnPopulate()(date()),
        savedOn: skipOnPopulate()(date())
    })(baseFn);

    fn = withHooks({
        beforeCreate() {
            this.createdOn = new Date();
        },
        beforeUpdate() {
            this.updatedOn = new Date();
        },
        beforeSave() {
            this.savedOn = new Date();
        }
    })(fn);

    return fn;
};
