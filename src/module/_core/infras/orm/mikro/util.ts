import { EntityClass, RequestContext } from "@mikro-orm/core";

// Alternative for exclude option
export const select = <T>(entity: EntityClass<T> | any[], blacklist: (keyof T)[] = []) => {
    let entityFields = [];
    if (entity instanceof Array) {
        entityFields = entity;
    } else {
        const meta = RequestContext.getEntityManager()
            .getMetadata()
            .get((entity as EntityClass<T>).name);
        entityFields = Object.entries(meta.properties).reduce((s, [k, v]) => {
            if (!v.entity && !v.embedded) s.push(k);
            return s;
        }, []);
    }

    return entityFields.filter((prop) => !blacklist.includes(prop as any)) as any[];
};

export const forceUndefined = (value: any) => {
    return value === null ? undefined : value;
};
