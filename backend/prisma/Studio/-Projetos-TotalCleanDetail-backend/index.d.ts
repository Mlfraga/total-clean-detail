import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Prisma Client JS version: 2.0.0-beta.6
 * Query Engine version: c48b94aa8d1d9a0e5582dcd14e25202b76303dca
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${1} OR email = ${'e@ma.il'};`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'e@ma.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): ProfileDelegate;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): CompanyDelegate;

  /**
   * `prisma.unit`: Exposes CRUD operations for the **Unit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Units
    * const units = await prisma.unit.findMany()
    * ```
    */
  get unit(): UnitDelegate;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): ServiceDelegate;

  /**
   * `prisma.companyService`: Exposes CRUD operations for the **CompanyService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyServices
    * const companyServices = await prisma.companyService.findMany()
    * ```
    */
  get companyService(): CompanyServiceDelegate;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): PersonDelegate;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): AddressDelegate;

  /**
   * `prisma.car`: Exposes CRUD operations for the **Car** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cars
    * const cars = await prisma.car.findMany()
    * ```
    */
  get car(): CarDelegate;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): SaleDelegate;

  /**
   * `prisma.serviceSale`: Exposes CRUD operations for the **ServiceSale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceSales
    * const serviceSales = await prisma.serviceSale.findMany()
    * ```
    */
  get serviceSale(): ServiceSaleDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]


export declare const Role: {
  SELLER: 'SELLER',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN'
};

export declare type Role = (typeof Role)[keyof typeof Role]



/**
 * Model User
 */

export type User = {
  id: number
  username: string
  email: string
  password: string
  role: Role
  enabled: boolean
  firstLogin: boolean
}

export type UserSelect = {
  id?: boolean
  username?: boolean
  email?: boolean
  password?: boolean
  role?: boolean
  enabled?: boolean
  firstLogin?: boolean
  profile?: boolean | ProfileArgs
}

export type UserInclude = {
  profile?: boolean | ProfileArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'profile'
      ? ProfileGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'profile'
      ? ProfileGetPayload<S['select'][P]> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, ProfileClient<Profile | null>, ProfileClient<ProfileGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput
  /**
   * Get the first `n` Users.
  **/
  first?: number
  /**
   * Get the last `n` Users.
  **/
  last?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Profile
 */

export type Profile = {
  id: number
  name: string
  telephone: string
  enabled: boolean
  userId: number
  companyId: number | null
  unitId: number | null
}

export type ProfileSelect = {
  id?: boolean
  name?: boolean
  telephone?: boolean
  enabled?: boolean
  userId?: boolean
  companyId?: boolean
  unitId?: boolean
  user?: boolean | UserArgs
  company?: boolean | CompanyArgs
  unit?: boolean | UnitArgs
  sale?: boolean | FindManySaleArgs
}

export type ProfileInclude = {
  user?: boolean | UserArgs
  company?: boolean | CompanyArgs
  unit?: boolean | UnitArgs
  sale?: boolean | FindManySaleArgs
}

export type ProfileGetPayload<
  S extends boolean | null | undefined | ProfileArgs,
  U = keyof S
> = S extends true
  ? Profile
  : S extends undefined
  ? never
  : S extends ProfileArgs | FindManyProfileArgs
  ? 'include' extends U
    ? Profile  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> :
      P extends 'company'
      ? CompanyGetPayload<S['include'][P]> | null :
      P extends 'unit'
      ? UnitGetPayload<S['include'][P]> | null :
      P extends 'sale'
      ? Array<SaleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Profile ? Profile[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> :
      P extends 'company'
      ? CompanyGetPayload<S['select'][P]> | null :
      P extends 'unit'
      ? UnitGetPayload<S['select'][P]> | null :
      P extends 'sale'
      ? Array<SaleGetPayload<S['select'][P]>> : never
    }
  : Profile
: Profile


export interface ProfileDelegate {
  /**
   * Find zero or one Profile.
   * @param {FindOneProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProfileArgs>(
    args: Subset<T, FindOneProfileArgs>
  ): CheckSelect<T, ProfileClient<Profile | null>, ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles.
   * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyProfileArgs>(
    args?: Subset<T, FindManyProfileArgs>
  ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const user = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends ProfileCreateArgs>(
    args: Subset<T, ProfileCreateArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const user = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends ProfileDeleteArgs>(
    args: Subset<T, ProfileDeleteArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProfileUpdateArgs>(
    args: Subset<T, ProfileUpdateArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProfileDeleteManyArgs>(
    args: Subset<T, ProfileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProfileUpdateManyArgs>(
    args: Subset<T, ProfileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends ProfileUpsertArgs>(
    args: Subset<T, ProfileUpsertArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>
}

export declare class ProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  company<T extends CompanyArgs = {}>(args?: Subset<T, CompanyArgs>): CheckSelect<T, CompanyClient<Company | null>, CompanyClient<CompanyGetPayload<T> | null>>;

  unit<T extends UnitArgs = {}>(args?: Subset<T, UnitArgs>): CheckSelect<T, UnitClient<Unit | null>, UnitClient<UnitGetPayload<T> | null>>;

  sale<T extends FindManySaleArgs = {}>(args?: Subset<T, FindManySaleArgs>): CheckSelect<T, Promise<Array<Sale>>, Promise<Array<SaleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Profile findOne
 */
export type FindOneProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile findMany
 */
export type FindManyProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: ProfileOrderByInput
  /**
   * Skip the first `n` Profiles.
  **/
  skip?: number
  /**
   * Get all Profiles that come after the Profile you provide with the current order.
  **/
  after?: ProfileWhereUniqueInput
  /**
   * Get all Profiles that come before the Profile you provide with the current order.
  **/
  before?: ProfileWhereUniqueInput
  /**
   * Get the first `n` Profiles.
  **/
  first?: number
  /**
   * Get the last `n` Profiles.
  **/
  last?: number
}


/**
 * Profile create
 */
export type ProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to create a Profile.
  **/
  data: ProfileCreateInput
}


/**
 * Profile update
 */
export type ProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to update a Profile.
  **/
  data: ProfileUpdateInput
  /**
   * Choose, which Profile to update.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile updateMany
 */
export type ProfileUpdateManyArgs = {
  data: ProfileUpdateManyMutationInput
  where?: ProfileWhereInput
}


/**
 * Profile upsert
 */
export type ProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The filter to search for the Profile to update in case it exists.
  **/
  where: ProfileWhereUniqueInput
  /**
   * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
  **/
  create: ProfileCreateInput
  /**
   * In case the Profile was found with the provided `where` argument, update it with this data.
  **/
  update: ProfileUpdateInput
}


/**
 * Profile delete
 */
export type ProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter which Profile to delete.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile deleteMany
 */
export type ProfileDeleteManyArgs = {
  where?: ProfileWhereInput
}


/**
 * Profile without action
 */
export type ProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
}



/**
 * Model Company
 */

export type Company = {
  id: number
  name: string
  telephone: string
  cnpj: string
}

export type CompanySelect = {
  id?: boolean
  name?: boolean
  telephone?: boolean
  cnpj?: boolean
  units?: boolean | FindManyUnitArgs
  Profile?: boolean | FindManyProfileArgs
  sompanyService?: boolean | FindManyCompanyServiceArgs
}

export type CompanyInclude = {
  units?: boolean | FindManyUnitArgs
  Profile?: boolean | FindManyProfileArgs
  sompanyService?: boolean | FindManyCompanyServiceArgs
}

export type CompanyGetPayload<
  S extends boolean | null | undefined | CompanyArgs,
  U = keyof S
> = S extends true
  ? Company
  : S extends undefined
  ? never
  : S extends CompanyArgs | FindManyCompanyArgs
  ? 'include' extends U
    ? Company  & {
      [P in TrueKeys<S['include']>]:
      P extends 'units'
      ? Array<UnitGetPayload<S['include'][P]>> :
      P extends 'Profile'
      ? Array<ProfileGetPayload<S['include'][P]>> :
      P extends 'sompanyService'
      ? Array<CompanyServiceGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Company ? Company[P]
: 
      P extends 'units'
      ? Array<UnitGetPayload<S['select'][P]>> :
      P extends 'Profile'
      ? Array<ProfileGetPayload<S['select'][P]>> :
      P extends 'sompanyService'
      ? Array<CompanyServiceGetPayload<S['select'][P]>> : never
    }
  : Company
: Company


export interface CompanyDelegate {
  /**
   * Find zero or one Company.
   * @param {FindOneCompanyArgs} args - Arguments to find a Company
   * @example
   * // Get one Company
   * const company = await prisma.company.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCompanyArgs>(
    args: Subset<T, FindOneCompanyArgs>
  ): CheckSelect<T, CompanyClient<Company | null>, CompanyClient<CompanyGetPayload<T> | null>>
  /**
   * Find zero or more Companies.
   * @param {FindManyCompanyArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Companies
   * const companies = await prisma.company.findMany()
   * 
   * // Get first 10 Companies
   * const companies = await prisma.company.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCompanyArgs>(
    args?: Subset<T, FindManyCompanyArgs>
  ): CheckSelect<T, Promise<Array<Company>>, Promise<Array<CompanyGetPayload<T>>>>
  /**
   * Create a Company.
   * @param {CompanyCreateArgs} args - Arguments to create a Company.
   * @example
   * // Create one Company
   * const user = await prisma.company.create({
   *   data: {
   *     // ... data to create a Company
   *   }
   * })
   * 
  **/
  create<T extends CompanyCreateArgs>(
    args: Subset<T, CompanyCreateArgs>
  ): CheckSelect<T, CompanyClient<Company>, CompanyClient<CompanyGetPayload<T>>>
  /**
   * Delete a Company.
   * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
   * @example
   * // Delete one Company
   * const user = await prisma.company.delete({
   *   where: {
   *     // ... filter to delete one Company
   *   }
   * })
   * 
  **/
  delete<T extends CompanyDeleteArgs>(
    args: Subset<T, CompanyDeleteArgs>
  ): CheckSelect<T, CompanyClient<Company>, CompanyClient<CompanyGetPayload<T>>>
  /**
   * Update one Company.
   * @param {CompanyUpdateArgs} args - Arguments to update one Company.
   * @example
   * // Update one Company
   * const company = await prisma.company.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CompanyUpdateArgs>(
    args: Subset<T, CompanyUpdateArgs>
  ): CheckSelect<T, CompanyClient<Company>, CompanyClient<CompanyGetPayload<T>>>
  /**
   * Delete zero or more Companies.
   * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
   * @example
   * // Delete a few Companies
   * const { count } = await prisma.company.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CompanyDeleteManyArgs>(
    args: Subset<T, CompanyDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Companies.
   * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Companies
   * const company = await prisma.company.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CompanyUpdateManyArgs>(
    args: Subset<T, CompanyUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Company.
   * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
   * @example
   * // Update or create a Company
   * const company = await prisma.company.upsert({
   *   create: {
   *     // ... data to create a Company
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Company we want to update
   *   }
   * })
  **/
  upsert<T extends CompanyUpsertArgs>(
    args: Subset<T, CompanyUpsertArgs>
  ): CheckSelect<T, CompanyClient<Company>, CompanyClient<CompanyGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCompanyArgs, 'select' | 'include'>): Promise<number>
}

export declare class CompanyClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  units<T extends FindManyUnitArgs = {}>(args?: Subset<T, FindManyUnitArgs>): CheckSelect<T, Promise<Array<Unit>>, Promise<Array<UnitGetPayload<T>>>>;

  Profile<T extends FindManyProfileArgs = {}>(args?: Subset<T, FindManyProfileArgs>): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>;

  sompanyService<T extends FindManyCompanyServiceArgs = {}>(args?: Subset<T, FindManyCompanyServiceArgs>): CheckSelect<T, Promise<Array<CompanyService>>, Promise<Array<CompanyServiceGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Company findOne
 */
export type FindOneCompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * Filter, which Company to fetch.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company findMany
 */
export type FindManyCompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * Filter, which Companies to fetch.
  **/
  where?: CompanyWhereInput
  /**
   * Determine the order of the Companies to fetch.
  **/
  orderBy?: CompanyOrderByInput
  /**
   * Skip the first `n` Companies.
  **/
  skip?: number
  /**
   * Get all Companies that come after the Company you provide with the current order.
  **/
  after?: CompanyWhereUniqueInput
  /**
   * Get all Companies that come before the Company you provide with the current order.
  **/
  before?: CompanyWhereUniqueInput
  /**
   * Get the first `n` Companies.
  **/
  first?: number
  /**
   * Get the last `n` Companies.
  **/
  last?: number
}


/**
 * Company create
 */
export type CompanyCreateArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * The data needed to create a Company.
  **/
  data: CompanyCreateInput
}


/**
 * Company update
 */
export type CompanyUpdateArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * The data needed to update a Company.
  **/
  data: CompanyUpdateInput
  /**
   * Choose, which Company to update.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company updateMany
 */
export type CompanyUpdateManyArgs = {
  data: CompanyUpdateManyMutationInput
  where?: CompanyWhereInput
}


/**
 * Company upsert
 */
export type CompanyUpsertArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * The filter to search for the Company to update in case it exists.
  **/
  where: CompanyWhereUniqueInput
  /**
   * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
  **/
  create: CompanyCreateInput
  /**
   * In case the Company was found with the provided `where` argument, update it with this data.
  **/
  update: CompanyUpdateInput
}


/**
 * Company delete
 */
export type CompanyDeleteArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
  /**
   * Filter which Company to delete.
  **/
  where: CompanyWhereUniqueInput
}


/**
 * Company deleteMany
 */
export type CompanyDeleteManyArgs = {
  where?: CompanyWhereInput
}


/**
 * Company without action
 */
export type CompanyArgs = {
  /**
   * Select specific fields to fetch from the Company
  **/
  select?: CompanySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyInclude | null
}



/**
 * Model Unit
 */

export type Unit = {
  id: number
  name: string
  telephone: string
  companyId: number
}

export type UnitSelect = {
  id?: boolean
  name?: boolean
  telephone?: boolean
  companyId?: boolean
  company?: boolean | CompanyArgs
  Profile?: boolean | FindManyProfileArgs
}

export type UnitInclude = {
  company?: boolean | CompanyArgs
  Profile?: boolean | FindManyProfileArgs
}

export type UnitGetPayload<
  S extends boolean | null | undefined | UnitArgs,
  U = keyof S
> = S extends true
  ? Unit
  : S extends undefined
  ? never
  : S extends UnitArgs | FindManyUnitArgs
  ? 'include' extends U
    ? Unit  & {
      [P in TrueKeys<S['include']>]:
      P extends 'company'
      ? CompanyGetPayload<S['include'][P]> :
      P extends 'Profile'
      ? Array<ProfileGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Unit ? Unit[P]
: 
      P extends 'company'
      ? CompanyGetPayload<S['select'][P]> :
      P extends 'Profile'
      ? Array<ProfileGetPayload<S['select'][P]>> : never
    }
  : Unit
: Unit


