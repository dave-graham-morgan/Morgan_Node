import React,{useState, useEffect} from "react";
import Joke2 from "./Joke2.js";
import axios from "axios";
// import Joke from "./Joke";

function JokeList2(){
    const NUM_JOKES_TO_GET = 5
    const [jokeList, setJokeList] = useState({jokes:[], isLoading:false});

    useEffect(()=> {
        setJokeList({ isLoading: true});
        getJokes();
    },[])

    const generateNewJokes = () => {
        setJokeList({isLoading: true});
        getJokes();
    }

    async function getJokes() {
        try {
            // load jokes one at a time, adding not-yet-seen jokes
            let jokes = [];
            let seenJokes = new Set();

            while (jokes.length < NUM_JOKES_TO_GET) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });
                let { ...joke } = res.data;

                if (!seenJokes.has(joke.id)) {
                    seenJokes.add(joke.id);
                    jokes.push({ ...joke, votes: 0 });
                } else {
                    console.log("duplicate found!");
                }
            }

            setJokeList({ jokes, isLoading: false });

        } catch (err) {
            console.error(err);
        }
    }

    /* change vote for this id by delta (+1 or -1) */
    function vote(id, delta) {
        console.log(jokeList);
        setJokeList(prevState => ({
            ...prevState,
            jokes: prevState.jokes.map(j =>
                j.id === id ? { ...j, votes: j.votes + delta } : j
            )
        }));
    console.log(jokeList);
    }

    let sortedJokes = Array.isArray(jokeList.jokes) ? [...jokeList.jokes].sort((a, b) => b.votes - a.votes) : [];


    return (
        <div className="JokeList">
            <button
                className="JokeList-getmore"
                onClick={generateNewJokes}
            >
                Get New Jokes
            </button>
            {sortedJokes.map(j => (
                <Joke2
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={vote}
                />
            ))}
        </div>
    );
}
export default JokeList2