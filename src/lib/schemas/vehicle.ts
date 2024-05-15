import { RefinementCtx, z } from "zod";
import { VehicleGradeResponseBody, VehicleResponseBody } from "../../types.js";

/**
 * @category Schemas
 */
export namespace VehicleSchema {
  /**
   * The list of values associated with Language can be retreived
   * by posting to the {@link https://orchestrator.configurator.toyota.com/graphql} endpoint
   * with the following GraphQL query:
   *
   * ```gql
   * {
   *  __type(name: "Language") {
   *    name
   *    enumValues {
   *      name
   *    }
   *  }
   * }
   * ```
   *
   
   *
   * @category Includes
   */
  export const Language = z.enum(["EN", "ES"]);

  /**
   * Can either be a zipCode or a region name.
   *
   * The list of values associated with RegionName can be retreived
   * by posting to the {@link https://orchestrator.configurator.toyota.com/graphql} endpoint
   * with the following GraphQL query:
   *
   * ```gql
   * {
   *  __type(name: "RegionName") {
   *    name
   *    enumValues {
   *      name
   *    }
   *  }
   * }
   * ```
   *
   
   *
   * @category Includes
   */
  export const Region = z
    .string()
    .length(5)
    .or(
      z.enum([
        "NATIONAL",
        "SET",
        "GST",
        "PORTLAND",
        "HAWAII",
        "VI",
        "LA",
        "NY",
        "WEST",
        "CENTRAL",
        "EAST",
        "SOUTH",
      ])
    );

  /**
   * The list of values associated with WheelType can be retreived
   * by posting to the {@link https://orchestrator.configurator.toyota.com/graphql} endpoint
   * with the following GraphQL query:
   *
   * ```gql
   * {
   *  __type(name: "WheelType") {
   *    name
   *    enumValues {
   *      name
   *    }
   *  }
   * }
   * ```
   *
   * @see {@link WheelSchema}
   * @see {@link GradeResponseBodySchema}
   *
   * @category Includes
   */
  export const WheelType = z.enum(["STANDARD", "OPTION", "PACKAGE"]);

  /**
   * @category Includes
   */
  export const CategorySchema = z
    .object({ id: z.string(), value: z.string() })
    .nullish();

