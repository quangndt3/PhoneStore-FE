import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponForm, CouponSchema } from "../../../models";
import { AppDispatch, RootState } from "../../../storage";
import { useDispatch, useSelector } from "react-redux";
import { addCoupons } from "../../slice/coupon.slice";
import notify from "../../../components/notify";
const CouponAdmin =()=>{
    const [inputState,SetInputState] = useState()
    const changeInputState = (n:number)=>{
        SetInputState(n)
    }
    const { coupons, isLoading } = useSelector((state: RootState) => state.coupon)
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<CouponForm>({
        resolver: yupResolver(CouponSchema),
      });
      const handleAddCoupon = async (coupon:CouponForm) => {
        try {
          const data = await dispatch(addCoupons(coupon)).unwrap()
          notify("success","Thêm mã giảm giá thành công")   

        } catch (err) {
          console.log(err);
        }
      }
      const onsubmit = (data:CouponForm) => {
        let err =0
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd ;
        
        if(formattedToday > data.couponEnd){
             err = 1
            notify("error","Ngày kết thúc mã giảm giá phải lớn hơn hoặc bằng hôm nay")
            return false
        }
        else if(data.couponStart> data.couponEnd){
            err = 1
            notify("error","Ngày kết thúc phải lớn hơn mày bắt dầu")
            return false
        }
        else if(inputState ==0 ){
            err= 1
            if(data.couponValue>=100 || data.couponValue<=0){
                notify("error","Phần trăm giảm phải lớn hơn 0 và nhỏ hơm 100")
                return false
            }
        }
        else if(inputState ==1 ){
            err= 1
            if(data.couponValue<=0){
                notify("error","Số giảm phải lớn hơn 0 ")
                return false
            }
        }
        data.couponStatus = inputState!
  
         
            handleAddCoupon(data)
        

        
        
        
      }
    return<>
    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 w-[1000px] ml-[100px] mt-[50px]">
        <form action="" className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
         
          <div>
            <label className="sr-only" >Name</label>
            <input
            {...register("title")}
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Chủ đề"
              type="text"
              id="name"
            />
            <p className="text-red-700 text-[10px]">
                    {errors.title && errors.title.message}
                  </p>
                  

          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" >Email</label>
              <input
              {...register("couponCode")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Mã Code"
                type="text"
              />
               <p className="text-red-700 text-[10px]">
                    {errors.couponCode && errors.couponCode.message}
                  </p>
            </div>

            <div>
              <label className="sr-only" >Phone</label>
              <input
                           {...register("quantity")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="number"
                id="phone"
              />
               <p className="text-red-700 text-[10px]">
                    {errors.quantity && errors.quantity.message}
                  </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span>Ngày bắt đầu</span>
              <input
              {...register("couponStart")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="date"
                id="start"
              />
                 <p className="text-red-700 text-[10px]">
                    {errors.couponStart && errors.couponStart.message}
                  </p>
            </div>

            <div>
            <span>Ngày kết thúc</span>
              <input
              {...register("couponEnd")}
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="date"
                id="end"
              />
               <p className="text-red-700 text-[10px]">
                    {errors.couponEnd && errors.couponEnd.message}
                  </p>
            </div>
          </div>
         

          <div  className="flex gap-10" >
          
          <div >
          <div>
          <input
              className="mr-[10px] rounded-lg border-gray-200 p-3 text-sm"
              name="couponStatus"
              placeholder="Name"
              type="radio"
              
             onClick={()=>changeInputState(0)}
            />
              <label className="" >Giảm theo phẩn trăm</label>
          </div >
              {inputState == 0&& <input       {...register("couponValue")} placeholder="%" className="mt-[10px] w-full rounded-lg border-gray-200 p-3 text-sm" type="number" />}
          </div>
          
            <div>
                    <div>
                    <input
                    className="mr-[10px] rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    name="couponStatus"
                    type="radio"
                    onClick={()=>changeInputState(1)}
                    />
                    <label className="" >Giảm theo giá cố định</label>
                    </div>
                    {inputState == 1&& <input  {...register("couponValue")} className="w-full rounded-lg border-gray-200 p-3 text-sm mt-[10px]" type="number" />}
            </div>
           
          </div>
          <p className="text-red-700 text-[10px]">
                    {errors.couponValue && errors.couponValue.message}
                  </p>
          <div className="mt-4">
            <button 
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Thêm mã giảm giá
            </button>
          </div>
        </form>
      </div>
    </>
}
export default CouponAdmin