export interface UnitDelegate {
  /**
   * Find zero or one Unit.
   * @param {FindOneUnitArgs} args - Arguments to find a Unit
   * @example
   * // Get one Unit
   * const unit = await prisma.unit.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUnitArgs>(
    args: Subset<T, FindOneUnitArgs>
  ): CheckSelect<T, UnitClient<Unit | null>, UnitClient<UnitGetPayload<T> | null>>
  /**
   * Find zero or more Units.
   * @param {FindManyUnitArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Units
   * const units = await prisma.unit.findMany()
   * 
   * // Get first 10 Units
   * const units = await prisma.unit.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const unitWithIdOnly = await prisma.unit.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUnitArgs>(
    args?: Subset<T, FindManyUnitArgs>
  ): CheckSelect<T, Promise<Array<Unit>>, Promise<Array<UnitGetPayload<T>>>>
  /**
   * Create a Unit.
   * @param {UnitCreateArgs} args - Arguments to create a Unit.
   * @example
   * // Create one Unit
   * const user = await prisma.unit.create({
   *   data: {
   *     // ... data to create a Unit
   *   }
   * })
   * 
  **/
  create<T extends UnitCreateArgs>(
    args: Subset<T, UnitCreateArgs>
  ): CheckSelect<T, UnitClient<Unit>, UnitClient<UnitGetPayload<T>>>
  /**
   * Delete a Unit.
   * @param {UnitDeleteArgs} args - Arguments to delete one Unit.
   * @example
   * // Delete one Unit
   * const user = await prisma.unit.delete({
   *   where: {
   *     // ... filter to delete one Unit
   *   }
   * })
   * 
  **/
  delete<T extends UnitDeleteArgs>(
    args: Subset<T, UnitDeleteArgs>
  ): CheckSelect<T, UnitClient<Unit>, UnitClient<UnitGetPayload<T>>>
  /**
   * Update one Unit.
   * @param {UnitUpdateArgs} args - Arguments to update one Unit.
   * @example
   * // Update one Unit
   * const unit = await prisma.unit.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UnitUpdateArgs>(
    args: Subset<T, UnitUpdateArgs>
  ): CheckSelect<T, UnitClient<Unit>, UnitClient<UnitGetPayload<T>>>
  /**
   * Delete zero or more Units.
   * @param {UnitDeleteManyArgs} args - Arguments to filter Units to delete.
   * @example
   * // Delete a few Units
   * const { count } = await prisma.unit.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UnitDeleteManyArgs>(
    args: Subset<T, UnitDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Units.
   * @param {UnitUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Units
   * const unit = await prisma.unit.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UnitUpdateManyArgs>(
    args: Subset<T, UnitUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Unit.
   * @param {UnitUpsertArgs} args - Arguments to update or create a Unit.
   * @example
   * // Update or create a Unit
   * const unit = await prisma.unit.upsert({
   *   create: {
   *     // ... data to create a Unit
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Unit we want to update
   *   }
   * })
  **/
  upsert<T extends UnitUpsertArgs>(
    args: Subset<T, UnitUpsertArgs>
  ): CheckSelect<T, UnitClient<Unit>, UnitClient<UnitGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUnitArgs, 'select' | 'include'>): Promise<number>
}

export declare class UnitClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  company<T extends CompanyArgs = {}>(args?: Subset<T, CompanyArgs>): CheckSelect<T, CompanyClient<Company | null>, CompanyClient<CompanyGetPayload<T> | null>>;

  Profile<T extends FindManyProfileArgs = {}>(args?: Subset<T, FindManyProfileArgs>): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Unit findOne
 */
export type FindOneUnitArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * Filter, which Unit to fetch.
  **/
  where: UnitWhereUniqueInput
}


/**
 * Unit findMany
 */
export type FindManyUnitArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * Filter, which Units to fetch.
  **/
  where?: UnitWhereInput
  /**
   * Determine the order of the Units to fetch.
  **/
  orderBy?: UnitOrderByInput
  /**
   * Skip the first `n` Units.
  **/
  skip?: number
  /**
   * Get all Units that come after the Unit you provide with the current order.
  **/
  after?: UnitWhereUniqueInput
  /**
   * Get all Units that come before the Unit you provide with the current order.
  **/
  before?: UnitWhereUniqueInput
  /**
   * Get the first `n` Units.
  **/
  first?: number
  /**
   * Get the last `n` Units.
  **/
  last?: number
}


/**
 * Unit create
 */
export type UnitCreateArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * The data needed to create a Unit.
  **/
  data: UnitCreateInput
}


/**
 * Unit update
 */
export type UnitUpdateArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * The data needed to update a Unit.
  **/
  data: UnitUpdateInput
  /**
   * Choose, which Unit to update.
  **/
  where: UnitWhereUniqueInput
}


/**
 * Unit updateMany
 */
export type UnitUpdateManyArgs = {
  data: UnitUpdateManyMutationInput
  where?: UnitWhereInput
}


/**
 * Unit upsert
 */
export type UnitUpsertArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * The filter to search for the Unit to update in case it exists.
  **/
  where: UnitWhereUniqueInput
  /**
   * In case the Unit found by the `where` argument doesn't exist, create a new Unit with this data.
  **/
  create: UnitCreateInput
  /**
   * In case the Unit was found with the provided `where` argument, update it with this data.
  **/
  update: UnitUpdateInput
}


/**
 * Unit delete
 */
export type UnitDeleteArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
  /**
   * Filter which Unit to delete.
  **/
  where: UnitWhereUniqueInput
}


/**
 * Unit deleteMany
 */
export type UnitDeleteManyArgs = {
  where?: UnitWhereInput
}


/**
 * Unit without action
 */
export type UnitArgs = {
  /**
   * Select specific fields to fetch from the Unit
  **/
  select?: UnitSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UnitInclude | null
}



/**
 * Model Service
 */

export type Service = {
  id: number
  name: string
  price: number
  enabled: boolean
}

export type ServiceSelect = {
  id?: boolean
  name?: boolean
  price?: boolean
  enabled?: boolean
  CompanyService?: boolean | FindManyCompanyServiceArgs
  serviceSale?: boolean | FindManyServiceSaleArgs
}

export type ServiceInclude = {
  CompanyService?: boolean | FindManyCompanyServiceArgs
  serviceSale?: boolean | FindManyServiceSaleArgs
}

export type ServiceGetPayload<
  S extends boolean | null | undefined | ServiceArgs,
  U = keyof S
> = S extends true
  ? Service
  : S extends undefined
  ? never
  : S extends ServiceArgs | FindManyServiceArgs
  ? 'include' extends U
    ? Service  & {
      [P in TrueKeys<S['include']>]:
      P extends 'CompanyService'
      ? Array<CompanyServiceGetPayload<S['include'][P]>> :
      P extends 'serviceSale'
      ? Array<ServiceSaleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Service ? Service[P]
: 
      P extends 'CompanyService'
      ? Array<CompanyServiceGetPayload<S['select'][P]>> :
      P extends 'serviceSale'
      ? Array<ServiceSaleGetPayload<S['select'][P]>> : never
    }
  : Service
: Service


export interface ServiceDelegate {
  /**
   * Find zero or one Service.
   * @param {FindOneServiceArgs} args - Arguments to find a Service
   * @example
   * // Get one Service
   * const service = await prisma.service.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneServiceArgs>(
    args: Subset<T, FindOneServiceArgs>
  ): CheckSelect<T, ServiceClient<Service | null>, ServiceClient<ServiceGetPayload<T> | null>>
  /**
   * Find zero or more Services.
   * @param {FindManyServiceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Services
   * const services = await prisma.service.findMany()
   * 
   * // Get first 10 Services
   * const services = await prisma.service.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyServiceArgs>(
    args?: Subset<T, FindManyServiceArgs>
  ): CheckSelect<T, Promise<Array<Service>>, Promise<Array<ServiceGetPayload<T>>>>
  /**
   * Create a Service.
   * @param {ServiceCreateArgs} args - Arguments to create a Service.
   * @example
   * // Create one Service
   * const user = await prisma.service.create({
   *   data: {
   *     // ... data to create a Service
   *   }
   * })
   * 
  **/
  create<T extends ServiceCreateArgs>(
    args: Subset<T, ServiceCreateArgs>
  ): CheckSelect<T, ServiceClient<Service>, ServiceClient<ServiceGetPayload<T>>>
  /**
   * Delete a Service.
   * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
   * @example
   * // Delete one Service
   * const user = await prisma.service.delete({
   *   where: {
   *     // ... filter to delete one Service
   *   }
   * })
   * 
  **/
  delete<T extends ServiceDeleteArgs>(
    args: Subset<T, ServiceDeleteArgs>
  ): CheckSelect<T, ServiceClient<Service>, ServiceClient<ServiceGetPayload<T>>>
  /**
   * Update one Service.
   * @param {ServiceUpdateArgs} args - Arguments to update one Service.
   * @example
   * // Update one Service
   * const service = await prisma.service.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ServiceUpdateArgs>(
    args: Subset<T, ServiceUpdateArgs>
  ): CheckSelect<T, ServiceClient<Service>, ServiceClient<ServiceGetPayload<T>>>
  /**
   * Delete zero or more Services.
   * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
   * @example
   * // Delete a few Services
   * const { count } = await prisma.service.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ServiceDeleteManyArgs>(
    args: Subset<T, ServiceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Services.
   * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Services
   * const service = await prisma.service.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ServiceUpdateManyArgs>(
    args: Subset<T, ServiceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Service.
   * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
   * @example
   * // Update or create a Service
   * const service = await prisma.service.upsert({
   *   create: {
   *     // ... data to create a Service
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Service we want to update
   *   }
   * })
  **/
  upsert<T extends ServiceUpsertArgs>(
    args: Subset<T, ServiceUpsertArgs>
  ): CheckSelect<T, ServiceClient<Service>, ServiceClient<ServiceGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyServiceArgs, 'select' | 'include'>): Promise<number>
}

export declare class ServiceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  CompanyService<T extends FindManyCompanyServiceArgs = {}>(args?: Subset<T, FindManyCompanyServiceArgs>): CheckSelect<T, Promise<Array<CompanyService>>, Promise<Array<CompanyServiceGetPayload<T>>>>;

  serviceSale<T extends FindManyServiceSaleArgs = {}>(args?: Subset<T, FindManyServiceSaleArgs>): CheckSelect<T, Promise<Array<ServiceSale>>, Promise<Array<ServiceSaleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Service findOne
 */
export type FindOneServiceArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * Filter, which Service to fetch.
  **/
  where: ServiceWhereUniqueInput
}


/**
 * Service findMany
 */
export type FindManyServiceArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * Filter, which Services to fetch.
  **/
  where?: ServiceWhereInput
  /**
   * Determine the order of the Services to fetch.
  **/
  orderBy?: ServiceOrderByInput
  /**
   * Skip the first `n` Services.
  **/
  skip?: number
  /**
   * Get all Services that come after the Service you provide with the current order.
  **/
  after?: ServiceWhereUniqueInput
  /**
   * Get all Services that come before the Service you provide with the current order.
  **/
  before?: ServiceWhereUniqueInput
  /**
   * Get the first `n` Services.
  **/
  first?: number
  /**
   * Get the last `n` Services.
  **/
  last?: number
}


/**
 * Service create
 */
export type ServiceCreateArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * The data needed to create a Service.
  **/
  data: ServiceCreateInput
}


/**
 * Service update
 */
export type ServiceUpdateArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * The data needed to update a Service.
  **/
  data: ServiceUpdateInput
  /**
   * Choose, which Service to update.
  **/
  where: ServiceWhereUniqueInput
}


/**
 * Service updateMany
 */
export type ServiceUpdateManyArgs = {
  data: ServiceUpdateManyMutationInput
  where?: ServiceWhereInput
}


/**
 * Service upsert
 */
export type ServiceUpsertArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * The filter to search for the Service to update in case it exists.
  **/
  where: ServiceWhereUniqueInput
  /**
   * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
  **/
  create: ServiceCreateInput
  /**
   * In case the Service was found with the provided `where` argument, update it with this data.
  **/
  update: ServiceUpdateInput
}


/**
 * Service delete
 */
export type ServiceDeleteArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
  /**
   * Filter which Service to delete.
  **/
  where: ServiceWhereUniqueInput
}


/**
 * Service deleteMany
 */
export type ServiceDeleteManyArgs = {
  where?: ServiceWhereInput
}


/**
 * Service without action
 */
export type ServiceArgs = {
  /**
   * Select specific fields to fetch from the Service
  **/
  select?: ServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceInclude | null
}



/**
 * Model CompanyService
 */

export type CompanyService = {
  id: number
  price: number
  companyId: number
  serviceId: number
}

export type CompanyServiceSelect = {
  id?: boolean
  price?: boolean
  companyId?: boolean
  serviceId?: boolean
  company?: boolean | CompanyArgs
  service?: boolean | ServiceArgs
}

export type CompanyServiceInclude = {
  company?: boolean | CompanyArgs
  service?: boolean | ServiceArgs
}

export type CompanyServiceGetPayload<
  S extends boolean | null | undefined | CompanyServiceArgs,
  U = keyof S
> = S extends true
  ? CompanyService
  : S extends undefined
  ? never
  : S extends CompanyServiceArgs | FindManyCompanyServiceArgs
  ? 'include' extends U
    ? CompanyService  & {
      [P in TrueKeys<S['include']>]:
      P extends 'company'
      ? CompanyGetPayload<S['include'][P]> :
      P extends 'service'
      ? ServiceGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof CompanyService ? CompanyService[P]
: 
      P extends 'company'
      ? CompanyGetPayload<S['select'][P]> :
      P extends 'service'
      ? ServiceGetPayload<S['select'][P]> : never
    }
  : CompanyService
: CompanyService


export interface CompanyServiceDelegate {
  /**
   * Find zero or one CompanyService.
   * @param {FindOneCompanyServiceArgs} args - Arguments to find a CompanyService
   * @example
   * // Get one CompanyService
   * const companyService = await prisma.companyService.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCompanyServiceArgs>(
    args: Subset<T, FindOneCompanyServiceArgs>
  ): CheckSelect<T, CompanyServiceClient<CompanyService | null>, CompanyServiceClient<CompanyServiceGetPayload<T> | null>>
  /**
   * Find zero or more CompanyServices.
   * @param {FindManyCompanyServiceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all CompanyServices
   * const companyServices = await prisma.companyService.findMany()
   * 
   * // Get first 10 CompanyServices
   * const companyServices = await prisma.companyService.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const companyServiceWithIdOnly = await prisma.companyService.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCompanyServiceArgs>(
    args?: Subset<T, FindManyCompanyServiceArgs>
  ): CheckSelect<T, Promise<Array<CompanyService>>, Promise<Array<CompanyServiceGetPayload<T>>>>
  /**
   * Create a CompanyService.
   * @param {CompanyServiceCreateArgs} args - Arguments to create a CompanyService.
   * @example
   * // Create one CompanyService
   * const user = await prisma.companyService.create({
   *   data: {
   *     // ... data to create a CompanyService
   *   }
   * })
   * 
  **/
  create<T extends CompanyServiceCreateArgs>(
    args: Subset<T, CompanyServiceCreateArgs>
  ): CheckSelect<T, CompanyServiceClient<CompanyService>, CompanyServiceClient<CompanyServiceGetPayload<T>>>
  /**
   * Delete a CompanyService.
   * @param {CompanyServiceDeleteArgs} args - Arguments to delete one CompanyService.
   * @example
   * // Delete one CompanyService
   * const user = await prisma.companyService.delete({
   *   where: {
   *     // ... filter to delete one CompanyService
   *   }
   * })
   * 
  **/
  delete<T extends CompanyServiceDeleteArgs>(
    args: Subset<T, CompanyServiceDeleteArgs>
  ): CheckSelect<T, CompanyServiceClient<CompanyService>, CompanyServiceClient<CompanyServiceGetPayload<T>>>
  /**
   * Update one CompanyService.
   * @param {CompanyServiceUpdateArgs} args - Arguments to update one CompanyService.
   * @example
   * // Update one CompanyService
   * const companyService = await prisma.companyService.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CompanyServiceUpdateArgs>(
    args: Subset<T, CompanyServiceUpdateArgs>
  ): CheckSelect<T, CompanyServiceClient<CompanyService>, CompanyServiceClient<CompanyServiceGetPayload<T>>>
  /**
   * Delete zero or more CompanyServices.
   * @param {CompanyServiceDeleteManyArgs} args - Arguments to filter CompanyServices to delete.
   * @example
   * // Delete a few CompanyServices
   * const { count } = await prisma.companyService.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CompanyServiceDeleteManyArgs>(
    args: Subset<T, CompanyServiceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more CompanyServices.
   * @param {CompanyServiceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many CompanyServices
   * const companyService = await prisma.companyService.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CompanyServiceUpdateManyArgs>(
    args: Subset<T, CompanyServiceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one CompanyService.
   * @param {CompanyServiceUpsertArgs} args - Arguments to update or create a CompanyService.
   * @example
   * // Update or create a CompanyService
   * const companyService = await prisma.companyService.upsert({
   *   create: {
   *     // ... data to create a CompanyService
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the CompanyService we want to update
   *   }
   * })
  **/
  upsert<T extends CompanyServiceUpsertArgs>(
    args: Subset<T, CompanyServiceUpsertArgs>
  ): CheckSelect<T, CompanyServiceClient<CompanyService>, CompanyServiceClient<CompanyServiceGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCompanyServiceArgs, 'select' | 'include'>): Promise<number>
}

