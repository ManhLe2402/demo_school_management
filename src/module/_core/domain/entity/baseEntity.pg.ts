import { RequestContext, wrap } from "@mikro-orm/core";

export abstract class BaseEntity {
    serialize(...arg: any[]) {
        //@ts-ignore
        return wrap(this).toObject(...arg);
    }

    getEm() {
        return RequestContext.getEntityManager();
    }

    persist() {
        return this.getEm().persist(this);
    }

    async persistAndFlush() {
        await this.getEm().persistAndFlush(this);
        return this;
    }
}
