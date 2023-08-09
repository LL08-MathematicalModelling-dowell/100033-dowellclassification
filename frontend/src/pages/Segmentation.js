import React, { useState } from "react";

const Segmentation = () => {
  const [loading, setLoading] = useState(false);

  const [submit, setSubmit] = useState(false);

  //Levels to show
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [level4, setLevel4] = useState(false);
  const [level5, setLevel5] = useState(false);

  // Selected Segmentation for all levels
  const [segmentationLevel1, setSegmentationLevel1] = useState(
    "Segmentation Type L-1"
  );
  const [segmentationLevel2, setSegmentationLevel2] = useState(
    "Segmentation Type L-2"
  );
  const [segmentationLevel3, setSegmentationLevel3] = useState(
    "Segmentation Type L-3"
  );
  const [segmentationLevel4, setSegmentationLevel4] = useState(
    "Segmentation Type L-4"
  );
  const [segmentationLevel5, setSegmentationLevel5] = useState(
    "Segmentation Type L-5"
  );

  //// Selected Basis of Segmentation all levels
  const [bsl1, setBsl1] = useState("Basis of Segmentation L-1");
  const [bsl2, setBsl2] = useState("Basis of Segmentation L-2");
  const [bsl3, setBsl3] = useState("Basis of Segmentation L-3");
  const [bsl4, setBsl4] = useState("Basis of Segmentation L-4");
  const [bsl5, setBsl5] = useState("Basis of Segmentation L-5");

  //// Selected Value for Segmentation all levels
  const [vsl1, setVsl1] = useState("Value for Segmentation L-1");
  const [vsl2, setVsl2] = useState("Value for Segmentation L-2");
  const [vsl3, setVsl3] = useState("Value for Segmentation L-3");
  const [vsl4, setVsl4] = useState("Value for Segmentation L-4");
  const [vsl5, setVsl5] = useState("Value for Segmentation L-5");

  //// Segmentation Lists
  const GeographicList = ["Region Wise"];
  //// GeographicList SUB Segmentations
  const regionWise = [
    "North Zone",
    "South Zone",
    "East Zone",
    "West Zone",
    "Centre Zone",
  ];
  //// Segmentation Lists
  const DemographicList = [
    "Income",
    "Education",
    "Occupation",
    "Family Size",
    "Age",
    "Gender",
  ];
  //// DemographicList SUB Segmentations
  const incomeWise = [
    "< 3 lacs",
    "3 - 6 lacs",
    "6 - 9 lacs",
    "9 - 12 lacs",
    "12 - 15 lacs",
    "15 - 18 lacs",
    "18 - 21 lacs",
    "21 - 24 lacs",
    "> 24 lacs",
  ];
  const educationWise = [
    "School < 5 yrs.",
    "School 5 - 9 yrs",
    "SSC/ HSC",
    "Under-graduate",
    "Graduate/ PG - Gen.",
    "Graduate/ PG – Prof.",
  ];
  const occupationWise = [
    "Unskilled worker",
    "Skilled worker",
    "Petty Trader",
    "Shop owners",
    "Businessman/ Ind: no empl",
    "Businessman/ Ind: 1 - 9 empl",
    "Businessman/ Ind : 10+ empl",
    "Self employed professional",
    "Clerical/ Salesman",
    "Supervisory level",
    "Officer/ Exec – junior",
    "Officer/ Exec - middle/ senior",
  ];
  const familySizeWise = ["1-2", "3-4", "5+"];
  const ageWise = ["<18", "18+", "25 - 30", "30+"];
  const genderWise = ["Male", "Female"];

  //// Segmentation Lists
  const BehaviouralList = [
    "Benefits Segmentation",
    "Occasion Segmentation",
    "Roles",
  ];
  //// BehaviouralList SUB Segmentations
  const benefitsWise = [
    "convenience",
    "long lasting",
    "economy",
    "value for money",
    "mobility",
  ];
  const occasionWise = ["Home", "Work", "Leisure", "Personal", "Gift"];
  const roleWise = [
    "Initiator",
    "Influencer",
    "Decider",
    "Gatekeeper",
    "Buyer",
    "User",
  ];

  //// Segmentation Lists
  const PsychographicList = [
    "Lifestyle",
    "Attitude",
    "Customer IQ",
    "Personality",
  ];
  //// PsychographicList SUB Segmentations
  const lifestyleWise = ["modern", "traditional"];
  const attitudeWise = [
    "Innovators",
    "Early adopters",
    "Early majority",
    "Late majority",
    "Laggards",
  ];
  const customerIqWise = [
    "Above 140 - Near genius or genius",
    "120–140 - Very superior intelligence",
    "110–120 - Superior intelligence",
    "90–110 - Normal, or Average",
    "Intelligence Below 90 - Below Average",
  ];
  const personalityWise = ["Using 16 Personality Model"];

  //// Segmentation Lists
  const UsageList = [
    "Usage Rate",
    "Awareness Status",
    "Purpose",
    "Brand Loyalty",
  ];
  //// UsageList SUB Segmentations
  const usageRateWise = [
    "Heavy users",
    "medium users",
    "light users",
    "non users",
    "frequency, period, quantity",
  ];
  const awarenessWise = ["Unaware", "aware", "interested", "enthusiastic"];
  const purposeWise = ["Home", "office", "gift"];
  const brandLoyaltyWise = ["None", "Some", "Strong"];

  const [inputsData, setInputsData] = useState({
    cityCode: "City Code",
    numberOfLevels: "Number of Levels",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setInputsData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputsData(() => {
      return {
        cityCode: "City Code",
        numberOfLevels: "Number of Levels",
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputsData.cityCode === "City Code") {
      alert("Select the City Code");
    } else if (inputsData.numberOfLevels === "Number of Levels") {
      alert("Select the Number of Levels");
    } else {
      console.log("cityCode: ", inputsData.cityCode);
      console.log("numberOfLevels: ", inputsData.numberOfLevels);
      setSubmit(true);
      if (parseInt(inputsData.numberOfLevels) === 1) {
        setLevel1(true);
      } else if (parseInt(inputsData.numberOfLevels) === 2) {
        setLevel1(true);
        setLevel2(true);
      } else if (parseInt(inputsData.numberOfLevels) === 3) {
        setLevel1(true);
        setLevel2(true);
        setLevel3(true);
      } else if (parseInt(inputsData.numberOfLevels) === 4) {
        setLevel1(true);
        setLevel2(true);
        setLevel3(true);
        setLevel4(true);
      } else if (parseInt(inputsData.numberOfLevels) === 5) {
        setLevel1(true);
        setLevel2(true);
        setLevel3(true);
        setLevel4(true);
        setLevel5(true);
      } else {
      }
    }
  };

  const handleAllReset = () => {
    setSegmentationLevel1("Segmentation Type L-1");
    setSegmentationLevel2("Segmentation Type L-2");
    setSegmentationLevel3("Segmentation Type L-3");
    setSegmentationLevel4("Segmentation Type L-4");
    setSegmentationLevel5("Segmentation Type L-5");

    setBsl1("Basis of Segmentation L-1");
    setBsl2("Basis of Segmentation L-2");
    setBsl3("Basis of Segmentation L-3");
    setBsl4("Basis of Segmentation L-4");
    setBsl5("Basis of Segmentation L-5");

    setVsl1("Value for Segmentation L-1");
    setVsl2("Value for Segmentation L-2");
    setVsl3("Value for Segmentation L-3");
    setVsl4("Value for Segmentation L-4");
    setVsl5("Value for Segmentation L-5");
  };

  const handleAllSubmit = () => {
    if (parseInt(inputsData.numberOfLevels) === 5) {
      console.log("Level 1: ", segmentationLevel1, " > ", bsl1, " > ", vsl1);
      console.log("Level 2: ", segmentationLevel2, " > ", bsl2, " > ", vsl2);
      console.log("Level 3: ", segmentationLevel3, " > ", bsl3, " > ", vsl3);
      console.log("Level 4: ", segmentationLevel4, " > ", bsl4, " > ", vsl4);
      console.log("Level 5: ", segmentationLevel5, " > ", bsl5, " > ", vsl5);
    } else if (parseInt(inputsData.numberOfLevels) === 4) {
      console.log("Level 1: ", segmentationLevel1, " > ", bsl1, " > ", vsl1);
      console.log("Level 2: ", segmentationLevel2, " > ", bsl2, " > ", vsl2);
      console.log("Level 3: ", segmentationLevel3, " > ", bsl3, " > ", vsl3);
      console.log("Level 4: ", segmentationLevel4, " > ", bsl4, " > ", vsl4);
    } else if (parseInt(inputsData.numberOfLevels) === 3) {
      console.log("Level 1: ", segmentationLevel1, " > ", bsl1, " > ", vsl1);
      console.log("Level 2: ", segmentationLevel2, " > ", bsl2, " > ", vsl2);
      console.log("Level 3: ", segmentationLevel3, " > ", bsl3, " > ", vsl3);
    } else if (parseInt(inputsData.numberOfLevels) === 2) {
      console.log("Level 1: ", segmentationLevel1, " > ", bsl1, " > ", vsl1);
      console.log("Level 2: ", segmentationLevel2, " > ", bsl2, " > ", vsl2);
    } else if (parseInt(inputsData.numberOfLevels) === 1) {
      console.log("Level 1: ", segmentationLevel1, " > ", bsl1, " > ", vsl1);
    }
  };

  return (
    <div className="">
      <form className="relative py-5 px-10 flex flex-col items-center justify-center">
        {loading && (
          <img
            className="absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]"
            src="loader1.gif"
            alt="loader"
          />
        )}

        <h1 className="text-[24px] font-semibold mb-5">Segmentation</h1>
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <select
              value={inputsData.cityCode}
              onChange={handleInputs}
              name="cityCode"
              className="relative w-[220px] h-[26px] outline-none"
            >
              <option className="text-center" hidden>
                City Code
              </option>
              <option className="text-center" value="city1">
                city1
              </option>
              <option className="text-center" value="city2">
                city2
              </option>
              <option className="text-center" value="city3">
                city3
              </option>
              <option className="text-center" value="city4">
                city4
              </option>
              <option className="text-center" value="city5">
                city5
              </option>
              <option className="text-center" value="city6">
                city6
              </option>
              <option className="text-center" value="city7">
                city7
              </option>
              <option className="text-center" value="city8">
                city8
              </option>
              <option className="text-center" value="city9">
                city9
              </option>
              <option className="text-center" value="city10">
                city10
              </option>
            </select>
          </div>
          <div>
            <select
              value={inputsData.numberOfLevels}
              onChange={handleInputs}
              className="relative w-[220px] h-[26px] outline-none"
              name="numberOfLevels"
            >
              <option className="text-center" hidden>
                Number of Levels
              </option>
              <option className="text-center" value="1">
                1
              </option>
              <option className="text-center" value="2">
                2
              </option>
              <option className="text-center" value="3">
                3
              </option>
              <option className="text-center" value="4">
                4
              </option>
              <option className="text-center" value="5">
                5
              </option>
            </select>
          </div>
        </div>
        {submit ? (
          ""
        ) : (
          <div className="flex items-center justify-center w-[90%] py-5 gap-5">
            <button
              onClick={handleSubmit}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              Submit
            </button>

            <button
              onClick={handleReset}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              Reset
            </button>
          </div>
        )}

        {level1 && (
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[20px] font-semibold">Level 1</h1>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <select
                onChange={(e) => setSegmentationLevel1(e.target.value)}
                value={segmentationLevel1}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  {segmentationLevel1}
                </option>
                <option className="text-center" value="Geographic Segmentation">
                  Geographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Demographic Segmentation"
                >
                  Demographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Behavioural Segmentation"
                >
                  Behavioural Segmentation
                </option>
                <option
                  className="text-center"
                  value="Psychographic Segmentation"
                >
                  Psychographic Segmentation
                </option>
                <option className="text-center" value="Usage Segmentation">
                  Usage Segmentation
                </option>
              </select>

              <select
                onChange={(e) => setBsl1(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Basis of Segmentation L-1
                </option>
                {segmentationLevel1 === "Geographic Segmentation" &&
                  GeographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel1 === "Demographic Segmentation" &&
                  DemographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel1 === "Behavioural Segmentation" &&
                  BehaviouralList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel1 === "Psychographic Segmentation" &&
                  PsychographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel1 === "Usage Segmentation" &&
                  UsageList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setVsl1(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Value for Segmentation L-1
                </option>
                {bsl1 === "Region Wise" &&
                  regionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Income" &&
                  incomeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Education" &&
                  educationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Occupation" &&
                  occupationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Family Size" &&
                  familySizeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Age" &&
                  ageWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Gender" &&
                  genderWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Benefits Segmentation" &&
                  benefitsWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Occasion Segmentation" &&
                  occasionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Roles" &&
                  roleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Lifestyle" &&
                  lifestyleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Attitude" &&
                  attitudeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Customer IQ" &&
                  customerIqWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Personality" &&
                  personalityWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Usage Rate" &&
                  usageRateWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Awareness Status" &&
                  awarenessWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Purpose" &&
                  purposeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl1 === "Brand Loyalty" &&
                  brandLoyaltyWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {level2 && (
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[20px] font-semibold">Level 2</h1>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <select
                onChange={(e) => setSegmentationLevel2(e.target.value)}
                value={segmentationLevel2}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  {segmentationLevel2}
                </option>
                <option className="text-center" value="Geographic Segmentation">
                  Geographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Demographic Segmentation"
                >
                  Demographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Behavioural Segmentation"
                >
                  Behavioural Segmentation
                </option>
                <option
                  className="text-center"
                  value="Psychographic Segmentation"
                >
                  Psychographic Segmentation
                </option>
                <option className="text-center" value="Usage Segmentation">
                  Usage Segmentation
                </option>
              </select>

              <select
                onChange={(e) => setBsl2(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Basis of Segmentation L-2
                </option>
                {segmentationLevel2 === "Geographic Segmentation" &&
                  GeographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel2 === "Demographic Segmentation" &&
                  DemographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel2 === "Behavioural Segmentation" &&
                  BehaviouralList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel2 === "Psychographic Segmentation" &&
                  PsychographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel2 === "Usage Segmentation" &&
                  UsageList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setVsl2(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Value for Segmentation L-2
                </option>
                {bsl2 === "Region Wise" &&
                  regionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Income" &&
                  incomeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Education" &&
                  educationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Occupation" &&
                  occupationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Family Size" &&
                  familySizeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Age" &&
                  ageWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Gender" &&
                  genderWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Benefits Segmentation" &&
                  benefitsWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Occasion Segmentation" &&
                  occasionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Roles" &&
                  roleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Lifestyle" &&
                  lifestyleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Attitude" &&
                  attitudeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Customer IQ" &&
                  customerIqWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Personality" &&
                  personalityWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Usage Rate" &&
                  usageRateWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Awareness Status" &&
                  awarenessWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Purpose" &&
                  purposeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl2 === "Brand Loyalty" &&
                  brandLoyaltyWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {level3 && (
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[20px] font-semibold">Level 3</h1>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <select
                onChange={(e) => setSegmentationLevel3(e.target.value)}
                value={segmentationLevel3}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  {segmentationLevel3}
                </option>
                <option className="text-center" value="Geographic Segmentation">
                  Geographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Demographic Segmentation"
                >
                  Demographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Behavioural Segmentation"
                >
                  Behavioural Segmentation
                </option>
                <option
                  className="text-center"
                  value="Psychographic Segmentation"
                >
                  Psychographic Segmentation
                </option>
                <option className="text-center" value="Usage Segmentation">
                  Usage Segmentation
                </option>
              </select>

              <select
                onChange={(e) => setBsl3(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Basis of Segmentation L-3
                </option>
                {segmentationLevel3 === "Geographic Segmentation" &&
                  GeographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel3 === "Demographic Segmentation" &&
                  DemographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel3 === "Behavioural Segmentation" &&
                  BehaviouralList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel3 === "Psychographic Segmentation" &&
                  PsychographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel3 === "Usage Segmentation" &&
                  UsageList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setVsl3(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Value for Segmentation L-3
                </option>
                {bsl3 === "Region Wise" &&
                  regionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Income" &&
                  incomeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Education" &&
                  educationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Occupation" &&
                  occupationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Family Size" &&
                  familySizeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Age" &&
                  ageWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Gender" &&
                  genderWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Benefits Segmentation" &&
                  benefitsWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Occasion Segmentation" &&
                  occasionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Roles" &&
                  roleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Lifestyle" &&
                  lifestyleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Attitude" &&
                  attitudeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Customer IQ" &&
                  customerIqWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Personality" &&
                  personalityWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Usage Rate" &&
                  usageRateWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Awareness Status" &&
                  awarenessWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Purpose" &&
                  purposeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl3 === "Brand Loyalty" &&
                  brandLoyaltyWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {level4 && (
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[20px] font-semibold">Level 4</h1>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <select
                onChange={(e) => setSegmentationLevel4(e.target.value)}
                value={segmentationLevel4}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  {segmentationLevel4}
                </option>
                <option className="text-center" value="Geographic Segmentation">
                  Geographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Demographic Segmentation"
                >
                  Demographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Behavioural Segmentation"
                >
                  Behavioural Segmentation
                </option>
                <option
                  className="text-center"
                  value="Psychographic Segmentation"
                >
                  Psychographic Segmentation
                </option>
                <option className="text-center" value="Usage Segmentation">
                  Usage Segmentation
                </option>
              </select>

              <select
                onChange={(e) => setBsl4(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Basis of Segmentation L-4
                </option>
                {segmentationLevel4 === "Geographic Segmentation" &&
                  GeographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel4 === "Demographic Segmentation" &&
                  DemographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel4 === "Behavioural Segmentation" &&
                  BehaviouralList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel4 === "Psychographic Segmentation" &&
                  PsychographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel4 === "Usage Segmentation" &&
                  UsageList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setVsl4(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Value for Segmentation L-4
                </option>
                {bsl4 === "Region Wise" &&
                  regionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Income" &&
                  incomeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Education" &&
                  educationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Occupation" &&
                  occupationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Family Size" &&
                  familySizeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Age" &&
                  ageWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Gender" &&
                  genderWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Benefits Segmentation" &&
                  benefitsWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Occasion Segmentation" &&
                  occasionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Roles" &&
                  roleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Lifestyle" &&
                  lifestyleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Attitude" &&
                  attitudeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Customer IQ" &&
                  customerIqWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Personality" &&
                  personalityWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Usage Rate" &&
                  usageRateWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Awareness Status" &&
                  awarenessWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Purpose" &&
                  purposeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl4 === "Brand Loyalty" &&
                  brandLoyaltyWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {level5 && (
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[20px] font-semibold">Level 5</h1>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <select
                onChange={(e) => setSegmentationLevel5(e.target.value)}
                value={segmentationLevel5}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  {segmentationLevel5}
                </option>
                <option className="text-center" value="Geographic Segmentation">
                  Geographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Demographic Segmentation"
                >
                  Demographic Segmentation
                </option>
                <option
                  className="text-center"
                  value="Behavioural Segmentation"
                >
                  Behavioural Segmentation
                </option>
                <option
                  className="text-center"
                  value="Psychographic Segmentation"
                >
                  Psychographic Segmentation
                </option>
                <option className="text-center" value="Usage Segmentation">
                  Usage Segmentation
                </option>
              </select>

              <select
                onChange={(e) => setBsl5(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Basis of Segmentation L-5
                </option>
                {segmentationLevel5 === "Geographic Segmentation" &&
                  GeographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel5 === "Demographic Segmentation" &&
                  DemographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel5 === "Behavioural Segmentation" &&
                  BehaviouralList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel5 === "Psychographic Segmentation" &&
                  PsychographicList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {segmentationLevel5 === "Usage Segmentation" &&
                  UsageList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setVsl5(e.target.value)}
                className="relative w-[220px] h-[26px] outline-none"
              >
                <option className="text-center" hidden>
                  Value for Segmentation L-5
                </option>
                {bsl5 === "Region Wise" &&
                  regionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Income" &&
                  incomeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Education" &&
                  educationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Occupation" &&
                  occupationWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Family Size" &&
                  familySizeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Age" &&
                  ageWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Gender" &&
                  genderWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Benefits Segmentation" &&
                  benefitsWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Occasion Segmentation" &&
                  occasionWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Roles" &&
                  roleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Lifestyle" &&
                  lifestyleWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Attitude" &&
                  attitudeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Customer IQ" &&
                  customerIqWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Personality" &&
                  personalityWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Usage Rate" &&
                  usageRateWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Awareness Status" &&
                  awarenessWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Purpose" &&
                  purposeWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {bsl5 === "Brand Loyalty" &&
                  brandLoyaltyWise.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {submit && (
          <div className="flex items-center justify-center w-[90%] py-5 gap-5">
            <button
              onClick={handleAllSubmit}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              Submit
            </button>

            <button
              onClick={handleAllReset}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Segmentation;