export declare class CompanyServiceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  company<T extends CompanyArgs = {}>(args?: Subset<T, CompanyArgs>): CheckSelect<T, CompanyClient<Company | null>, CompanyClient<CompanyGetPayload<T> | null>>;

  service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, ServiceClient<Service | null>, ServiceClient<ServiceGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * CompanyService findOne
 */
export type FindOneCompanyServiceArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * Filter, which CompanyService to fetch.
  **/
  where: CompanyServiceWhereUniqueInput
}


/**
 * CompanyService findMany
 */
export type FindManyCompanyServiceArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * Filter, which CompanyServices to fetch.
  **/
  where?: CompanyServiceWhereInput
  /**
   * Determine the order of the CompanyServices to fetch.
  **/
  orderBy?: CompanyServiceOrderByInput
  /**
   * Skip the first `n` CompanyServices.
  **/
  skip?: number
  /**
   * Get all CompanyServices that come after the CompanyService you provide with the current order.
  **/
  after?: CompanyServiceWhereUniqueInput
  /**
   * Get all CompanyServices that come before the CompanyService you provide with the current order.
  **/
  before?: CompanyServiceWhereUniqueInput
  /**
   * Get the first `n` CompanyServices.
  **/
  first?: number
  /**
   * Get the last `n` CompanyServices.
  **/
  last?: number
}


/**
 * CompanyService create
 */
export type CompanyServiceCreateArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * The data needed to create a CompanyService.
  **/
  data: CompanyServiceCreateInput
}


/**
 * CompanyService update
 */
export type CompanyServiceUpdateArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * The data needed to update a CompanyService.
  **/
  data: CompanyServiceUpdateInput
  /**
   * Choose, which CompanyService to update.
  **/
  where: CompanyServiceWhereUniqueInput
}


/**
 * CompanyService updateMany
 */
export type CompanyServiceUpdateManyArgs = {
  data: CompanyServiceUpdateManyMutationInput
  where?: CompanyServiceWhereInput
}


/**
 * CompanyService upsert
 */
export type CompanyServiceUpsertArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * The filter to search for the CompanyService to update in case it exists.
  **/
  where: CompanyServiceWhereUniqueInput
  /**
   * In case the CompanyService found by the `where` argument doesn't exist, create a new CompanyService with this data.
  **/
  create: CompanyServiceCreateInput
  /**
   * In case the CompanyService was found with the provided `where` argument, update it with this data.
  **/
  update: CompanyServiceUpdateInput
}


/**
 * CompanyService delete
 */
export type CompanyServiceDeleteArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
  /**
   * Filter which CompanyService to delete.
  **/
  where: CompanyServiceWhereUniqueInput
}


/**
 * CompanyService deleteMany
 */
export type CompanyServiceDeleteManyArgs = {
  where?: CompanyServiceWhereInput
}


/**
 * CompanyService without action
 */
export type CompanyServiceArgs = {
  /**
   * Select specific fields to fetch from the CompanyService
  **/
  select?: CompanyServiceSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CompanyServiceInclude | null
}



/**
 * Model Person
 */

export type Person = {
  id: number
  cpf: string
  name: string
  telephone: string
}

export type PersonSelect = {
  id?: boolean
  cpf?: boolean
  name?: boolean
  telephone?: boolean
  address?: boolean | AddressArgs
  cars?: boolean | FindManyCarArgs
  sales?: boolean | FindManySaleArgs
}

export type PersonInclude = {
  address?: boolean | AddressArgs
  cars?: boolean | FindManyCarArgs
  sales?: boolean | FindManySaleArgs
}

export type PersonGetPayload<
  S extends boolean | null | undefined | PersonArgs,
  U = keyof S
> = S extends true
  ? Person
  : S extends undefined
  ? never
  : S extends PersonArgs | FindManyPersonArgs
  ? 'include' extends U
    ? Person  & {
      [P in TrueKeys<S['include']>]:
      P extends 'address'
      ? AddressGetPayload<S['include'][P]> | null :
      P extends 'cars'
      ? Array<CarGetPayload<S['include'][P]>> :
      P extends 'sales'
      ? Array<SaleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Person ? Person[P]
: 
      P extends 'address'
      ? AddressGetPayload<S['select'][P]> | null :
      P extends 'cars'
      ? Array<CarGetPayload<S['select'][P]>> :
      P extends 'sales'
      ? Array<SaleGetPayload<S['select'][P]>> : never
    }
  : Person
: Person


export interface PersonDelegate {
  /**
   * Find zero or one Person.
   * @param {FindOnePersonArgs} args - Arguments to find a Person
   * @example
   * // Get one Person
   * const person = await prisma.person.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePersonArgs>(
    args: Subset<T, FindOnePersonArgs>
  ): CheckSelect<T, PersonClient<Person | null>, PersonClient<PersonGetPayload<T> | null>>
  /**
   * Find zero or more People.
   * @param {FindManyPersonArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all People
   * const people = await prisma.person.findMany()
   * 
   * // Get first 10 People
   * const people = await prisma.person.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPersonArgs>(
    args?: Subset<T, FindManyPersonArgs>
  ): CheckSelect<T, Promise<Array<Person>>, Promise<Array<PersonGetPayload<T>>>>
  /**
   * Create a Person.
   * @param {PersonCreateArgs} args - Arguments to create a Person.
   * @example
   * // Create one Person
   * const user = await prisma.person.create({
   *   data: {
   *     // ... data to create a Person
   *   }
   * })
   * 
  **/
  create<T extends PersonCreateArgs>(
    args: Subset<T, PersonCreateArgs>
  ): CheckSelect<T, PersonClient<Person>, PersonClient<PersonGetPayload<T>>>
  /**
   * Delete a Person.
   * @param {PersonDeleteArgs} args - Arguments to delete one Person.
   * @example
   * // Delete one Person
   * const user = await prisma.person.delete({
   *   where: {
   *     // ... filter to delete one Person
   *   }
   * })
   * 
  **/
  delete<T extends PersonDeleteArgs>(
    args: Subset<T, PersonDeleteArgs>
  ): CheckSelect<T, PersonClient<Person>, PersonClient<PersonGetPayload<T>>>
  /**
   * Update one Person.
   * @param {PersonUpdateArgs} args - Arguments to update one Person.
   * @example
   * // Update one Person
   * const person = await prisma.person.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PersonUpdateArgs>(
    args: Subset<T, PersonUpdateArgs>
  ): CheckSelect<T, PersonClient<Person>, PersonClient<PersonGetPayload<T>>>
  /**
   * Delete zero or more People.
   * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
   * @example
   * // Delete a few People
   * const { count } = await prisma.person.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PersonDeleteManyArgs>(
    args: Subset<T, PersonDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more People.
   * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many People
   * const person = await prisma.person.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PersonUpdateManyArgs>(
    args: Subset<T, PersonUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Person.
   * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
   * @example
   * // Update or create a Person
   * const person = await prisma.person.upsert({
   *   create: {
   *     // ... data to create a Person
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Person we want to update
   *   }
   * })
  **/
  upsert<T extends PersonUpsertArgs>(
    args: Subset<T, PersonUpsertArgs>
  ): CheckSelect<T, PersonClient<Person>, PersonClient<PersonGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPersonArgs, 'select' | 'include'>): Promise<number>
}

export declare class PersonClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  address<T extends AddressArgs = {}>(args?: Subset<T, AddressArgs>): CheckSelect<T, AddressClient<Address | null>, AddressClient<AddressGetPayload<T> | null>>;

  cars<T extends FindManyCarArgs = {}>(args?: Subset<T, FindManyCarArgs>): CheckSelect<T, Promise<Array<Car>>, Promise<Array<CarGetPayload<T>>>>;

  sales<T extends FindManySaleArgs = {}>(args?: Subset<T, FindManySaleArgs>): CheckSelect<T, Promise<Array<Sale>>, Promise<Array<SaleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Person findOne
 */
export type FindOnePersonArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * Filter, which Person to fetch.
  **/
  where: PersonWhereUniqueInput
}


/**
 * Person findMany
 */
export type FindManyPersonArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * Filter, which People to fetch.
  **/
  where?: PersonWhereInput
  /**
   * Determine the order of the People to fetch.
  **/
  orderBy?: PersonOrderByInput
  /**
   * Skip the first `n` People.
  **/
  skip?: number
  /**
   * Get all People that come after the Person you provide with the current order.
  **/
  after?: PersonWhereUniqueInput
  /**
   * Get all People that come before the Person you provide with the current order.
  **/
  before?: PersonWhereUniqueInput
  /**
   * Get the first `n` People.
  **/
  first?: number
  /**
   * Get the last `n` People.
  **/
  last?: number
}


/**
 * Person create
 */
export type PersonCreateArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * The data needed to create a Person.
  **/
  data: PersonCreateInput
}


/**
 * Person update
 */
export type PersonUpdateArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * The data needed to update a Person.
  **/
  data: PersonUpdateInput
  /**
   * Choose, which Person to update.
  **/
  where: PersonWhereUniqueInput
}


/**
 * Person updateMany
 */
export type PersonUpdateManyArgs = {
  data: PersonUpdateManyMutationInput
  where?: PersonWhereInput
}


/**
 * Person upsert
 */
export type PersonUpsertArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * The filter to search for the Person to update in case it exists.
  **/
  where: PersonWhereUniqueInput
  /**
   * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
  **/
  create: PersonCreateInput
  /**
   * In case the Person was found with the provided `where` argument, update it with this data.
  **/
  update: PersonUpdateInput
}


/**
 * Person delete
 */
export type PersonDeleteArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
  /**
   * Filter which Person to delete.
  **/
  where: PersonWhereUniqueInput
}


/**
 * Person deleteMany
 */
export type PersonDeleteManyArgs = {
  where?: PersonWhereInput
}


/**
 * Person without action
 */
export type PersonArgs = {
  /**
   * Select specific fields to fetch from the Person
  **/
  select?: PersonSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PersonInclude | null
}



/**
 * Model Address
 */

export type Address = {
  id: number
  street: string
  houseNumber: string
  neighborhood: string
  city: string
  uf: string
  personId: number
}

export type AddressSelect = {
  id?: boolean
  street?: boolean
  houseNumber?: boolean
  neighborhood?: boolean
  city?: boolean
  uf?: boolean
  personId?: boolean
  person?: boolean | PersonArgs
}

export type AddressInclude = {
  person?: boolean | PersonArgs
}

export type AddressGetPayload<
  S extends boolean | null | undefined | AddressArgs,
  U = keyof S
> = S extends true
  ? Address
  : S extends undefined
  ? never
  : S extends AddressArgs | FindManyAddressArgs
  ? 'include' extends U
    ? Address  & {
      [P in TrueKeys<S['include']>]:
      P extends 'person'
      ? PersonGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Address ? Address[P]
: 
      P extends 'person'
      ? PersonGetPayload<S['select'][P]> : never
    }
  : Address
: Address


export interface AddressDelegate {
  /**
   * Find zero or one Address.
   * @param {FindOneAddressArgs} args - Arguments to find a Address
   * @example
   * // Get one Address
   * const address = await prisma.address.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAddressArgs>(
    args: Subset<T, FindOneAddressArgs>
  ): CheckSelect<T, AddressClient<Address | null>, AddressClient<AddressGetPayload<T> | null>>
  /**
   * Find zero or more Addresses.
   * @param {FindManyAddressArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Addresses
   * const addresses = await prisma.address.findMany()
   * 
   * // Get first 10 Addresses
   * const addresses = await prisma.address.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAddressArgs>(
    args?: Subset<T, FindManyAddressArgs>
  ): CheckSelect<T, Promise<Array<Address>>, Promise<Array<AddressGetPayload<T>>>>
  /**
   * Create a Address.
   * @param {AddressCreateArgs} args - Arguments to create a Address.
   * @example
   * // Create one Address
   * const user = await prisma.address.create({
   *   data: {
   *     // ... data to create a Address
   *   }
   * })
   * 
  **/
  create<T extends AddressCreateArgs>(
    args: Subset<T, AddressCreateArgs>
  ): CheckSelect<T, AddressClient<Address>, AddressClient<AddressGetPayload<T>>>
  /**
   * Delete a Address.
   * @param {AddressDeleteArgs} args - Arguments to delete one Address.
   * @example
   * // Delete one Address
   * const user = await prisma.address.delete({
   *   where: {
   *     // ... filter to delete one Address
   *   }
   * })
   * 
  **/
  delete<T extends AddressDeleteArgs>(
    args: Subset<T, AddressDeleteArgs>
  ): CheckSelect<T, AddressClient<Address>, AddressClient<AddressGetPayload<T>>>
  /**
   * Update one Address.
   * @param {AddressUpdateArgs} args - Arguments to update one Address.
   * @example
   * // Update one Address
   * const address = await prisma.address.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AddressUpdateArgs>(
    args: Subset<T, AddressUpdateArgs>
  ): CheckSelect<T, AddressClient<Address>, AddressClient<AddressGetPayload<T>>>
  /**
   * Delete zero or more Addresses.
   * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
   * @example
   * // Delete a few Addresses
   * const { count } = await prisma.address.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AddressDeleteManyArgs>(
    args: Subset<T, AddressDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Addresses.
   * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Addresses
   * const address = await prisma.address.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AddressUpdateManyArgs>(
    args: Subset<T, AddressUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Address.
   * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
   * @example
   * // Update or create a Address
   * const address = await prisma.address.upsert({
   *   create: {
   *     // ... data to create a Address
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Address we want to update
   *   }
   * })
  **/
  upsert<T extends AddressUpsertArgs>(
    args: Subset<T, AddressUpsertArgs>
  ): CheckSelect<T, AddressClient<Address>, AddressClient<AddressGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyAddressArgs, 'select' | 'include'>): Promise<number>
}

