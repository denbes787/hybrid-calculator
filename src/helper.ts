const convertStringToFloatWithDecimalNumber = (
  floatString: string,
  decimalNumber: number
) => {
  return parseFloat(Number(floatString).toFixed(decimalNumber));
};

export const calculateData = (
  fuelPrice: string,
  kmsPerYear: string,
  selectedComparisonVehicle: any,
  selectedHybridVehicle: any
) => {
  const { litresPer100Km, gramsCarbonPerKm } = selectedComparisonVehicle;
  const {
    litresPer100Km: hybridLitresPer100Km,
    gramsCarbonPerKm: hybridGramsCarbonPerKm
  } = selectedHybridVehicle;

  const comparisonFuelCost =
    (convertStringToFloatWithDecimalNumber(fuelPrice, 2) *
      parseInt(kmsPerYear) *
      convertStringToFloatWithDecimalNumber(litresPer100Km, 2)) /
    100;
  const comparisonCo2 =
    (parseInt(gramsCarbonPerKm) * parseInt(kmsPerYear)) / 1000000;
  const comparisonTravelledDistance = parseInt(kmsPerYear);

  const hybridFuelPrice =
    (convertStringToFloatWithDecimalNumber(fuelPrice, 2) *
      parseInt(kmsPerYear) *
      convertStringToFloatWithDecimalNumber(hybridLitresPer100Km, 2)) /
    100;
  const hybridCo2 =
    (parseInt(hybridGramsCarbonPerKm) * parseInt(kmsPerYear)) / 1000000;
  const hybridTravelledDistance =
    (convertStringToFloatWithDecimalNumber(litresPer100Km, 2) /
      convertStringToFloatWithDecimalNumber(hybridLitresPer100Km, 2)) *
    parseInt(kmsPerYear);

  const vehiclesData = {
    comparsion: {
      fuelPrice: comparisonFuelCost,
      co2: comparisonCo2.toFixed(2),
      travelledDistance: comparisonTravelledDistance.toFixed(2)
    },
    hybrid: {
      fuelPrice: hybridFuelPrice,
      co2: hybridCo2.toFixed(2),
      travelledDistance: hybridTravelledDistance.toFixed(2)
    }
  };
  const savingData = {
    fuelPrice:
      vehiclesData.comparsion.fuelPrice - vehiclesData.hybrid.fuelPrice,
    co2: (comparisonCo2 - hybridCo2).toFixed(2),
    travelledDistance: (
      hybridTravelledDistance - comparisonTravelledDistance
    ).toFixed(2)
  };

  return { ...vehiclesData, savingData };
};
