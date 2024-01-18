
 const formatprice = (price:Number)=>{
        const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
        const formated = new Intl.NumberFormat('vi-VN', config).format(price);
        return formated
    }
    export default formatprice