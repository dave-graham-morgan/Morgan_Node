import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Card from "./Card.jsx";

function Deck(){
    const deckIdRef = useRef();
    const [cards, setCards] = useState([]);
    const [remainingCards, setRemainingCards] = useState();
    const getNewDeck = useRef();


    const fetchDeckId = async () => {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        deckIdRef.current = response.data.deck_id;
        setRemainingCards(response.data.remaining)
        setCards([])
    }

    useEffect(()=>{
        fetchDeckId();
    },[]);

    const drawCard = async () => {
        if(deckIdRef.current){
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`)
            setRemainingCards(response.data.remaining)
            const newCard = response.data.cards[0];
            const cardElement = <Card key={newCard.code} image={newCard.image} val={newCard.value} suit={newCard.suit} />
            setCards(prevCards => [...prevCards, cardElement]);

        }else{
            console.error("deck ID not set")
        }
    }

    return (
        <>
            <h1>we're rolling!</h1>
            {remainingCards > 0 ? `${remainingCards} are left in the deck` : ""}
            <div>
                {remainingCards>0 ? <button onClick={drawCard}>draw</button> : ""}
                {<button onClick={fetchDeckId}>Shuffle</button>}
            </div>
            <div>
            {cards}
            </div>

        </>
    )
}

export default Deck