import React, { ReactNode, useState, useEffect } from "react";
import { Input, Select } from "@hybrid/components";
import moment from "moment";
import { useWindowDimensions } from "@hybrid/hooks";
import { calculateData } from "../../helper";

const angle = "000";
const file_extension = "png";

const tranformSubModelToOptions = (options: any) => {
  return options.map((item: any) => ({
    value: item.materialCode,
    label: item.grade
  }));
};
function ComparisonStep({
  index,
  children
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <div className="comparisonStep">
      <p className="overlineText text-center">Step {index}</p>
      {children}
    </div>
  );
}

export function ComparisonSteps({
  onChange,
  defaultParameters,
  defaultModelsOptions,
  defaultHybridValue,
  defaultComparisonValue,
  models,
  initialSelectedModel
}: {
  onChange: (data: any) => void;
  defaultParameters: any;
  defaultModelsOptions: any;
  defaultHybridValue: string;
  defaultComparisonValue: string;
  models: any;
  initialSelectedModel?: string;
}) {
  const { width } = useWindowDimensions();
  const [fuelPrice, setFuelPrice] = useState<string>(
    defaultParameters.fuelPrice
  );
  const [kmsPerYear, setKmsPerYear] = useState<string>(
    defaultParameters.kmsPerYear
  );
  const [comparisonOptions, setComparisonOptions] = useState<any>([]);
  const [hybridOptions, setHybridOptions] = useState<any>([]);
  const [selectedComparisonVehicle, setSelectedComparisonVehicle] = useState<
    any
  >({
    materialCode: null
  });
  const [
    selectedComparisonVehicleValue,
    setSelectedComparisonVehicleValue
  ] = useState<any>(defaultComparisonValue);

  const [selectedHybridVehicleValue, setSelectedHybridVehicleValue] = useState<
    any
  >(defaultHybridValue);

  const [selectedHybridVehicle, setSelectedHybridVehicle] = useState<any>({
    materialCode: null
  });
  const [selectedModel, setSelectedModel] = useState<string | undefined>(
    initialSelectedModel
  );
  const [selectedModelObject, setSelectedModelObject] = useState<any>(null);

  const [selectedHybridVehicleUrl, setSelectedHybridVehicleUrl] = useState<any>(
    null
  );
  const [
    selectedComparisonVehicleUrl,
    setSelectedComparisonVehicleUrl
  ] = useState<any>(null);
  const [loadingHybridVehicelImage, setLoadingHybridVehicelImage] = useState<
    boolean
  >(true);
  const [
    loadingComparisonVehicelImage,
    setLoadingComparisonVehicelImage
  ] = useState<boolean>(true);
  useEffect(() => {
    const modelList = models.filter(
      (item: any) => item.id === initialSelectedModel
    );
    setSelectedModelObject(modelList[0]);
    setComparisonOptions(tranformSubModelToOptions(modelList[0].comparison));
    setHybridOptions(tranformSubModelToOptions(modelList[0].hybrid));

    setSelectedComparisonVehicleValue(modelList[0].comparison[0].materialCode);
    setSelectedHybridVehicleValue(modelList[0].hybrid[0].materialCode);

    setSelectedComparisonVehicle(modelList[0].comparison[0]);
    setSelectedHybridVehicle(modelList[0].hybrid[0]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoadingHybridVehicelImage(true);
    setLoadingComparisonVehicelImage(true);
    if (selectedModelObject) {
      setSelectedComparisonVehicleValue(
        selectedModelObject.comparison[0].materialCode
      );
      setSelectedHybridVehicleValue(selectedModelObject.hybrid[0].materialCode);

      setSelectedComparisonVehicle(selectedModelObject.comparison[0]);
      setSelectedHybridVehicle(selectedModelObject.hybrid[0]);
    }
  }, [selectedModel]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickSuitableDimension = (width: number) => {
    if (width >= 940) {
      return "1920x1080";
    }
    if (width >= 907) {
      return "940x529";
    }
    if (width >= 519) {
      return "907x510";
    }
    if (width >= 260) {
      return "519x292";
    }
    return "260x146";
  };

  useEffect(() => {
    if (selectedModelObject) {
      var date = moment(selectedHybridVehicle.productionTime, "DD-MM-YYYY");
      const production_year = date.get("year");
      const production_month = date.format("MM");
      const suitableDimension = pickSuitableDimension(width);
      const hybridVehicleUrl = `https://services.tmca.rotorint.com/v1/image/vehicle/360s/hi/${suitableDimension}/${production_year}/${production_month}/${selectedHybridVehicle.materialCode}_${angle}.${file_extension}`;
      setSelectedHybridVehicleUrl(hybridVehicleUrl);
      setLoadingHybridVehicelImage(true);

      var myImg = new Image();
      myImg.onload = function() {
        setTimeout(() => {
          setLoadingHybridVehicelImage(false);
        }, 2500);
      };
      myImg.src = hybridVehicleUrl;
    }
  }, [selectedHybridVehicleValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedModelObject) {
      setLoadingComparisonVehicelImage(true);
      var date = moment(selectedComparisonVehicle.productionTime, "DD-MM-YYYY");
      const production_year = date.get("year");
      const production_month = date.format("MM");
      const suitableDimension = pickSuitableDimension(width);

      const comparisonVehicleUrl = `https://services.tmca.rotorint.com/v1/image/vehicle/360s/hi/${suitableDimension}/${production_year}/${production_month}/${selectedComparisonVehicle.materialCode}_${angle}.${file_extension}`;
      setSelectedComparisonVehicleUrl(comparisonVehicleUrl);

      var myImg = new Image();
      myImg.onload = function() {
        setTimeout(() => {
          setLoadingComparisonVehicelImage(false);
        }, 2500);
      };
      myImg.src = comparisonVehicleUrl;
    }
  }, [selectedComparisonVehicle]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeModel = (value: string) => {
    const modelList = models.filter((item: any) => item.id === value);
    if (modelList.length > 0) {
      setComparisonOptions(tranformSubModelToOptions(modelList[0].comparison));
      setHybridOptions(tranformSubModelToOptions(modelList[0].hybrid));
      setSelectedModel(value);
      setSelectedModelObject(modelList[0]);
    }
  };

  const handleComparisonChange = (value: any) => {
    const comparisonList = selectedModelObject.comparison.filter(
      (item: any) => item.materialCode === value
    );
    if (comparisonList.length > 0) {
      setSelectedComparisonVehicle(comparisonList[0]);
      setSelectedComparisonVehicleValue(comparisonList[0].materialCode);
    }
  };

  const handleHybridChange = (value: any) => {
    const hybridList = selectedModelObject.hybrid.filter(
      (item: any) => item.materialCode === value
    );
    if (hybridList.length > 0) {
      setSelectedHybridVehicle(hybridList[0]);
      setSelectedHybridVehicleValue(hybridList[0].materialCode);
    }
  };
  const runCalculateData = () => {
    if (
      fuelPrice &&
      kmsPerYear &&
      selectedComparisonVehicle.grade &&
      selectedHybridVehicle.grade
    ) {
      const comparisonData = calculateData(
        fuelPrice,
        kmsPerYear,
        selectedComparisonVehicle,
        selectedHybridVehicle
      );

      onChange({ ...comparisonData, selectedModel });
    }
  };
  useEffect(() => {
    runCalculateData();
  }, [selectedComparisonVehicle, selectedHybridVehicle, fuelPrice, kmsPerYear]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ComparisonStepsSection">
      <ComparisonStep index={1}>
        <p className="body1 text-center no-margin personalise-text">
          Personalise your driving information to estimate your hybrid saving
        </p>
        <div className="text-center flexBox">
          <div className="inputGroup flexInput fuel-text-area">
            <p className="body1 no-margin">
              <label>Fuel cost per litre </label>
              <Input
                onChange={setFuelPrice}
                value={fuelPrice}
                currency
                suffix="[3]"
              />
            </p>
          </div>
          <div className="inputGroup flexInput km-text-area">
            <p className="body1 no-margin">
              <label>Km's driven per year: </label>
              <Input onChange={setKmsPerYear} value={kmsPerYear} suffix="[4]" />
            </p>
          </div>
        </div>
      </ComparisonStep>
      <ComparisonStep index={2}>
        <div className="carComparisionArea text-center">
          <span className="body1">I want to compare </span>
          <div className="compareVehicle">
            <Select
              options={defaultModelsOptions}
              value={selectedModel}
              onChange={changeModel}
            />
          </div>
          <span className="body1">vehicles</span>
        </div>
        <div className="container">
          <div className="text-center flexBox">
            <div className="inputGroup flexInput">
              <p className="captionText">Comparison vehicle</p>
              <div className="comparisonVehicle">
                <Select
                  className="comparisonVehicleDropdown"
                  options={comparisonOptions}
                  value={selectedComparisonVehicleValue}
                  onChange={handleComparisonChange}
                />
              </div>
            </div>
            <div className="inputGroup flexInput">
              <p className="captionText">Hybrid vehicle </p>
              <div className="comparisonVehicle ">
                <Select
                  className="comparisonVehicleDropdown"
                  options={hybridOptions}
                  value={selectedHybridVehicleValue}
                  onChange={handleHybridChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="carPictureContainer">
          <div className="carPicture left">
            {loadingComparisonVehicelImage ? (
              <div className="loadingBox">
                <div className="lds-dual-ring"></div>
              </div>
            ) : (
              <img
                src={selectedComparisonVehicleUrl}
                alt={selectedComparisonVehicleUrl}
              />
            )}
          </div>
          <div className="carPicture right">
            {loadingHybridVehicelImage ? (
              <div className="loadingBox">
                <div className="lds-dual-ring"></div>
              </div>
            ) : (
              <img
                src={selectedHybridVehicleUrl}
                alt={selectedHybridVehicleUrl}
              />
            )}
          </div>
          <div className="hiddenContainer">
            <img
              src={selectedHybridVehicleUrl}
              alt={selectedHybridVehicleUrl}
            />
          </div>
        </div>
      </ComparisonStep>
    </div>
  );
}
