import React from "react";
import Form from "./form";
import Results from "./results";


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
    
    return (
    <>
        <h1>AiBrandWriter</h1>
        {displayedElement}
       

    </>
    );
};

export default AiBrandWriter;