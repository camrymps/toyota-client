import { RefinementCtx, z } from "zod";
import { VehicleResponseBody } from "../../types.js";

/**
 * @category Schemas
 */
export namespace VehicleSchema {
  /**
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const CategorySchema = z
    .object({ id: z.string(), value: z.string() })
    .nullish();

  /**
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const MsrpSchema = z.object({
    disclaimer: z.string().nullish(),
    value: z.string().nullish(),
  });

  /**
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const ExteriorColorSchema = z
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
   * @see {@link ResponseBodySchema}
   *
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
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const CompatibilityWithCurrentConfigSchema = z.object({
    availableWithTrims: z.array(z.any()).nullish(), // TODO
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
   * @see {@link ResponseBodySchema}
   *
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
   * @see {@link ResponseBodySchema}
   *
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
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const PackageIdSchema = z.object({
    id: z.string().nullish(),
    msrp: MsrpSchema.nullish(),
  });

  /**
   * @see {@link ResponseBodySchema}
   *
   * @category Includes
   */
  export const TrimSchema = z.object({
    accessoryIds: z.array(z.string()).nullish(),
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
    images: z.array(z.string()).nullish(),
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
   * @see {@link ResponseBodySchema}
   *
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
   * @see {@link ResponseBodySchema}
   *
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
   * Zod schema representing the returned body of a request made by the {@link ToyotaClient#getAllVehicles} **and** {@link ToyotaClient#getVehicle} methods.
   *
   * @category Exports
   */
  export const ResponseBodySchema = z.object({
    data: z.object({
      getSeries: z.object({
        categories: CategorySchema.array().nullish(),
        exteriorColors: ExteriorColorSchema.array().nullish(),
        seriesData: SeriesDataSchema.array().nullish(),
      }),
    }),
  });

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getAllVehicles} method.
   *
   * @category Exports
   */
  export const GetAllVehiclesFunctionSchema = <TransformedType>() =>
    z.function().args(
      z.number(), // zipCode
      z.string().optional().default("EN"), // language
      z
        .function()
        .args(z.custom<VehicleResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getVehicle} method.
   *
   * @category Exports
   */
  export const GetVehicleFunctionSchema = <TransformedType>() =>
    z.function().args(
      z.string(), // modelCode
      z.number(), // year
      z.number(), // zipCode
      z.string().optional().default("EN"), // language
      z
        .function()
        .args(z.custom<VehicleResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );
}
