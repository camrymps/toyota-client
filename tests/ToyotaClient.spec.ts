import { z } from "zod";
import { ToyotaClient } from "../src/ToyotaClient.js";
import {
  DealershipResponseBody,
  VehicleGradeResponseBody,
  VehicleResponseBody,
} from "../src/types.js";
import { expect, test } from "@jest/globals";
import { toBeOneOf } from "jest-extended";

// Extend the 'toBeOneOf' matcher
expect.extend({ toBeOneOf });

// Client setup
const client = new ToyotaClient();

/**
 * Tests for {@link ToyotaClient#getAllVehicles}
 */
test("a list of vehicles and their information is returned", async () => {
  await expect(client.getAllVehicles()).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([expect.any(Object)]),
      }),
    }),
  });
});

test('a list of vehicles and their information is returned when specifying a region name of "EAST"', async () => {
  await expect(client.getAllVehicles("EAST")).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([expect.any(Object)]),
      }),
    }),
  });
});

test("a list of vehicles and their information is returned when specifying a zip code of 53075", async () => {
  await expect(client.getAllVehicles("53075")).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([expect.any(Object)]),
      }),
    }),
  });
});

test("a list of vehicles and their information is returned after transforming the response synchronously", async () => {
  await expect(
    client.getAllVehicles<{
      seriesData?: VehicleResponseBody["data"]["getSeries"]["seriesData"];
    }>("NATIONAL", "EN", (data: VehicleResponseBody) => data.data.getSeries)
  ).resolves.toEqual(
    expect.objectContaining({
      seriesData: expect.arrayContaining([expect.any(Object)]),
    })
  );
});

test("a list of vehicles and their information is returned after transforming the response asynchronously", async () => {
  await expect(
    client.getAllVehicles<
      VehicleResponseBody & { dealerships: DealershipResponseBody }
    >("53075", "EN", async (data: VehicleResponseBody) => {
      const dealerships = await client.getDealerships(53075);

      return {
        ...data,
        dealerships,
      };
    })
  ).resolves.toEqual({
    data: {
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([expect.any(Object)]),
      }),
    },
    dealerships: {
      dealers: expect.arrayContaining([expect.any(Object)]),
      numDealer: expect.any(Number),
      code: 0,
      success: true,
      searchZipCode: "53075",
      searchStrategy: expect.any(String),
      totalDealer: expect.any(Number),
    },
  });
});

/**
 * Tests for {@link ToyotaClient#getVehicle}
 */
test('(Zod) error is returned when using the invalid model code "sienn" to query vehicle information', async () => {
  expect.assertions(1);

  try {
    await client.getVehicle("sienn", 2024);
  } catch (error) {
    if (error instanceof z.ZodError) {
      expect(error).toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([
            expect.objectContaining({
              path: ["data", "getSeries"],
              message: "Expected object, received null",
            }),
          ]),
        })
      );
    }
  }
});

test("vehicle information on the 2023 Toyota Corolla is returned", async () => {
  await expect(client.getVehicle("corolla", 2023)).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([
          expect.objectContaining({
            name: "Corolla",
            yearSpecificData: expect.arrayContaining([
              expect.objectContaining({ year: 2023 }),
            ]),
          }),
        ]),
      }),
    }),
  });
});

test('vehicle information on the 2023 Toyota Prius is returned upon specifying a region name of "EAST"', async () => {
  await expect(client.getVehicle("prius", 2023)).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([
          expect.objectContaining({
            name: "Prius",
            yearSpecificData: expect.arrayContaining([
              expect.objectContaining({ year: 2023 }),
            ]),
          }),
        ]),
      }),
    }),
  });
});

test("vehicle information on the 2023 Toyota Tacoma is returned upon specifying a zip code of 04743", async () => {
  await expect(client.getVehicle("tacoma", 2023, "04743")).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([
          expect.objectContaining({
            name: "Tacoma",
            yearSpecificData: expect.arrayContaining([
              expect.objectContaining({ year: 2023 }),
            ]),
          }),
        ]),
      }),
    }),
  });
});

test("vehicle information on the 2024 Toyota Camry is returned when transforming the response synchronously", async () => {
  await expect(
    client.getVehicle<{
      seriesData?: VehicleResponseBody["data"]["getSeries"]["seriesData"];
    }>(
      "camry",
      2024,
      "NATIONAL",
      "EN",
      (data: VehicleResponseBody) => data.data.getSeries
    )
  ).resolves.toEqual(
    expect.objectContaining({
      seriesData: expect.arrayContaining([
        expect.objectContaining({
          name: "Camry",
          yearSpecificData: expect.arrayContaining([
            expect.objectContaining({ year: 2024 }),
          ]),
        }),
      ]),
    })
  );
});

test("vehicle information on the 2024 Toyota Camry is returned when transforming the response asynchronously", async () => {
  await expect(
    client.getVehicle<
      VehicleResponseBody & { dealerships: DealershipResponseBody }
    >("camry", 2024, "53075", "EN", async (data: VehicleResponseBody) => {
      const dealerships = await client.getDealerships(53075);

      return {
        ...data,
        dealerships,
      };
    })
  ).resolves.toEqual({
    data: expect.objectContaining({
      getSeries: expect.objectContaining({
        seriesData: expect.arrayContaining([
          expect.objectContaining({
            name: "Camry",
            yearSpecificData: expect.arrayContaining([
              expect.objectContaining({ year: 2024 }),
            ]),
          }),
        ]),
      }),
    }),
    dealerships: expect.objectContaining({
      dealers: expect.arrayContaining([expect.any(Object)]),
      numDealer: expect.any(Number),
      code: 0,
      success: true,
      searchZipCode: "53075",
      searchStrategy: expect.any(String),
      totalDealer: expect.any(Number),
    }),
  });
});

