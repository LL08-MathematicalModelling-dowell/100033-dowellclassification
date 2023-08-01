import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ClassificationType from "./ClassificationType";

const JsonData = () => {
  const [loading, setLoading] = useState(false);
  const [dbInsertedId, setDbInsertedId] = useState("");
  const [showDbInsertId, setShowDbInsertId] = useState(false);
  const [copied, setCopied] = useState(false);
  const [next, setNext] = useState(false);
  const [showClassification, setShowClassification] = useState(false);

  /// TextArea
  const [textArea, setTextArea] = useState();
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const handleCopy = () => {
    const copyText = JSON.parse(dbInsertedId);
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
    setTimeout(() => {
      setShowDbInsertId(false);
    }, 1000);
  };

  const handleNext = () => {
    setShowClassification(true);
  };

  const shortPlaceHolder = `{
        "country":[
              {
                 "item":"India",
                 "itemLink":"Asia"
              },
              {
                 "item":"USA",
                 "itemLink":"North America"
              },
              {
                 "item":"Germany",
                 "itemLink":"Europe"
              }
        ]
}`;
  const placeHolder = `{
        "country":[
              {
                 "item":"India",
                 "itemLink":"Asia"
              },
              {
                 "item":"USA",
                 "itemLink":"North America"
              },
              {
                 "item":"Germany",
                 "itemLink":"Europe"
              }
        ],
        "state":[
              {
                 "item":"Uttar Pradesh",
                 "itemLink":"India"
              },
              {
                 "item":"Maharashtra",
                 "itemLink":"India"
              },
              {
                 "item":"Georgia",
                 "itemLink":"USA"
              },
              {
                 "item":"Nevada",
                 "itemLink":"USA"
              },
              {
                 "item":"Bavaria",
                 "itemLink":"Germany"
              },
              {
                 "item":"Brandenburg",
                 "itemLink":"Germany"
              }
        ],
        "city":[
              {
                 "item":"Agra",
                 "itemLink":"Uttar Pradesh"
              },
              {
                 "item":"Noida",
                 "itemLink":"Uttar Pradesh"
              },
              {
                 "item":"Pune",
                 "itemLink":"Maharashtra"
              },
              {
                 "item":"Mumbai",
                 "itemLink":"Maharashtra"
              },
              {
                 "item":"Atlanta",
                 "itemLink":"Georgia"
              },
              {
                 "item":"Carson City",
                 "itemLink":"Nevada"
              },
              {
                 "item":"Munich",
                 "itemLink":"Bavaria"
              },
              {
                 "item":"Potsdam",
                 "itemLink":"Brandenburg"
              }
        ]
     }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textArea !== undefined) {
      setLoading(true);
      const myData = textArea;
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://100061.pythonanywhere.com/allbaskets/",
        headers: {},
        data: myData,
      };
      axios(config)
        .then(function (response) {
          setLoading(false);
          var myDbInsertedId = JSON.stringify(response.data.dbInsertedId);
          setDbInsertedId(myDbInsertedId);
          setShowDbInsertId(true);
          setNext(true);
        })
        .catch(function (error) {
          console.log(error);
          setShowDbInsertId(false);
          setNext(false);
        });
    } else {
      alert("Write some data...!");
    }
  };

  return (
    <>
      {showClassification ? (
        <ClassificationType />
      ) : (
        <div className="flex flex-col items-center justify-center">
          {loading && (
            <img
              className="absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px]"
              src="loader1.gif"
              alt="loader"
            />
          )}
          {showDbInsertId && (
            <div className="absolute left-0 right-0 top-0 bottom-0 [margin:auto] z-10 w-[300px] h-16">
              <div className="relative bg-slate-800 w-[300px] h-16 rounded flex items-center justify-start ">
                <div className="text-white text-[12px] px-1">
                  dbInsertedId:{" "}
                  <span className="text-orange-400 font-semibold">
                    {dbInsertedId}
                  </span>
                </div>
                {copied && (
                  <p className="text-[12px] font-bold py-1 px-2 absolute z-30 right-[50%] bg-slate-100 rounded ">
                    Copied!
                  </p>
                )}
              </div>

              <div
                onClick={handleCopy}
                className="absolute right-0 top-0 rounded-r z-10 w-[50px] h-16 bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200"
              >
                <div className="relative">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9.5C2 9.77614 2.22386 10 2.5 10H3V11H2.5C1.67157 11 1 10.3284 1 9.5V2.5C1 1.67157 1.67157 1 2.5 1H9.5C10.3284 1 11 1.67157 11 2.5V3H10V2.5C10 2.22386 9.77614 2 9.5 2H2.5C2.22386 2 2 2.22386 2 2.5V9.5Z"
                      fill="#6B6B6B"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.5 5C5.67157 5 5 5.67157 5 6.5V13.5C5 14.3284 5.67157 15 6.5 15H13.5C14.3284 15 15 14.3284 15 13.5V6.5C15 5.67157 14.3284 5 13.5 5H6.5ZM6 6.5C6 6.22386 6.22386 6 6.5 6H13.5C13.7761 6 14 6.22386 14 6.5V13.5C14 13.7761 13.7761 14 13.5 14H6.5C6.22386 14 6 13.7761 6 13.5V6.5Z"
                      fill="#6B6B6B"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          )}
          <h1 className="text-[24px] font-semibold mb-5">All Baskets</h1>
          <CodeEditor
            value={textArea}
            language="json"
            placeholder={shortPlaceHolder}
            onChange={(evn) => {
              setCode(evn.target.value);
              setTextArea(evn.target.value);
            }}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              width: "500px",
              height: "320px",
              overflowY: "scroll",
            }}
          />
          {next ? (
            <div className="flex items-center justify-around w-[90%] py-4 animate-pulse">
              <button
                onClick={handleNext}
                className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-6 rounded hover:bg-purple-600"
                type="button"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-around w-[90%] py-4">
              <button
                onClick={handleSubmit}
                className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
                type="button"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JsonData;
