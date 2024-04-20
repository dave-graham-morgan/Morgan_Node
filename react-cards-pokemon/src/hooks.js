import React, {useEffect, useState} from 'react';
import axios from "axios";
import {v1 as uuid} from "uuid";

export const useFlip = (initialVal = false) => {
    const [isFlipped, setIsFlipped] = useState(initialVal);
    const flipIt = () => {
        setIsFlipped(isFlipped => !isFlipped);
    }
    return [isFlipped, flipIt];
}

export const useAxios = (initialData = []) => {
    const [data, setData] = useState(initialData);

    const fetchData = async (url) => {
        if (!url) return;
        try {
            const response = await axios.get(url);
            if (response && response.data && response.data.cards) {
                setData(prevData => [...prevData, ...response.data.cards.map(card => ({ ...card, id: uuid() }))]);
            }else if (response && response.data ){
                setData(prevData => [...prevData, { ...response.data, id: uuid() }]);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return [data, fetchData];
};