export declare class AddressClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  person<T extends PersonArgs = {}>(args?: Subset<T, PersonArgs>): CheckSelect<T, PersonClient<Person | null>, PersonClient<PersonGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Address findOne
 */
export type FindOneAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Address to fetch.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address findMany
 */
export type FindManyAddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter, which Addresses to fetch.
  **/
  where?: AddressWhereInput
  /**
   * Determine the order of the Addresses to fetch.
  **/
  orderBy?: AddressOrderByInput
  /**
   * Skip the first `n` Addresses.
  **/
  skip?: number
  /**
   * Get all Addresses that come after the Address you provide with the current order.
  **/
  after?: AddressWhereUniqueInput
  /**
   * Get all Addresses that come before the Address you provide with the current order.
  **/
  before?: AddressWhereUniqueInput
  /**
   * Get the first `n` Addresses.
  **/
  first?: number
  /**
   * Get the last `n` Addresses.
  **/
  last?: number
}


/**
 * Address create
 */
export type AddressCreateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to create a Address.
  **/
  data: AddressCreateInput
}


/**
 * Address update
 */
export type AddressUpdateArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The data needed to update a Address.
  **/
  data: AddressUpdateInput
  /**
   * Choose, which Address to update.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address updateMany
 */
export type AddressUpdateManyArgs = {
  data: AddressUpdateManyMutationInput
  where?: AddressWhereInput
}


/**
 * Address upsert
 */
export type AddressUpsertArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * The filter to search for the Address to update in case it exists.
  **/
  where: AddressWhereUniqueInput
  /**
   * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
  **/
  create: AddressCreateInput
  /**
   * In case the Address was found with the provided `where` argument, update it with this data.
  **/
  update: AddressUpdateInput
}


/**
 * Address delete
 */
export type AddressDeleteArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
  /**
   * Filter which Address to delete.
  **/
  where: AddressWhereUniqueInput
}


/**
 * Address deleteMany
 */
export type AddressDeleteManyArgs = {
  where?: AddressWhereInput
}


/**
 * Address without action
 */
export type AddressArgs = {
  /**
   * Select specific fields to fetch from the Address
  **/
  select?: AddressSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: AddressInclude | null
}



/**
 * Model Car
 */

export type Car = {
  id: number
  car: string
  carPlate: string
  personId: number
}

export type CarSelect = {
  id?: boolean
  car?: boolean
  carPlate?: boolean
  personId?: boolean
  person?: boolean | PersonArgs
  sale?: boolean | FindManySaleArgs
}

export type CarInclude = {
  person?: boolean | PersonArgs
  sale?: boolean | FindManySaleArgs
}

export type CarGetPayload<
  S extends boolean | null | undefined | CarArgs,
  U = keyof S
> = S extends true
  ? Car
  : S extends undefined
  ? never
  : S extends CarArgs | FindManyCarArgs
  ? 'include' extends U
    ? Car  & {
      [P in TrueKeys<S['include']>]:
      P extends 'person'
      ? PersonGetPayload<S['include'][P]> :
      P extends 'sale'
      ? Array<SaleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Car ? Car[P]
: 
      P extends 'person'
      ? PersonGetPayload<S['select'][P]> :
      P extends 'sale'
      ? Array<SaleGetPayload<S['select'][P]>> : never
    }
  : Car
: Car


export interface CarDelegate {
  /**
   * Find zero or one Car.
   * @param {FindOneCarArgs} args - Arguments to find a Car
   * @example
   * // Get one Car
   * const car = await prisma.car.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCarArgs>(
    args: Subset<T, FindOneCarArgs>
  ): CheckSelect<T, CarClient<Car | null>, CarClient<CarGetPayload<T> | null>>
  /**
   * Find zero or more Cars.
   * @param {FindManyCarArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Cars
   * const cars = await prisma.car.findMany()
   * 
   * // Get first 10 Cars
   * const cars = await prisma.car.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const carWithIdOnly = await prisma.car.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCarArgs>(
    args?: Subset<T, FindManyCarArgs>
  ): CheckSelect<T, Promise<Array<Car>>, Promise<Array<CarGetPayload<T>>>>
  /**
   * Create a Car.
   * @param {CarCreateArgs} args - Arguments to create a Car.
   * @example
   * // Create one Car
   * const user = await prisma.car.create({
   *   data: {
   *     // ... data to create a Car
   *   }
   * })
   * 
  **/
  create<T extends CarCreateArgs>(
    args: Subset<T, CarCreateArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Delete a Car.
   * @param {CarDeleteArgs} args - Arguments to delete one Car.
   * @example
   * // Delete one Car
   * const user = await prisma.car.delete({
   *   where: {
   *     // ... filter to delete one Car
   *   }
   * })
   * 
  **/
  delete<T extends CarDeleteArgs>(
    args: Subset<T, CarDeleteArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Update one Car.
   * @param {CarUpdateArgs} args - Arguments to update one Car.
   * @example
   * // Update one Car
   * const car = await prisma.car.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CarUpdateArgs>(
    args: Subset<T, CarUpdateArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Delete zero or more Cars.
   * @param {CarDeleteManyArgs} args - Arguments to filter Cars to delete.
   * @example
   * // Delete a few Cars
   * const { count } = await prisma.car.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CarDeleteManyArgs>(
    args: Subset<T, CarDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Cars.
   * @param {CarUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Cars
   * const car = await prisma.car.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CarUpdateManyArgs>(
    args: Subset<T, CarUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Car.
   * @param {CarUpsertArgs} args - Arguments to update or create a Car.
   * @example
   * // Update or create a Car
   * const car = await prisma.car.upsert({
   *   create: {
   *     // ... data to create a Car
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Car we want to update
   *   }
   * })
  **/
  upsert<T extends CarUpsertArgs>(
    args: Subset<T, CarUpsertArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCarArgs, 'select' | 'include'>): Promise<number>
}

export declare class CarClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  person<T extends PersonArgs = {}>(args?: Subset<T, PersonArgs>): CheckSelect<T, PersonClient<Person | null>, PersonClient<PersonGetPayload<T> | null>>;

  sale<T extends FindManySaleArgs = {}>(args?: Subset<T, FindManySaleArgs>): CheckSelect<T, Promise<Array<Sale>>, Promise<Array<SaleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Car findOne
 */
export type FindOneCarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * Filter, which Car to fetch.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car findMany
 */
export type FindManyCarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * Filter, which Cars to fetch.
  **/
  where?: CarWhereInput
  /**
   * Determine the order of the Cars to fetch.
  **/
  orderBy?: CarOrderByInput
  /**
   * Skip the first `n` Cars.
  **/
  skip?: number
  /**
   * Get all Cars that come after the Car you provide with the current order.
  **/
  after?: CarWhereUniqueInput
  /**
   * Get all Cars that come before the Car you provide with the current order.
  **/
  before?: CarWhereUniqueInput
  /**
   * Get the first `n` Cars.
  **/
  first?: number
  /**
   * Get the last `n` Cars.
  **/
  last?: number
}


/**
 * Car create
 */
export type CarCreateArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * The data needed to create a Car.
  **/
  data: CarCreateInput
}


/**
 * Car update
 */
export type CarUpdateArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * The data needed to update a Car.
  **/
  data: CarUpdateInput
  /**
   * Choose, which Car to update.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car updateMany
 */
export type CarUpdateManyArgs = {
  data: CarUpdateManyMutationInput
  where?: CarWhereInput
}


/**
 * Car upsert
 */
export type CarUpsertArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * The filter to search for the Car to update in case it exists.
  **/
  where: CarWhereUniqueInput
  /**
   * In case the Car found by the `where` argument doesn't exist, create a new Car with this data.
  **/
  create: CarCreateInput
  /**
   * In case the Car was found with the provided `where` argument, update it with this data.
  **/
  update: CarUpdateInput
}


/**
 * Car delete
 */
export type CarDeleteArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
  /**
   * Filter which Car to delete.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car deleteMany
 */
export type CarDeleteManyArgs = {
  where?: CarWhereInput
}


/**
 * Car without action
 */
export type CarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: CarInclude | null
}



/**
 * Model Sale
 */

export type Sale = {
  id: number
  requestDate: Date
  deliveryDate: Date
  done: boolean
  companyPrice: number
  costPrice: number
  sellerId: number
  personId: number
  carId: number
}

export type SaleSelect = {
  id?: boolean
  requestDate?: boolean
  deliveryDate?: boolean
  done?: boolean
  companyPrice?: boolean
  costPrice?: boolean
  sellerId?: boolean
  personId?: boolean
  carId?: boolean
  seller?: boolean | ProfileArgs
  person?: boolean | PersonArgs
  car?: boolean | CarArgs
  serviceSale?: boolean | FindManyServiceSaleArgs
}

export type SaleInclude = {
  seller?: boolean | ProfileArgs
  person?: boolean | PersonArgs
  car?: boolean | CarArgs
  serviceSale?: boolean | FindManyServiceSaleArgs
}

export type SaleGetPayload<
  S extends boolean | null | undefined | SaleArgs,
  U = keyof S
> = S extends true
  ? Sale
  : S extends undefined
  ? never
  : S extends SaleArgs | FindManySaleArgs
  ? 'include' extends U
    ? Sale  & {
      [P in TrueKeys<S['include']>]:
      P extends 'seller'
      ? ProfileGetPayload<S['include'][P]> :
      P extends 'person'
      ? PersonGetPayload<S['include'][P]> :
      P extends 'car'
      ? CarGetPayload<S['include'][P]> :
      P extends 'serviceSale'
      ? Array<ServiceSaleGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Sale ? Sale[P]
: 
      P extends 'seller'
      ? ProfileGetPayload<S['select'][P]> :
      P extends 'person'
      ? PersonGetPayload<S['select'][P]> :
      P extends 'car'
      ? CarGetPayload<S['select'][P]> :
      P extends 'serviceSale'
      ? Array<ServiceSaleGetPayload<S['select'][P]>> : never
    }
  : Sale
: Sale


export interface SaleDelegate {
  /**
   * Find zero or one Sale.
   * @param {FindOneSaleArgs} args - Arguments to find a Sale
   * @example
   * // Get one Sale
   * const sale = await prisma.sale.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneSaleArgs>(
    args: Subset<T, FindOneSaleArgs>
  ): CheckSelect<T, SaleClient<Sale | null>, SaleClient<SaleGetPayload<T> | null>>
  /**
   * Find zero or more Sales.
   * @param {FindManySaleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Sales
   * const sales = await prisma.sale.findMany()
   * 
   * // Get first 10 Sales
   * const sales = await prisma.sale.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManySaleArgs>(
    args?: Subset<T, FindManySaleArgs>
  ): CheckSelect<T, Promise<Array<Sale>>, Promise<Array<SaleGetPayload<T>>>>
  /**
   * Create a Sale.
   * @param {SaleCreateArgs} args - Arguments to create a Sale.
   * @example
   * // Create one Sale
   * const user = await prisma.sale.create({
   *   data: {
   *     // ... data to create a Sale
   *   }
   * })
   * 
  **/
  create<T extends SaleCreateArgs>(
    args: Subset<T, SaleCreateArgs>
  ): CheckSelect<T, SaleClient<Sale>, SaleClient<SaleGetPayload<T>>>
  /**
   * Delete a Sale.
   * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
   * @example
   * // Delete one Sale
   * const user = await prisma.sale.delete({
   *   where: {
   *     // ... filter to delete one Sale
   *   }
   * })
   * 
  **/
  delete<T extends SaleDeleteArgs>(
    args: Subset<T, SaleDeleteArgs>
  ): CheckSelect<T, SaleClient<Sale>, SaleClient<SaleGetPayload<T>>>
  /**
   * Update one Sale.
   * @param {SaleUpdateArgs} args - Arguments to update one Sale.
   * @example
   * // Update one Sale
   * const sale = await prisma.sale.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends SaleUpdateArgs>(
    args: Subset<T, SaleUpdateArgs>
  ): CheckSelect<T, SaleClient<Sale>, SaleClient<SaleGetPayload<T>>>
  /**
   * Delete zero or more Sales.
   * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
   * @example
   * // Delete a few Sales
   * const { count } = await prisma.sale.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends SaleDeleteManyArgs>(
    args: Subset<T, SaleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Sales.
   * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Sales
   * const sale = await prisma.sale.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends SaleUpdateManyArgs>(
    args: Subset<T, SaleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Sale.
   * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
   * @example
   * // Update or create a Sale
   * const sale = await prisma.sale.upsert({
   *   create: {
   *     // ... data to create a Sale
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Sale we want to update
   *   }
   * })
  **/
  upsert<T extends SaleUpsertArgs>(
    args: Subset<T, SaleUpsertArgs>
  ): CheckSelect<T, SaleClient<Sale>, SaleClient<SaleGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManySaleArgs, 'select' | 'include'>): Promise<number>
}

export declare class SaleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  seller<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, ProfileClient<Profile | null>, ProfileClient<ProfileGetPayload<T> | null>>;

  person<T extends PersonArgs = {}>(args?: Subset<T, PersonArgs>): CheckSelect<T, PersonClient<Person | null>, PersonClient<PersonGetPayload<T> | null>>;

  car<T extends CarArgs = {}>(args?: Subset<T, CarArgs>): CheckSelect<T, CarClient<Car | null>, CarClient<CarGetPayload<T> | null>>;

  serviceSale<T extends FindManyServiceSaleArgs = {}>(args?: Subset<T, FindManyServiceSaleArgs>): CheckSelect<T, Promise<Array<ServiceSale>>, Promise<Array<ServiceSaleGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Sale findOne
 */
export type FindOneSaleArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * Filter, which Sale to fetch.
  **/
  where: SaleWhereUniqueInput
}


/**
 * Sale findMany
 */
export type FindManySaleArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * Filter, which Sales to fetch.
  **/
  where?: SaleWhereInput
  /**
   * Determine the order of the Sales to fetch.
  **/
  orderBy?: SaleOrderByInput
  /**
   * Skip the first `n` Sales.
  **/
  skip?: number
  /**
   * Get all Sales that come after the Sale you provide with the current order.
  **/
  after?: SaleWhereUniqueInput
  /**
   * Get all Sales that come before the Sale you provide with the current order.
  **/
  before?: SaleWhereUniqueInput
  /**
   * Get the first `n` Sales.
  **/
  first?: number
  /**
   * Get the last `n` Sales.
  **/
  last?: number
}


/**
 * Sale create
 */
export type SaleCreateArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * The data needed to create a Sale.
  **/
  data: SaleCreateInput
}


/**
 * Sale update
 */
export type SaleUpdateArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * The data needed to update a Sale.
  **/
  data: SaleUpdateInput
  /**
   * Choose, which Sale to update.
  **/
  where: SaleWhereUniqueInput
}


/**
 * Sale updateMany
 */
export type SaleUpdateManyArgs = {
  data: SaleUpdateManyMutationInput
  where?: SaleWhereInput
}


/**
 * Sale upsert
 */
export type SaleUpsertArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * The filter to search for the Sale to update in case it exists.
  **/
  where: SaleWhereUniqueInput
  /**
   * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
  **/
  create: SaleCreateInput
  /**
   * In case the Sale was found with the provided `where` argument, update it with this data.
  **/
  update: SaleUpdateInput
}


