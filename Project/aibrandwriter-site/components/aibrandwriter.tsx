import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/Color logo - no background.svg";

const AiBrandWriter: React.FC = () => {
    const CHARACTER_LIMIT: number = 32;

    const ENDPOINT: string =
        "https://dmhpx84iok.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords";
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const onSubmit = ()=> {
        console.log("Submitting: " + prompt);
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
        
    };
    
    const onResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false);

    };

    const onReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
      };

    let displayedElement = null;

    if (hasResult) {
        displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt}/>; 
    }
        else {
        displayedElement = (
            <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT}/>

        );
    }
    
    const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <Image src={logo} width={100} height={100} alt={"AiBrandWriter"} />
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              AiBrandWriter
            </h1>
            <div className={gradientTextStyle}>Powerful GPT-3 AI Assistant</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};


export default AiBrandWriter;