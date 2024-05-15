import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  DealershipResponseBody,
  VehicleGradeResponseBody,
  Language,
  Region,
  VehicleResponseBody,
} from "./types.js";
import { VehicleSchema, DealershipSchema } from "./lib/schemas/index.js";
import { vehicleGradeQuery, vehicleQuery } from "./lib/queries/vehicle.js";
import { RefinementCtx, ZodSchema } from "zod";
import UserAgent from "user-agents";

/**
 * Toyota (unofficial) API client.
 *
 * @property {AxiosInstance} defaultClient Axios client
 * @property {AxiosInstance} orchestratorClient Axios client
 *
 * @category Clients
 */
export class ToyotaClient {
  defaultClient: AxiosInstance;
  orchestratorClient: AxiosInstance;
  inventoryClient: AxiosInstance;

  /**
   * Constructor for {@link ToyotaClient}.
   *
   * @param {string} defaultBaseUrl
   * @param {string} orchestratorBaseUrl
   * @param {string} inventoryBaseUrl
   */
  constructor(
    defaultBaseUrl: string = "https://toyota.com",
    orchestratorBaseUrl: string = "https://orchestrator.configurator.toyota.com",
    inventoryBaseUrl: string = "https://api.search-inventory.toyota.com"
  ) {
    this.defaultClient = axios.create({
      baseURL: defaultBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.orchestratorClient = axios.create({
      baseURL: orchestratorBaseUrl,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": new UserAgent().toString(),
      },
    });

    this.inventoryClient = axios.create({
      baseURL: inventoryBaseUrl,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": new UserAgent().toString(),
      },
    });
  }

