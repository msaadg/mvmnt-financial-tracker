
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PowerUsers
 * 
 */
export type PowerUsers = $Result.DefaultSelection<Prisma.$PowerUsersPayload>
/**
 * Model Referrals
 * 
 */
export type Referrals = $Result.DefaultSelection<Prisma.$ReferralsPayload>
/**
 * Model Collectors
 * 
 */
export type Collectors = $Result.DefaultSelection<Prisma.$CollectorsPayload>
/**
 * Model Vendors
 * 
 */
export type Vendors = $Result.DefaultSelection<Prisma.$VendorsPayload>
/**
 * Model Donation
 * 
 */
export type Donation = $Result.DefaultSelection<Prisma.$DonationPayload>
/**
 * Model Expenses
 * 
 */
export type Expenses = $Result.DefaultSelection<Prisma.$ExpensesPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PowerUsers
 * const powerUsers = await prisma.powerUsers.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PowerUsers
   * const powerUsers = await prisma.powerUsers.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.powerUsers`: Exposes CRUD operations for the **PowerUsers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PowerUsers
    * const powerUsers = await prisma.powerUsers.findMany()
    * ```
    */
  get powerUsers(): Prisma.PowerUsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.referrals`: Exposes CRUD operations for the **Referrals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Referrals
    * const referrals = await prisma.referrals.findMany()
    * ```
    */
  get referrals(): Prisma.ReferralsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collectors`: Exposes CRUD operations for the **Collectors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collectors
    * const collectors = await prisma.collectors.findMany()
    * ```
    */
  get collectors(): Prisma.CollectorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendors`: Exposes CRUD operations for the **Vendors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendors.findMany()
    * ```
    */
  get vendors(): Prisma.VendorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donation`: Exposes CRUD operations for the **Donation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Donations
    * const donations = await prisma.donation.findMany()
    * ```
    */
  get donation(): Prisma.DonationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenses`: Exposes CRUD operations for the **Expenses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expenses.findMany()
    * ```
    */
  get expenses(): Prisma.ExpensesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PowerUsers: 'PowerUsers',
    Referrals: 'Referrals',
    Collectors: 'Collectors',
    Vendors: 'Vendors',
    Donation: 'Donation',
    Expenses: 'Expenses',
    Payment: 'Payment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "powerUsers" | "referrals" | "collectors" | "vendors" | "donation" | "expenses" | "payment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PowerUsers: {
        payload: Prisma.$PowerUsersPayload<ExtArgs>
        fields: Prisma.PowerUsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PowerUsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PowerUsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          findFirst: {
            args: Prisma.PowerUsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PowerUsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          findMany: {
            args: Prisma.PowerUsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>[]
          }
          create: {
            args: Prisma.PowerUsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          createMany: {
            args: Prisma.PowerUsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PowerUsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>[]
          }
          delete: {
            args: Prisma.PowerUsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          update: {
            args: Prisma.PowerUsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          deleteMany: {
            args: Prisma.PowerUsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PowerUsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PowerUsersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>[]
          }
          upsert: {
            args: Prisma.PowerUsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PowerUsersPayload>
          }
          aggregate: {
            args: Prisma.PowerUsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePowerUsers>
          }
          groupBy: {
            args: Prisma.PowerUsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<PowerUsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.PowerUsersCountArgs<ExtArgs>
            result: $Utils.Optional<PowerUsersCountAggregateOutputType> | number
          }
        }
      }
      Referrals: {
        payload: Prisma.$ReferralsPayload<ExtArgs>
        fields: Prisma.ReferralsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReferralsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReferralsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          findFirst: {
            args: Prisma.ReferralsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReferralsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          findMany: {
            args: Prisma.ReferralsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>[]
          }
          create: {
            args: Prisma.ReferralsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          createMany: {
            args: Prisma.ReferralsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReferralsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>[]
          }
          delete: {
            args: Prisma.ReferralsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          update: {
            args: Prisma.ReferralsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          deleteMany: {
            args: Prisma.ReferralsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReferralsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReferralsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>[]
          }
          upsert: {
            args: Prisma.ReferralsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReferralsPayload>
          }
          aggregate: {
            args: Prisma.ReferralsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReferrals>
          }
          groupBy: {
            args: Prisma.ReferralsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReferralsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReferralsCountArgs<ExtArgs>
            result: $Utils.Optional<ReferralsCountAggregateOutputType> | number
          }
        }
      }
      Collectors: {
        payload: Prisma.$CollectorsPayload<ExtArgs>
        fields: Prisma.CollectorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollectorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollectorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          findFirst: {
            args: Prisma.CollectorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollectorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          findMany: {
            args: Prisma.CollectorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>[]
          }
          create: {
            args: Prisma.CollectorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          createMany: {
            args: Prisma.CollectorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollectorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>[]
          }
          delete: {
            args: Prisma.CollectorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          update: {
            args: Prisma.CollectorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          deleteMany: {
            args: Prisma.CollectorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollectorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollectorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>[]
          }
          upsert: {
            args: Prisma.CollectorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollectorsPayload>
          }
          aggregate: {
            args: Prisma.CollectorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollectors>
          }
          groupBy: {
            args: Prisma.CollectorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollectorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollectorsCountArgs<ExtArgs>
            result: $Utils.Optional<CollectorsCountAggregateOutputType> | number
          }
        }
      }
      Vendors: {
        payload: Prisma.$VendorsPayload<ExtArgs>
        fields: Prisma.VendorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          findFirst: {
            args: Prisma.VendorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          findMany: {
            args: Prisma.VendorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>[]
          }
          create: {
            args: Prisma.VendorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          createMany: {
            args: Prisma.VendorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>[]
          }
          delete: {
            args: Prisma.VendorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          update: {
            args: Prisma.VendorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          deleteMany: {
            args: Prisma.VendorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>[]
          }
          upsert: {
            args: Prisma.VendorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorsPayload>
          }
          aggregate: {
            args: Prisma.VendorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendors>
          }
          groupBy: {
            args: Prisma.VendorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorsCountArgs<ExtArgs>
            result: $Utils.Optional<VendorsCountAggregateOutputType> | number
          }
        }
      }
      Donation: {
        payload: Prisma.$DonationPayload<ExtArgs>
        fields: Prisma.DonationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findFirst: {
            args: Prisma.DonationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findMany: {
            args: Prisma.DonationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          create: {
            args: Prisma.DonationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          createMany: {
            args: Prisma.DonationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DonationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          delete: {
            args: Prisma.DonationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          update: {
            args: Prisma.DonationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          deleteMany: {
            args: Prisma.DonationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DonationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          upsert: {
            args: Prisma.DonationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          aggregate: {
            args: Prisma.DonationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonation>
          }
          groupBy: {
            args: Prisma.DonationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonationCountArgs<ExtArgs>
            result: $Utils.Optional<DonationCountAggregateOutputType> | number
          }
        }
      }
      Expenses: {
        payload: Prisma.$ExpensesPayload<ExtArgs>
        fields: Prisma.ExpensesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpensesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpensesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          findFirst: {
            args: Prisma.ExpensesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpensesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          findMany: {
            args: Prisma.ExpensesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>[]
          }
          create: {
            args: Prisma.ExpensesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          createMany: {
            args: Prisma.ExpensesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpensesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>[]
          }
          delete: {
            args: Prisma.ExpensesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          update: {
            args: Prisma.ExpensesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          deleteMany: {
            args: Prisma.ExpensesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpensesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpensesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>[]
          }
          upsert: {
            args: Prisma.ExpensesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensesPayload>
          }
          aggregate: {
            args: Prisma.ExpensesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenses>
          }
          groupBy: {
            args: Prisma.ExpensesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpensesGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpensesCountArgs<ExtArgs>
            result: $Utils.Optional<ExpensesCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    powerUsers?: PowerUsersOmit
    referrals?: ReferralsOmit
    collectors?: CollectorsOmit
    vendors?: VendorsOmit
    donation?: DonationOmit
    expenses?: ExpensesOmit
    payment?: PaymentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ReferralsCountOutputType
   */

  export type ReferralsCountOutputType = {
    donations: number
  }

  export type ReferralsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | ReferralsCountOutputTypeCountDonationsArgs
  }

  // Custom InputTypes
  /**
   * ReferralsCountOutputType without action
   */
  export type ReferralsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReferralsCountOutputType
     */
    select?: ReferralsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReferralsCountOutputType without action
   */
  export type ReferralsCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }


  /**
   * Count Type CollectorsCountOutputType
   */

  export type CollectorsCountOutputType = {
    donations: number
    payments: number
  }

  export type CollectorsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | CollectorsCountOutputTypeCountDonationsArgs
    payments?: boolean | CollectorsCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CollectorsCountOutputType without action
   */
  export type CollectorsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollectorsCountOutputType
     */
    select?: CollectorsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollectorsCountOutputType without action
   */
  export type CollectorsCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * CollectorsCountOutputType without action
   */
  export type CollectorsCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type VendorsCountOutputType
   */

  export type VendorsCountOutputType = {
    expenses: number
    payments: number
  }

  export type VendorsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | VendorsCountOutputTypeCountExpensesArgs
    payments?: boolean | VendorsCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorsCountOutputType
     */
    select?: VendorsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpensesWhereInput
  }

  /**
   * VendorsCountOutputType without action
   */
  export type VendorsCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PowerUsers
   */

  export type AggregatePowerUsers = {
    _count: PowerUsersCountAggregateOutputType | null
    _avg: PowerUsersAvgAggregateOutputType | null
    _sum: PowerUsersSumAggregateOutputType | null
    _min: PowerUsersMinAggregateOutputType | null
    _max: PowerUsersMaxAggregateOutputType | null
  }

  export type PowerUsersAvgAggregateOutputType = {
    id: number | null
  }

  export type PowerUsersSumAggregateOutputType = {
    id: number | null
  }

  export type PowerUsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    role: string | null
    email: string | null
  }

  export type PowerUsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    role: string | null
    email: string | null
  }

  export type PowerUsersCountAggregateOutputType = {
    id: number
    username: number
    role: number
    email: number
    _all: number
  }


  export type PowerUsersAvgAggregateInputType = {
    id?: true
  }

  export type PowerUsersSumAggregateInputType = {
    id?: true
  }

  export type PowerUsersMinAggregateInputType = {
    id?: true
    username?: true
    role?: true
    email?: true
  }

  export type PowerUsersMaxAggregateInputType = {
    id?: true
    username?: true
    role?: true
    email?: true
  }

  export type PowerUsersCountAggregateInputType = {
    id?: true
    username?: true
    role?: true
    email?: true
    _all?: true
  }

  export type PowerUsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PowerUsers to aggregate.
     */
    where?: PowerUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PowerUsers to fetch.
     */
    orderBy?: PowerUsersOrderByWithRelationInput | PowerUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PowerUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PowerUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PowerUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PowerUsers
    **/
    _count?: true | PowerUsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PowerUsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PowerUsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PowerUsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PowerUsersMaxAggregateInputType
  }

  export type GetPowerUsersAggregateType<T extends PowerUsersAggregateArgs> = {
        [P in keyof T & keyof AggregatePowerUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePowerUsers[P]>
      : GetScalarType<T[P], AggregatePowerUsers[P]>
  }




  export type PowerUsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PowerUsersWhereInput
    orderBy?: PowerUsersOrderByWithAggregationInput | PowerUsersOrderByWithAggregationInput[]
    by: PowerUsersScalarFieldEnum[] | PowerUsersScalarFieldEnum
    having?: PowerUsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PowerUsersCountAggregateInputType | true
    _avg?: PowerUsersAvgAggregateInputType
    _sum?: PowerUsersSumAggregateInputType
    _min?: PowerUsersMinAggregateInputType
    _max?: PowerUsersMaxAggregateInputType
  }

  export type PowerUsersGroupByOutputType = {
    id: number
    username: string
    role: string
    email: string
    _count: PowerUsersCountAggregateOutputType | null
    _avg: PowerUsersAvgAggregateOutputType | null
    _sum: PowerUsersSumAggregateOutputType | null
    _min: PowerUsersMinAggregateOutputType | null
    _max: PowerUsersMaxAggregateOutputType | null
  }

  type GetPowerUsersGroupByPayload<T extends PowerUsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PowerUsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PowerUsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PowerUsersGroupByOutputType[P]>
            : GetScalarType<T[P], PowerUsersGroupByOutputType[P]>
        }
      >
    >


  export type PowerUsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    role?: boolean
    email?: boolean
  }, ExtArgs["result"]["powerUsers"]>

  export type PowerUsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    role?: boolean
    email?: boolean
  }, ExtArgs["result"]["powerUsers"]>

  export type PowerUsersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    role?: boolean
    email?: boolean
  }, ExtArgs["result"]["powerUsers"]>

  export type PowerUsersSelectScalar = {
    id?: boolean
    username?: boolean
    role?: boolean
    email?: boolean
  }

  export type PowerUsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "role" | "email", ExtArgs["result"]["powerUsers"]>

  export type $PowerUsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PowerUsers"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      role: string
      email: string
    }, ExtArgs["result"]["powerUsers"]>
    composites: {}
  }

  type PowerUsersGetPayload<S extends boolean | null | undefined | PowerUsersDefaultArgs> = $Result.GetResult<Prisma.$PowerUsersPayload, S>

  type PowerUsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PowerUsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PowerUsersCountAggregateInputType | true
    }

  export interface PowerUsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PowerUsers'], meta: { name: 'PowerUsers' } }
    /**
     * Find zero or one PowerUsers that matches the filter.
     * @param {PowerUsersFindUniqueArgs} args - Arguments to find a PowerUsers
     * @example
     * // Get one PowerUsers
     * const powerUsers = await prisma.powerUsers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PowerUsersFindUniqueArgs>(args: SelectSubset<T, PowerUsersFindUniqueArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PowerUsers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PowerUsersFindUniqueOrThrowArgs} args - Arguments to find a PowerUsers
     * @example
     * // Get one PowerUsers
     * const powerUsers = await prisma.powerUsers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PowerUsersFindUniqueOrThrowArgs>(args: SelectSubset<T, PowerUsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PowerUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersFindFirstArgs} args - Arguments to find a PowerUsers
     * @example
     * // Get one PowerUsers
     * const powerUsers = await prisma.powerUsers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PowerUsersFindFirstArgs>(args?: SelectSubset<T, PowerUsersFindFirstArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PowerUsers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersFindFirstOrThrowArgs} args - Arguments to find a PowerUsers
     * @example
     * // Get one PowerUsers
     * const powerUsers = await prisma.powerUsers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PowerUsersFindFirstOrThrowArgs>(args?: SelectSubset<T, PowerUsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PowerUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PowerUsers
     * const powerUsers = await prisma.powerUsers.findMany()
     * 
     * // Get first 10 PowerUsers
     * const powerUsers = await prisma.powerUsers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const powerUsersWithIdOnly = await prisma.powerUsers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PowerUsersFindManyArgs>(args?: SelectSubset<T, PowerUsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PowerUsers.
     * @param {PowerUsersCreateArgs} args - Arguments to create a PowerUsers.
     * @example
     * // Create one PowerUsers
     * const PowerUsers = await prisma.powerUsers.create({
     *   data: {
     *     // ... data to create a PowerUsers
     *   }
     * })
     * 
     */
    create<T extends PowerUsersCreateArgs>(args: SelectSubset<T, PowerUsersCreateArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PowerUsers.
     * @param {PowerUsersCreateManyArgs} args - Arguments to create many PowerUsers.
     * @example
     * // Create many PowerUsers
     * const powerUsers = await prisma.powerUsers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PowerUsersCreateManyArgs>(args?: SelectSubset<T, PowerUsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PowerUsers and returns the data saved in the database.
     * @param {PowerUsersCreateManyAndReturnArgs} args - Arguments to create many PowerUsers.
     * @example
     * // Create many PowerUsers
     * const powerUsers = await prisma.powerUsers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PowerUsers and only return the `id`
     * const powerUsersWithIdOnly = await prisma.powerUsers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PowerUsersCreateManyAndReturnArgs>(args?: SelectSubset<T, PowerUsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PowerUsers.
     * @param {PowerUsersDeleteArgs} args - Arguments to delete one PowerUsers.
     * @example
     * // Delete one PowerUsers
     * const PowerUsers = await prisma.powerUsers.delete({
     *   where: {
     *     // ... filter to delete one PowerUsers
     *   }
     * })
     * 
     */
    delete<T extends PowerUsersDeleteArgs>(args: SelectSubset<T, PowerUsersDeleteArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PowerUsers.
     * @param {PowerUsersUpdateArgs} args - Arguments to update one PowerUsers.
     * @example
     * // Update one PowerUsers
     * const powerUsers = await prisma.powerUsers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PowerUsersUpdateArgs>(args: SelectSubset<T, PowerUsersUpdateArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PowerUsers.
     * @param {PowerUsersDeleteManyArgs} args - Arguments to filter PowerUsers to delete.
     * @example
     * // Delete a few PowerUsers
     * const { count } = await prisma.powerUsers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PowerUsersDeleteManyArgs>(args?: SelectSubset<T, PowerUsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PowerUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PowerUsers
     * const powerUsers = await prisma.powerUsers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PowerUsersUpdateManyArgs>(args: SelectSubset<T, PowerUsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PowerUsers and returns the data updated in the database.
     * @param {PowerUsersUpdateManyAndReturnArgs} args - Arguments to update many PowerUsers.
     * @example
     * // Update many PowerUsers
     * const powerUsers = await prisma.powerUsers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PowerUsers and only return the `id`
     * const powerUsersWithIdOnly = await prisma.powerUsers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PowerUsersUpdateManyAndReturnArgs>(args: SelectSubset<T, PowerUsersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PowerUsers.
     * @param {PowerUsersUpsertArgs} args - Arguments to update or create a PowerUsers.
     * @example
     * // Update or create a PowerUsers
     * const powerUsers = await prisma.powerUsers.upsert({
     *   create: {
     *     // ... data to create a PowerUsers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PowerUsers we want to update
     *   }
     * })
     */
    upsert<T extends PowerUsersUpsertArgs>(args: SelectSubset<T, PowerUsersUpsertArgs<ExtArgs>>): Prisma__PowerUsersClient<$Result.GetResult<Prisma.$PowerUsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PowerUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersCountArgs} args - Arguments to filter PowerUsers to count.
     * @example
     * // Count the number of PowerUsers
     * const count = await prisma.powerUsers.count({
     *   where: {
     *     // ... the filter for the PowerUsers we want to count
     *   }
     * })
    **/
    count<T extends PowerUsersCountArgs>(
      args?: Subset<T, PowerUsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PowerUsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PowerUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PowerUsersAggregateArgs>(args: Subset<T, PowerUsersAggregateArgs>): Prisma.PrismaPromise<GetPowerUsersAggregateType<T>>

    /**
     * Group by PowerUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PowerUsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PowerUsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PowerUsersGroupByArgs['orderBy'] }
        : { orderBy?: PowerUsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PowerUsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPowerUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PowerUsers model
   */
  readonly fields: PowerUsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PowerUsers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PowerUsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PowerUsers model
   */
  interface PowerUsersFieldRefs {
    readonly id: FieldRef<"PowerUsers", 'Int'>
    readonly username: FieldRef<"PowerUsers", 'String'>
    readonly role: FieldRef<"PowerUsers", 'String'>
    readonly email: FieldRef<"PowerUsers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PowerUsers findUnique
   */
  export type PowerUsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter, which PowerUsers to fetch.
     */
    where: PowerUsersWhereUniqueInput
  }

  /**
   * PowerUsers findUniqueOrThrow
   */
  export type PowerUsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter, which PowerUsers to fetch.
     */
    where: PowerUsersWhereUniqueInput
  }

  /**
   * PowerUsers findFirst
   */
  export type PowerUsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter, which PowerUsers to fetch.
     */
    where?: PowerUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PowerUsers to fetch.
     */
    orderBy?: PowerUsersOrderByWithRelationInput | PowerUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PowerUsers.
     */
    cursor?: PowerUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PowerUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PowerUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PowerUsers.
     */
    distinct?: PowerUsersScalarFieldEnum | PowerUsersScalarFieldEnum[]
  }

  /**
   * PowerUsers findFirstOrThrow
   */
  export type PowerUsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter, which PowerUsers to fetch.
     */
    where?: PowerUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PowerUsers to fetch.
     */
    orderBy?: PowerUsersOrderByWithRelationInput | PowerUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PowerUsers.
     */
    cursor?: PowerUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PowerUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PowerUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PowerUsers.
     */
    distinct?: PowerUsersScalarFieldEnum | PowerUsersScalarFieldEnum[]
  }

  /**
   * PowerUsers findMany
   */
  export type PowerUsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter, which PowerUsers to fetch.
     */
    where?: PowerUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PowerUsers to fetch.
     */
    orderBy?: PowerUsersOrderByWithRelationInput | PowerUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PowerUsers.
     */
    cursor?: PowerUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PowerUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PowerUsers.
     */
    skip?: number
    distinct?: PowerUsersScalarFieldEnum | PowerUsersScalarFieldEnum[]
  }

  /**
   * PowerUsers create
   */
  export type PowerUsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * The data needed to create a PowerUsers.
     */
    data: XOR<PowerUsersCreateInput, PowerUsersUncheckedCreateInput>
  }

  /**
   * PowerUsers createMany
   */
  export type PowerUsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PowerUsers.
     */
    data: PowerUsersCreateManyInput | PowerUsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PowerUsers createManyAndReturn
   */
  export type PowerUsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * The data used to create many PowerUsers.
     */
    data: PowerUsersCreateManyInput | PowerUsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PowerUsers update
   */
  export type PowerUsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * The data needed to update a PowerUsers.
     */
    data: XOR<PowerUsersUpdateInput, PowerUsersUncheckedUpdateInput>
    /**
     * Choose, which PowerUsers to update.
     */
    where: PowerUsersWhereUniqueInput
  }

  /**
   * PowerUsers updateMany
   */
  export type PowerUsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PowerUsers.
     */
    data: XOR<PowerUsersUpdateManyMutationInput, PowerUsersUncheckedUpdateManyInput>
    /**
     * Filter which PowerUsers to update
     */
    where?: PowerUsersWhereInput
    /**
     * Limit how many PowerUsers to update.
     */
    limit?: number
  }

  /**
   * PowerUsers updateManyAndReturn
   */
  export type PowerUsersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * The data used to update PowerUsers.
     */
    data: XOR<PowerUsersUpdateManyMutationInput, PowerUsersUncheckedUpdateManyInput>
    /**
     * Filter which PowerUsers to update
     */
    where?: PowerUsersWhereInput
    /**
     * Limit how many PowerUsers to update.
     */
    limit?: number
  }

  /**
   * PowerUsers upsert
   */
  export type PowerUsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * The filter to search for the PowerUsers to update in case it exists.
     */
    where: PowerUsersWhereUniqueInput
    /**
     * In case the PowerUsers found by the `where` argument doesn't exist, create a new PowerUsers with this data.
     */
    create: XOR<PowerUsersCreateInput, PowerUsersUncheckedCreateInput>
    /**
     * In case the PowerUsers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PowerUsersUpdateInput, PowerUsersUncheckedUpdateInput>
  }

  /**
   * PowerUsers delete
   */
  export type PowerUsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
    /**
     * Filter which PowerUsers to delete.
     */
    where: PowerUsersWhereUniqueInput
  }

  /**
   * PowerUsers deleteMany
   */
  export type PowerUsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PowerUsers to delete
     */
    where?: PowerUsersWhereInput
    /**
     * Limit how many PowerUsers to delete.
     */
    limit?: number
  }

  /**
   * PowerUsers without action
   */
  export type PowerUsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PowerUsers
     */
    select?: PowerUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PowerUsers
     */
    omit?: PowerUsersOmit<ExtArgs> | null
  }


  /**
   * Model Referrals
   */

  export type AggregateReferrals = {
    _count: ReferralsCountAggregateOutputType | null
    _avg: ReferralsAvgAggregateOutputType | null
    _sum: ReferralsSumAggregateOutputType | null
    _min: ReferralsMinAggregateOutputType | null
    _max: ReferralsMaxAggregateOutputType | null
  }

  export type ReferralsAvgAggregateOutputType = {
    referralId: number | null
  }

  export type ReferralsSumAggregateOutputType = {
    referralId: number | null
  }

  export type ReferralsMinAggregateOutputType = {
    referralId: number | null
    name: string | null
  }

  export type ReferralsMaxAggregateOutputType = {
    referralId: number | null
    name: string | null
  }

  export type ReferralsCountAggregateOutputType = {
    referralId: number
    name: number
    _all: number
  }


  export type ReferralsAvgAggregateInputType = {
    referralId?: true
  }

  export type ReferralsSumAggregateInputType = {
    referralId?: true
  }

  export type ReferralsMinAggregateInputType = {
    referralId?: true
    name?: true
  }

  export type ReferralsMaxAggregateInputType = {
    referralId?: true
    name?: true
  }

  export type ReferralsCountAggregateInputType = {
    referralId?: true
    name?: true
    _all?: true
  }

  export type ReferralsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referrals to aggregate.
     */
    where?: ReferralsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralsOrderByWithRelationInput | ReferralsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReferralsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Referrals
    **/
    _count?: true | ReferralsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReferralsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReferralsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReferralsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReferralsMaxAggregateInputType
  }

  export type GetReferralsAggregateType<T extends ReferralsAggregateArgs> = {
        [P in keyof T & keyof AggregateReferrals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReferrals[P]>
      : GetScalarType<T[P], AggregateReferrals[P]>
  }




  export type ReferralsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReferralsWhereInput
    orderBy?: ReferralsOrderByWithAggregationInput | ReferralsOrderByWithAggregationInput[]
    by: ReferralsScalarFieldEnum[] | ReferralsScalarFieldEnum
    having?: ReferralsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReferralsCountAggregateInputType | true
    _avg?: ReferralsAvgAggregateInputType
    _sum?: ReferralsSumAggregateInputType
    _min?: ReferralsMinAggregateInputType
    _max?: ReferralsMaxAggregateInputType
  }

  export type ReferralsGroupByOutputType = {
    referralId: number
    name: string
    _count: ReferralsCountAggregateOutputType | null
    _avg: ReferralsAvgAggregateOutputType | null
    _sum: ReferralsSumAggregateOutputType | null
    _min: ReferralsMinAggregateOutputType | null
    _max: ReferralsMaxAggregateOutputType | null
  }

  type GetReferralsGroupByPayload<T extends ReferralsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReferralsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReferralsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReferralsGroupByOutputType[P]>
            : GetScalarType<T[P], ReferralsGroupByOutputType[P]>
        }
      >
    >


  export type ReferralsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referralId?: boolean
    name?: boolean
    donations?: boolean | Referrals$donationsArgs<ExtArgs>
    _count?: boolean | ReferralsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["referrals"]>

  export type ReferralsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referralId?: boolean
    name?: boolean
  }, ExtArgs["result"]["referrals"]>

  export type ReferralsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    referralId?: boolean
    name?: boolean
  }, ExtArgs["result"]["referrals"]>

  export type ReferralsSelectScalar = {
    referralId?: boolean
    name?: boolean
  }

  export type ReferralsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"referralId" | "name", ExtArgs["result"]["referrals"]>
  export type ReferralsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | Referrals$donationsArgs<ExtArgs>
    _count?: boolean | ReferralsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReferralsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ReferralsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ReferralsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Referrals"
    objects: {
      donations: Prisma.$DonationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      referralId: number
      name: string
    }, ExtArgs["result"]["referrals"]>
    composites: {}
  }

  type ReferralsGetPayload<S extends boolean | null | undefined | ReferralsDefaultArgs> = $Result.GetResult<Prisma.$ReferralsPayload, S>

  type ReferralsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReferralsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReferralsCountAggregateInputType | true
    }

  export interface ReferralsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Referrals'], meta: { name: 'Referrals' } }
    /**
     * Find zero or one Referrals that matches the filter.
     * @param {ReferralsFindUniqueArgs} args - Arguments to find a Referrals
     * @example
     * // Get one Referrals
     * const referrals = await prisma.referrals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReferralsFindUniqueArgs>(args: SelectSubset<T, ReferralsFindUniqueArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Referrals that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReferralsFindUniqueOrThrowArgs} args - Arguments to find a Referrals
     * @example
     * // Get one Referrals
     * const referrals = await prisma.referrals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReferralsFindUniqueOrThrowArgs>(args: SelectSubset<T, ReferralsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsFindFirstArgs} args - Arguments to find a Referrals
     * @example
     * // Get one Referrals
     * const referrals = await prisma.referrals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReferralsFindFirstArgs>(args?: SelectSubset<T, ReferralsFindFirstArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Referrals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsFindFirstOrThrowArgs} args - Arguments to find a Referrals
     * @example
     * // Get one Referrals
     * const referrals = await prisma.referrals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReferralsFindFirstOrThrowArgs>(args?: SelectSubset<T, ReferralsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Referrals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Referrals
     * const referrals = await prisma.referrals.findMany()
     * 
     * // Get first 10 Referrals
     * const referrals = await prisma.referrals.findMany({ take: 10 })
     * 
     * // Only select the `referralId`
     * const referralsWithReferralIdOnly = await prisma.referrals.findMany({ select: { referralId: true } })
     * 
     */
    findMany<T extends ReferralsFindManyArgs>(args?: SelectSubset<T, ReferralsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Referrals.
     * @param {ReferralsCreateArgs} args - Arguments to create a Referrals.
     * @example
     * // Create one Referrals
     * const Referrals = await prisma.referrals.create({
     *   data: {
     *     // ... data to create a Referrals
     *   }
     * })
     * 
     */
    create<T extends ReferralsCreateArgs>(args: SelectSubset<T, ReferralsCreateArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Referrals.
     * @param {ReferralsCreateManyArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referrals = await prisma.referrals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReferralsCreateManyArgs>(args?: SelectSubset<T, ReferralsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Referrals and returns the data saved in the database.
     * @param {ReferralsCreateManyAndReturnArgs} args - Arguments to create many Referrals.
     * @example
     * // Create many Referrals
     * const referrals = await prisma.referrals.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Referrals and only return the `referralId`
     * const referralsWithReferralIdOnly = await prisma.referrals.createManyAndReturn({
     *   select: { referralId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReferralsCreateManyAndReturnArgs>(args?: SelectSubset<T, ReferralsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Referrals.
     * @param {ReferralsDeleteArgs} args - Arguments to delete one Referrals.
     * @example
     * // Delete one Referrals
     * const Referrals = await prisma.referrals.delete({
     *   where: {
     *     // ... filter to delete one Referrals
     *   }
     * })
     * 
     */
    delete<T extends ReferralsDeleteArgs>(args: SelectSubset<T, ReferralsDeleteArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Referrals.
     * @param {ReferralsUpdateArgs} args - Arguments to update one Referrals.
     * @example
     * // Update one Referrals
     * const referrals = await prisma.referrals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReferralsUpdateArgs>(args: SelectSubset<T, ReferralsUpdateArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Referrals.
     * @param {ReferralsDeleteManyArgs} args - Arguments to filter Referrals to delete.
     * @example
     * // Delete a few Referrals
     * const { count } = await prisma.referrals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReferralsDeleteManyArgs>(args?: SelectSubset<T, ReferralsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Referrals
     * const referrals = await prisma.referrals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReferralsUpdateManyArgs>(args: SelectSubset<T, ReferralsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Referrals and returns the data updated in the database.
     * @param {ReferralsUpdateManyAndReturnArgs} args - Arguments to update many Referrals.
     * @example
     * // Update many Referrals
     * const referrals = await prisma.referrals.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Referrals and only return the `referralId`
     * const referralsWithReferralIdOnly = await prisma.referrals.updateManyAndReturn({
     *   select: { referralId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReferralsUpdateManyAndReturnArgs>(args: SelectSubset<T, ReferralsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Referrals.
     * @param {ReferralsUpsertArgs} args - Arguments to update or create a Referrals.
     * @example
     * // Update or create a Referrals
     * const referrals = await prisma.referrals.upsert({
     *   create: {
     *     // ... data to create a Referrals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Referrals we want to update
     *   }
     * })
     */
    upsert<T extends ReferralsUpsertArgs>(args: SelectSubset<T, ReferralsUpsertArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsCountArgs} args - Arguments to filter Referrals to count.
     * @example
     * // Count the number of Referrals
     * const count = await prisma.referrals.count({
     *   where: {
     *     // ... the filter for the Referrals we want to count
     *   }
     * })
    **/
    count<T extends ReferralsCountArgs>(
      args?: Subset<T, ReferralsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReferralsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReferralsAggregateArgs>(args: Subset<T, ReferralsAggregateArgs>): Prisma.PrismaPromise<GetReferralsAggregateType<T>>

    /**
     * Group by Referrals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReferralsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReferralsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReferralsGroupByArgs['orderBy'] }
        : { orderBy?: ReferralsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReferralsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReferralsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Referrals model
   */
  readonly fields: ReferralsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Referrals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReferralsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    donations<T extends Referrals$donationsArgs<ExtArgs> = {}>(args?: Subset<T, Referrals$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Referrals model
   */
  interface ReferralsFieldRefs {
    readonly referralId: FieldRef<"Referrals", 'Int'>
    readonly name: FieldRef<"Referrals", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Referrals findUnique
   */
  export type ReferralsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where: ReferralsWhereUniqueInput
  }

  /**
   * Referrals findUniqueOrThrow
   */
  export type ReferralsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where: ReferralsWhereUniqueInput
  }

  /**
   * Referrals findFirst
   */
  export type ReferralsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralsOrderByWithRelationInput | ReferralsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralsScalarFieldEnum | ReferralsScalarFieldEnum[]
  }

  /**
   * Referrals findFirstOrThrow
   */
  export type ReferralsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralsOrderByWithRelationInput | ReferralsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Referrals.
     */
    cursor?: ReferralsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Referrals.
     */
    distinct?: ReferralsScalarFieldEnum | ReferralsScalarFieldEnum[]
  }

  /**
   * Referrals findMany
   */
  export type ReferralsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter, which Referrals to fetch.
     */
    where?: ReferralsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Referrals to fetch.
     */
    orderBy?: ReferralsOrderByWithRelationInput | ReferralsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Referrals.
     */
    cursor?: ReferralsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Referrals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Referrals.
     */
    skip?: number
    distinct?: ReferralsScalarFieldEnum | ReferralsScalarFieldEnum[]
  }

  /**
   * Referrals create
   */
  export type ReferralsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * The data needed to create a Referrals.
     */
    data: XOR<ReferralsCreateInput, ReferralsUncheckedCreateInput>
  }

  /**
   * Referrals createMany
   */
  export type ReferralsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Referrals.
     */
    data: ReferralsCreateManyInput | ReferralsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Referrals createManyAndReturn
   */
  export type ReferralsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * The data used to create many Referrals.
     */
    data: ReferralsCreateManyInput | ReferralsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Referrals update
   */
  export type ReferralsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * The data needed to update a Referrals.
     */
    data: XOR<ReferralsUpdateInput, ReferralsUncheckedUpdateInput>
    /**
     * Choose, which Referrals to update.
     */
    where: ReferralsWhereUniqueInput
  }

  /**
   * Referrals updateMany
   */
  export type ReferralsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralsUpdateManyMutationInput, ReferralsUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralsWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
  }

  /**
   * Referrals updateManyAndReturn
   */
  export type ReferralsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * The data used to update Referrals.
     */
    data: XOR<ReferralsUpdateManyMutationInput, ReferralsUncheckedUpdateManyInput>
    /**
     * Filter which Referrals to update
     */
    where?: ReferralsWhereInput
    /**
     * Limit how many Referrals to update.
     */
    limit?: number
  }

  /**
   * Referrals upsert
   */
  export type ReferralsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * The filter to search for the Referrals to update in case it exists.
     */
    where: ReferralsWhereUniqueInput
    /**
     * In case the Referrals found by the `where` argument doesn't exist, create a new Referrals with this data.
     */
    create: XOR<ReferralsCreateInput, ReferralsUncheckedCreateInput>
    /**
     * In case the Referrals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReferralsUpdateInput, ReferralsUncheckedUpdateInput>
  }

  /**
   * Referrals delete
   */
  export type ReferralsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
    /**
     * Filter which Referrals to delete.
     */
    where: ReferralsWhereUniqueInput
  }

  /**
   * Referrals deleteMany
   */
  export type ReferralsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Referrals to delete
     */
    where?: ReferralsWhereInput
    /**
     * Limit how many Referrals to delete.
     */
    limit?: number
  }

  /**
   * Referrals.donations
   */
  export type Referrals$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Referrals without action
   */
  export type ReferralsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Referrals
     */
    select?: ReferralsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Referrals
     */
    omit?: ReferralsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReferralsInclude<ExtArgs> | null
  }


  /**
   * Model Collectors
   */

  export type AggregateCollectors = {
    _count: CollectorsCountAggregateOutputType | null
    _avg: CollectorsAvgAggregateOutputType | null
    _sum: CollectorsSumAggregateOutputType | null
    _min: CollectorsMinAggregateOutputType | null
    _max: CollectorsMaxAggregateOutputType | null
  }

  export type CollectorsAvgAggregateOutputType = {
    collectorId: number | null
  }

  export type CollectorsSumAggregateOutputType = {
    collectorId: number | null
  }

  export type CollectorsMinAggregateOutputType = {
    collectorId: number | null
    name: string | null
  }

  export type CollectorsMaxAggregateOutputType = {
    collectorId: number | null
    name: string | null
  }

  export type CollectorsCountAggregateOutputType = {
    collectorId: number
    name: number
    _all: number
  }


  export type CollectorsAvgAggregateInputType = {
    collectorId?: true
  }

  export type CollectorsSumAggregateInputType = {
    collectorId?: true
  }

  export type CollectorsMinAggregateInputType = {
    collectorId?: true
    name?: true
  }

  export type CollectorsMaxAggregateInputType = {
    collectorId?: true
    name?: true
  }

  export type CollectorsCountAggregateInputType = {
    collectorId?: true
    name?: true
    _all?: true
  }

  export type CollectorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collectors to aggregate.
     */
    where?: CollectorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectors to fetch.
     */
    orderBy?: CollectorsOrderByWithRelationInput | CollectorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollectorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collectors
    **/
    _count?: true | CollectorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CollectorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CollectorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollectorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollectorsMaxAggregateInputType
  }

  export type GetCollectorsAggregateType<T extends CollectorsAggregateArgs> = {
        [P in keyof T & keyof AggregateCollectors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollectors[P]>
      : GetScalarType<T[P], AggregateCollectors[P]>
  }




  export type CollectorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollectorsWhereInput
    orderBy?: CollectorsOrderByWithAggregationInput | CollectorsOrderByWithAggregationInput[]
    by: CollectorsScalarFieldEnum[] | CollectorsScalarFieldEnum
    having?: CollectorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollectorsCountAggregateInputType | true
    _avg?: CollectorsAvgAggregateInputType
    _sum?: CollectorsSumAggregateInputType
    _min?: CollectorsMinAggregateInputType
    _max?: CollectorsMaxAggregateInputType
  }

  export type CollectorsGroupByOutputType = {
    collectorId: number
    name: string
    _count: CollectorsCountAggregateOutputType | null
    _avg: CollectorsAvgAggregateOutputType | null
    _sum: CollectorsSumAggregateOutputType | null
    _min: CollectorsMinAggregateOutputType | null
    _max: CollectorsMaxAggregateOutputType | null
  }

  type GetCollectorsGroupByPayload<T extends CollectorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollectorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollectorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollectorsGroupByOutputType[P]>
            : GetScalarType<T[P], CollectorsGroupByOutputType[P]>
        }
      >
    >


  export type CollectorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    collectorId?: boolean
    name?: boolean
    donations?: boolean | Collectors$donationsArgs<ExtArgs>
    payments?: boolean | Collectors$paymentsArgs<ExtArgs>
    _count?: boolean | CollectorsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collectors"]>

  export type CollectorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    collectorId?: boolean
    name?: boolean
  }, ExtArgs["result"]["collectors"]>

  export type CollectorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    collectorId?: boolean
    name?: boolean
  }, ExtArgs["result"]["collectors"]>

  export type CollectorsSelectScalar = {
    collectorId?: boolean
    name?: boolean
  }

  export type CollectorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"collectorId" | "name", ExtArgs["result"]["collectors"]>
  export type CollectorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donations?: boolean | Collectors$donationsArgs<ExtArgs>
    payments?: boolean | Collectors$paymentsArgs<ExtArgs>
    _count?: boolean | CollectorsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CollectorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CollectorsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CollectorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collectors"
    objects: {
      donations: Prisma.$DonationPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      collectorId: number
      name: string
    }, ExtArgs["result"]["collectors"]>
    composites: {}
  }

  type CollectorsGetPayload<S extends boolean | null | undefined | CollectorsDefaultArgs> = $Result.GetResult<Prisma.$CollectorsPayload, S>

  type CollectorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollectorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollectorsCountAggregateInputType | true
    }

  export interface CollectorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collectors'], meta: { name: 'Collectors' } }
    /**
     * Find zero or one Collectors that matches the filter.
     * @param {CollectorsFindUniqueArgs} args - Arguments to find a Collectors
     * @example
     * // Get one Collectors
     * const collectors = await prisma.collectors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollectorsFindUniqueArgs>(args: SelectSubset<T, CollectorsFindUniqueArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collectors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollectorsFindUniqueOrThrowArgs} args - Arguments to find a Collectors
     * @example
     * // Get one Collectors
     * const collectors = await prisma.collectors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollectorsFindUniqueOrThrowArgs>(args: SelectSubset<T, CollectorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsFindFirstArgs} args - Arguments to find a Collectors
     * @example
     * // Get one Collectors
     * const collectors = await prisma.collectors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollectorsFindFirstArgs>(args?: SelectSubset<T, CollectorsFindFirstArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collectors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsFindFirstOrThrowArgs} args - Arguments to find a Collectors
     * @example
     * // Get one Collectors
     * const collectors = await prisma.collectors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollectorsFindFirstOrThrowArgs>(args?: SelectSubset<T, CollectorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collectors
     * const collectors = await prisma.collectors.findMany()
     * 
     * // Get first 10 Collectors
     * const collectors = await prisma.collectors.findMany({ take: 10 })
     * 
     * // Only select the `collectorId`
     * const collectorsWithCollectorIdOnly = await prisma.collectors.findMany({ select: { collectorId: true } })
     * 
     */
    findMany<T extends CollectorsFindManyArgs>(args?: SelectSubset<T, CollectorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collectors.
     * @param {CollectorsCreateArgs} args - Arguments to create a Collectors.
     * @example
     * // Create one Collectors
     * const Collectors = await prisma.collectors.create({
     *   data: {
     *     // ... data to create a Collectors
     *   }
     * })
     * 
     */
    create<T extends CollectorsCreateArgs>(args: SelectSubset<T, CollectorsCreateArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collectors.
     * @param {CollectorsCreateManyArgs} args - Arguments to create many Collectors.
     * @example
     * // Create many Collectors
     * const collectors = await prisma.collectors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollectorsCreateManyArgs>(args?: SelectSubset<T, CollectorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collectors and returns the data saved in the database.
     * @param {CollectorsCreateManyAndReturnArgs} args - Arguments to create many Collectors.
     * @example
     * // Create many Collectors
     * const collectors = await prisma.collectors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collectors and only return the `collectorId`
     * const collectorsWithCollectorIdOnly = await prisma.collectors.createManyAndReturn({
     *   select: { collectorId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollectorsCreateManyAndReturnArgs>(args?: SelectSubset<T, CollectorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collectors.
     * @param {CollectorsDeleteArgs} args - Arguments to delete one Collectors.
     * @example
     * // Delete one Collectors
     * const Collectors = await prisma.collectors.delete({
     *   where: {
     *     // ... filter to delete one Collectors
     *   }
     * })
     * 
     */
    delete<T extends CollectorsDeleteArgs>(args: SelectSubset<T, CollectorsDeleteArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collectors.
     * @param {CollectorsUpdateArgs} args - Arguments to update one Collectors.
     * @example
     * // Update one Collectors
     * const collectors = await prisma.collectors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollectorsUpdateArgs>(args: SelectSubset<T, CollectorsUpdateArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collectors.
     * @param {CollectorsDeleteManyArgs} args - Arguments to filter Collectors to delete.
     * @example
     * // Delete a few Collectors
     * const { count } = await prisma.collectors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollectorsDeleteManyArgs>(args?: SelectSubset<T, CollectorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collectors
     * const collectors = await prisma.collectors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollectorsUpdateManyArgs>(args: SelectSubset<T, CollectorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collectors and returns the data updated in the database.
     * @param {CollectorsUpdateManyAndReturnArgs} args - Arguments to update many Collectors.
     * @example
     * // Update many Collectors
     * const collectors = await prisma.collectors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collectors and only return the `collectorId`
     * const collectorsWithCollectorIdOnly = await prisma.collectors.updateManyAndReturn({
     *   select: { collectorId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollectorsUpdateManyAndReturnArgs>(args: SelectSubset<T, CollectorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collectors.
     * @param {CollectorsUpsertArgs} args - Arguments to update or create a Collectors.
     * @example
     * // Update or create a Collectors
     * const collectors = await prisma.collectors.upsert({
     *   create: {
     *     // ... data to create a Collectors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collectors we want to update
     *   }
     * })
     */
    upsert<T extends CollectorsUpsertArgs>(args: SelectSubset<T, CollectorsUpsertArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsCountArgs} args - Arguments to filter Collectors to count.
     * @example
     * // Count the number of Collectors
     * const count = await prisma.collectors.count({
     *   where: {
     *     // ... the filter for the Collectors we want to count
     *   }
     * })
    **/
    count<T extends CollectorsCountArgs>(
      args?: Subset<T, CollectorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollectorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollectorsAggregateArgs>(args: Subset<T, CollectorsAggregateArgs>): Prisma.PrismaPromise<GetCollectorsAggregateType<T>>

    /**
     * Group by Collectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollectorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollectorsGroupByArgs['orderBy'] }
        : { orderBy?: CollectorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollectorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollectorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collectors model
   */
  readonly fields: CollectorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collectors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollectorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    donations<T extends Collectors$donationsArgs<ExtArgs> = {}>(args?: Subset<T, Collectors$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Collectors$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Collectors$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collectors model
   */
  interface CollectorsFieldRefs {
    readonly collectorId: FieldRef<"Collectors", 'Int'>
    readonly name: FieldRef<"Collectors", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Collectors findUnique
   */
  export type CollectorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter, which Collectors to fetch.
     */
    where: CollectorsWhereUniqueInput
  }

  /**
   * Collectors findUniqueOrThrow
   */
  export type CollectorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter, which Collectors to fetch.
     */
    where: CollectorsWhereUniqueInput
  }

  /**
   * Collectors findFirst
   */
  export type CollectorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter, which Collectors to fetch.
     */
    where?: CollectorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectors to fetch.
     */
    orderBy?: CollectorsOrderByWithRelationInput | CollectorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collectors.
     */
    cursor?: CollectorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collectors.
     */
    distinct?: CollectorsScalarFieldEnum | CollectorsScalarFieldEnum[]
  }

  /**
   * Collectors findFirstOrThrow
   */
  export type CollectorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter, which Collectors to fetch.
     */
    where?: CollectorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectors to fetch.
     */
    orderBy?: CollectorsOrderByWithRelationInput | CollectorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collectors.
     */
    cursor?: CollectorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collectors.
     */
    distinct?: CollectorsScalarFieldEnum | CollectorsScalarFieldEnum[]
  }

  /**
   * Collectors findMany
   */
  export type CollectorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter, which Collectors to fetch.
     */
    where?: CollectorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collectors to fetch.
     */
    orderBy?: CollectorsOrderByWithRelationInput | CollectorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collectors.
     */
    cursor?: CollectorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collectors.
     */
    skip?: number
    distinct?: CollectorsScalarFieldEnum | CollectorsScalarFieldEnum[]
  }

  /**
   * Collectors create
   */
  export type CollectorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * The data needed to create a Collectors.
     */
    data: XOR<CollectorsCreateInput, CollectorsUncheckedCreateInput>
  }

  /**
   * Collectors createMany
   */
  export type CollectorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collectors.
     */
    data: CollectorsCreateManyInput | CollectorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collectors createManyAndReturn
   */
  export type CollectorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * The data used to create many Collectors.
     */
    data: CollectorsCreateManyInput | CollectorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collectors update
   */
  export type CollectorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * The data needed to update a Collectors.
     */
    data: XOR<CollectorsUpdateInput, CollectorsUncheckedUpdateInput>
    /**
     * Choose, which Collectors to update.
     */
    where: CollectorsWhereUniqueInput
  }

  /**
   * Collectors updateMany
   */
  export type CollectorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collectors.
     */
    data: XOR<CollectorsUpdateManyMutationInput, CollectorsUncheckedUpdateManyInput>
    /**
     * Filter which Collectors to update
     */
    where?: CollectorsWhereInput
    /**
     * Limit how many Collectors to update.
     */
    limit?: number
  }

  /**
   * Collectors updateManyAndReturn
   */
  export type CollectorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * The data used to update Collectors.
     */
    data: XOR<CollectorsUpdateManyMutationInput, CollectorsUncheckedUpdateManyInput>
    /**
     * Filter which Collectors to update
     */
    where?: CollectorsWhereInput
    /**
     * Limit how many Collectors to update.
     */
    limit?: number
  }

  /**
   * Collectors upsert
   */
  export type CollectorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * The filter to search for the Collectors to update in case it exists.
     */
    where: CollectorsWhereUniqueInput
    /**
     * In case the Collectors found by the `where` argument doesn't exist, create a new Collectors with this data.
     */
    create: XOR<CollectorsCreateInput, CollectorsUncheckedCreateInput>
    /**
     * In case the Collectors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollectorsUpdateInput, CollectorsUncheckedUpdateInput>
  }

  /**
   * Collectors delete
   */
  export type CollectorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    /**
     * Filter which Collectors to delete.
     */
    where: CollectorsWhereUniqueInput
  }

  /**
   * Collectors deleteMany
   */
  export type CollectorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collectors to delete
     */
    where?: CollectorsWhereInput
    /**
     * Limit how many Collectors to delete.
     */
    limit?: number
  }

  /**
   * Collectors.donations
   */
  export type Collectors$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Collectors.payments
   */
  export type Collectors$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Collectors without action
   */
  export type CollectorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
  }


  /**
   * Model Vendors
   */

  export type AggregateVendors = {
    _count: VendorsCountAggregateOutputType | null
    _min: VendorsMinAggregateOutputType | null
    _max: VendorsMaxAggregateOutputType | null
  }

  export type VendorsMinAggregateOutputType = {
    vendorName: string | null
  }

  export type VendorsMaxAggregateOutputType = {
    vendorName: string | null
  }

  export type VendorsCountAggregateOutputType = {
    vendorName: number
    _all: number
  }


  export type VendorsMinAggregateInputType = {
    vendorName?: true
  }

  export type VendorsMaxAggregateInputType = {
    vendorName?: true
  }

  export type VendorsCountAggregateInputType = {
    vendorName?: true
    _all?: true
  }

  export type VendorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to aggregate.
     */
    where?: VendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorsOrderByWithRelationInput | VendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorsMaxAggregateInputType
  }

  export type GetVendorsAggregateType<T extends VendorsAggregateArgs> = {
        [P in keyof T & keyof AggregateVendors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendors[P]>
      : GetScalarType<T[P], AggregateVendors[P]>
  }




  export type VendorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorsWhereInput
    orderBy?: VendorsOrderByWithAggregationInput | VendorsOrderByWithAggregationInput[]
    by: VendorsScalarFieldEnum[] | VendorsScalarFieldEnum
    having?: VendorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorsCountAggregateInputType | true
    _min?: VendorsMinAggregateInputType
    _max?: VendorsMaxAggregateInputType
  }

  export type VendorsGroupByOutputType = {
    vendorName: string
    _count: VendorsCountAggregateOutputType | null
    _min: VendorsMinAggregateOutputType | null
    _max: VendorsMaxAggregateOutputType | null
  }

  type GetVendorsGroupByPayload<T extends VendorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorsGroupByOutputType[P]>
            : GetScalarType<T[P], VendorsGroupByOutputType[P]>
        }
      >
    >


  export type VendorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorName?: boolean
    expenses?: boolean | Vendors$expensesArgs<ExtArgs>
    payments?: boolean | Vendors$paymentsArgs<ExtArgs>
    _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendors"]>

  export type VendorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorName?: boolean
  }, ExtArgs["result"]["vendors"]>

  export type VendorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    vendorName?: boolean
  }, ExtArgs["result"]["vendors"]>

  export type VendorsSelectScalar = {
    vendorName?: boolean
  }

  export type VendorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"vendorName", ExtArgs["result"]["vendors"]>
  export type VendorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | Vendors$expensesArgs<ExtArgs>
    payments?: boolean | Vendors$paymentsArgs<ExtArgs>
    _count?: boolean | VendorsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VendorsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VendorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendors"
    objects: {
      expenses: Prisma.$ExpensesPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      vendorName: string
    }, ExtArgs["result"]["vendors"]>
    composites: {}
  }

  type VendorsGetPayload<S extends boolean | null | undefined | VendorsDefaultArgs> = $Result.GetResult<Prisma.$VendorsPayload, S>

  type VendorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorsCountAggregateInputType | true
    }

  export interface VendorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendors'], meta: { name: 'Vendors' } }
    /**
     * Find zero or one Vendors that matches the filter.
     * @param {VendorsFindUniqueArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorsFindUniqueArgs>(args: SelectSubset<T, VendorsFindUniqueArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vendors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorsFindUniqueOrThrowArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorsFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsFindFirstArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorsFindFirstArgs>(args?: SelectSubset<T, VendorsFindFirstArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsFindFirstOrThrowArgs} args - Arguments to find a Vendors
     * @example
     * // Get one Vendors
     * const vendors = await prisma.vendors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorsFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendors.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendors.findMany({ take: 10 })
     * 
     * // Only select the `vendorName`
     * const vendorsWithVendorNameOnly = await prisma.vendors.findMany({ select: { vendorName: true } })
     * 
     */
    findMany<T extends VendorsFindManyArgs>(args?: SelectSubset<T, VendorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vendors.
     * @param {VendorsCreateArgs} args - Arguments to create a Vendors.
     * @example
     * // Create one Vendors
     * const Vendors = await prisma.vendors.create({
     *   data: {
     *     // ... data to create a Vendors
     *   }
     * })
     * 
     */
    create<T extends VendorsCreateArgs>(args: SelectSubset<T, VendorsCreateArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendors.
     * @param {VendorsCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendors = await prisma.vendors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorsCreateManyArgs>(args?: SelectSubset<T, VendorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorsCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendors = await prisma.vendors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `vendorName`
     * const vendorsWithVendorNameOnly = await prisma.vendors.createManyAndReturn({
     *   select: { vendorName: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorsCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vendors.
     * @param {VendorsDeleteArgs} args - Arguments to delete one Vendors.
     * @example
     * // Delete one Vendors
     * const Vendors = await prisma.vendors.delete({
     *   where: {
     *     // ... filter to delete one Vendors
     *   }
     * })
     * 
     */
    delete<T extends VendorsDeleteArgs>(args: SelectSubset<T, VendorsDeleteArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vendors.
     * @param {VendorsUpdateArgs} args - Arguments to update one Vendors.
     * @example
     * // Update one Vendors
     * const vendors = await prisma.vendors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorsUpdateArgs>(args: SelectSubset<T, VendorsUpdateArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendors.
     * @param {VendorsDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorsDeleteManyArgs>(args?: SelectSubset<T, VendorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendors = await prisma.vendors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorsUpdateManyArgs>(args: SelectSubset<T, VendorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorsUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendors = await prisma.vendors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendors and only return the `vendorName`
     * const vendorsWithVendorNameOnly = await prisma.vendors.updateManyAndReturn({
     *   select: { vendorName: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorsUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vendors.
     * @param {VendorsUpsertArgs} args - Arguments to update or create a Vendors.
     * @example
     * // Update or create a Vendors
     * const vendors = await prisma.vendors.upsert({
     *   create: {
     *     // ... data to create a Vendors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendors we want to update
     *   }
     * })
     */
    upsert<T extends VendorsUpsertArgs>(args: SelectSubset<T, VendorsUpsertArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendors.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorsCountArgs>(
      args?: Subset<T, VendorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorsAggregateArgs>(args: Subset<T, VendorsAggregateArgs>): Prisma.PrismaPromise<GetVendorsAggregateType<T>>

    /**
     * Group by Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorsGroupByArgs['orderBy'] }
        : { orderBy?: VendorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendors model
   */
  readonly fields: VendorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expenses<T extends Vendors$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Vendors$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Vendors$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Vendors$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vendors model
   */
  interface VendorsFieldRefs {
    readonly vendorName: FieldRef<"Vendors", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vendors findUnique
   */
  export type VendorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where: VendorsWhereUniqueInput
  }

  /**
   * Vendors findUniqueOrThrow
   */
  export type VendorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where: VendorsWhereUniqueInput
  }

  /**
   * Vendors findFirst
   */
  export type VendorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorsOrderByWithRelationInput | VendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * Vendors findFirstOrThrow
   */
  export type VendorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorsOrderByWithRelationInput | VendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * Vendors findMany
   */
  export type VendorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorsOrderByWithRelationInput | VendorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorsScalarFieldEnum | VendorsScalarFieldEnum[]
  }

  /**
   * Vendors create
   */
  export type VendorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * The data needed to create a Vendors.
     */
    data: XOR<VendorsCreateInput, VendorsUncheckedCreateInput>
  }

  /**
   * Vendors createMany
   */
  export type VendorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorsCreateManyInput | VendorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendors createManyAndReturn
   */
  export type VendorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorsCreateManyInput | VendorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendors update
   */
  export type VendorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * The data needed to update a Vendors.
     */
    data: XOR<VendorsUpdateInput, VendorsUncheckedUpdateInput>
    /**
     * Choose, which Vendors to update.
     */
    where: VendorsWhereUniqueInput
  }

  /**
   * Vendors updateMany
   */
  export type VendorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorsUpdateManyMutationInput, VendorsUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorsWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendors updateManyAndReturn
   */
  export type VendorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorsUpdateManyMutationInput, VendorsUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorsWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendors upsert
   */
  export type VendorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * The filter to search for the Vendors to update in case it exists.
     */
    where: VendorsWhereUniqueInput
    /**
     * In case the Vendors found by the `where` argument doesn't exist, create a new Vendors with this data.
     */
    create: XOR<VendorsCreateInput, VendorsUncheckedCreateInput>
    /**
     * In case the Vendors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorsUpdateInput, VendorsUncheckedUpdateInput>
  }

  /**
   * Vendors delete
   */
  export type VendorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    /**
     * Filter which Vendors to delete.
     */
    where: VendorsWhereUniqueInput
  }

  /**
   * Vendors deleteMany
   */
  export type VendorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorsWhereInput
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number
  }

  /**
   * Vendors.expenses
   */
  export type Vendors$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    where?: ExpensesWhereInput
    orderBy?: ExpensesOrderByWithRelationInput | ExpensesOrderByWithRelationInput[]
    cursor?: ExpensesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * Vendors.payments
   */
  export type Vendors$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Vendors without action
   */
  export type VendorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
  }


  /**
   * Model Donation
   */

  export type AggregateDonation = {
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  export type DonationAvgAggregateOutputType = {
    transacId: number | null
    amount: number | null
    referralId: number | null
    collectorId: number | null
  }

  export type DonationSumAggregateOutputType = {
    transacId: number | null
    amount: number | null
    referralId: number | null
    collectorId: number | null
  }

  export type DonationMinAggregateOutputType = {
    transacId: number | null
    date: Date | null
    amount: number | null
    donorName: string | null
    referralId: number | null
    collectorId: number | null
    type: string | null
    status: string | null
    notes: string | null
    paymentMethod: string | null
  }

  export type DonationMaxAggregateOutputType = {
    transacId: number | null
    date: Date | null
    amount: number | null
    donorName: string | null
    referralId: number | null
    collectorId: number | null
    type: string | null
    status: string | null
    notes: string | null
    paymentMethod: string | null
  }

  export type DonationCountAggregateOutputType = {
    transacId: number
    date: number
    amount: number
    donorName: number
    referralId: number
    collectorId: number
    type: number
    status: number
    notes: number
    paymentMethod: number
    _all: number
  }


  export type DonationAvgAggregateInputType = {
    transacId?: true
    amount?: true
    referralId?: true
    collectorId?: true
  }

  export type DonationSumAggregateInputType = {
    transacId?: true
    amount?: true
    referralId?: true
    collectorId?: true
  }

  export type DonationMinAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    donorName?: true
    referralId?: true
    collectorId?: true
    type?: true
    status?: true
    notes?: true
    paymentMethod?: true
  }

  export type DonationMaxAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    donorName?: true
    referralId?: true
    collectorId?: true
    type?: true
    status?: true
    notes?: true
    paymentMethod?: true
  }

  export type DonationCountAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    donorName?: true
    referralId?: true
    collectorId?: true
    type?: true
    status?: true
    notes?: true
    paymentMethod?: true
    _all?: true
  }

  export type DonationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donation to aggregate.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Donations
    **/
    _count?: true | DonationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonationMaxAggregateInputType
  }

  export type GetDonationAggregateType<T extends DonationAggregateArgs> = {
        [P in keyof T & keyof AggregateDonation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonation[P]>
      : GetScalarType<T[P], AggregateDonation[P]>
  }




  export type DonationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithAggregationInput | DonationOrderByWithAggregationInput[]
    by: DonationScalarFieldEnum[] | DonationScalarFieldEnum
    having?: DonationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonationCountAggregateInputType | true
    _avg?: DonationAvgAggregateInputType
    _sum?: DonationSumAggregateInputType
    _min?: DonationMinAggregateInputType
    _max?: DonationMaxAggregateInputType
  }

  export type DonationGroupByOutputType = {
    transacId: number
    date: Date
    amount: number
    donorName: string
    referralId: number
    collectorId: number
    type: string
    status: string
    notes: string | null
    paymentMethod: string
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  type GetDonationGroupByPayload<T extends DonationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonationGroupByOutputType[P]>
            : GetScalarType<T[P], DonationGroupByOutputType[P]>
        }
      >
    >


  export type DonationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    donorName?: boolean
    referralId?: boolean
    collectorId?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    paymentMethod?: boolean
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    donorName?: boolean
    referralId?: boolean
    collectorId?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    paymentMethod?: boolean
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    donorName?: boolean
    referralId?: boolean
    collectorId?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    paymentMethod?: boolean
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>

  export type DonationSelectScalar = {
    transacId?: boolean
    date?: boolean
    amount?: boolean
    donorName?: boolean
    referralId?: boolean
    collectorId?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    paymentMethod?: boolean
  }

  export type DonationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"transacId" | "date" | "amount" | "donorName" | "referralId" | "collectorId" | "type" | "status" | "notes" | "paymentMethod", ExtArgs["result"]["donation"]>
  export type DonationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }
  export type DonationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }
  export type DonationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | CollectorsDefaultArgs<ExtArgs>
    referral?: boolean | ReferralsDefaultArgs<ExtArgs>
  }

  export type $DonationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Donation"
    objects: {
      collector: Prisma.$CollectorsPayload<ExtArgs>
      referral: Prisma.$ReferralsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      transacId: number
      date: Date
      amount: number
      donorName: string
      referralId: number
      collectorId: number
      type: string
      status: string
      notes: string | null
      paymentMethod: string
    }, ExtArgs["result"]["donation"]>
    composites: {}
  }

  type DonationGetPayload<S extends boolean | null | undefined | DonationDefaultArgs> = $Result.GetResult<Prisma.$DonationPayload, S>

  type DonationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonationCountAggregateInputType | true
    }

  export interface DonationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Donation'], meta: { name: 'Donation' } }
    /**
     * Find zero or one Donation that matches the filter.
     * @param {DonationFindUniqueArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationFindUniqueArgs>(args: SelectSubset<T, DonationFindUniqueArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Donation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationFindUniqueOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationFindUniqueOrThrowArgs>(args: SelectSubset<T, DonationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationFindFirstArgs>(args?: SelectSubset<T, DonationFindFirstArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationFindFirstOrThrowArgs>(args?: SelectSubset<T, DonationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Donations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Donations
     * const donations = await prisma.donation.findMany()
     * 
     * // Get first 10 Donations
     * const donations = await prisma.donation.findMany({ take: 10 })
     * 
     * // Only select the `transacId`
     * const donationWithTransacIdOnly = await prisma.donation.findMany({ select: { transacId: true } })
     * 
     */
    findMany<T extends DonationFindManyArgs>(args?: SelectSubset<T, DonationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Donation.
     * @param {DonationCreateArgs} args - Arguments to create a Donation.
     * @example
     * // Create one Donation
     * const Donation = await prisma.donation.create({
     *   data: {
     *     // ... data to create a Donation
     *   }
     * })
     * 
     */
    create<T extends DonationCreateArgs>(args: SelectSubset<T, DonationCreateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Donations.
     * @param {DonationCreateManyArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donation = await prisma.donation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonationCreateManyArgs>(args?: SelectSubset<T, DonationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Donations and returns the data saved in the database.
     * @param {DonationCreateManyAndReturnArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donation = await prisma.donation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Donations and only return the `transacId`
     * const donationWithTransacIdOnly = await prisma.donation.createManyAndReturn({
     *   select: { transacId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DonationCreateManyAndReturnArgs>(args?: SelectSubset<T, DonationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Donation.
     * @param {DonationDeleteArgs} args - Arguments to delete one Donation.
     * @example
     * // Delete one Donation
     * const Donation = await prisma.donation.delete({
     *   where: {
     *     // ... filter to delete one Donation
     *   }
     * })
     * 
     */
    delete<T extends DonationDeleteArgs>(args: SelectSubset<T, DonationDeleteArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Donation.
     * @param {DonationUpdateArgs} args - Arguments to update one Donation.
     * @example
     * // Update one Donation
     * const donation = await prisma.donation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonationUpdateArgs>(args: SelectSubset<T, DonationUpdateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Donations.
     * @param {DonationDeleteManyArgs} args - Arguments to filter Donations to delete.
     * @example
     * // Delete a few Donations
     * const { count } = await prisma.donation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonationDeleteManyArgs>(args?: SelectSubset<T, DonationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Donations
     * const donation = await prisma.donation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonationUpdateManyArgs>(args: SelectSubset<T, DonationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations and returns the data updated in the database.
     * @param {DonationUpdateManyAndReturnArgs} args - Arguments to update many Donations.
     * @example
     * // Update many Donations
     * const donation = await prisma.donation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Donations and only return the `transacId`
     * const donationWithTransacIdOnly = await prisma.donation.updateManyAndReturn({
     *   select: { transacId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DonationUpdateManyAndReturnArgs>(args: SelectSubset<T, DonationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Donation.
     * @param {DonationUpsertArgs} args - Arguments to update or create a Donation.
     * @example
     * // Update or create a Donation
     * const donation = await prisma.donation.upsert({
     *   create: {
     *     // ... data to create a Donation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Donation we want to update
     *   }
     * })
     */
    upsert<T extends DonationUpsertArgs>(args: SelectSubset<T, DonationUpsertArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationCountArgs} args - Arguments to filter Donations to count.
     * @example
     * // Count the number of Donations
     * const count = await prisma.donation.count({
     *   where: {
     *     // ... the filter for the Donations we want to count
     *   }
     * })
    **/
    count<T extends DonationCountArgs>(
      args?: Subset<T, DonationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonationAggregateArgs>(args: Subset<T, DonationAggregateArgs>): Prisma.PrismaPromise<GetDonationAggregateType<T>>

    /**
     * Group by Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonationGroupByArgs['orderBy'] }
        : { orderBy?: DonationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Donation model
   */
  readonly fields: DonationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Donation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collector<T extends CollectorsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollectorsDefaultArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    referral<T extends ReferralsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReferralsDefaultArgs<ExtArgs>>): Prisma__ReferralsClient<$Result.GetResult<Prisma.$ReferralsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Donation model
   */
  interface DonationFieldRefs {
    readonly transacId: FieldRef<"Donation", 'Int'>
    readonly date: FieldRef<"Donation", 'DateTime'>
    readonly amount: FieldRef<"Donation", 'Int'>
    readonly donorName: FieldRef<"Donation", 'String'>
    readonly referralId: FieldRef<"Donation", 'Int'>
    readonly collectorId: FieldRef<"Donation", 'Int'>
    readonly type: FieldRef<"Donation", 'String'>
    readonly status: FieldRef<"Donation", 'String'>
    readonly notes: FieldRef<"Donation", 'String'>
    readonly paymentMethod: FieldRef<"Donation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Donation findUnique
   */
  export type DonationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findUniqueOrThrow
   */
  export type DonationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findFirst
   */
  export type DonationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findFirstOrThrow
   */
  export type DonationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findMany
   */
  export type DonationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation create
   */
  export type DonationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to create a Donation.
     */
    data: XOR<DonationCreateInput, DonationUncheckedCreateInput>
  }

  /**
   * Donation createMany
   */
  export type DonationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Donations.
     */
    data: DonationCreateManyInput | DonationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Donation createManyAndReturn
   */
  export type DonationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * The data used to create many Donations.
     */
    data: DonationCreateManyInput | DonationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donation update
   */
  export type DonationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to update a Donation.
     */
    data: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
    /**
     * Choose, which Donation to update.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation updateMany
   */
  export type DonationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
  }

  /**
   * Donation updateManyAndReturn
   */
  export type DonationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Donation upsert
   */
  export type DonationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The filter to search for the Donation to update in case it exists.
     */
    where: DonationWhereUniqueInput
    /**
     * In case the Donation found by the `where` argument doesn't exist, create a new Donation with this data.
     */
    create: XOR<DonationCreateInput, DonationUncheckedCreateInput>
    /**
     * In case the Donation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
  }

  /**
   * Donation delete
   */
  export type DonationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter which Donation to delete.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation deleteMany
   */
  export type DonationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donations to delete
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to delete.
     */
    limit?: number
  }

  /**
   * Donation without action
   */
  export type DonationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
  }


  /**
   * Model Expenses
   */

  export type AggregateExpenses = {
    _count: ExpensesCountAggregateOutputType | null
    _avg: ExpensesAvgAggregateOutputType | null
    _sum: ExpensesSumAggregateOutputType | null
    _min: ExpensesMinAggregateOutputType | null
    _max: ExpensesMaxAggregateOutputType | null
  }

  export type ExpensesAvgAggregateOutputType = {
    transacId: number | null
    amount: number | null
  }

  export type ExpensesSumAggregateOutputType = {
    transacId: number | null
    amount: number | null
  }

  export type ExpensesMinAggregateOutputType = {
    transacId: number | null
    date: Date | null
    amount: number | null
    vendorName: string | null
    project: string | null
    description: string | null
    status: string | null
  }

  export type ExpensesMaxAggregateOutputType = {
    transacId: number | null
    date: Date | null
    amount: number | null
    vendorName: string | null
    project: string | null
    description: string | null
    status: string | null
  }

  export type ExpensesCountAggregateOutputType = {
    transacId: number
    date: number
    amount: number
    vendorName: number
    project: number
    description: number
    status: number
    _all: number
  }


  export type ExpensesAvgAggregateInputType = {
    transacId?: true
    amount?: true
  }

  export type ExpensesSumAggregateInputType = {
    transacId?: true
    amount?: true
  }

  export type ExpensesMinAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    vendorName?: true
    project?: true
    description?: true
    status?: true
  }

  export type ExpensesMaxAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    vendorName?: true
    project?: true
    description?: true
    status?: true
  }

  export type ExpensesCountAggregateInputType = {
    transacId?: true
    date?: true
    amount?: true
    vendorName?: true
    project?: true
    description?: true
    status?: true
    _all?: true
  }

  export type ExpensesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to aggregate.
     */
    where?: ExpensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpensesOrderByWithRelationInput | ExpensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpensesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpensesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpensesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpensesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpensesMaxAggregateInputType
  }

  export type GetExpensesAggregateType<T extends ExpensesAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenses[P]>
      : GetScalarType<T[P], AggregateExpenses[P]>
  }




  export type ExpensesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpensesWhereInput
    orderBy?: ExpensesOrderByWithAggregationInput | ExpensesOrderByWithAggregationInput[]
    by: ExpensesScalarFieldEnum[] | ExpensesScalarFieldEnum
    having?: ExpensesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpensesCountAggregateInputType | true
    _avg?: ExpensesAvgAggregateInputType
    _sum?: ExpensesSumAggregateInputType
    _min?: ExpensesMinAggregateInputType
    _max?: ExpensesMaxAggregateInputType
  }

  export type ExpensesGroupByOutputType = {
    transacId: number
    date: Date
    amount: number
    vendorName: string
    project: string
    description: string | null
    status: string
    _count: ExpensesCountAggregateOutputType | null
    _avg: ExpensesAvgAggregateOutputType | null
    _sum: ExpensesSumAggregateOutputType | null
    _min: ExpensesMinAggregateOutputType | null
    _max: ExpensesMaxAggregateOutputType | null
  }

  type GetExpensesGroupByPayload<T extends ExpensesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpensesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpensesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpensesGroupByOutputType[P]>
            : GetScalarType<T[P], ExpensesGroupByOutputType[P]>
        }
      >
    >


  export type ExpensesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    vendorName?: boolean
    project?: boolean
    description?: boolean
    status?: boolean
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type ExpensesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    vendorName?: boolean
    project?: boolean
    description?: boolean
    status?: boolean
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type ExpensesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    transacId?: boolean
    date?: boolean
    amount?: boolean
    vendorName?: boolean
    project?: boolean
    description?: boolean
    status?: boolean
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type ExpensesSelectScalar = {
    transacId?: boolean
    date?: boolean
    amount?: boolean
    vendorName?: boolean
    project?: boolean
    description?: boolean
    status?: boolean
  }

  export type ExpensesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"transacId" | "date" | "amount" | "vendorName" | "project" | "description" | "status", ExtArgs["result"]["expenses"]>
  export type ExpensesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }
  export type ExpensesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }
  export type ExpensesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | Expenses$vendorArgs<ExtArgs>
  }

  export type $ExpensesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expenses"
    objects: {
      vendor: Prisma.$VendorsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      transacId: number
      date: Date
      amount: number
      vendorName: string
      project: string
      description: string | null
      status: string
    }, ExtArgs["result"]["expenses"]>
    composites: {}
  }

  type ExpensesGetPayload<S extends boolean | null | undefined | ExpensesDefaultArgs> = $Result.GetResult<Prisma.$ExpensesPayload, S>

  type ExpensesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpensesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpensesCountAggregateInputType | true
    }

  export interface ExpensesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expenses'], meta: { name: 'Expenses' } }
    /**
     * Find zero or one Expenses that matches the filter.
     * @param {ExpensesFindUniqueArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpensesFindUniqueArgs>(args: SelectSubset<T, ExpensesFindUniqueArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expenses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpensesFindUniqueOrThrowArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpensesFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpensesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesFindFirstArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpensesFindFirstArgs>(args?: SelectSubset<T, ExpensesFindFirstArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesFindFirstOrThrowArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpensesFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpensesFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expenses.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expenses.findMany({ take: 10 })
     * 
     * // Only select the `transacId`
     * const expensesWithTransacIdOnly = await prisma.expenses.findMany({ select: { transacId: true } })
     * 
     */
    findMany<T extends ExpensesFindManyArgs>(args?: SelectSubset<T, ExpensesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expenses.
     * @param {ExpensesCreateArgs} args - Arguments to create a Expenses.
     * @example
     * // Create one Expenses
     * const Expenses = await prisma.expenses.create({
     *   data: {
     *     // ... data to create a Expenses
     *   }
     * })
     * 
     */
    create<T extends ExpensesCreateArgs>(args: SelectSubset<T, ExpensesCreateArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpensesCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expenses = await prisma.expenses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpensesCreateManyArgs>(args?: SelectSubset<T, ExpensesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpensesCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expenses = await prisma.expenses.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `transacId`
     * const expensesWithTransacIdOnly = await prisma.expenses.createManyAndReturn({
     *   select: { transacId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpensesCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpensesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expenses.
     * @param {ExpensesDeleteArgs} args - Arguments to delete one Expenses.
     * @example
     * // Delete one Expenses
     * const Expenses = await prisma.expenses.delete({
     *   where: {
     *     // ... filter to delete one Expenses
     *   }
     * })
     * 
     */
    delete<T extends ExpensesDeleteArgs>(args: SelectSubset<T, ExpensesDeleteArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expenses.
     * @param {ExpensesUpdateArgs} args - Arguments to update one Expenses.
     * @example
     * // Update one Expenses
     * const expenses = await prisma.expenses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpensesUpdateArgs>(args: SelectSubset<T, ExpensesUpdateArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpensesDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expenses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpensesDeleteManyArgs>(args?: SelectSubset<T, ExpensesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expenses = await prisma.expenses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpensesUpdateManyArgs>(args: SelectSubset<T, ExpensesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpensesUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expenses = await prisma.expenses.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `transacId`
     * const expensesWithTransacIdOnly = await prisma.expenses.updateManyAndReturn({
     *   select: { transacId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpensesUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpensesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expenses.
     * @param {ExpensesUpsertArgs} args - Arguments to update or create a Expenses.
     * @example
     * // Update or create a Expenses
     * const expenses = await prisma.expenses.upsert({
     *   create: {
     *     // ... data to create a Expenses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expenses we want to update
     *   }
     * })
     */
    upsert<T extends ExpensesUpsertArgs>(args: SelectSubset<T, ExpensesUpsertArgs<ExtArgs>>): Prisma__ExpensesClient<$Result.GetResult<Prisma.$ExpensesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expenses.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpensesCountArgs>(
      args?: Subset<T, ExpensesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpensesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpensesAggregateArgs>(args: Subset<T, ExpensesAggregateArgs>): Prisma.PrismaPromise<GetExpensesAggregateType<T>>

    /**
     * Group by Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpensesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpensesGroupByArgs['orderBy'] }
        : { orderBy?: ExpensesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpensesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpensesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expenses model
   */
  readonly fields: ExpensesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expenses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpensesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends Expenses$vendorArgs<ExtArgs> = {}>(args?: Subset<T, Expenses$vendorArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expenses model
   */
  interface ExpensesFieldRefs {
    readonly transacId: FieldRef<"Expenses", 'Int'>
    readonly date: FieldRef<"Expenses", 'DateTime'>
    readonly amount: FieldRef<"Expenses", 'Int'>
    readonly vendorName: FieldRef<"Expenses", 'String'>
    readonly project: FieldRef<"Expenses", 'String'>
    readonly description: FieldRef<"Expenses", 'String'>
    readonly status: FieldRef<"Expenses", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Expenses findUnique
   */
  export type ExpensesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where: ExpensesWhereUniqueInput
  }

  /**
   * Expenses findUniqueOrThrow
   */
  export type ExpensesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where: ExpensesWhereUniqueInput
  }

  /**
   * Expenses findFirst
   */
  export type ExpensesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpensesOrderByWithRelationInput | ExpensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * Expenses findFirstOrThrow
   */
  export type ExpensesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpensesOrderByWithRelationInput | ExpensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * Expenses findMany
   */
  export type ExpensesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpensesOrderByWithRelationInput | ExpensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * Expenses create
   */
  export type ExpensesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * The data needed to create a Expenses.
     */
    data: XOR<ExpensesCreateInput, ExpensesUncheckedCreateInput>
  }

  /**
   * Expenses createMany
   */
  export type ExpensesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpensesCreateManyInput | ExpensesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expenses createManyAndReturn
   */
  export type ExpensesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpensesCreateManyInput | ExpensesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expenses update
   */
  export type ExpensesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * The data needed to update a Expenses.
     */
    data: XOR<ExpensesUpdateInput, ExpensesUncheckedUpdateInput>
    /**
     * Choose, which Expenses to update.
     */
    where: ExpensesWhereUniqueInput
  }

  /**
   * Expenses updateMany
   */
  export type ExpensesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpensesUpdateManyMutationInput, ExpensesUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpensesWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expenses updateManyAndReturn
   */
  export type ExpensesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpensesUpdateManyMutationInput, ExpensesUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpensesWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expenses upsert
   */
  export type ExpensesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * The filter to search for the Expenses to update in case it exists.
     */
    where: ExpensesWhereUniqueInput
    /**
     * In case the Expenses found by the `where` argument doesn't exist, create a new Expenses with this data.
     */
    create: XOR<ExpensesCreateInput, ExpensesUncheckedCreateInput>
    /**
     * In case the Expenses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpensesUpdateInput, ExpensesUncheckedUpdateInput>
  }

  /**
   * Expenses delete
   */
  export type ExpensesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
    /**
     * Filter which Expenses to delete.
     */
    where: ExpensesWhereUniqueInput
  }

  /**
   * Expenses deleteMany
   */
  export type ExpensesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpensesWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expenses.vendor
   */
  export type Expenses$vendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    where?: VendorsWhereInput
  }

  /**
   * Expenses without action
   */
  export type ExpensesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expenses
     */
    select?: ExpensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expenses
     */
    omit?: ExpensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpensesInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    paymentId: number | null
    collectorId: number | null
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    paymentId: number | null
    collectorId: number | null
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    paymentId: number | null
    vendorName: string | null
    collectorId: number | null
    type: string | null
    amount: number | null
  }

  export type PaymentMaxAggregateOutputType = {
    paymentId: number | null
    vendorName: string | null
    collectorId: number | null
    type: string | null
    amount: number | null
  }

  export type PaymentCountAggregateOutputType = {
    paymentId: number
    vendorName: number
    collectorId: number
    type: number
    amount: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    paymentId?: true
    collectorId?: true
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    paymentId?: true
    collectorId?: true
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    paymentId?: true
    vendorName?: true
    collectorId?: true
    type?: true
    amount?: true
  }

  export type PaymentMaxAggregateInputType = {
    paymentId?: true
    vendorName?: true
    collectorId?: true
    type?: true
    amount?: true
  }

  export type PaymentCountAggregateInputType = {
    paymentId?: true
    vendorName?: true
    collectorId?: true
    type?: true
    amount?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    paymentId: number
    vendorName: string
    collectorId: number
    type: string
    amount: number
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    vendorName?: boolean
    collectorId?: boolean
    type?: boolean
    amount?: boolean
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    vendorName?: boolean
    collectorId?: boolean
    type?: boolean
    amount?: boolean
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    paymentId?: boolean
    vendorName?: boolean
    collectorId?: boolean
    type?: boolean
    amount?: boolean
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    paymentId?: boolean
    vendorName?: boolean
    collectorId?: boolean
    type?: boolean
    amount?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"paymentId" | "vendorName" | "collectorId" | "type" | "amount", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collector?: boolean | Payment$collectorArgs<ExtArgs>
    vendor?: boolean | Payment$vendorArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      collector: Prisma.$CollectorsPayload<ExtArgs> | null
      vendor: Prisma.$VendorsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      paymentId: number
      vendorName: string
      collectorId: number
      type: string
      amount: number
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.findMany({ select: { paymentId: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { paymentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `paymentId`
     * const paymentWithPaymentIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { paymentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collector<T extends Payment$collectorArgs<ExtArgs> = {}>(args?: Subset<T, Payment$collectorArgs<ExtArgs>>): Prisma__CollectorsClient<$Result.GetResult<Prisma.$CollectorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    vendor<T extends Payment$vendorArgs<ExtArgs> = {}>(args?: Subset<T, Payment$vendorArgs<ExtArgs>>): Prisma__VendorsClient<$Result.GetResult<Prisma.$VendorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly paymentId: FieldRef<"Payment", 'Int'>
    readonly vendorName: FieldRef<"Payment", 'String'>
    readonly collectorId: FieldRef<"Payment", 'Int'>
    readonly type: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.collector
   */
  export type Payment$collectorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collectors
     */
    select?: CollectorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collectors
     */
    omit?: CollectorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollectorsInclude<ExtArgs> | null
    where?: CollectorsWhereInput
  }

  /**
   * Payment.vendor
   */
  export type Payment$vendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendors
     */
    select?: VendorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendors
     */
    omit?: VendorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorsInclude<ExtArgs> | null
    where?: VendorsWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PowerUsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    role: 'role',
    email: 'email'
  };

  export type PowerUsersScalarFieldEnum = (typeof PowerUsersScalarFieldEnum)[keyof typeof PowerUsersScalarFieldEnum]


  export const ReferralsScalarFieldEnum: {
    referralId: 'referralId',
    name: 'name'
  };

  export type ReferralsScalarFieldEnum = (typeof ReferralsScalarFieldEnum)[keyof typeof ReferralsScalarFieldEnum]


  export const CollectorsScalarFieldEnum: {
    collectorId: 'collectorId',
    name: 'name'
  };

  export type CollectorsScalarFieldEnum = (typeof CollectorsScalarFieldEnum)[keyof typeof CollectorsScalarFieldEnum]


  export const VendorsScalarFieldEnum: {
    vendorName: 'vendorName'
  };

  export type VendorsScalarFieldEnum = (typeof VendorsScalarFieldEnum)[keyof typeof VendorsScalarFieldEnum]


  export const DonationScalarFieldEnum: {
    transacId: 'transacId',
    date: 'date',
    amount: 'amount',
    donorName: 'donorName',
    referralId: 'referralId',
    collectorId: 'collectorId',
    type: 'type',
    status: 'status',
    notes: 'notes',
    paymentMethod: 'paymentMethod'
  };

  export type DonationScalarFieldEnum = (typeof DonationScalarFieldEnum)[keyof typeof DonationScalarFieldEnum]


  export const ExpensesScalarFieldEnum: {
    transacId: 'transacId',
    date: 'date',
    amount: 'amount',
    vendorName: 'vendorName',
    project: 'project',
    description: 'description',
    status: 'status'
  };

  export type ExpensesScalarFieldEnum = (typeof ExpensesScalarFieldEnum)[keyof typeof ExpensesScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    paymentId: 'paymentId',
    vendorName: 'vendorName',
    collectorId: 'collectorId',
    type: 'type',
    amount: 'amount'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PowerUsersWhereInput = {
    AND?: PowerUsersWhereInput | PowerUsersWhereInput[]
    OR?: PowerUsersWhereInput[]
    NOT?: PowerUsersWhereInput | PowerUsersWhereInput[]
    id?: IntFilter<"PowerUsers"> | number
    username?: StringFilter<"PowerUsers"> | string
    role?: StringFilter<"PowerUsers"> | string
    email?: StringFilter<"PowerUsers"> | string
  }

  export type PowerUsersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    role?: SortOrder
    email?: SortOrder
  }

  export type PowerUsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: PowerUsersWhereInput | PowerUsersWhereInput[]
    OR?: PowerUsersWhereInput[]
    NOT?: PowerUsersWhereInput | PowerUsersWhereInput[]
    role?: StringFilter<"PowerUsers"> | string
  }, "id" | "username" | "email">

  export type PowerUsersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    role?: SortOrder
    email?: SortOrder
    _count?: PowerUsersCountOrderByAggregateInput
    _avg?: PowerUsersAvgOrderByAggregateInput
    _max?: PowerUsersMaxOrderByAggregateInput
    _min?: PowerUsersMinOrderByAggregateInput
    _sum?: PowerUsersSumOrderByAggregateInput
  }

  export type PowerUsersScalarWhereWithAggregatesInput = {
    AND?: PowerUsersScalarWhereWithAggregatesInput | PowerUsersScalarWhereWithAggregatesInput[]
    OR?: PowerUsersScalarWhereWithAggregatesInput[]
    NOT?: PowerUsersScalarWhereWithAggregatesInput | PowerUsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PowerUsers"> | number
    username?: StringWithAggregatesFilter<"PowerUsers"> | string
    role?: StringWithAggregatesFilter<"PowerUsers"> | string
    email?: StringWithAggregatesFilter<"PowerUsers"> | string
  }

  export type ReferralsWhereInput = {
    AND?: ReferralsWhereInput | ReferralsWhereInput[]
    OR?: ReferralsWhereInput[]
    NOT?: ReferralsWhereInput | ReferralsWhereInput[]
    referralId?: IntFilter<"Referrals"> | number
    name?: StringFilter<"Referrals"> | string
    donations?: DonationListRelationFilter
  }

  export type ReferralsOrderByWithRelationInput = {
    referralId?: SortOrder
    name?: SortOrder
    donations?: DonationOrderByRelationAggregateInput
  }

  export type ReferralsWhereUniqueInput = Prisma.AtLeast<{
    referralId?: number
    AND?: ReferralsWhereInput | ReferralsWhereInput[]
    OR?: ReferralsWhereInput[]
    NOT?: ReferralsWhereInput | ReferralsWhereInput[]
    name?: StringFilter<"Referrals"> | string
    donations?: DonationListRelationFilter
  }, "referralId">

  export type ReferralsOrderByWithAggregationInput = {
    referralId?: SortOrder
    name?: SortOrder
    _count?: ReferralsCountOrderByAggregateInput
    _avg?: ReferralsAvgOrderByAggregateInput
    _max?: ReferralsMaxOrderByAggregateInput
    _min?: ReferralsMinOrderByAggregateInput
    _sum?: ReferralsSumOrderByAggregateInput
  }

  export type ReferralsScalarWhereWithAggregatesInput = {
    AND?: ReferralsScalarWhereWithAggregatesInput | ReferralsScalarWhereWithAggregatesInput[]
    OR?: ReferralsScalarWhereWithAggregatesInput[]
    NOT?: ReferralsScalarWhereWithAggregatesInput | ReferralsScalarWhereWithAggregatesInput[]
    referralId?: IntWithAggregatesFilter<"Referrals"> | number
    name?: StringWithAggregatesFilter<"Referrals"> | string
  }

  export type CollectorsWhereInput = {
    AND?: CollectorsWhereInput | CollectorsWhereInput[]
    OR?: CollectorsWhereInput[]
    NOT?: CollectorsWhereInput | CollectorsWhereInput[]
    collectorId?: IntFilter<"Collectors"> | number
    name?: StringFilter<"Collectors"> | string
    donations?: DonationListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type CollectorsOrderByWithRelationInput = {
    collectorId?: SortOrder
    name?: SortOrder
    donations?: DonationOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type CollectorsWhereUniqueInput = Prisma.AtLeast<{
    collectorId?: number
    AND?: CollectorsWhereInput | CollectorsWhereInput[]
    OR?: CollectorsWhereInput[]
    NOT?: CollectorsWhereInput | CollectorsWhereInput[]
    name?: StringFilter<"Collectors"> | string
    donations?: DonationListRelationFilter
    payments?: PaymentListRelationFilter
  }, "collectorId">

  export type CollectorsOrderByWithAggregationInput = {
    collectorId?: SortOrder
    name?: SortOrder
    _count?: CollectorsCountOrderByAggregateInput
    _avg?: CollectorsAvgOrderByAggregateInput
    _max?: CollectorsMaxOrderByAggregateInput
    _min?: CollectorsMinOrderByAggregateInput
    _sum?: CollectorsSumOrderByAggregateInput
  }

  export type CollectorsScalarWhereWithAggregatesInput = {
    AND?: CollectorsScalarWhereWithAggregatesInput | CollectorsScalarWhereWithAggregatesInput[]
    OR?: CollectorsScalarWhereWithAggregatesInput[]
    NOT?: CollectorsScalarWhereWithAggregatesInput | CollectorsScalarWhereWithAggregatesInput[]
    collectorId?: IntWithAggregatesFilter<"Collectors"> | number
    name?: StringWithAggregatesFilter<"Collectors"> | string
  }

  export type VendorsWhereInput = {
    AND?: VendorsWhereInput | VendorsWhereInput[]
    OR?: VendorsWhereInput[]
    NOT?: VendorsWhereInput | VendorsWhereInput[]
    vendorName?: StringFilter<"Vendors"> | string
    expenses?: ExpensesListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type VendorsOrderByWithRelationInput = {
    vendorName?: SortOrder
    expenses?: ExpensesOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type VendorsWhereUniqueInput = Prisma.AtLeast<{
    vendorName?: string
    AND?: VendorsWhereInput | VendorsWhereInput[]
    OR?: VendorsWhereInput[]
    NOT?: VendorsWhereInput | VendorsWhereInput[]
    expenses?: ExpensesListRelationFilter
    payments?: PaymentListRelationFilter
  }, "vendorName">

  export type VendorsOrderByWithAggregationInput = {
    vendorName?: SortOrder
    _count?: VendorsCountOrderByAggregateInput
    _max?: VendorsMaxOrderByAggregateInput
    _min?: VendorsMinOrderByAggregateInput
  }

  export type VendorsScalarWhereWithAggregatesInput = {
    AND?: VendorsScalarWhereWithAggregatesInput | VendorsScalarWhereWithAggregatesInput[]
    OR?: VendorsScalarWhereWithAggregatesInput[]
    NOT?: VendorsScalarWhereWithAggregatesInput | VendorsScalarWhereWithAggregatesInput[]
    vendorName?: StringWithAggregatesFilter<"Vendors"> | string
  }

  export type DonationWhereInput = {
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    transacId?: IntFilter<"Donation"> | number
    date?: DateTimeFilter<"Donation"> | Date | string
    amount?: IntFilter<"Donation"> | number
    donorName?: StringFilter<"Donation"> | string
    referralId?: IntFilter<"Donation"> | number
    collectorId?: IntFilter<"Donation"> | number
    type?: StringFilter<"Donation"> | string
    status?: StringFilter<"Donation"> | string
    notes?: StringNullableFilter<"Donation"> | string | null
    paymentMethod?: StringFilter<"Donation"> | string
    collector?: XOR<CollectorsScalarRelationFilter, CollectorsWhereInput>
    referral?: XOR<ReferralsScalarRelationFilter, ReferralsWhereInput>
  }

  export type DonationOrderByWithRelationInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    donorName?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    collector?: CollectorsOrderByWithRelationInput
    referral?: ReferralsOrderByWithRelationInput
  }

  export type DonationWhereUniqueInput = Prisma.AtLeast<{
    transacId?: number
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    date?: DateTimeFilter<"Donation"> | Date | string
    amount?: IntFilter<"Donation"> | number
    donorName?: StringFilter<"Donation"> | string
    referralId?: IntFilter<"Donation"> | number
    collectorId?: IntFilter<"Donation"> | number
    type?: StringFilter<"Donation"> | string
    status?: StringFilter<"Donation"> | string
    notes?: StringNullableFilter<"Donation"> | string | null
    paymentMethod?: StringFilter<"Donation"> | string
    collector?: XOR<CollectorsScalarRelationFilter, CollectorsWhereInput>
    referral?: XOR<ReferralsScalarRelationFilter, ReferralsWhereInput>
  }, "transacId">

  export type DonationOrderByWithAggregationInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    donorName?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    _count?: DonationCountOrderByAggregateInput
    _avg?: DonationAvgOrderByAggregateInput
    _max?: DonationMaxOrderByAggregateInput
    _min?: DonationMinOrderByAggregateInput
    _sum?: DonationSumOrderByAggregateInput
  }

  export type DonationScalarWhereWithAggregatesInput = {
    AND?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    OR?: DonationScalarWhereWithAggregatesInput[]
    NOT?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    transacId?: IntWithAggregatesFilter<"Donation"> | number
    date?: DateTimeWithAggregatesFilter<"Donation"> | Date | string
    amount?: IntWithAggregatesFilter<"Donation"> | number
    donorName?: StringWithAggregatesFilter<"Donation"> | string
    referralId?: IntWithAggregatesFilter<"Donation"> | number
    collectorId?: IntWithAggregatesFilter<"Donation"> | number
    type?: StringWithAggregatesFilter<"Donation"> | string
    status?: StringWithAggregatesFilter<"Donation"> | string
    notes?: StringNullableWithAggregatesFilter<"Donation"> | string | null
    paymentMethod?: StringWithAggregatesFilter<"Donation"> | string
  }

  export type ExpensesWhereInput = {
    AND?: ExpensesWhereInput | ExpensesWhereInput[]
    OR?: ExpensesWhereInput[]
    NOT?: ExpensesWhereInput | ExpensesWhereInput[]
    transacId?: IntFilter<"Expenses"> | number
    date?: DateTimeFilter<"Expenses"> | Date | string
    amount?: IntFilter<"Expenses"> | number
    vendorName?: StringFilter<"Expenses"> | string
    project?: StringFilter<"Expenses"> | string
    description?: StringNullableFilter<"Expenses"> | string | null
    status?: StringFilter<"Expenses"> | string
    vendor?: XOR<VendorsNullableScalarRelationFilter, VendorsWhereInput> | null
  }

  export type ExpensesOrderByWithRelationInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    vendorName?: SortOrder
    project?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    vendor?: VendorsOrderByWithRelationInput
  }

  export type ExpensesWhereUniqueInput = Prisma.AtLeast<{
    transacId?: number
    AND?: ExpensesWhereInput | ExpensesWhereInput[]
    OR?: ExpensesWhereInput[]
    NOT?: ExpensesWhereInput | ExpensesWhereInput[]
    date?: DateTimeFilter<"Expenses"> | Date | string
    amount?: IntFilter<"Expenses"> | number
    vendorName?: StringFilter<"Expenses"> | string
    project?: StringFilter<"Expenses"> | string
    description?: StringNullableFilter<"Expenses"> | string | null
    status?: StringFilter<"Expenses"> | string
    vendor?: XOR<VendorsNullableScalarRelationFilter, VendorsWhereInput> | null
  }, "transacId">

  export type ExpensesOrderByWithAggregationInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    vendorName?: SortOrder
    project?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: ExpensesCountOrderByAggregateInput
    _avg?: ExpensesAvgOrderByAggregateInput
    _max?: ExpensesMaxOrderByAggregateInput
    _min?: ExpensesMinOrderByAggregateInput
    _sum?: ExpensesSumOrderByAggregateInput
  }

  export type ExpensesScalarWhereWithAggregatesInput = {
    AND?: ExpensesScalarWhereWithAggregatesInput | ExpensesScalarWhereWithAggregatesInput[]
    OR?: ExpensesScalarWhereWithAggregatesInput[]
    NOT?: ExpensesScalarWhereWithAggregatesInput | ExpensesScalarWhereWithAggregatesInput[]
    transacId?: IntWithAggregatesFilter<"Expenses"> | number
    date?: DateTimeWithAggregatesFilter<"Expenses"> | Date | string
    amount?: IntWithAggregatesFilter<"Expenses"> | number
    vendorName?: StringWithAggregatesFilter<"Expenses"> | string
    project?: StringWithAggregatesFilter<"Expenses"> | string
    description?: StringNullableWithAggregatesFilter<"Expenses"> | string | null
    status?: StringWithAggregatesFilter<"Expenses"> | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    paymentId?: IntFilter<"Payment"> | number
    vendorName?: StringFilter<"Payment"> | string
    collectorId?: IntFilter<"Payment"> | number
    type?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    collector?: XOR<CollectorsNullableScalarRelationFilter, CollectorsWhereInput> | null
    vendor?: XOR<VendorsNullableScalarRelationFilter, VendorsWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    paymentId?: SortOrder
    vendorName?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    collector?: CollectorsOrderByWithRelationInput
    vendor?: VendorsOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    paymentId?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    vendorName?: StringFilter<"Payment"> | string
    collectorId?: IntFilter<"Payment"> | number
    type?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
    collector?: XOR<CollectorsNullableScalarRelationFilter, CollectorsWhereInput> | null
    vendor?: XOR<VendorsNullableScalarRelationFilter, VendorsWhereInput> | null
  }, "paymentId">

  export type PaymentOrderByWithAggregationInput = {
    paymentId?: SortOrder
    vendorName?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    paymentId?: IntWithAggregatesFilter<"Payment"> | number
    vendorName?: StringWithAggregatesFilter<"Payment"> | string
    collectorId?: IntWithAggregatesFilter<"Payment"> | number
    type?: StringWithAggregatesFilter<"Payment"> | string
    amount?: IntWithAggregatesFilter<"Payment"> | number
  }

  export type PowerUsersCreateInput = {
    username: string
    role: string
    email: string
  }

  export type PowerUsersUncheckedCreateInput = {
    id?: number
    username: string
    role: string
    email: string
  }

  export type PowerUsersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type PowerUsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type PowerUsersCreateManyInput = {
    id?: number
    username: string
    role: string
    email: string
  }

  export type PowerUsersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type PowerUsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type ReferralsCreateInput = {
    name: string
    donations?: DonationCreateNestedManyWithoutReferralInput
  }

  export type ReferralsUncheckedCreateInput = {
    referralId?: number
    name: string
    donations?: DonationUncheckedCreateNestedManyWithoutReferralInput
  }

  export type ReferralsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUpdateManyWithoutReferralNestedInput
  }

  export type ReferralsUncheckedUpdateInput = {
    referralId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutReferralNestedInput
  }

  export type ReferralsCreateManyInput = {
    referralId?: number
    name: string
  }

  export type ReferralsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ReferralsUncheckedUpdateManyInput = {
    referralId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CollectorsCreateInput = {
    name: string
    donations?: DonationCreateNestedManyWithoutCollectorInput
    payments?: PaymentCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsUncheckedCreateInput = {
    collectorId?: number
    name: string
    donations?: DonationUncheckedCreateNestedManyWithoutCollectorInput
    payments?: PaymentUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUpdateManyWithoutCollectorNestedInput
  }

  export type CollectorsUncheckedUpdateInput = {
    collectorId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCollectorNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type CollectorsCreateManyInput = {
    collectorId?: number
    name: string
  }

  export type CollectorsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CollectorsUncheckedUpdateManyInput = {
    collectorId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VendorsCreateInput = {
    vendorName: string
    expenses?: ExpensesCreateNestedManyWithoutVendorInput
    payments?: PaymentCreateNestedManyWithoutVendorInput
  }

  export type VendorsUncheckedCreateInput = {
    vendorName: string
    expenses?: ExpensesUncheckedCreateNestedManyWithoutVendorInput
    payments?: PaymentUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorsUpdateInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    expenses?: ExpensesUpdateManyWithoutVendorNestedInput
    payments?: PaymentUpdateManyWithoutVendorNestedInput
  }

  export type VendorsUncheckedUpdateInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    expenses?: ExpensesUncheckedUpdateManyWithoutVendorNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorsCreateManyInput = {
    vendorName: string
  }

  export type VendorsUpdateManyMutationInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
  }

  export type VendorsUncheckedUpdateManyInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
  }

  export type DonationCreateInput = {
    date: Date | string
    amount: number
    donorName: string
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
    collector: CollectorsCreateNestedOneWithoutDonationsInput
    referral: ReferralsCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    referralId: number
    collectorId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type DonationUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    collector?: CollectorsUpdateOneRequiredWithoutDonationsNestedInput
    referral?: ReferralsUpdateOneRequiredWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    referralId?: IntFieldUpdateOperationsInput | number
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type DonationCreateManyInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    referralId: number
    collectorId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type DonationUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type DonationUncheckedUpdateManyInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    referralId?: IntFieldUpdateOperationsInput | number
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type ExpensesCreateInput = {
    date: Date | string
    amount: number
    project: string
    description?: string | null
    status: string
    vendor?: VendorsCreateNestedOneWithoutExpensesInput
  }

  export type ExpensesUncheckedCreateInput = {
    transacId?: number
    date: Date | string
    amount: number
    vendorName: string
    project: string
    description?: string | null
    status: string
  }

  export type ExpensesUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    vendor?: VendorsUpdateOneWithoutExpensesNestedInput
  }

  export type ExpensesUncheckedUpdateInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ExpensesCreateManyInput = {
    transacId?: number
    date: Date | string
    amount: number
    vendorName: string
    project: string
    description?: string | null
    status: string
  }

  export type ExpensesUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ExpensesUncheckedUpdateManyInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateInput = {
    type: string
    amount: number
    collector?: CollectorsCreateNestedOneWithoutPaymentsInput
    vendor?: VendorsCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    paymentId?: number
    vendorName: string
    collectorId: number
    type: string
    amount: number
  }

  export type PaymentUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    collector?: CollectorsUpdateOneWithoutPaymentsNestedInput
    vendor?: VendorsUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyInput = {
    paymentId?: number
    vendorName: string
    collectorId: number
    type: string
    amount: number
  }

  export type PaymentUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentUncheckedUpdateManyInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type PowerUsersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    role?: SortOrder
    email?: SortOrder
  }

  export type PowerUsersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PowerUsersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    role?: SortOrder
    email?: SortOrder
  }

  export type PowerUsersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    role?: SortOrder
    email?: SortOrder
  }

  export type PowerUsersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DonationListRelationFilter = {
    every?: DonationWhereInput
    some?: DonationWhereInput
    none?: DonationWhereInput
  }

  export type DonationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReferralsCountOrderByAggregateInput = {
    referralId?: SortOrder
    name?: SortOrder
  }

  export type ReferralsAvgOrderByAggregateInput = {
    referralId?: SortOrder
  }

  export type ReferralsMaxOrderByAggregateInput = {
    referralId?: SortOrder
    name?: SortOrder
  }

  export type ReferralsMinOrderByAggregateInput = {
    referralId?: SortOrder
    name?: SortOrder
  }

  export type ReferralsSumOrderByAggregateInput = {
    referralId?: SortOrder
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CollectorsCountOrderByAggregateInput = {
    collectorId?: SortOrder
    name?: SortOrder
  }

  export type CollectorsAvgOrderByAggregateInput = {
    collectorId?: SortOrder
  }

  export type CollectorsMaxOrderByAggregateInput = {
    collectorId?: SortOrder
    name?: SortOrder
  }

  export type CollectorsMinOrderByAggregateInput = {
    collectorId?: SortOrder
    name?: SortOrder
  }

  export type CollectorsSumOrderByAggregateInput = {
    collectorId?: SortOrder
  }

  export type ExpensesListRelationFilter = {
    every?: ExpensesWhereInput
    some?: ExpensesWhereInput
    none?: ExpensesWhereInput
  }

  export type ExpensesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendorsCountOrderByAggregateInput = {
    vendorName?: SortOrder
  }

  export type VendorsMaxOrderByAggregateInput = {
    vendorName?: SortOrder
  }

  export type VendorsMinOrderByAggregateInput = {
    vendorName?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CollectorsScalarRelationFilter = {
    is?: CollectorsWhereInput
    isNot?: CollectorsWhereInput
  }

  export type ReferralsScalarRelationFilter = {
    is?: ReferralsWhereInput
    isNot?: ReferralsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DonationCountOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    donorName?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
  }

  export type DonationAvgOrderByAggregateInput = {
    transacId?: SortOrder
    amount?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
  }

  export type DonationMaxOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    donorName?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
  }

  export type DonationMinOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    donorName?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    paymentMethod?: SortOrder
  }

  export type DonationSumOrderByAggregateInput = {
    transacId?: SortOrder
    amount?: SortOrder
    referralId?: SortOrder
    collectorId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type VendorsNullableScalarRelationFilter = {
    is?: VendorsWhereInput | null
    isNot?: VendorsWhereInput | null
  }

  export type ExpensesCountOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    vendorName?: SortOrder
    project?: SortOrder
    description?: SortOrder
    status?: SortOrder
  }

  export type ExpensesAvgOrderByAggregateInput = {
    transacId?: SortOrder
    amount?: SortOrder
  }

  export type ExpensesMaxOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    vendorName?: SortOrder
    project?: SortOrder
    description?: SortOrder
    status?: SortOrder
  }

  export type ExpensesMinOrderByAggregateInput = {
    transacId?: SortOrder
    date?: SortOrder
    amount?: SortOrder
    vendorName?: SortOrder
    project?: SortOrder
    description?: SortOrder
    status?: SortOrder
  }

  export type ExpensesSumOrderByAggregateInput = {
    transacId?: SortOrder
    amount?: SortOrder
  }

  export type CollectorsNullableScalarRelationFilter = {
    is?: CollectorsWhereInput | null
    isNot?: CollectorsWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    paymentId?: SortOrder
    vendorName?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    paymentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    paymentId?: SortOrder
    vendorName?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    paymentId?: SortOrder
    vendorName?: SortOrder
    collectorId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    paymentId?: SortOrder
    collectorId?: SortOrder
    amount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DonationCreateNestedManyWithoutReferralInput = {
    create?: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput> | DonationCreateWithoutReferralInput[] | DonationUncheckedCreateWithoutReferralInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutReferralInput | DonationCreateOrConnectWithoutReferralInput[]
    createMany?: DonationCreateManyReferralInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutReferralInput = {
    create?: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput> | DonationCreateWithoutReferralInput[] | DonationUncheckedCreateWithoutReferralInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutReferralInput | DonationCreateOrConnectWithoutReferralInput[]
    createMany?: DonationCreateManyReferralInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DonationUpdateManyWithoutReferralNestedInput = {
    create?: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput> | DonationCreateWithoutReferralInput[] | DonationUncheckedCreateWithoutReferralInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutReferralInput | DonationCreateOrConnectWithoutReferralInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutReferralInput | DonationUpsertWithWhereUniqueWithoutReferralInput[]
    createMany?: DonationCreateManyReferralInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutReferralInput | DonationUpdateWithWhereUniqueWithoutReferralInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutReferralInput | DonationUpdateManyWithWhereWithoutReferralInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutReferralNestedInput = {
    create?: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput> | DonationCreateWithoutReferralInput[] | DonationUncheckedCreateWithoutReferralInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutReferralInput | DonationCreateOrConnectWithoutReferralInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutReferralInput | DonationUpsertWithWhereUniqueWithoutReferralInput[]
    createMany?: DonationCreateManyReferralInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutReferralInput | DonationUpdateWithWhereUniqueWithoutReferralInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutReferralInput | DonationUpdateManyWithWhereWithoutReferralInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DonationCreateNestedManyWithoutCollectorInput = {
    create?: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput> | DonationCreateWithoutCollectorInput[] | DonationUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCollectorInput | DonationCreateOrConnectWithoutCollectorInput[]
    createMany?: DonationCreateManyCollectorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutCollectorInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutCollectorInput = {
    create?: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput> | DonationCreateWithoutCollectorInput[] | DonationUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCollectorInput | DonationCreateOrConnectWithoutCollectorInput[]
    createMany?: DonationCreateManyCollectorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutCollectorInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type DonationUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput> | DonationCreateWithoutCollectorInput[] | DonationUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCollectorInput | DonationCreateOrConnectWithoutCollectorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCollectorInput | DonationUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: DonationCreateManyCollectorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCollectorInput | DonationUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCollectorInput | DonationUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCollectorInput | PaymentUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCollectorInput | PaymentUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCollectorInput | PaymentUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput> | DonationCreateWithoutCollectorInput[] | DonationUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCollectorInput | DonationCreateOrConnectWithoutCollectorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCollectorInput | DonationUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: DonationCreateManyCollectorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCollectorInput | DonationUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCollectorInput | DonationUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutCollectorNestedInput = {
    create?: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput> | PaymentCreateWithoutCollectorInput[] | PaymentUncheckedCreateWithoutCollectorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutCollectorInput | PaymentCreateOrConnectWithoutCollectorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutCollectorInput | PaymentUpsertWithWhereUniqueWithoutCollectorInput[]
    createMany?: PaymentCreateManyCollectorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutCollectorInput | PaymentUpdateWithWhereUniqueWithoutCollectorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutCollectorInput | PaymentUpdateManyWithWhereWithoutCollectorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ExpensesCreateNestedManyWithoutVendorInput = {
    create?: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput> | ExpensesCreateWithoutVendorInput[] | ExpensesUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ExpensesCreateOrConnectWithoutVendorInput | ExpensesCreateOrConnectWithoutVendorInput[]
    createMany?: ExpensesCreateManyVendorInputEnvelope
    connect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutVendorInput = {
    create?: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput> | PaymentCreateWithoutVendorInput[] | PaymentUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutVendorInput | PaymentCreateOrConnectWithoutVendorInput[]
    createMany?: PaymentCreateManyVendorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type ExpensesUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput> | ExpensesCreateWithoutVendorInput[] | ExpensesUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ExpensesCreateOrConnectWithoutVendorInput | ExpensesCreateOrConnectWithoutVendorInput[]
    createMany?: ExpensesCreateManyVendorInputEnvelope
    connect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput> | PaymentCreateWithoutVendorInput[] | PaymentUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutVendorInput | PaymentCreateOrConnectWithoutVendorInput[]
    createMany?: PaymentCreateManyVendorInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type ExpensesUpdateManyWithoutVendorNestedInput = {
    create?: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput> | ExpensesCreateWithoutVendorInput[] | ExpensesUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ExpensesCreateOrConnectWithoutVendorInput | ExpensesCreateOrConnectWithoutVendorInput[]
    upsert?: ExpensesUpsertWithWhereUniqueWithoutVendorInput | ExpensesUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: ExpensesCreateManyVendorInputEnvelope
    set?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    disconnect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    delete?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    connect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    update?: ExpensesUpdateWithWhereUniqueWithoutVendorInput | ExpensesUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: ExpensesUpdateManyWithWhereWithoutVendorInput | ExpensesUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: ExpensesScalarWhereInput | ExpensesScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutVendorNestedInput = {
    create?: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput> | PaymentCreateWithoutVendorInput[] | PaymentUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutVendorInput | PaymentCreateOrConnectWithoutVendorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutVendorInput | PaymentUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: PaymentCreateManyVendorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutVendorInput | PaymentUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutVendorInput | PaymentUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ExpensesUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput> | ExpensesCreateWithoutVendorInput[] | ExpensesUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ExpensesCreateOrConnectWithoutVendorInput | ExpensesCreateOrConnectWithoutVendorInput[]
    upsert?: ExpensesUpsertWithWhereUniqueWithoutVendorInput | ExpensesUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: ExpensesCreateManyVendorInputEnvelope
    set?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    disconnect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    delete?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    connect?: ExpensesWhereUniqueInput | ExpensesWhereUniqueInput[]
    update?: ExpensesUpdateWithWhereUniqueWithoutVendorInput | ExpensesUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: ExpensesUpdateManyWithWhereWithoutVendorInput | ExpensesUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: ExpensesScalarWhereInput | ExpensesScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput> | PaymentCreateWithoutVendorInput[] | PaymentUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutVendorInput | PaymentCreateOrConnectWithoutVendorInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutVendorInput | PaymentUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: PaymentCreateManyVendorInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutVendorInput | PaymentUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutVendorInput | PaymentUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CollectorsCreateNestedOneWithoutDonationsInput = {
    create?: XOR<CollectorsCreateWithoutDonationsInput, CollectorsUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CollectorsCreateOrConnectWithoutDonationsInput
    connect?: CollectorsWhereUniqueInput
  }

  export type ReferralsCreateNestedOneWithoutDonationsInput = {
    create?: XOR<ReferralsCreateWithoutDonationsInput, ReferralsUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: ReferralsCreateOrConnectWithoutDonationsInput
    connect?: ReferralsWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CollectorsUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: XOR<CollectorsCreateWithoutDonationsInput, CollectorsUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: CollectorsCreateOrConnectWithoutDonationsInput
    upsert?: CollectorsUpsertWithoutDonationsInput
    connect?: CollectorsWhereUniqueInput
    update?: XOR<XOR<CollectorsUpdateToOneWithWhereWithoutDonationsInput, CollectorsUpdateWithoutDonationsInput>, CollectorsUncheckedUpdateWithoutDonationsInput>
  }

  export type ReferralsUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: XOR<ReferralsCreateWithoutDonationsInput, ReferralsUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: ReferralsCreateOrConnectWithoutDonationsInput
    upsert?: ReferralsUpsertWithoutDonationsInput
    connect?: ReferralsWhereUniqueInput
    update?: XOR<XOR<ReferralsUpdateToOneWithWhereWithoutDonationsInput, ReferralsUpdateWithoutDonationsInput>, ReferralsUncheckedUpdateWithoutDonationsInput>
  }

  export type VendorsCreateNestedOneWithoutExpensesInput = {
    create?: XOR<VendorsCreateWithoutExpensesInput, VendorsUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: VendorsCreateOrConnectWithoutExpensesInput
    connect?: VendorsWhereUniqueInput
  }

  export type VendorsUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<VendorsCreateWithoutExpensesInput, VendorsUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: VendorsCreateOrConnectWithoutExpensesInput
    upsert?: VendorsUpsertWithoutExpensesInput
    disconnect?: VendorsWhereInput | boolean
    delete?: VendorsWhereInput | boolean
    connect?: VendorsWhereUniqueInput
    update?: XOR<XOR<VendorsUpdateToOneWithWhereWithoutExpensesInput, VendorsUpdateWithoutExpensesInput>, VendorsUncheckedUpdateWithoutExpensesInput>
  }

  export type CollectorsCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<CollectorsCreateWithoutPaymentsInput, CollectorsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CollectorsCreateOrConnectWithoutPaymentsInput
    connect?: CollectorsWhereUniqueInput
  }

  export type VendorsCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<VendorsCreateWithoutPaymentsInput, VendorsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: VendorsCreateOrConnectWithoutPaymentsInput
    connect?: VendorsWhereUniqueInput
  }

  export type CollectorsUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<CollectorsCreateWithoutPaymentsInput, CollectorsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: CollectorsCreateOrConnectWithoutPaymentsInput
    upsert?: CollectorsUpsertWithoutPaymentsInput
    disconnect?: CollectorsWhereInput | boolean
    delete?: CollectorsWhereInput | boolean
    connect?: CollectorsWhereUniqueInput
    update?: XOR<XOR<CollectorsUpdateToOneWithWhereWithoutPaymentsInput, CollectorsUpdateWithoutPaymentsInput>, CollectorsUncheckedUpdateWithoutPaymentsInput>
  }

  export type VendorsUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<VendorsCreateWithoutPaymentsInput, VendorsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: VendorsCreateOrConnectWithoutPaymentsInput
    upsert?: VendorsUpsertWithoutPaymentsInput
    disconnect?: VendorsWhereInput | boolean
    delete?: VendorsWhereInput | boolean
    connect?: VendorsWhereUniqueInput
    update?: XOR<XOR<VendorsUpdateToOneWithWhereWithoutPaymentsInput, VendorsUpdateWithoutPaymentsInput>, VendorsUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DonationCreateWithoutReferralInput = {
    date: Date | string
    amount: number
    donorName: string
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
    collector: CollectorsCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateWithoutReferralInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    collectorId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type DonationCreateOrConnectWithoutReferralInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput>
  }

  export type DonationCreateManyReferralInputEnvelope = {
    data: DonationCreateManyReferralInput | DonationCreateManyReferralInput[]
    skipDuplicates?: boolean
  }

  export type DonationUpsertWithWhereUniqueWithoutReferralInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutReferralInput, DonationUncheckedUpdateWithoutReferralInput>
    create: XOR<DonationCreateWithoutReferralInput, DonationUncheckedCreateWithoutReferralInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutReferralInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutReferralInput, DonationUncheckedUpdateWithoutReferralInput>
  }

  export type DonationUpdateManyWithWhereWithoutReferralInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutReferralInput>
  }

  export type DonationScalarWhereInput = {
    AND?: DonationScalarWhereInput | DonationScalarWhereInput[]
    OR?: DonationScalarWhereInput[]
    NOT?: DonationScalarWhereInput | DonationScalarWhereInput[]
    transacId?: IntFilter<"Donation"> | number
    date?: DateTimeFilter<"Donation"> | Date | string
    amount?: IntFilter<"Donation"> | number
    donorName?: StringFilter<"Donation"> | string
    referralId?: IntFilter<"Donation"> | number
    collectorId?: IntFilter<"Donation"> | number
    type?: StringFilter<"Donation"> | string
    status?: StringFilter<"Donation"> | string
    notes?: StringNullableFilter<"Donation"> | string | null
    paymentMethod?: StringFilter<"Donation"> | string
  }

  export type DonationCreateWithoutCollectorInput = {
    date: Date | string
    amount: number
    donorName: string
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
    referral: ReferralsCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateWithoutCollectorInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    referralId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type DonationCreateOrConnectWithoutCollectorInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput>
  }

  export type DonationCreateManyCollectorInputEnvelope = {
    data: DonationCreateManyCollectorInput | DonationCreateManyCollectorInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutCollectorInput = {
    type: string
    amount: number
    vendor?: VendorsCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutCollectorInput = {
    paymentId?: number
    vendorName: string
    type: string
    amount: number
  }

  export type PaymentCreateOrConnectWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput>
  }

  export type PaymentCreateManyCollectorInputEnvelope = {
    data: PaymentCreateManyCollectorInput | PaymentCreateManyCollectorInput[]
    skipDuplicates?: boolean
  }

  export type DonationUpsertWithWhereUniqueWithoutCollectorInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutCollectorInput, DonationUncheckedUpdateWithoutCollectorInput>
    create: XOR<DonationCreateWithoutCollectorInput, DonationUncheckedCreateWithoutCollectorInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutCollectorInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutCollectorInput, DonationUncheckedUpdateWithoutCollectorInput>
  }

  export type DonationUpdateManyWithWhereWithoutCollectorInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutCollectorInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutCollectorInput, PaymentUncheckedUpdateWithoutCollectorInput>
    create: XOR<PaymentCreateWithoutCollectorInput, PaymentUncheckedCreateWithoutCollectorInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutCollectorInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutCollectorInput, PaymentUncheckedUpdateWithoutCollectorInput>
  }

  export type PaymentUpdateManyWithWhereWithoutCollectorInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutCollectorInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    paymentId?: IntFilter<"Payment"> | number
    vendorName?: StringFilter<"Payment"> | string
    collectorId?: IntFilter<"Payment"> | number
    type?: StringFilter<"Payment"> | string
    amount?: IntFilter<"Payment"> | number
  }

  export type ExpensesCreateWithoutVendorInput = {
    date: Date | string
    amount: number
    project: string
    description?: string | null
    status: string
  }

  export type ExpensesUncheckedCreateWithoutVendorInput = {
    transacId?: number
    date: Date | string
    amount: number
    project: string
    description?: string | null
    status: string
  }

  export type ExpensesCreateOrConnectWithoutVendorInput = {
    where: ExpensesWhereUniqueInput
    create: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput>
  }

  export type ExpensesCreateManyVendorInputEnvelope = {
    data: ExpensesCreateManyVendorInput | ExpensesCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutVendorInput = {
    type: string
    amount: number
    collector?: CollectorsCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutVendorInput = {
    paymentId?: number
    collectorId: number
    type: string
    amount: number
  }

  export type PaymentCreateOrConnectWithoutVendorInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput>
  }

  export type PaymentCreateManyVendorInputEnvelope = {
    data: PaymentCreateManyVendorInput | PaymentCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type ExpensesUpsertWithWhereUniqueWithoutVendorInput = {
    where: ExpensesWhereUniqueInput
    update: XOR<ExpensesUpdateWithoutVendorInput, ExpensesUncheckedUpdateWithoutVendorInput>
    create: XOR<ExpensesCreateWithoutVendorInput, ExpensesUncheckedCreateWithoutVendorInput>
  }

  export type ExpensesUpdateWithWhereUniqueWithoutVendorInput = {
    where: ExpensesWhereUniqueInput
    data: XOR<ExpensesUpdateWithoutVendorInput, ExpensesUncheckedUpdateWithoutVendorInput>
  }

  export type ExpensesUpdateManyWithWhereWithoutVendorInput = {
    where: ExpensesScalarWhereInput
    data: XOR<ExpensesUpdateManyMutationInput, ExpensesUncheckedUpdateManyWithoutVendorInput>
  }

  export type ExpensesScalarWhereInput = {
    AND?: ExpensesScalarWhereInput | ExpensesScalarWhereInput[]
    OR?: ExpensesScalarWhereInput[]
    NOT?: ExpensesScalarWhereInput | ExpensesScalarWhereInput[]
    transacId?: IntFilter<"Expenses"> | number
    date?: DateTimeFilter<"Expenses"> | Date | string
    amount?: IntFilter<"Expenses"> | number
    vendorName?: StringFilter<"Expenses"> | string
    project?: StringFilter<"Expenses"> | string
    description?: StringNullableFilter<"Expenses"> | string | null
    status?: StringFilter<"Expenses"> | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutVendorInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutVendorInput, PaymentUncheckedUpdateWithoutVendorInput>
    create: XOR<PaymentCreateWithoutVendorInput, PaymentUncheckedCreateWithoutVendorInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutVendorInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutVendorInput, PaymentUncheckedUpdateWithoutVendorInput>
  }

  export type PaymentUpdateManyWithWhereWithoutVendorInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutVendorInput>
  }

  export type CollectorsCreateWithoutDonationsInput = {
    name: string
    payments?: PaymentCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsUncheckedCreateWithoutDonationsInput = {
    collectorId?: number
    name: string
    payments?: PaymentUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsCreateOrConnectWithoutDonationsInput = {
    where: CollectorsWhereUniqueInput
    create: XOR<CollectorsCreateWithoutDonationsInput, CollectorsUncheckedCreateWithoutDonationsInput>
  }

  export type ReferralsCreateWithoutDonationsInput = {
    name: string
  }

  export type ReferralsUncheckedCreateWithoutDonationsInput = {
    referralId?: number
    name: string
  }

  export type ReferralsCreateOrConnectWithoutDonationsInput = {
    where: ReferralsWhereUniqueInput
    create: XOR<ReferralsCreateWithoutDonationsInput, ReferralsUncheckedCreateWithoutDonationsInput>
  }

  export type CollectorsUpsertWithoutDonationsInput = {
    update: XOR<CollectorsUpdateWithoutDonationsInput, CollectorsUncheckedUpdateWithoutDonationsInput>
    create: XOR<CollectorsCreateWithoutDonationsInput, CollectorsUncheckedCreateWithoutDonationsInput>
    where?: CollectorsWhereInput
  }

  export type CollectorsUpdateToOneWithWhereWithoutDonationsInput = {
    where?: CollectorsWhereInput
    data: XOR<CollectorsUpdateWithoutDonationsInput, CollectorsUncheckedUpdateWithoutDonationsInput>
  }

  export type CollectorsUpdateWithoutDonationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUpdateManyWithoutCollectorNestedInput
  }

  export type CollectorsUncheckedUpdateWithoutDonationsInput = {
    collectorId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type ReferralsUpsertWithoutDonationsInput = {
    update: XOR<ReferralsUpdateWithoutDonationsInput, ReferralsUncheckedUpdateWithoutDonationsInput>
    create: XOR<ReferralsCreateWithoutDonationsInput, ReferralsUncheckedCreateWithoutDonationsInput>
    where?: ReferralsWhereInput
  }

  export type ReferralsUpdateToOneWithWhereWithoutDonationsInput = {
    where?: ReferralsWhereInput
    data: XOR<ReferralsUpdateWithoutDonationsInput, ReferralsUncheckedUpdateWithoutDonationsInput>
  }

  export type ReferralsUpdateWithoutDonationsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ReferralsUncheckedUpdateWithoutDonationsInput = {
    referralId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type VendorsCreateWithoutExpensesInput = {
    vendorName: string
    payments?: PaymentCreateNestedManyWithoutVendorInput
  }

  export type VendorsUncheckedCreateWithoutExpensesInput = {
    vendorName: string
    payments?: PaymentUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorsCreateOrConnectWithoutExpensesInput = {
    where: VendorsWhereUniqueInput
    create: XOR<VendorsCreateWithoutExpensesInput, VendorsUncheckedCreateWithoutExpensesInput>
  }

  export type VendorsUpsertWithoutExpensesInput = {
    update: XOR<VendorsUpdateWithoutExpensesInput, VendorsUncheckedUpdateWithoutExpensesInput>
    create: XOR<VendorsCreateWithoutExpensesInput, VendorsUncheckedCreateWithoutExpensesInput>
    where?: VendorsWhereInput
  }

  export type VendorsUpdateToOneWithWhereWithoutExpensesInput = {
    where?: VendorsWhereInput
    data: XOR<VendorsUpdateWithoutExpensesInput, VendorsUncheckedUpdateWithoutExpensesInput>
  }

  export type VendorsUpdateWithoutExpensesInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUpdateManyWithoutVendorNestedInput
  }

  export type VendorsUncheckedUpdateWithoutExpensesInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type CollectorsCreateWithoutPaymentsInput = {
    name: string
    donations?: DonationCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsUncheckedCreateWithoutPaymentsInput = {
    collectorId?: number
    name: string
    donations?: DonationUncheckedCreateNestedManyWithoutCollectorInput
  }

  export type CollectorsCreateOrConnectWithoutPaymentsInput = {
    where: CollectorsWhereUniqueInput
    create: XOR<CollectorsCreateWithoutPaymentsInput, CollectorsUncheckedCreateWithoutPaymentsInput>
  }

  export type VendorsCreateWithoutPaymentsInput = {
    vendorName: string
    expenses?: ExpensesCreateNestedManyWithoutVendorInput
  }

  export type VendorsUncheckedCreateWithoutPaymentsInput = {
    vendorName: string
    expenses?: ExpensesUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorsCreateOrConnectWithoutPaymentsInput = {
    where: VendorsWhereUniqueInput
    create: XOR<VendorsCreateWithoutPaymentsInput, VendorsUncheckedCreateWithoutPaymentsInput>
  }

  export type CollectorsUpsertWithoutPaymentsInput = {
    update: XOR<CollectorsUpdateWithoutPaymentsInput, CollectorsUncheckedUpdateWithoutPaymentsInput>
    create: XOR<CollectorsCreateWithoutPaymentsInput, CollectorsUncheckedCreateWithoutPaymentsInput>
    where?: CollectorsWhereInput
  }

  export type CollectorsUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: CollectorsWhereInput
    data: XOR<CollectorsUpdateWithoutPaymentsInput, CollectorsUncheckedUpdateWithoutPaymentsInput>
  }

  export type CollectorsUpdateWithoutPaymentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUpdateManyWithoutCollectorNestedInput
  }

  export type CollectorsUncheckedUpdateWithoutPaymentsInput = {
    collectorId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    donations?: DonationUncheckedUpdateManyWithoutCollectorNestedInput
  }

  export type VendorsUpsertWithoutPaymentsInput = {
    update: XOR<VendorsUpdateWithoutPaymentsInput, VendorsUncheckedUpdateWithoutPaymentsInput>
    create: XOR<VendorsCreateWithoutPaymentsInput, VendorsUncheckedCreateWithoutPaymentsInput>
    where?: VendorsWhereInput
  }

  export type VendorsUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: VendorsWhereInput
    data: XOR<VendorsUpdateWithoutPaymentsInput, VendorsUncheckedUpdateWithoutPaymentsInput>
  }

  export type VendorsUpdateWithoutPaymentsInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    expenses?: ExpensesUpdateManyWithoutVendorNestedInput
  }

  export type VendorsUncheckedUpdateWithoutPaymentsInput = {
    vendorName?: StringFieldUpdateOperationsInput | string
    expenses?: ExpensesUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type DonationCreateManyReferralInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    collectorId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type DonationUpdateWithoutReferralInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    collector?: CollectorsUpdateOneRequiredWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutReferralInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type DonationUncheckedUpdateManyWithoutReferralInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type DonationCreateManyCollectorInput = {
    transacId?: number
    date: Date | string
    amount: number
    donorName: string
    referralId: number
    type: string
    status: string
    notes?: string | null
    paymentMethod: string
  }

  export type PaymentCreateManyCollectorInput = {
    paymentId?: number
    vendorName: string
    type: string
    amount: number
  }

  export type DonationUpdateWithoutCollectorInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    referral?: ReferralsUpdateOneRequiredWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutCollectorInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    referralId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type DonationUncheckedUpdateManyWithoutCollectorInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    donorName?: StringFieldUpdateOperationsInput | string
    referralId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUpdateWithoutCollectorInput = {
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    vendor?: VendorsUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutCollectorInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentUncheckedUpdateManyWithoutCollectorInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    vendorName?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ExpensesCreateManyVendorInput = {
    transacId?: number
    date: Date | string
    amount: number
    project: string
    description?: string | null
    status: string
  }

  export type PaymentCreateManyVendorInput = {
    paymentId?: number
    collectorId: number
    type: string
    amount: number
  }

  export type ExpensesUpdateWithoutVendorInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ExpensesUncheckedUpdateWithoutVendorInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ExpensesUncheckedUpdateManyWithoutVendorInput = {
    transacId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    project?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUpdateWithoutVendorInput = {
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    collector?: CollectorsUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutVendorInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentUncheckedUpdateManyWithoutVendorInput = {
    paymentId?: IntFieldUpdateOperationsInput | number
    collectorId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}