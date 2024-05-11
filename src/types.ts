import { z } from "zod"
import { VehicleSchema } from "./lib/schemas/index.js"
import { DealershipSchema } from "./lib/schemas/dealership.js"

/**
 * Type alias representing the returned, **raw** body of a request made by {@link ToyotaClient#getAllVehicles} or {@link ToyotaClient#getVehicle}.
 * Infered from Zod schema {@link VehicleSchema.ResponseBodySchema}.
 * 
 * @category Types
 */
export type VehicleResponseBody = z.infer<typeof VehicleSchema.ResponseBodySchema>

/**
 * Type alias representing the returned, **raw** body of a request made by {@link ToyotaClient#getDealerships}.
 * Infered from Zod schema {@link DealershipSchema.ResponseBodySchema}.
 * 
 * @category Types
 */
export type DealershipResponseBody = z.infer<typeof DealershipSchema.ResponseBodySchema>