function CartItem({data}) {
    return (
        <div>
            <img src={data["product"].image}/>
            <div>{data["product"].name}</div>
        </div>
    )
}

export default CartItem