/**
 * Sale delete
 */
export type SaleDeleteArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
  /**
   * Filter which Sale to delete.
  **/
  where: SaleWhereUniqueInput
}


/**
 * Sale deleteMany
 */
export type SaleDeleteManyArgs = {
  where?: SaleWhereInput
}


/**
 * Sale without action
 */
export type SaleArgs = {
  /**
   * Select specific fields to fetch from the Sale
  **/
  select?: SaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: SaleInclude | null
}



/**
 * Model ServiceSale
 */

export type ServiceSale = {
  id: number
  saleId: number
  serviceId: number
}

export type ServiceSaleSelect = {
  id?: boolean
  saleId?: boolean
  serviceId?: boolean
  sale?: boolean | SaleArgs
  service?: boolean | ServiceArgs
}

export type ServiceSaleInclude = {
  sale?: boolean | SaleArgs
  service?: boolean | ServiceArgs
}

export type ServiceSaleGetPayload<
  S extends boolean | null | undefined | ServiceSaleArgs,
  U = keyof S
> = S extends true
  ? ServiceSale
  : S extends undefined
  ? never
  : S extends ServiceSaleArgs | FindManyServiceSaleArgs
  ? 'include' extends U
    ? ServiceSale  & {
      [P in TrueKeys<S['include']>]:
      P extends 'sale'
      ? SaleGetPayload<S['include'][P]> :
      P extends 'service'
      ? ServiceGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof ServiceSale ? ServiceSale[P]
: 
      P extends 'sale'
      ? SaleGetPayload<S['select'][P]> :
      P extends 'service'
      ? ServiceGetPayload<S['select'][P]> : never
    }
  : ServiceSale
: ServiceSale


export interface ServiceSaleDelegate {
  /**
   * Find zero or one ServiceSale.
   * @param {FindOneServiceSaleArgs} args - Arguments to find a ServiceSale
   * @example
   * // Get one ServiceSale
   * const serviceSale = await prisma.serviceSale.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneServiceSaleArgs>(
    args: Subset<T, FindOneServiceSaleArgs>
  ): CheckSelect<T, ServiceSaleClient<ServiceSale | null>, ServiceSaleClient<ServiceSaleGetPayload<T> | null>>
  /**
   * Find zero or more ServiceSales.
   * @param {FindManyServiceSaleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all ServiceSales
   * const serviceSales = await prisma.serviceSale.findMany()
   * 
   * // Get first 10 ServiceSales
   * const serviceSales = await prisma.serviceSale.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const serviceSaleWithIdOnly = await prisma.serviceSale.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyServiceSaleArgs>(
    args?: Subset<T, FindManyServiceSaleArgs>
  ): CheckSelect<T, Promise<Array<ServiceSale>>, Promise<Array<ServiceSaleGetPayload<T>>>>
  /**
   * Create a ServiceSale.
   * @param {ServiceSaleCreateArgs} args - Arguments to create a ServiceSale.
   * @example
   * // Create one ServiceSale
   * const user = await prisma.serviceSale.create({
   *   data: {
   *     // ... data to create a ServiceSale
   *   }
   * })
   * 
  **/
  create<T extends ServiceSaleCreateArgs>(
    args: Subset<T, ServiceSaleCreateArgs>
  ): CheckSelect<T, ServiceSaleClient<ServiceSale>, ServiceSaleClient<ServiceSaleGetPayload<T>>>
  /**
   * Delete a ServiceSale.
   * @param {ServiceSaleDeleteArgs} args - Arguments to delete one ServiceSale.
   * @example
   * // Delete one ServiceSale
   * const user = await prisma.serviceSale.delete({
   *   where: {
   *     // ... filter to delete one ServiceSale
   *   }
   * })
   * 
  **/
  delete<T extends ServiceSaleDeleteArgs>(
    args: Subset<T, ServiceSaleDeleteArgs>
  ): CheckSelect<T, ServiceSaleClient<ServiceSale>, ServiceSaleClient<ServiceSaleGetPayload<T>>>
  /**
   * Update one ServiceSale.
   * @param {ServiceSaleUpdateArgs} args - Arguments to update one ServiceSale.
   * @example
   * // Update one ServiceSale
   * const serviceSale = await prisma.serviceSale.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ServiceSaleUpdateArgs>(
    args: Subset<T, ServiceSaleUpdateArgs>
  ): CheckSelect<T, ServiceSaleClient<ServiceSale>, ServiceSaleClient<ServiceSaleGetPayload<T>>>
  /**
   * Delete zero or more ServiceSales.
   * @param {ServiceSaleDeleteManyArgs} args - Arguments to filter ServiceSales to delete.
   * @example
   * // Delete a few ServiceSales
   * const { count } = await prisma.serviceSale.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ServiceSaleDeleteManyArgs>(
    args: Subset<T, ServiceSaleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more ServiceSales.
   * @param {ServiceSaleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many ServiceSales
   * const serviceSale = await prisma.serviceSale.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ServiceSaleUpdateManyArgs>(
    args: Subset<T, ServiceSaleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one ServiceSale.
   * @param {ServiceSaleUpsertArgs} args - Arguments to update or create a ServiceSale.
   * @example
   * // Update or create a ServiceSale
   * const serviceSale = await prisma.serviceSale.upsert({
   *   create: {
   *     // ... data to create a ServiceSale
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the ServiceSale we want to update
   *   }
   * })
  **/
  upsert<T extends ServiceSaleUpsertArgs>(
    args: Subset<T, ServiceSaleUpsertArgs>
  ): CheckSelect<T, ServiceSaleClient<ServiceSale>, ServiceSaleClient<ServiceSaleGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyServiceSaleArgs, 'select' | 'include'>): Promise<number>
}

export declare class ServiceSaleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  sale<T extends SaleArgs = {}>(args?: Subset<T, SaleArgs>): CheckSelect<T, SaleClient<Sale | null>, SaleClient<SaleGetPayload<T> | null>>;

  service<T extends ServiceArgs = {}>(args?: Subset<T, ServiceArgs>): CheckSelect<T, ServiceClient<Service | null>, ServiceClient<ServiceGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ServiceSale findOne
 */
export type FindOneServiceSaleArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * Filter, which ServiceSale to fetch.
  **/
  where: ServiceSaleWhereUniqueInput
}


/**
 * ServiceSale findMany
 */
export type FindManyServiceSaleArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * Filter, which ServiceSales to fetch.
  **/
  where?: ServiceSaleWhereInput
  /**
   * Determine the order of the ServiceSales to fetch.
  **/
  orderBy?: ServiceSaleOrderByInput
  /**
   * Skip the first `n` ServiceSales.
  **/
  skip?: number
  /**
   * Get all ServiceSales that come after the ServiceSale you provide with the current order.
  **/
  after?: ServiceSaleWhereUniqueInput
  /**
   * Get all ServiceSales that come before the ServiceSale you provide with the current order.
  **/
  before?: ServiceSaleWhereUniqueInput
  /**
   * Get the first `n` ServiceSales.
  **/
  first?: number
  /**
   * Get the last `n` ServiceSales.
  **/
  last?: number
}


/**
 * ServiceSale create
 */
export type ServiceSaleCreateArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * The data needed to create a ServiceSale.
  **/
  data: ServiceSaleCreateInput
}


/**
 * ServiceSale update
 */
export type ServiceSaleUpdateArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * The data needed to update a ServiceSale.
  **/
  data: ServiceSaleUpdateInput
  /**
   * Choose, which ServiceSale to update.
  **/
  where: ServiceSaleWhereUniqueInput
}


/**
 * ServiceSale updateMany
 */
export type ServiceSaleUpdateManyArgs = {
  data: ServiceSaleUpdateManyMutationInput
  where?: ServiceSaleWhereInput
}


/**
 * ServiceSale upsert
 */
export type ServiceSaleUpsertArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * The filter to search for the ServiceSale to update in case it exists.
  **/
  where: ServiceSaleWhereUniqueInput
  /**
   * In case the ServiceSale found by the `where` argument doesn't exist, create a new ServiceSale with this data.
  **/
  create: ServiceSaleCreateInput
  /**
   * In case the ServiceSale was found with the provided `where` argument, update it with this data.
  **/
  update: ServiceSaleUpdateInput
}


/**
 * ServiceSale delete
 */
export type ServiceSaleDeleteArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
  /**
   * Filter which ServiceSale to delete.
  **/
  where: ServiceSaleWhereUniqueInput
}


/**
 * ServiceSale deleteMany
 */
export type ServiceSaleDeleteManyArgs = {
  where?: ServiceSaleWhereInput
}


/**
 * ServiceSale without action
 */
export type ServiceSaleArgs = {
  /**
   * Select specific fields to fetch from the ServiceSale
  **/
  select?: ServiceSaleSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ServiceSaleInclude | null
}



/**
 * Deep Input Types
 */


export type UnitWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  companyId?: number | IntFilter
  Profile?: ProfileFilter | null
  AND?: Enumerable<UnitWhereInput>
  OR?: Enumerable<UnitWhereInput>
  NOT?: Enumerable<UnitWhereInput>
  company?: CompanyWhereInput | null
}

export type AddressWhereInput = {
  id?: number | IntFilter
  street?: string | StringFilter
  houseNumber?: string | StringFilter
  neighborhood?: string | StringFilter
  city?: string | StringFilter
  uf?: string | StringFilter
  personId?: number | IntFilter
  AND?: Enumerable<AddressWhereInput>
  OR?: Enumerable<AddressWhereInput>
  NOT?: Enumerable<AddressWhereInput>
  person?: PersonWhereInput | null
}

export type CarWhereInput = {
  id?: number | IntFilter
  car?: string | StringFilter
  carPlate?: string | StringFilter
  personId?: number | IntFilter
  sale?: SaleFilter | null
  AND?: Enumerable<CarWhereInput>
  OR?: Enumerable<CarWhereInput>
  NOT?: Enumerable<CarWhereInput>
  person?: PersonWhereInput | null
}

export type PersonWhereInput = {
  id?: number | IntFilter
  cpf?: string | StringFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  cars?: CarFilter | null
  sales?: SaleFilter | null
  AND?: Enumerable<PersonWhereInput>
  OR?: Enumerable<PersonWhereInput>
  NOT?: Enumerable<PersonWhereInput>
  address?: AddressWhereInput | null
}

export type SaleWhereInput = {
  id?: number | IntFilter
  requestDate?: Date | string | DateTimeFilter
  deliveryDate?: Date | string | DateTimeFilter
  done?: boolean | BooleanFilter
  companyPrice?: number | FloatFilter
  costPrice?: number | FloatFilter
  sellerId?: number | IntFilter
  personId?: number | IntFilter
  carId?: number | IntFilter
  serviceSale?: ServiceSaleFilter | null
  AND?: Enumerable<SaleWhereInput>
  OR?: Enumerable<SaleWhereInput>
  NOT?: Enumerable<SaleWhereInput>
  seller?: ProfileWhereInput | null
  person?: PersonWhereInput | null
  car?: CarWhereInput | null
}

export type ServiceSaleWhereInput = {
  id?: number | IntFilter
  saleId?: number | IntFilter
  serviceId?: number | IntFilter
  AND?: Enumerable<ServiceSaleWhereInput>
  OR?: Enumerable<ServiceSaleWhereInput>
  NOT?: Enumerable<ServiceSaleWhereInput>
  sale?: SaleWhereInput | null
  service?: ServiceWhereInput | null
}

export type ServiceWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  price?: number | FloatFilter
  enabled?: boolean | BooleanFilter
  CompanyService?: CompanyServiceFilter | null
  serviceSale?: ServiceSaleFilter | null
  AND?: Enumerable<ServiceWhereInput>
  OR?: Enumerable<ServiceWhereInput>
  NOT?: Enumerable<ServiceWhereInput>
}

export type CompanyServiceWhereInput = {
  id?: number | IntFilter
  price?: number | FloatFilter
  companyId?: number | IntFilter
  serviceId?: number | IntFilter
  AND?: Enumerable<CompanyServiceWhereInput>
  OR?: Enumerable<CompanyServiceWhereInput>
  NOT?: Enumerable<CompanyServiceWhereInput>
  company?: CompanyWhereInput | null
  service?: ServiceWhereInput | null
}

export type CompanyWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  cnpj?: string | StringFilter
  units?: UnitFilter | null
  Profile?: ProfileFilter | null
  sompanyService?: CompanyServiceFilter | null
  AND?: Enumerable<CompanyWhereInput>
  OR?: Enumerable<CompanyWhereInput>
  NOT?: Enumerable<CompanyWhereInput>
}

export type ProfileWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  enabled?: boolean | BooleanFilter
  userId?: number | IntFilter
  companyId?: number | NullableIntFilter | null
  unitId?: number | NullableIntFilter | null
  sale?: SaleFilter | null
  AND?: Enumerable<ProfileWhereInput>
  OR?: Enumerable<ProfileWhereInput>
  NOT?: Enumerable<ProfileWhereInput>
  user?: UserWhereInput | null
  company?: CompanyWhereInput | null
  unit?: UnitWhereInput | null
}

export type UserWhereInput = {
  id?: number | IntFilter
  username?: string | StringFilter
  email?: string | StringFilter
  password?: string | StringFilter
  role?: Role | RoleFilter
  enabled?: boolean | BooleanFilter
  firstLogin?: boolean | BooleanFilter
  AND?: Enumerable<UserWhereInput>
  OR?: Enumerable<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  profile?: ProfileWhereInput | null
}

export type UserWhereUniqueInput = {
  id?: number
  username?: string
  email?: string
}

export type UnitWhereUniqueInput = {
  id?: number
}

export type ProfileWhereUniqueInput = {
  id?: number
  userId?: number
}

export type CompanyServiceWhereUniqueInput = {
  id?: number
}

export type ServiceSaleWhereUniqueInput = {
  id?: number
}

export type CarWhereUniqueInput = {
  id?: number
}

export type SaleWhereUniqueInput = {
  id?: number
}

export type CompanyWhereUniqueInput = {
  id?: number
  name?: string
  cnpj?: string
}

export type ServiceWhereUniqueInput = {
  id?: number
  name?: string
}

export type PersonWhereUniqueInput = {
  id?: number
  cpf?: string
}

export type AddressWhereUniqueInput = {
  id?: number
}

