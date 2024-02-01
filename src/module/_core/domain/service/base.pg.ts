import { FilterQuery, RequiredEntityData } from "@mikro-orm/core";
import { EntityProps } from "@mikro-orm/core/typings";
import { BaseRepository } from "../repository/base.pg";
import { QueryOption } from "../../infras/type/queryOption.pg";
import { cleanObject } from "src/base/util/functions";

export interface ICreateOption<Entity> {
  checkExistData?: EntityProps<Entity>;
}

export class BaseService<
  Entity extends object,
  CreateDataDTO = any,
  UpdateDataDTO = any,
> {
  constructor(private readonly repository: BaseRepository<Entity, any, any>) {}

  getRepository() {
    return this.repository;
  }

  async find(filter: FilterQuery<Entity>, queryOption?: QueryOption<Entity>) {
    return this.repository.find(filter, queryOption);
  }

  async findOne(
    filter: FilterQuery<Entity>,
    queryOption?: QueryOption<Entity>
  ) {
    return this.repository.findOne(filter, queryOption);
  }

  async findAndCount(
    filter: FilterQuery<Entity>,
    queryOption?: QueryOption<Entity>
  ) {
    return this.repository.findAndCount(filter, queryOption);
  }
  build(createDataDTO: CreateDataDTO): Entity {
    return this.repository.build(createDataDTO);
  }

  async create(
    createDataDTO: CreateDataDTO,
    options?: ICreateOption<Entity>
  ): Promise<Entity> {
    const { checkExistData } = options || {};

    if (checkExistData) {
      const existingEntity = await this.repository.findOne(checkExistData);
      if (existingEntity) {
        throw new Error(`Document existing`);
      }
    }

    return this.repository.create(
      cleanObject(createDataDTO) as RequiredEntityData<Entity>
    );
  }

  async update(
    filter: FilterQuery<Entity>,
    updateDataDTO: UpdateDataDTO
  ): Promise<boolean> {
    return this.repository.update(filter, cleanObject(updateDataDTO));
  }

  async findOneAndUpdate(
    filter: FilterQuery<Entity>,
    updateDataDTO: UpdateDataDTO
  ): Promise<Entity> {
    return this.repository.findOneAndUpdate(
      filter,
      cleanObject(updateDataDTO)
    ) as Entity;
  }

  async delete(filter: FilterQuery<Entity>): Promise<boolean> {
    return this.repository.delete(filter);
  }

  async findOneAndDelete(filter: FilterQuery<Entity>) {
    return this.repository.findOneAnDelete(filter);
  }

  // async insertMany(insertDatas: CreateDataDTO[]) {
  //     return this.repository.insertMany?.(insertDatas);
  // }
}
