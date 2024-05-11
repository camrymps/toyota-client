/**
 * GraphQL query for performing vehicle-related requests.
 */
export const vehicleQuery = `query GetSeries(
    $brand: Brand!
    $language: Language
    $region: Region!
    $seriesId: String
    $showApplicableSeriesForVisualizer: Boolean
    $year: Int
  ) {
    getSeries(
      brand: $brand
      language: $language
      region: $region
      seriesId: $seriesId
      showApplicableSeriesForVisualizer: $showApplicableSeriesForVisualizer
      year: $year
    ) {
      categories {
        id
        value
      }
      exteriorColors {
        code
        colorFamilies {
          hexCode
          name
        }
        compatibilityWithCurrentConfig {
          availableWithTrims
          isCompatible
          requiredItems {
            itemCode
            itemType
          }
        }
        hexCode
        id
        images {
          alias
          disclaimer
          isHero
          url
        }
        isExtraCostColor
        msrp {
          disclaimer
          value
        }
        title
      }
      seriesData {
        id
        name
        shortName
        yearSpecificData {
          categories {
            id
            value
          }
          currentVersion
          date
          fuelType
          grades {
            asShownPrice {
              disclaimer
              value
            }
            baseMsrp {
              disclaimer
              value
            }
            exteriorColorIds
            gradeName
            hasSeatingOptions
            image {
              alias
              disclaimer
              isHero
              url
            }
            interiorColorIds
            mileage {
              category
              city
              combined
              highway
              isAvailable
              mpge
              range
            }
            trims {
              accessoryIds {
                id
                msrp {
                  disclaimer
                  value
                }
              }
              cabBed {
                bedDepth
                bedLength
                bedWidth
                betweenWheelWell
                cabDetails
                code
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                id
                label
                overallHeight
                overallLength
                overallWidth
              }
              code
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              defaultColorId
              description
              drive {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              engine {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              exteriorColorIds
              fuelType
              horsepower {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              images {
                alias
                disclaimer
                isHero
                url
              }
              interiorColorIds
              isDefaultTrim
              mileage {
                category
                city
                combined
                highway
                isAvailable
                mpge
                range
              }
              msrp {
                disclaimer
                value
              }
              packageIds {
                id
                msrp {
                  disclaimer
                  value
                }
              }
              powertrain {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                drive {
                  compatibilityWithCurrentConfig {
                    availableWithTrims
                    isCompatible
                    requiredItems {
                      itemCode
                      itemType
                    }
                  }
                  description
                  disclaimer
                  icon
                  value
                }
                engine {
                  compatibilityWithCurrentConfig {
                    availableWithTrims
                    isCompatible
                    requiredItems {
                      itemCode
                      itemType
                    }
                  }
                  description
                  disclaimer
                  icon
                  value
                }
                horsepower {
                  compatibilityWithCurrentConfig {
                    availableWithTrims
                    isCompatible
                    requiredItems {
                      itemCode
                      itemType
                    }
                  }
                  description
                  disclaimer
                  icon
                  value
                }
                transmission {
                  compatibilityWithCurrentConfig {
                    availableWithTrims
                    isCompatible
                    requiredItems {
                      itemCode
                      itemType
                    }
                  }
                  description
                  disclaimer
                  icon
                  value
                }
              }
              seating {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              shortDescription
              title
              transmission {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              warrantyIds
              wheelCodes
            }
          }
          images {
            alias
            disclaimer
            isHero
            url
          }
          mileage {
            category
            city
            combined
            highway
            isAvailable
            mpge
            range
          }
          seating
          startingMsrp {
            disclaimer
            value
          }
          status
          trims {
            accessoryIds {
              id
              msrp {
                disclaimer
                value
              }
            }
            cabBed {
              bedDepth
              bedLength
              bedWidth
              betweenWheelWell
              cabDetails
              code
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              id
              label
              overallHeight
              overallLength
              overallWidth
            }
            code
            compatibilityWithCurrentConfig {
              availableWithTrims
              isCompatible
              requiredItems {
                itemCode
                itemType
              }
            }
            defaultColorId
            description
            drive {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              disclaimer
              icon
              value
            }
            engine {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              disclaimer
              icon
              value
            }
            exteriorColorIds
            fuelType
            horsepower {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              disclaimer
              icon
              value
            }
            images {
              alias
              disclaimer
              isHero
              url
            }
            interiorColorIds
            isDefaultTrim
            mileage {
              category
              city
              combined
              highway
              isAvailable
              mpge
              range
            }
            msrp {
              disclaimer
              value
            }
            packageIds {
              id
              msrp {
                disclaimer
                value
              }
            }
            powertrain {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              drive {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              engine {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              horsepower {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
              transmission {
                compatibilityWithCurrentConfig {
                  availableWithTrims
                  isCompatible
                  requiredItems {
                    itemCode
                    itemType
                  }
                }
                description
                disclaimer
                icon
                value
              }
            }
            seating {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              disclaimer
              icon
              value
            }
            shortDescription
            title
            transmission {
              compatibilityWithCurrentConfig {
                availableWithTrims
                isCompatible
                requiredItems {
                  itemCode
                  itemType
                }
              }
              description
              disclaimer
              icon
              value
            }
            warrantyIds
            wheelCodes
          }
          year
        }
      }
    }
  }`;