export type UserCreateWithoutProfileInput = {
  username: string
  email: string
  password: string
  role?: Role
  enabled?: boolean
  firstLogin?: boolean
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export type AddressCreateWithoutPersonInput = {
  street: string
  houseNumber: string
  neighborhood: string
  city: string
  uf: string
}

export type AddressCreateOneWithoutPersonInput = {
  create?: AddressCreateWithoutPersonInput
  connect?: AddressWhereUniqueInput
}

export type ProfileCreateWithoutCompanyInput = {
  name: string
  telephone: string
  enabled?: boolean
  user: UserCreateOneWithoutProfileInput
  unit?: UnitCreateOneWithoutProfileInput | null
  sale?: SaleCreateManyWithoutSellerInput | null
}

export type ProfileCreateManyWithoutCompanyInput = {
  create?: Enumerable<ProfileCreateWithoutCompanyInput>
  connect?: Enumerable<ProfileWhereUniqueInput>
}

export type CompanyCreateWithoutSompanyServiceInput = {
  name: string
  telephone: string
  cnpj: string
  units?: UnitCreateManyWithoutCompanyInput | null
  Profile?: ProfileCreateManyWithoutCompanyInput | null
}

export type CompanyCreateOneWithoutSompanyServiceInput = {
  create?: CompanyCreateWithoutSompanyServiceInput
  connect?: CompanyWhereUniqueInput
}

export type CompanyServiceCreateWithoutServiceInput = {
  price: number
  company: CompanyCreateOneWithoutSompanyServiceInput
}

export type CompanyServiceCreateManyWithoutServiceInput = {
  create?: Enumerable<CompanyServiceCreateWithoutServiceInput>
  connect?: Enumerable<CompanyServiceWhereUniqueInput>
}

export type ServiceCreateWithoutServiceSaleInput = {
  name: string
  price: number
  enabled?: boolean
  CompanyService?: CompanyServiceCreateManyWithoutServiceInput | null
}

export type ServiceCreateOneWithoutServiceSaleInput = {
  create?: ServiceCreateWithoutServiceSaleInput
  connect?: ServiceWhereUniqueInput
}

export type ServiceSaleCreateWithoutSaleInput = {
  service: ServiceCreateOneWithoutServiceSaleInput
}

export type ServiceSaleCreateManyWithoutSaleInput = {
  create?: Enumerable<ServiceSaleCreateWithoutSaleInput>
  connect?: Enumerable<ServiceSaleWhereUniqueInput>
}

export type SaleCreateWithoutPersonInput = {
  requestDate?: Date | string
  deliveryDate: Date | string
  done?: boolean
  companyPrice: number
  costPrice: number
  seller: ProfileCreateOneWithoutSaleInput
  car: CarCreateOneWithoutSaleInput
  serviceSale?: ServiceSaleCreateManyWithoutSaleInput | null
}

export type SaleCreateManyWithoutPersonInput = {
  create?: Enumerable<SaleCreateWithoutPersonInput>
  connect?: Enumerable<SaleWhereUniqueInput>
}

export type PersonCreateWithoutCarsInput = {
  cpf: string
  name: string
  telephone: string
  address?: AddressCreateOneWithoutPersonInput | null
  sales?: SaleCreateManyWithoutPersonInput | null
}

export type PersonCreateOneWithoutCarsInput = {
  create?: PersonCreateWithoutCarsInput
  connect?: PersonWhereUniqueInput
}

export type CarCreateWithoutSaleInput = {
  car: string
  carPlate: string
  person: PersonCreateOneWithoutCarsInput
}

export type CarCreateOneWithoutSaleInput = {
  create?: CarCreateWithoutSaleInput
  connect?: CarWhereUniqueInput
}

export type SaleCreateWithoutServiceSaleInput = {
  requestDate?: Date | string
  deliveryDate: Date | string
  done?: boolean
  companyPrice: number
  costPrice: number
  seller: ProfileCreateOneWithoutSaleInput
  person: PersonCreateOneWithoutSalesInput
  car: CarCreateOneWithoutSaleInput
}

export type SaleCreateOneWithoutServiceSaleInput = {
  create?: SaleCreateWithoutServiceSaleInput
  connect?: SaleWhereUniqueInput
}

export type ServiceSaleCreateWithoutServiceInput = {
  sale: SaleCreateOneWithoutServiceSaleInput
}

export type ServiceSaleCreateManyWithoutServiceInput = {
  create?: Enumerable<ServiceSaleCreateWithoutServiceInput>
  connect?: Enumerable<ServiceSaleWhereUniqueInput>
}

export type ServiceCreateWithoutCompanyServiceInput = {
  name: string
  price: number
  enabled?: boolean
  serviceSale?: ServiceSaleCreateManyWithoutServiceInput | null
}

export type ServiceCreateOneWithoutCompanyServiceInput = {
  create?: ServiceCreateWithoutCompanyServiceInput
  connect?: ServiceWhereUniqueInput
}

export type CompanyServiceCreateWithoutCompanyInput = {
  price: number
  service: ServiceCreateOneWithoutCompanyServiceInput
}

export type CompanyServiceCreateManyWithoutCompanyInput = {
  create?: Enumerable<CompanyServiceCreateWithoutCompanyInput>
  connect?: Enumerable<CompanyServiceWhereUniqueInput>
}

export type CompanyCreateWithoutUnitsInput = {
  name: string
  telephone: string
  cnpj: string
  Profile?: ProfileCreateManyWithoutCompanyInput | null
  sompanyService?: CompanyServiceCreateManyWithoutCompanyInput | null
}

export type CompanyCreateOneWithoutUnitsInput = {
  create?: CompanyCreateWithoutUnitsInput
  connect?: CompanyWhereUniqueInput
}

export type UnitCreateWithoutProfileInput = {
  name: string
  telephone: string
  company: CompanyCreateOneWithoutUnitsInput
}

export type UnitCreateOneWithoutProfileInput = {
  create?: UnitCreateWithoutProfileInput
  connect?: UnitWhereUniqueInput
}

export type ProfileCreateWithoutSaleInput = {
  name: string
  telephone: string
  enabled?: boolean
  user: UserCreateOneWithoutProfileInput
  company?: CompanyCreateOneWithoutProfileInput | null
  unit?: UnitCreateOneWithoutProfileInput | null
}

export type ProfileCreateOneWithoutSaleInput = {
  create?: ProfileCreateWithoutSaleInput
  connect?: ProfileWhereUniqueInput
}

export type SaleCreateWithoutCarInput = {
  requestDate?: Date | string
  deliveryDate: Date | string
  done?: boolean
  companyPrice: number
  costPrice: number
  seller: ProfileCreateOneWithoutSaleInput
  person: PersonCreateOneWithoutSalesInput
  serviceSale?: ServiceSaleCreateManyWithoutSaleInput | null
}

export type SaleCreateManyWithoutCarInput = {
  create?: Enumerable<SaleCreateWithoutCarInput>
  connect?: Enumerable<SaleWhereUniqueInput>
}

export type CarCreateWithoutPersonInput = {
  car: string
  carPlate: string
  sale?: SaleCreateManyWithoutCarInput | null
}

export type CarCreateManyWithoutPersonInput = {
  create?: Enumerable<CarCreateWithoutPersonInput>
  connect?: Enumerable<CarWhereUniqueInput>
}

export type PersonCreateWithoutSalesInput = {
  cpf: string
  name: string
  telephone: string
  address?: AddressCreateOneWithoutPersonInput | null
  cars?: CarCreateManyWithoutPersonInput | null
}

export type PersonCreateOneWithoutSalesInput = {
  create?: PersonCreateWithoutSalesInput
  connect?: PersonWhereUniqueInput
}

export type SaleCreateWithoutSellerInput = {
  requestDate?: Date | string
  deliveryDate: Date | string
  done?: boolean
  companyPrice: number
  costPrice: number
  person: PersonCreateOneWithoutSalesInput
  car: CarCreateOneWithoutSaleInput
  serviceSale?: ServiceSaleCreateManyWithoutSaleInput | null
}

export type SaleCreateManyWithoutSellerInput = {
  create?: Enumerable<SaleCreateWithoutSellerInput>
  connect?: Enumerable<SaleWhereUniqueInput>
}

export type ProfileCreateWithoutUnitInput = {
  name: string
  telephone: string
  enabled?: boolean
  user: UserCreateOneWithoutProfileInput
  company?: CompanyCreateOneWithoutProfileInput | null
  sale?: SaleCreateManyWithoutSellerInput | null
}

export type ProfileCreateManyWithoutUnitInput = {
  create?: Enumerable<ProfileCreateWithoutUnitInput>
  connect?: Enumerable<ProfileWhereUniqueInput>
}

export type UnitCreateWithoutCompanyInput = {
  name: string
  telephone: string
  Profile?: ProfileCreateManyWithoutUnitInput | null
}

export type UnitCreateManyWithoutCompanyInput = {
  create?: Enumerable<UnitCreateWithoutCompanyInput>
  connect?: Enumerable<UnitWhereUniqueInput>
}

export type CompanyCreateWithoutProfileInput = {
  name: string
  telephone: string
  cnpj: string
  units?: UnitCreateManyWithoutCompanyInput | null
  sompanyService?: CompanyServiceCreateManyWithoutCompanyInput | null
}

export type CompanyCreateOneWithoutProfileInput = {
  create?: CompanyCreateWithoutProfileInput
  connect?: CompanyWhereUniqueInput
}

export type ProfileCreateWithoutUserInput = {
  name: string
  telephone: string
  enabled?: boolean
  company?: CompanyCreateOneWithoutProfileInput | null
  unit?: UnitCreateOneWithoutProfileInput | null
  sale?: SaleCreateManyWithoutSellerInput | null
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export type UserCreateInput = {
  username: string
  email: string
  password: string
  role?: Role
  enabled?: boolean
  firstLogin?: boolean
  profile: ProfileCreateOneWithoutUserInput
}

export type UserUpdateWithoutProfileDataInput = {
  id?: number
  username?: string
  email?: string
  password?: string
  role?: Role
  enabled?: boolean
  firstLogin?: boolean
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export type AddressUpdateWithoutPersonDataInput = {
  id?: number
  street?: string
  houseNumber?: string
  neighborhood?: string
  city?: string
  uf?: string
}

export type AddressUpsertWithoutPersonInput = {
  update: AddressUpdateWithoutPersonDataInput
  create: AddressCreateWithoutPersonInput
}

export type AddressUpdateOneWithoutPersonInput = {
  create?: AddressCreateWithoutPersonInput
  connect?: AddressWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: AddressUpdateWithoutPersonDataInput
  upsert?: AddressUpsertWithoutPersonInput
}

export type ProfileUpdateWithoutCompanyDataInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
  user?: UserUpdateOneRequiredWithoutProfileInput
  unit?: UnitUpdateOneWithoutProfileInput
  sale?: SaleUpdateManyWithoutSellerInput
}

export type ProfileUpdateWithWhereUniqueWithoutCompanyInput = {
  where: ProfileWhereUniqueInput
  data: ProfileUpdateWithoutCompanyDataInput
}

export type ProfileScalarWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  enabled?: boolean | BooleanFilter
  userId?: number | IntFilter
  companyId?: number | NullableIntFilter | null
  unitId?: number | NullableIntFilter | null
  sale?: SaleFilter | null
  AND?: Enumerable<ProfileScalarWhereInput>
  OR?: Enumerable<ProfileScalarWhereInput>
  NOT?: Enumerable<ProfileScalarWhereInput>
}

export type ProfileUpdateManyDataInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
}

export type ProfileUpdateManyWithWhereNestedInput = {
  where: ProfileScalarWhereInput
  data: ProfileUpdateManyDataInput
}

export type ProfileUpsertWithWhereUniqueWithoutCompanyInput = {
  where: ProfileWhereUniqueInput
  update: ProfileUpdateWithoutCompanyDataInput
  create: ProfileCreateWithoutCompanyInput
}

export type ProfileUpdateManyWithoutCompanyInput = {
  create?: Enumerable<ProfileCreateWithoutCompanyInput>
  connect?: Enumerable<ProfileWhereUniqueInput>
  set?: Enumerable<ProfileWhereUniqueInput>
  disconnect?: Enumerable<ProfileWhereUniqueInput>
  delete?: Enumerable<ProfileWhereUniqueInput>
  update?: Enumerable<ProfileUpdateWithWhereUniqueWithoutCompanyInput>
  updateMany?: Enumerable<ProfileUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<ProfileScalarWhereInput>
  upsert?: Enumerable<ProfileUpsertWithWhereUniqueWithoutCompanyInput>
}

export type CompanyUpdateWithoutSompanyServiceDataInput = {
  id?: number
  name?: string
  telephone?: string
  cnpj?: string
  units?: UnitUpdateManyWithoutCompanyInput
  Profile?: ProfileUpdateManyWithoutCompanyInput
}

export type CompanyUpsertWithoutSompanyServiceInput = {
  update: CompanyUpdateWithoutSompanyServiceDataInput
  create: CompanyCreateWithoutSompanyServiceInput
}

export type CompanyUpdateOneRequiredWithoutSompanyServiceInput = {
  create?: CompanyCreateWithoutSompanyServiceInput
  connect?: CompanyWhereUniqueInput
  update?: CompanyUpdateWithoutSompanyServiceDataInput
  upsert?: CompanyUpsertWithoutSompanyServiceInput
}

export type CompanyServiceUpdateWithoutServiceDataInput = {
  id?: number
  price?: number
  company?: CompanyUpdateOneRequiredWithoutSompanyServiceInput
}

export type CompanyServiceUpdateWithWhereUniqueWithoutServiceInput = {
  where: CompanyServiceWhereUniqueInput
  data: CompanyServiceUpdateWithoutServiceDataInput
}

export type CompanyServiceScalarWhereInput = {
  id?: number | IntFilter
  price?: number | FloatFilter
  companyId?: number | IntFilter
  serviceId?: number | IntFilter
  AND?: Enumerable<CompanyServiceScalarWhereInput>
  OR?: Enumerable<CompanyServiceScalarWhereInput>
  NOT?: Enumerable<CompanyServiceScalarWhereInput>
}

export type CompanyServiceUpdateManyDataInput = {
  id?: number
  price?: number
}

export type CompanyServiceUpdateManyWithWhereNestedInput = {
  where: CompanyServiceScalarWhereInput
  data: CompanyServiceUpdateManyDataInput
}

export type CompanyServiceUpsertWithWhereUniqueWithoutServiceInput = {
  where: CompanyServiceWhereUniqueInput
  update: CompanyServiceUpdateWithoutServiceDataInput
  create: CompanyServiceCreateWithoutServiceInput
}

export type CompanyServiceUpdateManyWithoutServiceInput = {
  create?: Enumerable<CompanyServiceCreateWithoutServiceInput>
  connect?: Enumerable<CompanyServiceWhereUniqueInput>
  set?: Enumerable<CompanyServiceWhereUniqueInput>
  disconnect?: Enumerable<CompanyServiceWhereUniqueInput>
  delete?: Enumerable<CompanyServiceWhereUniqueInput>
  update?: Enumerable<CompanyServiceUpdateWithWhereUniqueWithoutServiceInput>
  updateMany?: Enumerable<CompanyServiceUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<CompanyServiceScalarWhereInput>
  upsert?: Enumerable<CompanyServiceUpsertWithWhereUniqueWithoutServiceInput>
}

export type ServiceUpdateWithoutServiceSaleDataInput = {
  id?: number
  name?: string
  price?: number
  enabled?: boolean
  CompanyService?: CompanyServiceUpdateManyWithoutServiceInput
}

export type ServiceUpsertWithoutServiceSaleInput = {
  update: ServiceUpdateWithoutServiceSaleDataInput
  create: ServiceCreateWithoutServiceSaleInput
}

export type ServiceUpdateOneRequiredWithoutServiceSaleInput = {
  create?: ServiceCreateWithoutServiceSaleInput
  connect?: ServiceWhereUniqueInput
  update?: ServiceUpdateWithoutServiceSaleDataInput
  upsert?: ServiceUpsertWithoutServiceSaleInput
}

export type ServiceSaleUpdateWithoutSaleDataInput = {
  id?: number
  service?: ServiceUpdateOneRequiredWithoutServiceSaleInput
}

export type ServiceSaleUpdateWithWhereUniqueWithoutSaleInput = {
  where: ServiceSaleWhereUniqueInput
  data: ServiceSaleUpdateWithoutSaleDataInput
}

