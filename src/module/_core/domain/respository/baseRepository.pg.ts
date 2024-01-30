import {
  EntityClass,
  EntityData,
  EntityManager,
  EntityName,
  EntityRepository,
  FilterQuery,
  FindOptions,
  FromEntityType,
  Loaded,
  PlainObject,
  QueryBuilder,
  RequestContext,
  RequiredEntityData,
  wrap,
} from "@mikro-orm/postgresql";
// import {
//   CreateOption,
//   QueryOption,
//   UpdateOption,
// } from "@module/_core/infras/type/queryOption.pg";
import { cleanObject } from "src/base/util/function";
import {
  CreateOption,
  QueryOption,
  UpdateOption,
} from "../../infras/type/queryOption.pg";

export class BaseRepository<
  Entity extends object,
  CreateEntityDTO = RequiredEntityData<Entity>,
  UpdateEntityDTO = EntityData<Entity>,
> {
  readonly raw: EntityRepository<Entity>;
  readonly qb: (alias?: string) => QueryBuilder<Entity>;

  constructor(
    protected readonly em: EntityManager,
    readonly entity: EntityName<Entity>
  ) {
    this.raw = em.getRepository(entity) as EntityRepository<Entity>;
    this.qb = (alias?: string) => em.qb(entity, alias);
  }

  /*
        Tranform queryOption to database language.
    */
  getQueryOption(queryOptions: QueryOption<Entity> = {}) {
    const options: FindOptions<Entity> = {};

    const qO = cleanObject(queryOptions);

    if (qO.sort) options.orderBy = qO.sort as any;
    if (qO.page) options.offset = (qO.page - 1) * qO.pageSize;
    if (qO.pageSize) options.limit = qO.pageSize;
    if (qO.select) options.fields = qO.select as any;

    return options;
  }
  setQueryBuilderOption(
    query: QueryBuilder<Entity>,
    queryOptions: QueryOption<any> = {}
  ) {
    const qO = cleanObject(queryOptions);

    if (qO.sort) query = query.orderBy(qO.sort);
    if (qO.page) query = query.limit(qO.pageSize);
    if (qO.pageSize) query = query.offset((qO.page - 1) * qO.pageSize);

    return query;
  }

  async find(
    filterQuery: FilterQuery<Entity>,
    queryOption?: QueryOption<Entity>
  ) {
    return this.raw.find(filterQuery, this.getQueryOption(queryOption));
  }
  async findAndCount(
    filterQuery: FilterQuery<Entity>,
    queryOption?: QueryOption<Entity>
  ) {
    return this.raw.findAndCount(filterQuery, this.getQueryOption(queryOption));
  }
  async findOne(
    filterQuery: FilterQuery<Entity>,
    queryOption?: QueryOption<Entity>
  ) {
    return this.raw.findOne(
      filterQuery,
      this.getQueryOption(queryOption) as any
    );
  }

  build(
    createDataDTO: CreateEntityDTO,
    { excludeRelation = true }: CreateOption = {}
  ): Entity {
    return this.raw.create(
      cleanObject({
        ...createDataDTO,
        ...this.createHidenRelationObject(excludeRelation),
      }) as any
    );
  }

  async create(
    createDataDTO: CreateEntityDTO,
    { excludeRelation = true }: CreateOption = {}
  ): Promise<Entity> {
    const entity = this.raw.create(
      cleanObject({
        ...createDataDTO,
        ...this.createHidenRelationObject(excludeRelation),
      }) as any
    );
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async save(entity: Loaded<Entity>): Promise<Entity> {
    await this.em.persistAndFlush(entity);
    return entity;
  }

  // TODO: Test this function, still not ready to use
  async insertMany(
    insertDatas: CreateEntityDTO[],
    createOption: CreateOption = {}
  ): Promise<boolean> {
    await this.em.insertMany(
      insertDatas.map((data) =>
        this.build(data, { excludeRelation: false, ...createOption })
      )
    );
    return true;
  }

  async update(
    filterQuery: FilterQuery<Entity>,
    updateDataDTO: UpdateEntityDTO
  ): Promise<boolean> {
    await this.raw.nativeUpdate(filterQuery, updateDataDTO as any);
    // await this.qb()
    //     .update(updateDataDTO as any)
    //     .where(filterQuery);
    return true;
  }

  async upsert(upsertDataDTO: UpdateEntityDTO) {
    const upsertEntity = await this.raw.upsert(upsertDataDTO as any);
    // await this.qb()
    //     .update(updateDataDTO as any)
    //     .where(filterQuery);
    return upsertEntity;
  }

  async updateEntity<T extends Loaded<Entity, any, any, any>>(
    entity: T,
    updateDataDTO: UpdateEntityDTO,
    { flush = true, excludeRelation = true }: UpdateOption = {}
  ) {
    if (!entity) return entity;

    const updateEntity = wrap(entity).assign(
      cleanObject<PlainObject>(
        {
          ...updateDataDTO,
          ...this.createHidenRelationObject(excludeRelation),
        },
        [undefined],
        { deep: excludeRelation, cleanArrayValue: excludeRelation }
      )
    );

    if (flush) await this.em.flush();
    return updateEntity;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Entity>,
    updateDataDTO: UpdateEntityDTO,
    options?: QueryOption<Entity> & UpdateOption
  ) {
    const entity = await this.findOne(filterQuery, options);
    if (!entity) return null;
    return this.updateEntity(entity, updateDataDTO, options);
  }

  async findOneAnDelete(
    filterQuery: FilterQuery<Entity>,
    options = { flush: true }
  ): Promise<Entity> {
    const entity = await this.raw.findOne(filterQuery);
    if (!entity) return null;
    if (options.flush) await this.em.remove(entity).flush();
    return entity;
  }

  async deleteEntity<T extends Loaded<Entity | Entity[], any, any, any>>(
    entity: T
  ) {
    if (!entity) return;
    await this.em.removeAndFlush(entity);
    return true;
  }

  async delete(filterQuery: FilterQuery<Entity>) {
    await this.raw.nativeDelete(filterQuery);
    return true;
  }

  // Util
  private createHidenRelationObject(hide = true) {
    let hideRelation = {};

    if (hide) {
      const meta = RequestContext.getEntityManager()
        .getMetadata()
        .get((this.entity as EntityClass<Entity>).name);

      Object.entries(meta.properties).map(([k, v]) => {
        if (v.entity && !v.embeddable) hideRelation[k] = undefined;
      });
    }

    return hideRelation;
  }

  // Global method
  static persist(entity: any) {
    return RequestContext.getEntityManager().persist(entity);
  }

  static async persistAndFlush(entity: any | any[]) {
    await RequestContext.getEntityManager().persistAndFlush(entity);
  }

  static remove(entity: any | any[]) {
    return RequestContext.getEntityManager().remove(entity);
  }

  static async removeAndFlush(entity: any) {
    await RequestContext.getEntityManager().removeAndFlush(entity);
  }

  static async flush() {
    return RequestContext.getEntityManager().flush();
  }

  static async clear() {
    return RequestContext.getEntityManager().clear();
  }
}
