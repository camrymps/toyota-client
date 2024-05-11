import { RefinementCtx, z } from "zod";
import { DealershipResponseBody } from "../../types.js";

/**
 * @category Schemas
 */
export namespace DealershipSchema {
  /**
   * @category Includes
   */
  export const DealerInformationSchema = z.object({
    phone: z.string().nullish(),
    url: z.string().nullish(),
    hours: z.array(z.array(z.string())).nullish(),
  });

  /**
   * Zod schema representing the returned body of a request made by the {@link ToyotaClient#getDealerships} method.
   *
   * @category Exports
   */
  export const ResponseBodySchema = z.object({
    numDealer: z.number().nullish(),
    dealers: z.array(
      z.object({
        code: z.string().nullish(),
        dealerId: z.string().nullish(),
        name: z.string().nullish(),
        address1: z.string().nullish(),
        city: z.string().nullish(),
        state: z.string().nullish(),
        zip: z.string().nullish(),
        phone: z.string().nullish(),
        fax: z.string().nullish(),
        lat: z.number().nullish(),
        long: z.number().nullish(),
        latitude: z.number().nullish(),
        longitude: z.number().nullish(),
        distance: z.number().nullish(),
        url: z.string().nullish(),
        email: z.string().nullish(),
        regionId: z.string().nullish(),
        serviceCenterOnly: z.boolean().nullish(),
        tdaId: z.string().nullish(),
        phoneNumberService: z.string().nullish(),
        phoneNumberParts: z.string().nullish(),
        hoursSales: z.string().nullish(),
        hoursParts: z.string().nullish(),
        services: z.array(z.string()).nullish(),
        sales: DealerInformationSchema.nullish(),
        fmpt1: z.boolean().nullish(),
        miraiSales: z.boolean().nullish(),
        encodedDashedCity: z.string().nullish(),
        encodedDashedName: z.string().nullish(),
        region: z
          .object({
            regionCode: z.number().nullish(),
            success: z.boolean().nullish(),
          })
          .nullish(),
        tda: z
          .object({
            code: z.string().nullish(),
            name: z.string().nullish(),
          })
          .nullish(),
        service: DealerInformationSchema.nullish(),
        parts: DealerInformationSchema.nullish(),
        general: DealerInformationSchema.nullish(),
        dealerAttributes: z.array(z.string()).nullish(),
        pma: z.boolean().nullish(),
        fmp: z.boolean().nullish(),
      })
    ).nullish(),
  });

  /**
   * Zod function schema for validating arguments and return types for the {@link ToyotaClient#getDealerships} method.
   *
   * @category Exports
   */
  export const GetDealershipsFunctionSchema = <TransformedType>() =>
    z.function().args(
      z.number(), // zipCode
      z
        .function()
        .args(z.custom<DealershipResponseBody>(), z.custom<RefinementCtx>())
        .returns(z.custom<TransformedType | Promise<TransformedType>>())
        .optional() // transformer
    );
}
