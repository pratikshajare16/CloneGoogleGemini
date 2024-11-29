import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(
            function () {
                setResultData(prev => prev + nextWord)
            }, 75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        // Clear the result data and set the loading state to true
        setResultData("");
        setLoading(true);

        // Show the result container or component
        setShowResult(true);

        let response;

        // If a prompt is provided, use it; otherwise, use the `input` state
        if (prompt !== undefined) {
            // Call the `run` function with the provided prompt
            response = await run(prompt);

            // Store the recent prompt for future reference
            setRecentPrompt(prompt);
        } else {
            // Add the current input to the previous prompts
            setPrevPrompt(prev => [...prev, input]);

            // Store the input as the recent prompt
            setRecentPrompt(input);

            // Call the `run` function with the current input
            response = await run(input);
        }

        // Split the response into an array using "**" as the delimiter
        let responseArray = response.split("**");
        let newResponse = "";

        // Loop through the response array
        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 !== 1) {
                // If it's the first segment or an even index, add it as plain text
                newResponse += responseArray[i];
            } else {
                // If it's an odd index, wrap it in bold HTML tags
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // Replace single asterisks (*) with a line break (`<br>`)
        let newResponse2 = newResponse.split("*").join("</br>");

        // Split the updated response into individual words
        let newResponseArray = newResponse2.split(" ");

        // Loop through each word and display it with a delay
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];

            // Add each word with a delay, creating a typing effect
            delayPara(i, nextWord + " ");
        }

        // Set loading state to false after processing the response
        setLoading(false);

        // Clear the input field after submission
        setInput("");
    };


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        onSent,
        showResult,
        resultData,
        loading,
        newChat
    }


    return (

        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )
}

export default ContextProvider;