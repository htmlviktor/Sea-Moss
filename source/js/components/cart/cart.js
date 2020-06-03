import React from 'react';

export const Cart = ({items}) => {
    return (
        <div>
            <ul style={{padding: '0'}}>
                {items.map(el => (
                    <li key={el.title} style={{listStyle: 'none', color: 'white'}}>{el.title}</li>
                ))}
            </ul>
        </div>
    )
}