/**
 * Tests for {@link ToyotaClient#getVehicleGrade}
 */
test("grade information on the 2024 Toyota Corolla LE is returned", async () => {
  await expect(client.getVehicleGrade("corolla", 2024, "LE")).resolves.toEqual({
    data: expect.objectContaining({
      getConfigByGrade: expect.objectContaining({
        seriesId: "corolla",
        year: 2024,
        grade: expect.objectContaining({
          gradeName: "LE",
        }),
      }),
    }),
  });
});

test('grade information on the 2023 Toyota Prius XLE is returned when specifying a region name of "EAST"', async () => {
  await expect(
    client.getVehicleGrade("prius", 2023, "XLE", "EAST")
  ).resolves.toEqual({
    data: expect.objectContaining({
      getConfigByGrade: expect.objectContaining({
        seriesId: "prius",
        year: 2023,
        grade: expect.objectContaining({
          gradeName: "XLE",
        }),
      }),
    }),
  });
});

test("grade information on the 2024 Toyota Tacoma TRD Pro is returned when specifiying a zip code of 53075", async () => {
  await expect(
    client.getVehicleGrade("tacoma", 2024, "TRD Pro", "53075")
  ).resolves.toEqual({
    data: expect.objectContaining({
      getConfigByGrade: expect.objectContaining({
        seriesId: "tacoma",
        year: 2024,
        grade: expect.objectContaining({
          gradeName: "TRD Pro",
        }),
      }),
    }),
  });
});

test("grade information on the 2024 Toyota Camry LE is returned when transforming the response synchronously", async () => {
  await expect(
    client.getVehicleGrade<
      VehicleGradeResponseBody["data"]["getConfigByGrade"]
    >(
      "camry",
      2024,
      "LE",
      "NATIONAL",
      "EN",
      (data: VehicleGradeResponseBody) => data.data.getConfigByGrade
    )
  ).resolves.toEqual(
    expect.objectContaining({
      seriesId: "camry",
      year: 2024,
      grade: expect.objectContaining({
        gradeName: "LE",
      }),
    })
  );
});

test("grade information on the 2024 Sienna LE is returned when transforming the response asynchronously", async () => {
  await expect(
    client.getVehicleGrade<{
      le: VehicleGradeResponseBody["data"]["getConfigByGrade"];
      xle: VehicleGradeResponseBody["data"]["getConfigByGrade"];
    }>(
      "sienna",
      2024,
      "LE",
      "NATIONAL",
      "EN",
      async (data: VehicleGradeResponseBody) => {
        const siennaXleData = await client.getVehicleGrade(
          "sienna",
          2024,
          "XLE"
        );

        return {
          le: data.data.getConfigByGrade,
          xle: siennaXleData.data.getConfigByGrade,
        };
      }
    )
  ).resolves.toEqual(
    expect.objectContaining({
      le: expect.objectContaining({
        seriesId: "sienna",
        year: 2024,
        grade: expect.objectContaining({
          gradeName: "LE",
        }),
      }),
      xle: expect.objectContaining({
        seriesId: "sienna",
        year: 2024,
        grade: expect.objectContaining({
          gradeName: "XLE",
        }),
      }),
    })
  );
});

/**
 * Tests for {@link ToyotaClient#getDealerships}
 */
test("a list of dealerships in the proximity of zip code 53075 are returned", async () => {
  await expect(client.getDealerships(53075)).resolves.toEqual({
    dealers: expect.arrayContaining([expect.any(Object)]),
    numDealer: expect.any(Number),
    code: 0,
    success: true,
    searchZipCode: "53075",
    searchStrategy: expect.any(String),
    totalDealer: expect.any(Number),
  });
});

test("no dealerships are returned for the invalid zip code of 00000", async () => {
  await expect(client.getDealerships(0x0)).resolves.toEqual({
    dealers: expect.arrayContaining([]),
    numDealer: 0,
    code: 1,
    success: false,
    totalDealer: 0,
    generalMessage: expect.any(String),
  });
});

test("a list of dealerships in the proximity of zip code 50375 are returned when transforming the response synchronously", async () => {
  await client
    .getDealerships<{
      dealers?: DealershipResponseBody["dealers"];
      queriedZipCodes?: string[];
    }>(53075, (data: DealershipResponseBody) => {
      return {
        dealers: data.dealers,
        queriedZipCode: data.searchZipCode,
      };
    })
    .then((data) => {
      expect(data).toEqual({
        dealers: expect.arrayContaining([expect.any(Object)]),
        queriedZipCode: "53075",
      });
    });
});

test("a list of dealerships in the proximity of zip code 50375 are returned when transforming the response asynchronously", async () => {
  await client
    .getDealerships<
      Promise<{
        dealers: DealershipResponseBody["dealers"];
        queriedZipCodes?: string[];
      }>
    >(53075, async function (data: DealershipResponseBody) {
      const dealershipsNearADifferentZipCode: DealershipResponseBody =
        await client.getDealerships(48101);

      return {
        // Combine the dealerships returned from both requests
        dealers: [
          ...(data.dealers || []),
          ...(dealershipsNearADifferentZipCode.dealers || []),
        ],
        queriedZipCode: [
          data.searchZipCode,
          dealershipsNearADifferentZipCode.searchZipCode,
        ],
      };
    })
    .then((data) => {
      expect(data).toEqual({
        dealers: expect.arrayContaining([expect.any(Object)]),
        queriedZipCode: ["53075", "48101"],
      });
    });
});
