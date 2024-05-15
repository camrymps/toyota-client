import { z } from "zod"
import { VehicleSchema } from "./lib/schemas/index.js"
import { DealershipSchema } from "./lib/schemas/dealership.js"

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getAllVehicles} or {@link ToyotaClient#getVehicle}.
 * Infered from Zod schema {@link VehicleSchema.ResponseBodySchema}.
 * 
 * @category Types
 */
export type VehicleResponseBody = z.infer<typeof VehicleSchema.ResponseBodySchema>

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getVehicleGrade}.
 * Infered from Zod schema {@link VehicleSchema.GradeResponseBodySchema}.
 * 
 * @category Types
 */
export type VehicleGradeResponseBody = z.infer<typeof VehicleSchema.GradeResponseBodySchema>

/**
 * Type alias representing the returned, **raw** body, before/in absence of transformation, of a request made by {@link ToyotaClient#getDealerships}.
 * Infered from Zod schema {@link DealershipSchema.ResponseBodySchema}.
 * 
 * @category Types
 */
export type DealershipResponseBody = z.infer<typeof DealershipSchema.ResponseBodySchema>

/**
 * @see {@link VehicleSchema.Language}
 * 
 * @category Types
 */
export type Language = z.infer<typeof VehicleSchema.Language>

/** 
 * @see {@link VehicleSchema.Region}
 * 
 * @category Types
 */
export type Region = z.infer<typeof VehicleSchema.Region>
