import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './TotalItems.css';

const TotalItems = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const [allUserData, setAllUserData] = useState([]);
    const [seenItems, setSeenItems] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/albums"
                );
                setAllUserData(response.data)
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    const filteredData = allUserData.filter(item => item.userId === parseInt(userId));

    const markAsSeen = (index) => {
        const updatedSeenItems = [...seenItems];
        updatedSeenItems.push(index);
        setSeenItems(updatedSeenItems);
    }

    const isSeen = (index) => {
        return seenItems.includes(index);
    }

    const handleClick = (index) => {
        if (!isSeen(index)) {
            setClickedIndex(index);
            markAsSeen(index);
        } else {
            // If the item is already seen, removing it from seenItems
            const updatedSeenItems = seenItems.filter(item => item !== index);
            setSeenItems(updatedSeenItems);
        }
    }

    const renderItems = () => {
        return filteredData.map((item, index) => (
            <div
                key={index}
                className="total-item-box"
                style={{
                    backgroundColor: clickedIndex === index ? 'red' : isSeen(index) ? 'gray' : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    color: clickedIndex === index ? 'white' : 'black'
                }}
                onClick={() => handleClick(index)}
            >
                <span className="total-item-text">{item.title}</span>
                {isSeen(index) && <span className="seen-text">Seen</span>}
            </div>
        ));
    }

    const unseenItemCount = filteredData.length - seenItems.length;

    return (
        <div className="Allboxes">
            <header className="Headeritems">
                <a href="https://ayushshuklas.netlify.com" target="_blank" className="Header-link">User ID: {userId}</a>
            </header>
            <div className="total-items-container">

                <div className="total-items-box">
                    <h2>Total Items: {Math.max(unseenItemCount, 0)}</h2>
                    <div className="total-items-list">
                        {renderItems()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalItems;