  /**
   * @category Includes
   */
  export const MsrpSchema = z.object({
    disclaimer: z.string().nullish(),
    value: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const ColorSchema = z
    .object({
      code: z.string().nullish(),
      colorFamilies: z
        .array(
          z.object({
            hexCode: z.array(z.string()).nullish(),
            name: z.string().nullish(),
          })
        )
        .nullish(),
      hexCode: z.array(z.string()).nullish(),
      id: z.string().nullish(),
      images: z
        .array(
          z.object({
            alias: z.array(z.string()).nullish(),
            disclaimer: z.string().nullish(),
            isHero: z.string().nullish(),
            url: z.string().nullish(),
          })
        )
        .nullish(),
      isExtraCostColor: z.boolean().nullish(),
      msrp: MsrpSchema.nullish(),
      title: z.string().nullish(),
    })
    .nullish();

  /**
   * @category Includes
   */
  export const MilageSchema = z.object({
    category: z.string().nullish(),
    city: z.number().nullish(),
    combined: z.number().nullish(),
    highway: z.number().nullish(),
    isAvailable: z.boolean().nullish(),
    mpge: z.number().nullish(),
    range: z.number().nullish(),
  });

  /**
   * @category Includes
   */
  export const CompatibilityWithCurrentConfigSchema = z.object({
    availableWithTrims: z.array(z.string()).nullish(),
    isCompatible: z.boolean().nullish(),
    requiredItems: z
      .array(
        z.object({
          itemCode: z.string().nullish(),
          itemType: z.string().nullish(),
        })
      )
      .nullish(),
  });

  /**
   * @category Includes
   */
  export const ItemDescriptorSchema = z.object({
    compatibilityWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
    description: z.string().nullish(),
    disclaimer: z.string().nullish(),
    icon: z.string().nullish(),
    value: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const CabBedSchema = z.object({
    bedDepth: z.string().nullish(),
    bedLength: z.string().nullish(),
    bedWidth: z.string().nullish(),
    betweenWheelWell: z.string().nullish(),
    cabDetails: z.string().nullish(),
    code: z.string().nullish(),
    compatibilityWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
    description: z.string().nullish(),
    id: z.string().nullish(),
    label: z.string().nullish(),
    overallHeight: z.string().nullish(),
    overallLength: z.string().nullish(),
    overallWidth: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const PackageIdSchema = z.object({
    id: z.string().nullish(),
    msrp: MsrpSchema.nullish(),
  });

  /**
   * @category Includes
   */
  export const ImageSchema = z.object({
    alias: z.array(z.string()).nullish(),
    disclaimer: z.string().nullish(),
    isHero: z.boolean().nullish(),
    url: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const AccessorySchema = z.object({
    code: z.string().nullish(),
    compatibilityWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
    description: z.string().nullish(),
    disclaimer: z.string().nullish(),
    id: z.string().nullish(),
    images: ImageSchema.array().nullish(),
    includedAccessoryIds: z.array(z.string()).nullish(),
    installPoint: z.string().nullish(),
    title: z.string().nullish(),
    type: z.string().nullish(),
    warranty: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const TrimSchema = z.object({
    accessoryIds: AccessorySchema.array().nullish(),
    cabBed: CabBedSchema.nullish(),
    code: z.string().nullish(),
    compatibilityWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
    defaultColorId: z.string().nullish(),
    description: z.string().nullish(),
    drive: ItemDescriptorSchema.nullish(),
    engine: ItemDescriptorSchema.nullish(),
    exteriorColorIds: z.array(z.string()).nullish(),
    fuelType: z.string().nullish(),
    horsepower: ItemDescriptorSchema.nullish(),
    images: ImageSchema.array().nullish(),
    interiorColorIds: z.array(z.string()).nullish(),
    isDefaultTrim: z.boolean().nullish(),
    mileage: MilageSchema.nullish(),
    msrp: MsrpSchema.nullish(),
    packageIds: PackageIdSchema.array().nullish(),
    powertrain: z
      .object({
        compatibilityWithCurrentConfig:
          CompatibilityWithCurrentConfigSchema.nullish(),
        drive: ItemDescriptorSchema.nullish(),
        engine: ItemDescriptorSchema.nullish(),
        horsepower: ItemDescriptorSchema.nullish(),
        transmission: ItemDescriptorSchema.nullish(),
      })
      .nullish(),
    seating: ItemDescriptorSchema.nullish(),
    shortDescription: z.string().nullish(),
    title: z.string().nullish(),
    transmission: ItemDescriptorSchema.nullish(),
    warrantyIds: z.array(z.string()).nullish(),
    wheelCodes: z.array(z.string()).nullish(),
  });

  /**
   * @category Includes
   */
  export const GradeSchema = z.object({
    asPriceShown: z
      .object({
        disclaimer: z.string().nullish(),
        value: z.string().nullish(),
      })
      .nullish(),
    baseMsrp: MsrpSchema.nullish(),
    exteriorColorIds: z.array(z.string()).nullish(),
    gradeName: z.string().nullish(),
    hasSeatingOptions: z.boolean().nullish(),
    image: z
      .object({
        alias: z.array(z.string()).nullish(),
        disclaimer: z.string().nullish(),
        isHero: z.boolean().nullish(),
        url: z.string().nullish(),
      })
      .nullish(),
    interiorColorIds: z.array(z.string()).nullish(),
    mileage: MilageSchema.nullish(),
    trims: TrimSchema.array().nullish(),
  });

  /**
   * @category Includes
   */
  export const SeriesDataSchema = z.object({
    id: z.string().nullish(),
    name: z.string().nullish(),
    shortName: z.string().nullish(),
    yearSpecificData: z
      .array(
        z
          .object({
            categories: CategorySchema.array().nullish(),
            currentVersion: z.number().nullish(),
            date: z.string().nullish(),
            fuelType: z.string().nullish(),
            grades: GradeSchema.array().nullish(),
            images: z
              .array(
                z.object({
                  alias: z.string().nullish(),
                  disclaimer: z.string().nullish(),
                  isHero: z.boolean().nullish(),
                  url: z.string().nullish(),
                })
              )
              .nullish(),
            mileage: MilageSchema.or(z.array(MilageSchema)).nullish(),
            seating: z.string().nullish(),
            startingMsrp: MsrpSchema.nullish(),
            status: z.string().nullish(),
            trims: TrimSchema.array().nullish(),
            year: z.number().nullish(),
          })
          .nullish()
      )
      .nullish(),
  });

  /**
   * @category Includes
   */
  export const PackageSchema = z.object({
    availability: z.string().nullish(),
    category: CategorySchema.nullish(),
    code: z.string().nullish(),
    compatibilityWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
    description: z.string().nullish(),
    id: z.string().nullish(),
    image: ImageSchema.array().nullish(),
    installPoint: z.string().nullish(),
    packageFeatures: z
      .array(
        z.object({
          title: z.string().nullish(),
          disclaimer: z.string().nullish(),
          category: z.string().nullish(),
          subCategories: z.array(z.string()).nullish(),
        })
      )
      .nullish(),
    subCategories: CategorySchema.array().nullish(),
    title: z.string().nullish(),
    type: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const WarrantySchema = z.object({
    id: z.string().nullish(),
    description: z.string().nullish(),
    category: z.string().nullish(),
    name: z.string().nullish(),
    value: z.string().nullish(),
  });

  /**
   * @category Includes
   */
  export const WheelSchema = z.object({
    code: z.string().nullish(),
    title: z.string().nullish(),
    type: WheelType.nullish(),
    image: ImageSchema.nullish(),
    compatibiltyWithCurrentConfig:
      CompatibilityWithCurrentConfigSchema.nullish(),
  });

  /**
   * Zod schema representing the returned body of a request made by the {@link ToyotaClient#getVehicleGrade} methods.
   *
   * @category Exports
   */
  export const GradeResponseBodySchema = z.object({
    data: z.object({
      getConfigByGrade: z.object({
        accessories: AccessorySchema.array().nullish(),
        categories: CategorySchema.array().nullish(),
        configImages: z
          .object({
            exterior: ImageSchema.array().nullish(),
            interior: ImageSchema.array().nullish(),
            background: ImageSchema.array().nullish(),
          })
          .nullish(),
        defaultConfig: z
          .object({
            accessoryIds: AccessorySchema.nullish(),
            exteriorColorId: z.string().nullish(),
            interiorColorId: z.string().nullish(),
            packageIds: PackageIdSchema.array().nullish(),
            trimId: z.string().nullish(),
            wheelsId: z.string().nullish(),
          })
          .nullish(),
        dph: z.number().nullish(),
        exteriorColors: ColorSchema.array().nullish(),
        grade: GradeSchema.nullish(),
        interiorColors: ColorSchema.array().nullish(),
        mileage: MilageSchema.nullish(),
        msrp: MsrpSchema.nullish(),
        packages: PackageSchema.array().nullish(),
        seating: z.string().nullish(),
        seriesId: z.string().nullish(),
        seriesName: z.string().nullish(),
        trim: TrimSchema.nullish(),
        warranties: WarrantySchema.array().nullish(),
        wheels: WheelSchema.array().nullish(),
        year: z.number().nullish(),
      }),
    }),
  });

  /**
   * Zod schema representing the returned body of a request made by the {@link ToyotaClient#getAllVehicles} **and** {@link ToyotaClient#getVehicle} methods.
   *
   * @category Exports
   */
  export const ResponseBodySchema = z.object({
    data: z.object({
      getSeries: z.object({
        categories: CategorySchema.array().nullish(),
        exteriorColors: ColorSchema.array().nullish(),
        seriesData: SeriesDataSchema.array().nullish(),
      }),
    }),
  });

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getAllVehicles} method.
   *
   * @see {@link Region}
   * @see {@link Language}
   *
   * @category Exports
   */
  export const GetAllVehiclesFunctionSchema = <TransformedType>() =>
    z.function().args(
      Region.optional().default("NATIONAL"), // region - can be zip code or region name
      Language.optional().default("EN"), // language
      z
        .function()
        .args(z.custom<VehicleResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getVehicle} method.
   *
   * @see {@link Region}
   * @see {@link Language}
   *
   * @category Exports
   */
  export const GetVehicleFunctionSchema = <TransformedType>() =>
    z.function().args(
      z.string(), // modelCode
      z.number(), // year
      Region.optional().default("NATIONAL"), // region - can be zip code or region name
      Language.optional().default("EN"), // language
      z
        .function()
        .args(z.custom<VehicleResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getVehicleGrade} method.
   *
   * @see {@link Region}
   * @see {@link Language}
   *
   * @category Exports
   */
  export const GetVehicleGradeFunctionSchema = <TransformedType>() =>
    z.function().args(
      z.string(), // modelCode
      z.number(), // year
      z.string(), // gradeName
      Region.optional().default("NATIONAL"), // region - can be zip code or region name
      Language.optional().default("EN"), // language
      z
        .function()
        .args(z.custom<VehicleGradeResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );
}
