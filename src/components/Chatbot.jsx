import { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loading_Img from "../../public/loading.gif";
import { MdContentCopy } from "react-icons/md";
import { FaLeaf } from "react-icons/fa";

function CarbonFootprintTracker() {
  const [input, setInput] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const copyRef = useRef();

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API);
  // const genAI = new GoogleGenerativeAI("AIzaSyDlq52NhxA_saKlLOEhU5ZelcNGqceRQmU");

  const genText = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the prompt based on the specific activity
      const prompt = `Explain how the following activity contributes to the carbon footprint in detail: ${input}. Provide specific metrics or environmental impacts in a concise paragraph.`;

      const result = await model.generateContent(prompt);
      const response = result.response;

      const text = response.text();
      setInput("");
      setGeneratedText(text);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const onCopyText = () => {
    copyRef.current.select();
    document.execCommand("copy");
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="max-w-3xl w-full md:w-2/3 lg:w-1/2 mx-4 my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="flex text-3xl font-bold items-center justify-center mb-4 text-white bg-green-800 rounded-md">
          CFP for you Activities
          <div className="pl-1"><FaLeaf /></div>
        </h1>
        <div className="flex flex-col gap-2">
          <div className="cursor-pointer flex justify-end">
            <div
              className="flex bg-green-800 text-white px-2 py-2 rounded-md hover:bg-green-600"
              onClick={onCopyText}
            >
              Copy
              <div className="pt-1 pl-1"><MdContentCopy size={15} /></div>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="flex items-center justify-center border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-green-500">
                <img src="/loading.gif" alt="Loading" />
              </div>
            ) : (
              <div>
                <textarea
                  className="border border-gray-300 rounded-md p-4 w-full h-72 resize-none focus:outline-none focus:ring-2 focus:ring-green-800"
                  value={generatedText}
                  readOnly
                  placeholder="Generated carbon footprint analysis will appear here..."
                  ref={copyRef}
                ></textarea>
              </div>
            )}
          </div>
        </div>

        <div className="flex pt-4">
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-green-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter an activity (e.g., aeroplane flights, meat consumption)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                genText();
              }
            }}
          />
          <button
            className="ml-2 px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            onClick={genText}
          >
            Generate
          </button>
        </div>
        <div className="mt-8 border-gray-700 pt-8 flex flex-col items-center">
          <p className="text-sm">
            &copy; 2024 Carbo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarbonFootprintTracker;
