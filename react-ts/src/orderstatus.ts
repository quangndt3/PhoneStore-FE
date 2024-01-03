const orderStatus = (status:number)=>{
    
    if(status==0){
        return "Đơn hàng chờ xác nhận"
    }
    else if(status==1){
        return "Đang được chuẩn bị"
    }
    else if(status==2){
        return "Đang giao"
    }
    else if(status==3){
        return "Hoàn thành"
    }
    else if(status>3){
        return "Huỷ đơn"
    }
}
export default orderStatus