export type ServiceSaleScalarWhereInput = {
  id?: number | IntFilter
  saleId?: number | IntFilter
  serviceId?: number | IntFilter
  AND?: Enumerable<ServiceSaleScalarWhereInput>
  OR?: Enumerable<ServiceSaleScalarWhereInput>
  NOT?: Enumerable<ServiceSaleScalarWhereInput>
}

export type ServiceSaleUpdateManyDataInput = {
  id?: number
}

export type ServiceSaleUpdateManyWithWhereNestedInput = {
  where: ServiceSaleScalarWhereInput
  data: ServiceSaleUpdateManyDataInput
}

export type ServiceSaleUpsertWithWhereUniqueWithoutSaleInput = {
  where: ServiceSaleWhereUniqueInput
  update: ServiceSaleUpdateWithoutSaleDataInput
  create: ServiceSaleCreateWithoutSaleInput
}

export type ServiceSaleUpdateManyWithoutSaleInput = {
  create?: Enumerable<ServiceSaleCreateWithoutSaleInput>
  connect?: Enumerable<ServiceSaleWhereUniqueInput>
  set?: Enumerable<ServiceSaleWhereUniqueInput>
  disconnect?: Enumerable<ServiceSaleWhereUniqueInput>
  delete?: Enumerable<ServiceSaleWhereUniqueInput>
  update?: Enumerable<ServiceSaleUpdateWithWhereUniqueWithoutSaleInput>
  updateMany?: Enumerable<ServiceSaleUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<ServiceSaleScalarWhereInput>
  upsert?: Enumerable<ServiceSaleUpsertWithWhereUniqueWithoutSaleInput>
}

export type SaleUpdateWithoutPersonDataInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
  seller?: ProfileUpdateOneRequiredWithoutSaleInput
  car?: CarUpdateOneRequiredWithoutSaleInput
  serviceSale?: ServiceSaleUpdateManyWithoutSaleInput
}

export type SaleUpdateWithWhereUniqueWithoutPersonInput = {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutPersonDataInput
}

export type SaleScalarWhereInput = {
  id?: number | IntFilter
  requestDate?: Date | string | DateTimeFilter
  deliveryDate?: Date | string | DateTimeFilter
  done?: boolean | BooleanFilter
  companyPrice?: number | FloatFilter
  costPrice?: number | FloatFilter
  sellerId?: number | IntFilter
  personId?: number | IntFilter
  carId?: number | IntFilter
  serviceSale?: ServiceSaleFilter | null
  AND?: Enumerable<SaleScalarWhereInput>
  OR?: Enumerable<SaleScalarWhereInput>
  NOT?: Enumerable<SaleScalarWhereInput>
}

export type SaleUpdateManyDataInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
}

export type SaleUpdateManyWithWhereNestedInput = {
  where: SaleScalarWhereInput
  data: SaleUpdateManyDataInput
}

export type SaleUpsertWithWhereUniqueWithoutPersonInput = {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutPersonDataInput
  create: SaleCreateWithoutPersonInput
}

export type SaleUpdateManyWithoutPersonInput = {
  create?: Enumerable<SaleCreateWithoutPersonInput>
  connect?: Enumerable<SaleWhereUniqueInput>
  set?: Enumerable<SaleWhereUniqueInput>
  disconnect?: Enumerable<SaleWhereUniqueInput>
  delete?: Enumerable<SaleWhereUniqueInput>
  update?: Enumerable<SaleUpdateWithWhereUniqueWithoutPersonInput>
  updateMany?: Enumerable<SaleUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<SaleScalarWhereInput>
  upsert?: Enumerable<SaleUpsertWithWhereUniqueWithoutPersonInput>
}

export type PersonUpdateWithoutCarsDataInput = {
  id?: number
  cpf?: string
  name?: string
  telephone?: string
  address?: AddressUpdateOneWithoutPersonInput
  sales?: SaleUpdateManyWithoutPersonInput
}

export type PersonUpsertWithoutCarsInput = {
  update: PersonUpdateWithoutCarsDataInput
  create: PersonCreateWithoutCarsInput
}

export type PersonUpdateOneRequiredWithoutCarsInput = {
  create?: PersonCreateWithoutCarsInput
  connect?: PersonWhereUniqueInput
  update?: PersonUpdateWithoutCarsDataInput
  upsert?: PersonUpsertWithoutCarsInput
}

export type CarUpdateWithoutSaleDataInput = {
  id?: number
  car?: string
  carPlate?: string
  person?: PersonUpdateOneRequiredWithoutCarsInput
}

export type CarUpsertWithoutSaleInput = {
  update: CarUpdateWithoutSaleDataInput
  create: CarCreateWithoutSaleInput
}

export type CarUpdateOneRequiredWithoutSaleInput = {
  create?: CarCreateWithoutSaleInput
  connect?: CarWhereUniqueInput
  update?: CarUpdateWithoutSaleDataInput
  upsert?: CarUpsertWithoutSaleInput
}

export type SaleUpdateWithoutServiceSaleDataInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
  seller?: ProfileUpdateOneRequiredWithoutSaleInput
  person?: PersonUpdateOneRequiredWithoutSalesInput
  car?: CarUpdateOneRequiredWithoutSaleInput
}

export type SaleUpsertWithoutServiceSaleInput = {
  update: SaleUpdateWithoutServiceSaleDataInput
  create: SaleCreateWithoutServiceSaleInput
}

export type SaleUpdateOneRequiredWithoutServiceSaleInput = {
  create?: SaleCreateWithoutServiceSaleInput
  connect?: SaleWhereUniqueInput
  update?: SaleUpdateWithoutServiceSaleDataInput
  upsert?: SaleUpsertWithoutServiceSaleInput
}

export type ServiceSaleUpdateWithoutServiceDataInput = {
  id?: number
  sale?: SaleUpdateOneRequiredWithoutServiceSaleInput
}

export type ServiceSaleUpdateWithWhereUniqueWithoutServiceInput = {
  where: ServiceSaleWhereUniqueInput
  data: ServiceSaleUpdateWithoutServiceDataInput
}

export type ServiceSaleUpsertWithWhereUniqueWithoutServiceInput = {
  where: ServiceSaleWhereUniqueInput
  update: ServiceSaleUpdateWithoutServiceDataInput
  create: ServiceSaleCreateWithoutServiceInput
}

export type ServiceSaleUpdateManyWithoutServiceInput = {
  create?: Enumerable<ServiceSaleCreateWithoutServiceInput>
  connect?: Enumerable<ServiceSaleWhereUniqueInput>
  set?: Enumerable<ServiceSaleWhereUniqueInput>
  disconnect?: Enumerable<ServiceSaleWhereUniqueInput>
  delete?: Enumerable<ServiceSaleWhereUniqueInput>
  update?: Enumerable<ServiceSaleUpdateWithWhereUniqueWithoutServiceInput>
  updateMany?: Enumerable<ServiceSaleUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<ServiceSaleScalarWhereInput>
  upsert?: Enumerable<ServiceSaleUpsertWithWhereUniqueWithoutServiceInput>
}

export type ServiceUpdateWithoutCompanyServiceDataInput = {
  id?: number
  name?: string
  price?: number
  enabled?: boolean
  serviceSale?: ServiceSaleUpdateManyWithoutServiceInput
}

export type ServiceUpsertWithoutCompanyServiceInput = {
  update: ServiceUpdateWithoutCompanyServiceDataInput
  create: ServiceCreateWithoutCompanyServiceInput
}

export type ServiceUpdateOneRequiredWithoutCompanyServiceInput = {
  create?: ServiceCreateWithoutCompanyServiceInput
  connect?: ServiceWhereUniqueInput
  update?: ServiceUpdateWithoutCompanyServiceDataInput
  upsert?: ServiceUpsertWithoutCompanyServiceInput
}

export type CompanyServiceUpdateWithoutCompanyDataInput = {
  id?: number
  price?: number
  service?: ServiceUpdateOneRequiredWithoutCompanyServiceInput
}

export type CompanyServiceUpdateWithWhereUniqueWithoutCompanyInput = {
  where: CompanyServiceWhereUniqueInput
  data: CompanyServiceUpdateWithoutCompanyDataInput
}

export type CompanyServiceUpsertWithWhereUniqueWithoutCompanyInput = {
  where: CompanyServiceWhereUniqueInput
  update: CompanyServiceUpdateWithoutCompanyDataInput
  create: CompanyServiceCreateWithoutCompanyInput
}

export type CompanyServiceUpdateManyWithoutCompanyInput = {
  create?: Enumerable<CompanyServiceCreateWithoutCompanyInput>
  connect?: Enumerable<CompanyServiceWhereUniqueInput>
  set?: Enumerable<CompanyServiceWhereUniqueInput>
  disconnect?: Enumerable<CompanyServiceWhereUniqueInput>
  delete?: Enumerable<CompanyServiceWhereUniqueInput>
  update?: Enumerable<CompanyServiceUpdateWithWhereUniqueWithoutCompanyInput>
  updateMany?: Enumerable<CompanyServiceUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<CompanyServiceScalarWhereInput>
  upsert?: Enumerable<CompanyServiceUpsertWithWhereUniqueWithoutCompanyInput>
}

export type CompanyUpdateWithoutUnitsDataInput = {
  id?: number
  name?: string
  telephone?: string
  cnpj?: string
  Profile?: ProfileUpdateManyWithoutCompanyInput
  sompanyService?: CompanyServiceUpdateManyWithoutCompanyInput
}

export type CompanyUpsertWithoutUnitsInput = {
  update: CompanyUpdateWithoutUnitsDataInput
  create: CompanyCreateWithoutUnitsInput
}

export type CompanyUpdateOneRequiredWithoutUnitsInput = {
  create?: CompanyCreateWithoutUnitsInput
  connect?: CompanyWhereUniqueInput
  update?: CompanyUpdateWithoutUnitsDataInput
  upsert?: CompanyUpsertWithoutUnitsInput
}

export type UnitUpdateWithoutProfileDataInput = {
  id?: number
  name?: string
  telephone?: string
  company?: CompanyUpdateOneRequiredWithoutUnitsInput
}

export type UnitUpsertWithoutProfileInput = {
  update: UnitUpdateWithoutProfileDataInput
  create: UnitCreateWithoutProfileInput
}

export type UnitUpdateOneWithoutProfileInput = {
  create?: UnitCreateWithoutProfileInput
  connect?: UnitWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: UnitUpdateWithoutProfileDataInput
  upsert?: UnitUpsertWithoutProfileInput
}

export type ProfileUpdateWithoutSaleDataInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
  user?: UserUpdateOneRequiredWithoutProfileInput
  company?: CompanyUpdateOneWithoutProfileInput
  unit?: UnitUpdateOneWithoutProfileInput
}

export type ProfileUpsertWithoutSaleInput = {
  update: ProfileUpdateWithoutSaleDataInput
  create: ProfileCreateWithoutSaleInput
}

export type ProfileUpdateOneRequiredWithoutSaleInput = {
  create?: ProfileCreateWithoutSaleInput
  connect?: ProfileWhereUniqueInput
  update?: ProfileUpdateWithoutSaleDataInput
  upsert?: ProfileUpsertWithoutSaleInput
}

export type SaleUpdateWithoutCarDataInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
  seller?: ProfileUpdateOneRequiredWithoutSaleInput
  person?: PersonUpdateOneRequiredWithoutSalesInput
  serviceSale?: ServiceSaleUpdateManyWithoutSaleInput
}

export type SaleUpdateWithWhereUniqueWithoutCarInput = {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutCarDataInput
}

export type SaleUpsertWithWhereUniqueWithoutCarInput = {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutCarDataInput
  create: SaleCreateWithoutCarInput
}

export type SaleUpdateManyWithoutCarInput = {
  create?: Enumerable<SaleCreateWithoutCarInput>
  connect?: Enumerable<SaleWhereUniqueInput>
  set?: Enumerable<SaleWhereUniqueInput>
  disconnect?: Enumerable<SaleWhereUniqueInput>
  delete?: Enumerable<SaleWhereUniqueInput>
  update?: Enumerable<SaleUpdateWithWhereUniqueWithoutCarInput>
  updateMany?: Enumerable<SaleUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<SaleScalarWhereInput>
  upsert?: Enumerable<SaleUpsertWithWhereUniqueWithoutCarInput>
}

export type CarUpdateWithoutPersonDataInput = {
  id?: number
  car?: string
  carPlate?: string
  sale?: SaleUpdateManyWithoutCarInput
}

export type CarUpdateWithWhereUniqueWithoutPersonInput = {
  where: CarWhereUniqueInput
  data: CarUpdateWithoutPersonDataInput
}

export type CarScalarWhereInput = {
  id?: number | IntFilter
  car?: string | StringFilter
  carPlate?: string | StringFilter
  personId?: number | IntFilter
  sale?: SaleFilter | null
  AND?: Enumerable<CarScalarWhereInput>
  OR?: Enumerable<CarScalarWhereInput>
  NOT?: Enumerable<CarScalarWhereInput>
}

export type CarUpdateManyDataInput = {
  id?: number
  car?: string
  carPlate?: string
}

export type CarUpdateManyWithWhereNestedInput = {
  where: CarScalarWhereInput
  data: CarUpdateManyDataInput
}

export type CarUpsertWithWhereUniqueWithoutPersonInput = {
  where: CarWhereUniqueInput
  update: CarUpdateWithoutPersonDataInput
  create: CarCreateWithoutPersonInput
}

export type CarUpdateManyWithoutPersonInput = {
  create?: Enumerable<CarCreateWithoutPersonInput>
  connect?: Enumerable<CarWhereUniqueInput>
  set?: Enumerable<CarWhereUniqueInput>
  disconnect?: Enumerable<CarWhereUniqueInput>
  delete?: Enumerable<CarWhereUniqueInput>
  update?: Enumerable<CarUpdateWithWhereUniqueWithoutPersonInput>
  updateMany?: Enumerable<CarUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<CarScalarWhereInput>
  upsert?: Enumerable<CarUpsertWithWhereUniqueWithoutPersonInput>
}

export type PersonUpdateWithoutSalesDataInput = {
  id?: number
  cpf?: string
  name?: string
  telephone?: string
  address?: AddressUpdateOneWithoutPersonInput
  cars?: CarUpdateManyWithoutPersonInput
}

export type PersonUpsertWithoutSalesInput = {
  update: PersonUpdateWithoutSalesDataInput
  create: PersonCreateWithoutSalesInput
}

export type PersonUpdateOneRequiredWithoutSalesInput = {
  create?: PersonCreateWithoutSalesInput
  connect?: PersonWhereUniqueInput
  update?: PersonUpdateWithoutSalesDataInput
  upsert?: PersonUpsertWithoutSalesInput
}

export type SaleUpdateWithoutSellerDataInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
  person?: PersonUpdateOneRequiredWithoutSalesInput
  car?: CarUpdateOneRequiredWithoutSaleInput
  serviceSale?: ServiceSaleUpdateManyWithoutSaleInput
}

export type SaleUpdateWithWhereUniqueWithoutSellerInput = {
  where: SaleWhereUniqueInput
  data: SaleUpdateWithoutSellerDataInput
}

export type SaleUpsertWithWhereUniqueWithoutSellerInput = {
  where: SaleWhereUniqueInput
  update: SaleUpdateWithoutSellerDataInput
  create: SaleCreateWithoutSellerInput
}

