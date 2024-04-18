

const Card = ({image, value, suit}) => {

    return (
        <span>
            <img src={image} alt={`${value} of ${suit}`}/>
        </span>
    )

}
export default Card;