  /**
   * Performs requests to the API and transforms outputs (if desired).
   *
   * @param {Promise<AxiosResponse>} request
   * @param {ZodSchema} schema
   * @param {(arg: DefaultReturnType, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} transformer Uses Zod's [transform method](https://zod.dev/?id=transform)
   * @returns {Promise<DefaultReturnType | TransformedType>}
   *
   * @see {@link https://zod.dev/?id=transform}
   */
  private async makeRequest<DefaultReturnType, TransformedType = undefined>(
    request: Promise<AxiosResponse>,
    schema: ZodSchema,
    transformer?: (
      arg: DefaultReturnType,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<DefaultReturnType | TransformedType> {
    const res: AxiosResponse = await request;

    if (transformer) {
      /**
       * Since there is no legitimate way to determine if a function is asynchronous or not,
       * we have to handle this functionality by a try/catch.
       */
      try {
        return schema.transform(transformer).parse(res.data);
      } catch {
        return schema.transform(transformer).parseAsync(res.data);
      }
    }

    return schema.parse(res.data);
  }

  /**
   * Returns a list of all of vehicles.
   *
   * @param {Region} [region] Either a region name or 5 digit zip code. Defaults to "NATIONAL".
   * @param {Language} [language] 2 character language code. Defaults to "EN" (English)
   * @param {(arg: VehicleResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} [transformer] Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<VehicleResponseBody | TransformedType>}
   *
   * @see {@link https://zod.dev/?id=transform}
   */
  public async getAllVehicles<TransformedType = VehicleResponseBody>(
    region: Region = "NATIONAL",
    language: Language = "EN",
    transformer?: (
      arg: VehicleResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<VehicleResponseBody | TransformedType> {
    return VehicleSchema.GetAllVehiclesFunctionSchema<TransformedType>().implement(
      (
        region: Region = "NATIONAL",
        language: Language = "EN",
        transformer?: (
          arg: VehicleResponseBody,
          ctx: RefinementCtx
        ) => TransformedType | Promise<TransformedType>
      ) => {
        return this.makeRequest<VehicleResponseBody, TransformedType>(
          this.orchestratorClient.post("/graphql", {
            query: vehicleQuery,
            variables: {
              brand: "TOYOTA",
              language: language,
              region: new RegExp("[0-9]{5}").test(region)
                ? { zipCode: region }
                : { regionName: region },
            },
          }),
          VehicleSchema.ResponseBodySchema,
          transformer
        );
      }
    )(region, language, transformer);
  }

  /**
   * Returns details of a specific vehicle.
   *
   * @param {string} modelCode Also refered to as seriesId (i.e. prius, corolla, tacoma, etc.)
   * @param {number} year 4 digit year (i.e. 2024)
   * @param {Region} [region] Either a region name or 5 digit zip code. Defaults to "NATIONAL".
   * @param {Language} [language] 2 character language code. Defaults to "EN" (English)
   * @param {(arg: VehicleResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} [transformer] Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<VehicleResponseBody | TransformedType>}
   */
  public async getVehicle<TransformedType = VehicleResponseBody>(
    modelCode: string,
    year: number,
    region: Region = "NATIONAL",
    language: Language = "EN",
    transformer?: (
      arg: VehicleResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<VehicleResponseBody | TransformedType> {
    return VehicleSchema.GetVehicleFunctionSchema<TransformedType>().implement(
      (
        modelCode: string,
        year: number,
        region: Region = "NATIONAL",
        language: Language = "EN",
        transformer?: (
          arg: VehicleResponseBody,
          ctx: RefinementCtx
        ) => TransformedType | Promise<TransformedType>
      ) => {
        return this.makeRequest<VehicleResponseBody, TransformedType>(
          this.orchestratorClient.post("/graphql", {
            query: vehicleQuery,
            variables: {
              brand: "TOYOTA",
              language: language.toUpperCase(),
              seriesId: modelCode.toLowerCase(),
              region: new RegExp("[0-9]{5}").test(region)
                ? { zipCode: region }
                : { regionName: region },
              showApplicableSeriesForVisualizer: true,
              year,
            },
          }),
          VehicleSchema.ResponseBodySchema,
          transformer
        );
      }
    )(modelCode, year, region, language, transformer);
  }

  /**
   * Returns a specific grade of a vehicle.
   *
   * @param {string} modelCode Also refered to as seriesId (i.e. prius, corolla, tacoma, etc.)
   * @param {number} year 4 digit year (i.e. 2024)
   * @param {string} gradeName The name of the vehicle's grade (i.e. TRD Sport)
   * @param {Region} [region] Either a region name or 5 digit zip code. Defaults to "NATIONAL".
   * @param {Language} [language] 2 character language code. Defaults to "EN" (English)
   * @param {(arg: VehicleGradeResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} [transformer] Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<VehicleGradeResponseBody | TransformedType>}
   */
  public async getVehicleGrade<TransformedType = VehicleGradeResponseBody>(
    modelCode: string,
    year: number,
    gradeName: string,
    region: Region = "NATIONAL",
    language: Language = "EN",
    transformer?: (
      arg: VehicleGradeResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<VehicleGradeResponseBody | TransformedType> {
    return VehicleSchema.GetVehicleGradeFunctionSchema<TransformedType>().implement(
      (
        modelCode: string,
        year: number,
        gradeName: string,
        region: Region = "NATIONAL",
        language: Language = "EN",
        transformer?: (
          arg: VehicleGradeResponseBody,
          ctx: RefinementCtx
        ) => TransformedType | Promise<TransformedType>
      ) => {
        return this.makeRequest<VehicleGradeResponseBody, TransformedType>(
          this.orchestratorClient.post("/graphql", {
            query: vehicleGradeQuery,
            variables: {
              configInputGrade: {
                brand: "TOYOTA",
                gradeName: gradeName,
                language: language.toUpperCase(),
                seriesId: modelCode,
                region: new RegExp("[0-9]{5}").test(region)
                  ? { zipCode: region }
                  : { regionName: region },
                year,
              },
            },
          }),
          VehicleSchema.GradeResponseBodySchema,
          transformer
        );
      }
    )(modelCode, year, gradeName, region, language, transformer);
  }

  /**
   * Returns a list of dealerships near a specified zip code.
   *
   * @param {number} zipCode 5 digit zip code (i.e. 12345)
   * @param {(arg: DealershipResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} [transformer] Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<DealershipResponseBody | TransformedType>}
   */
  public async getDealerships<TransformedType = DealershipResponseBody>(
    zipCode: number,
    transformer?: (
      arg: DealershipResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<DealershipResponseBody | TransformedType> {
    return DealershipSchema.GetDealershipsFunctionSchema<TransformedType>()
      .implement(
        (
          zipCode: number,
          transformer?: (
            arg: DealershipResponseBody,
            ctx: RefinementCtx
          ) => TransformedType | Promise<TransformedType>
        ) => {
          return this.makeRequest<DealershipResponseBody, TransformedType>(
            this.defaultClient.get(
              `/service/tcom/locateDealer/zipCode/${zipCode}`
            ),
            DealershipSchema.ResponseBodySchema,
            transformer
          );
        }
      )(zipCode, transformer)
      .then((data) => data);
  }
}