export type SaleUpdateManyWithoutSellerInput = {
  create?: Enumerable<SaleCreateWithoutSellerInput>
  connect?: Enumerable<SaleWhereUniqueInput>
  set?: Enumerable<SaleWhereUniqueInput>
  disconnect?: Enumerable<SaleWhereUniqueInput>
  delete?: Enumerable<SaleWhereUniqueInput>
  update?: Enumerable<SaleUpdateWithWhereUniqueWithoutSellerInput>
  updateMany?: Enumerable<SaleUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<SaleScalarWhereInput>
  upsert?: Enumerable<SaleUpsertWithWhereUniqueWithoutSellerInput>
}

export type ProfileUpdateWithoutUnitDataInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
  user?: UserUpdateOneRequiredWithoutProfileInput
  company?: CompanyUpdateOneWithoutProfileInput
  sale?: SaleUpdateManyWithoutSellerInput
}

export type ProfileUpdateWithWhereUniqueWithoutUnitInput = {
  where: ProfileWhereUniqueInput
  data: ProfileUpdateWithoutUnitDataInput
}

export type ProfileUpsertWithWhereUniqueWithoutUnitInput = {
  where: ProfileWhereUniqueInput
  update: ProfileUpdateWithoutUnitDataInput
  create: ProfileCreateWithoutUnitInput
}

export type ProfileUpdateManyWithoutUnitInput = {
  create?: Enumerable<ProfileCreateWithoutUnitInput>
  connect?: Enumerable<ProfileWhereUniqueInput>
  set?: Enumerable<ProfileWhereUniqueInput>
  disconnect?: Enumerable<ProfileWhereUniqueInput>
  delete?: Enumerable<ProfileWhereUniqueInput>
  update?: Enumerable<ProfileUpdateWithWhereUniqueWithoutUnitInput>
  updateMany?: Enumerable<ProfileUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<ProfileScalarWhereInput>
  upsert?: Enumerable<ProfileUpsertWithWhereUniqueWithoutUnitInput>
}

export type UnitUpdateWithoutCompanyDataInput = {
  id?: number
  name?: string
  telephone?: string
  Profile?: ProfileUpdateManyWithoutUnitInput
}

export type UnitUpdateWithWhereUniqueWithoutCompanyInput = {
  where: UnitWhereUniqueInput
  data: UnitUpdateWithoutCompanyDataInput
}

export type UnitScalarWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  telephone?: string | StringFilter
  companyId?: number | IntFilter
  Profile?: ProfileFilter | null
  AND?: Enumerable<UnitScalarWhereInput>
  OR?: Enumerable<UnitScalarWhereInput>
  NOT?: Enumerable<UnitScalarWhereInput>
}

export type UnitUpdateManyDataInput = {
  id?: number
  name?: string
  telephone?: string
}

export type UnitUpdateManyWithWhereNestedInput = {
  where: UnitScalarWhereInput
  data: UnitUpdateManyDataInput
}

export type UnitUpsertWithWhereUniqueWithoutCompanyInput = {
  where: UnitWhereUniqueInput
  update: UnitUpdateWithoutCompanyDataInput
  create: UnitCreateWithoutCompanyInput
}

export type UnitUpdateManyWithoutCompanyInput = {
  create?: Enumerable<UnitCreateWithoutCompanyInput>
  connect?: Enumerable<UnitWhereUniqueInput>
  set?: Enumerable<UnitWhereUniqueInput>
  disconnect?: Enumerable<UnitWhereUniqueInput>
  delete?: Enumerable<UnitWhereUniqueInput>
  update?: Enumerable<UnitUpdateWithWhereUniqueWithoutCompanyInput>
  updateMany?: Enumerable<UnitUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<UnitScalarWhereInput>
  upsert?: Enumerable<UnitUpsertWithWhereUniqueWithoutCompanyInput>
}

export type CompanyUpdateWithoutProfileDataInput = {
  id?: number
  name?: string
  telephone?: string
  cnpj?: string
  units?: UnitUpdateManyWithoutCompanyInput
  sompanyService?: CompanyServiceUpdateManyWithoutCompanyInput
}

export type CompanyUpsertWithoutProfileInput = {
  update: CompanyUpdateWithoutProfileDataInput
  create: CompanyCreateWithoutProfileInput
}

export type CompanyUpdateOneWithoutProfileInput = {
  create?: CompanyCreateWithoutProfileInput
  connect?: CompanyWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: CompanyUpdateWithoutProfileDataInput
  upsert?: CompanyUpsertWithoutProfileInput
}

export type ProfileUpdateWithoutUserDataInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
  company?: CompanyUpdateOneWithoutProfileInput
  unit?: UnitUpdateOneWithoutProfileInput
  sale?: SaleUpdateManyWithoutSellerInput
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export type ProfileUpdateOneRequiredWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export type UserUpdateInput = {
  id?: number
  username?: string
  email?: string
  password?: string
  role?: Role
  enabled?: boolean
  firstLogin?: boolean
  profile?: ProfileUpdateOneRequiredWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  id?: number
  username?: string
  email?: string
  password?: string
  role?: Role
  enabled?: boolean
  firstLogin?: boolean
}

export type ProfileCreateInput = {
  name: string
  telephone: string
  enabled?: boolean
  user: UserCreateOneWithoutProfileInput
  company?: CompanyCreateOneWithoutProfileInput | null
  unit?: UnitCreateOneWithoutProfileInput | null
  sale?: SaleCreateManyWithoutSellerInput | null
}

export type ProfileUpdateInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
  user?: UserUpdateOneRequiredWithoutProfileInput
  company?: CompanyUpdateOneWithoutProfileInput
  unit?: UnitUpdateOneWithoutProfileInput
  sale?: SaleUpdateManyWithoutSellerInput
}

export type ProfileUpdateManyMutationInput = {
  id?: number
  name?: string
  telephone?: string
  enabled?: boolean
}

export type CompanyCreateInput = {
  name: string
  telephone: string
  cnpj: string
  units?: UnitCreateManyWithoutCompanyInput | null
  Profile?: ProfileCreateManyWithoutCompanyInput | null
  sompanyService?: CompanyServiceCreateManyWithoutCompanyInput | null
}

export type CompanyUpdateInput = {
  id?: number
  name?: string
  telephone?: string
  cnpj?: string
  units?: UnitUpdateManyWithoutCompanyInput
  Profile?: ProfileUpdateManyWithoutCompanyInput
  sompanyService?: CompanyServiceUpdateManyWithoutCompanyInput
}

export type CompanyUpdateManyMutationInput = {
  id?: number
  name?: string
  telephone?: string
  cnpj?: string
}

export type UnitCreateInput = {
  name: string
  telephone: string
  company: CompanyCreateOneWithoutUnitsInput
  Profile?: ProfileCreateManyWithoutUnitInput | null
}

export type UnitUpdateInput = {
  id?: number
  name?: string
  telephone?: string
  company?: CompanyUpdateOneRequiredWithoutUnitsInput
  Profile?: ProfileUpdateManyWithoutUnitInput
}

export type UnitUpdateManyMutationInput = {
  id?: number
  name?: string
  telephone?: string
}

export type ServiceCreateInput = {
  name: string
  price: number
  enabled?: boolean
  CompanyService?: CompanyServiceCreateManyWithoutServiceInput | null
  serviceSale?: ServiceSaleCreateManyWithoutServiceInput | null
}

export type ServiceUpdateInput = {
  id?: number
  name?: string
  price?: number
  enabled?: boolean
  CompanyService?: CompanyServiceUpdateManyWithoutServiceInput
  serviceSale?: ServiceSaleUpdateManyWithoutServiceInput
}

export type ServiceUpdateManyMutationInput = {
  id?: number
  name?: string
  price?: number
  enabled?: boolean
}

export type CompanyServiceCreateInput = {
  price: number
  company: CompanyCreateOneWithoutSompanyServiceInput
  service: ServiceCreateOneWithoutCompanyServiceInput
}

export type CompanyServiceUpdateInput = {
  id?: number
  price?: number
  company?: CompanyUpdateOneRequiredWithoutSompanyServiceInput
  service?: ServiceUpdateOneRequiredWithoutCompanyServiceInput
}

export type CompanyServiceUpdateManyMutationInput = {
  id?: number
  price?: number
}

export type PersonCreateInput = {
  cpf: string
  name: string
  telephone: string
  address?: AddressCreateOneWithoutPersonInput | null
  cars?: CarCreateManyWithoutPersonInput | null
  sales?: SaleCreateManyWithoutPersonInput | null
}

export type PersonUpdateInput = {
  id?: number
  cpf?: string
  name?: string
  telephone?: string
  address?: AddressUpdateOneWithoutPersonInput
  cars?: CarUpdateManyWithoutPersonInput
  sales?: SaleUpdateManyWithoutPersonInput
}

export type PersonUpdateManyMutationInput = {
  id?: number
  cpf?: string
  name?: string
  telephone?: string
}

export type PersonCreateWithoutAddressInput = {
  cpf: string
  name: string
  telephone: string
  cars?: CarCreateManyWithoutPersonInput | null
  sales?: SaleCreateManyWithoutPersonInput | null
}

export type PersonCreateOneWithoutAddressInput = {
  create?: PersonCreateWithoutAddressInput
  connect?: PersonWhereUniqueInput
}

export type AddressCreateInput = {
  street: string
  houseNumber: string
  neighborhood: string
  city: string
  uf: string
  person: PersonCreateOneWithoutAddressInput
}

export type PersonUpdateWithoutAddressDataInput = {
  id?: number
  cpf?: string
  name?: string
  telephone?: string
  cars?: CarUpdateManyWithoutPersonInput
  sales?: SaleUpdateManyWithoutPersonInput
}

export type PersonUpsertWithoutAddressInput = {
  update: PersonUpdateWithoutAddressDataInput
  create: PersonCreateWithoutAddressInput
}

export type PersonUpdateOneRequiredWithoutAddressInput = {
  create?: PersonCreateWithoutAddressInput
  connect?: PersonWhereUniqueInput
  update?: PersonUpdateWithoutAddressDataInput
  upsert?: PersonUpsertWithoutAddressInput
}

export type AddressUpdateInput = {
  id?: number
  street?: string
  houseNumber?: string
  neighborhood?: string
  city?: string
  uf?: string
  person?: PersonUpdateOneRequiredWithoutAddressInput
}

export type AddressUpdateManyMutationInput = {
  id?: number
  street?: string
  houseNumber?: string
  neighborhood?: string
  city?: string
  uf?: string
}

export type CarCreateInput = {
  car: string
  carPlate: string
  person: PersonCreateOneWithoutCarsInput
  sale?: SaleCreateManyWithoutCarInput | null
}

export type CarUpdateInput = {
  id?: number
  car?: string
  carPlate?: string
  person?: PersonUpdateOneRequiredWithoutCarsInput
  sale?: SaleUpdateManyWithoutCarInput
}

export type CarUpdateManyMutationInput = {
  id?: number
  car?: string
  carPlate?: string
}

export type SaleCreateInput = {
  requestDate?: Date | string
  deliveryDate: Date | string
  done?: boolean
  companyPrice: number
  costPrice: number
  seller: ProfileCreateOneWithoutSaleInput
  person: PersonCreateOneWithoutSalesInput
  car: CarCreateOneWithoutSaleInput
  serviceSale?: ServiceSaleCreateManyWithoutSaleInput | null
}

export type SaleUpdateInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
  seller?: ProfileUpdateOneRequiredWithoutSaleInput
  person?: PersonUpdateOneRequiredWithoutSalesInput
  car?: CarUpdateOneRequiredWithoutSaleInput
  serviceSale?: ServiceSaleUpdateManyWithoutSaleInput
}

export type SaleUpdateManyMutationInput = {
  id?: number
  requestDate?: Date | string
  deliveryDate?: Date | string
  done?: boolean
  companyPrice?: number
  costPrice?: number
}

export type ServiceSaleCreateInput = {
  sale: SaleCreateOneWithoutServiceSaleInput
  service: ServiceCreateOneWithoutServiceSaleInput
}

export type ServiceSaleUpdateInput = {
  id?: number
  sale?: SaleUpdateOneRequiredWithoutServiceSaleInput
  service?: ServiceUpdateOneRequiredWithoutServiceSaleInput
}

export type ServiceSaleUpdateManyMutationInput = {
  id?: number
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type ProfileFilter = {
  every?: ProfileWhereInput
  some?: ProfileWhereInput
  none?: ProfileWhereInput
}

export type SaleFilter = {
  every?: SaleWhereInput
  some?: SaleWhereInput
  none?: SaleWhereInput
}

export type CarFilter = {
  every?: CarWhereInput
  some?: CarWhereInput
  none?: CarWhereInput
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type BooleanFilter = {
  equals?: boolean
  not?: boolean | BooleanFilter
}

export type FloatFilter = {
  equals?: number
  not?: number | FloatFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type ServiceSaleFilter = {
  every?: ServiceSaleWhereInput
  some?: ServiceSaleWhereInput
  none?: ServiceSaleWhereInput
}

export type CompanyServiceFilter = {
  every?: CompanyServiceWhereInput
  some?: CompanyServiceWhereInput
  none?: CompanyServiceWhereInput
}

export type UnitFilter = {
  every?: UnitWhereInput
  some?: UnitWhereInput
  none?: UnitWhereInput
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type RoleFilter = {
  equals?: Role
  not?: Role | RoleFilter
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
}

export type UserOrderByInput = {
  id?: OrderByArg | null
  username?: OrderByArg | null
  email?: OrderByArg | null
  password?: OrderByArg | null
  role?: OrderByArg | null
  enabled?: OrderByArg | null
  firstLogin?: OrderByArg | null
}

export type UnitOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  telephone?: OrderByArg | null
  companyId?: OrderByArg | null
}

export type ProfileOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  telephone?: OrderByArg | null
  enabled?: OrderByArg | null
  userId?: OrderByArg | null
  companyId?: OrderByArg | null
  unitId?: OrderByArg | null
}

export type CompanyServiceOrderByInput = {
  id?: OrderByArg | null
  price?: OrderByArg | null
  companyId?: OrderByArg | null
  serviceId?: OrderByArg | null
}

export type ServiceSaleOrderByInput = {
  id?: OrderByArg | null
  saleId?: OrderByArg | null
  serviceId?: OrderByArg | null
}

export type CarOrderByInput = {
  id?: OrderByArg | null
  car?: OrderByArg | null
  carPlate?: OrderByArg | null
  personId?: OrderByArg | null
}

export type SaleOrderByInput = {
  id?: OrderByArg | null
  requestDate?: OrderByArg | null
  deliveryDate?: OrderByArg | null
  done?: OrderByArg | null
  companyPrice?: OrderByArg | null
  costPrice?: OrderByArg | null
  sellerId?: OrderByArg | null
  personId?: OrderByArg | null
  carId?: OrderByArg | null
}

export type CompanyOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  telephone?: OrderByArg | null
  cnpj?: OrderByArg | null
}

export type ServiceOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  price?: OrderByArg | null
  enabled?: OrderByArg | null
}

export type PersonOrderByInput = {
  id?: OrderByArg | null
  cpf?: OrderByArg | null
  name?: OrderByArg | null
  telephone?: OrderByArg | null
}

export type AddressOrderByInput = {
  id?: OrderByArg | null
  street?: OrderByArg | null
  houseNumber?: OrderByArg | null
  neighborhood?: OrderByArg | null
  city?: OrderByArg | null
  uf?: OrderByArg | null
  personId?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
