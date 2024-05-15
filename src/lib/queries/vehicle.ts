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

export const vehicleGradeQuery = `query GetConfigByGrade($configInputGrade: ConfigInputGrade!) {
    getConfigByGrade(configInputGrade: $configInputGrade) {
      accessories {
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
        disclaimer
        id
        images {
          alias
          disclaimer
          isHero
          url
        }
        includedAccessoryIds
        installPoint
        title
        type
        warranty
      }
      categories {
        id
        value
      }
      configImages {
        exterior {
          alias
          disclaimer
          url
          ... on AccessoryImage {
            isHero
          }
          ... on LexusImage {
            angle
            background
            time
          }
          ... on StaticImage {
            isHero
          }
          ... on ToyotaImage {
            angle
          }
        }
        interior {
          alias
          disclaimer
          url
          ... on AccessoryImage {
            isHero
          }
          ... on LexusImage {
            angle
            background
            time
          }
          ... on StaticImage {
            isHero
          }
          ... on ToyotaImage {
            angle
          }
        }
        ... on LexusConfigImages {
          backgrounds {
            thumbnail
            type
          }
          time {
            icon
            type
          }
        }
        ... on ToyotaConfigImages {
          background {
            alias
            angle
            disclaimer
            url
          }
        }
      }
      defaultConfig {
        accessoryIds
        exteriorColorId
        interiorColorId
        packageIds
        trimId
        wheelsId
      }
      dph
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
      grade {
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
            disclaimer
            icon
            value
          }
          engine {
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
              disclaimer
              icon
              value
            }
            engine {
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
              disclaimer
              icon
              value
            }
          }
          seating {
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
            disclaimer
            icon
            value
          }
          shortDescription
          title
          transmission {
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
            disclaimer
            icon
            value
          }
          warrantyIds
          wheelCodes
        }
      }
      interiorColors {
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
        material
        msrp {
          disclaimer
          value
        }
        name
        title
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
      msrp {
        disclaimer
        value
      }
      packages {
        availability
        category
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
        images {
          alias
          disclaimer
          isHero
          url
        }
        installPoint
        packageFeatures {
          category
          disclaimer
          subCategories
          title
        }
        subCategories
        title
        type
      }
      seating
      seriesId
      seriesName
      trim {
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
          disclaimer
          icon
          value
        }
        engine {
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
            disclaimer
            icon
            value
          }
          engine {
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
            disclaimer
            icon
            value
          }
        }
        seating {
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
          disclaimer
          icon
          value
        }
        shortDescription
        title
        transmission {
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
          disclaimer
          icon
          value
        }
        warrantyIds
        wheelCodes
      }
      warranties {
        category
        description
        id
        name
        value
      }
      wheels {
        code
        compatibilityWithCurrentConfig {
          availableWithTrims
          isCompatible
          requiredItems {
            itemCode
            itemType
          }
        }
        image {
          alias
          disclaimer
          isHero
          url
        }
        title
        type
        ... on OptionWheel {
          msrp {
            disclaimer
            value
          }
        }
      }
      year
    }
  }
  
  `;
