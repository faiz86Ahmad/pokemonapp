import React from 'react';
import "./style.css";

const Card = ({pokemon}) => {
    return (
        <div className="Card">
            <div className="Card__img">
        <img src={pokemon.sprites.back_shiny} alt="" />
            </div>
            <div className="Card__name">
                {pokemon.name}
            </div>
            <div className="Card__types">
                {
                    pokemon.types.map(type=>{
                        return (
                            <div className="Card__type">
                 {type.type.name}               
                            </div>

                        )
                    })
                }
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--wieght">
                    <p className="title">weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="Card__data Card__data--height">
                    <p className="title">height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="Card__data Card__data--height">
                    <p className="title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
            
        </div>
    )
}

export default Card
