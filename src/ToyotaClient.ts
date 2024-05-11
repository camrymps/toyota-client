import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  DealershipResponseBody,
  VehicleResponseBody,
} from "./types.js";
import { VehicleSchema } from "./lib/schemas/index.js";
import {
  vehicleQuery,
} from "./lib/queries/vehicle.js";
import { RefinementCtx, ZodSchema, z } from "zod";
import UserAgent from "user-agents";
import { DealershipSchema } from "./lib/schemas/dealership.js";

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
  private async makeRequest<DefaultReturnType, TransformedType>(
    request: Promise<AxiosResponse>,
    schema: ZodSchema,
    transformer?: (
      arg: DefaultReturnType,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<DefaultReturnType | TransformedType> {
    const res: AxiosResponse = await request;

    if (transformer) {
      if (transformer[Symbol.toStringTag] === "AsyncFunction") {
        return schema.transform(transformer).parseAsync(res.data);
      }

      return schema.transform(transformer).parse(res.data);
    }

    return schema.parse(res.data);
  }

  /**
   * Returns a list of all of vehicles.
   *
   * @param {number} zipCode 5 digit zip code (i.e. 12345)
   * @param {string} language 2 character language code. Defaults to "EN" (English)
   * @param {(arg: VehicleResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} transformer Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<TransformedType | VehicleResponseBody>}
   *
   * @see {@link https://zod.dev/?id=transform}
   */
  public async getAllVehicles<TransformedType>(
    zipCode: number,
    language: string = "EN",
    transformer?: (
      arg: VehicleResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<TransformedType | VehicleResponseBody> {
    return VehicleSchema.GetAllVehiclesFunctionSchema<TransformedType>().implement(
      (
        zipCode: number,
        language: string = "EN",
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
              region: {
                zipCode: zipCode,
              },
            },
          }),
          VehicleSchema.ResponseBodySchema,
          transformer
        );
      }
    )(zipCode, language, transformer);
  }

  /**
   * Returns details of a specific vehicle.
   *
   * @param {string} modelCode Also refered to as seriesId (i.e. prius, corolla, tacoma, etc.)
   * @param {number} year 4 digit year (i.e. 2024)
   * @param {number} zipCode 5 digit zip code (i.e. 12345)
   * @param {string} language 2 character language code. Defaults to "EN" (English)
   * @param {(arg: VehicleResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} transformer Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<TransformedType | VehicleResponseBody>}
   */
  public async getVehicle<TransformedType>(
    modelCode: string,
    year: number,
    zipCode: number,
    language: string = "EN",
    transformer?: (
      arg: VehicleResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<TransformedType | VehicleResponseBody> {
    return VehicleSchema.GetVehicleFunctionSchema<TransformedType>().implement(
      (
        modelCode: string,
        year: number,
        zipCode: number,
        language: string = "EN",
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
              region: {
                zipCode: zipCode,
              },
              showApplicableSeriesForVisualizer: true,
              year,
            },
          }),
          VehicleSchema.ResponseBodySchema,
          transformer
        );
      }
    )(modelCode, year, zipCode, language, transformer);
  }

  /**
   * Returns a list of dealerships near a specified zip code.
   *
   * @param {number} zipCode 5 digit zip code (i.e. 12345)
   * @param {(arg: DealershipResponseBody, ctx: RefinementCtx) => TransformedType | Promise<TransformedType>} transformer Uses Zod's {@link https://zod.dev/?id=transform | transform method}
   * @returns {Promise<TransformedType | DealershipResponseBody>}
   */
  public async getDealerships<TransformedType>(
    zipCode: number,
    transformer?: (
      arg: DealershipResponseBody,
      ctx: RefinementCtx
    ) => TransformedType | Promise<TransformedType>
  ): Promise<TransformedType | DealershipResponseBody> {
    return DealershipSchema.GetDealershipsFunctionSchema<TransformedType>().implement(
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
    )(zipCode, transformer);
  }
}
