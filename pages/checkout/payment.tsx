/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import API, { authAxios, endpoints } from "../../API";
import Layout from "../../components/Layout/Layout";
import { Store } from "../../utils/Store";
import Image from "next/image";
import cashpaymentimage from "../../public/cash_payment.png";
import momopaymentimage from "../../public/momo_payment.png";
import cashDisabled from "../../public/cash_disabled.png";
import momoDisabled from "../../public/momo_disabled.png";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AddressBook from "../../components/Model/AddressBook";
import AddToAddressBook from "../../components/Model/AddToAddressBook";
import Link from "next/link";
import { BiArrowBack, BiChevronDown, BiStore } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import DeliveryService from "../../components/Model/DeliveryService";

const Payment = () => {
   const { state, dispatch } = useContext(Store);
   const { userInfo } = state;
   const router = useRouter();
   const [paymentType, setPaymentType] = useState(0);
   const [loading, setLoading] = useState(false);
   const [isOpenAddressBook, setIsOpenAddressBook] = useState(false);
   const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
   const [address, setAddress] = useState<any>({});
   const [itemsInCart, setItemsInCart] = useState<any>([]);
   const [isLoadCompleted, setIsLoadComplete] = useState(false);
   const [idOpenDeliveryServices, setIdOpenDeliveryServices] = useState(0);
   const [amountShipFee, setAmountShipFee] = useState(0);
   const [totalOrder, setTotalOrder] = useState(0);
   //0: no disable, 1:cash, 2:momo,3:both
   const [isDisablePaymentMethod, setIsDisblePaymentMethod] = useState(0);
   const [isErrorGHNThirdParty, setIsErrorGHNThirdParty] =
      useState<boolean>(true);

   const fetchCartData = async () => {
      const temp = [];
      let currentAddress: any; //to get value address

      try {
         //get addressbook by userid
         const resAddressBook = await API.get(
            endpoints["get_address_book"](userInfo.id)
         );
         if (resAddressBook.data.data.length > 0) {
            setAddress(
               resAddressBook.data.data.sort((a, b) =>
                  a.id > b.id ? -1 : 1
               )[0]
            );
            currentAddress = resAddressBook.data.data.sort((a, b) =>
               a.id > b.id ? -1 : 1
            )[0];
         } else {
            setAddress({});
         }

         const resCart = await API.get(
            endpoints["get_cart_checkout"](userInfo.id)
         );

         await resCart.data.data.map(async (i) => {
            //get infor of agency by id
            const resAgencyInfo = await API.get(
               endpoints["agency_info"](i.agencyID)
            );

            //get service package by addressBookID and agencyID
            if (currentAddress) {
               const resDeliveryService = await authAxios().get(
                  `${endpoints["get_service_package"]}?addressBookID=${currentAddress.id}&agencyID=${i.agencyID}`
               );

               temp.push({
                  ...i,
                  ...resAgencyInfo.data.data,
                  ...resDeliveryService.data.data,
                  ...{
                     selectedService:
                        resDeliveryService.data.data.services.sort((a, b) =>
                           a.serviceInfoWithPrePayment.shipFee <
                           b.serviceInfoWithPrePayment.shipFee
                              ? -1
                              : 1
                        )[0],
                  },
               });

               //cases no selected address
            } else {
               temp.push({
                  ...i,
                  ...resAgencyInfo.data.data,
               });
            }
            //make sure to render the items correctly
            if (temp.length === resCart.data.data.length) {
               setIsLoadComplete(true);
               console.log(temp);
               CheckDisablePaymentType(temp);

               CalcTotalOrder(temp);
               setItemsInCart(temp);
            }
         });
      } catch (error) {
         console.log(error);
         toast.error("something wrong, try it later!", {
            position: "top-center",
         });
      }
   };

   useEffect(() => {
      fetchCartData();
   }, [isOpenAddressBook]);

   useEffect(() => {
      CalcTotalOrder(itemsInCart);
   }, [idOpenDeliveryServices, paymentType]);

   const CheckDisablePaymentType = (items) => {
      let tempDisablePaymentType = 0;
      items.map((item) => {
         if (item.selectedService.serviceInfoWithCOD.isSuccess === 0) {
            //if 3=>3 if 1=>1
            if (tempDisablePaymentType === 2) {
               tempDisablePaymentType = 3;
            } else if (tempDisablePaymentType === 0) {
               tempDisablePaymentType = 1;
            }
         } else {
            setIsErrorGHNThirdParty(false);
         }

         if (item.selectedService.serviceInfoWithPrePayment.isSuccess === 0) {
            //if 3=>3 if 2=>2
            if (tempDisablePaymentType === 1) {
               tempDisablePaymentType = 3;
            } else if (tempDisablePaymentType === 0) {
               tempDisablePaymentType = 2;
            }
         } else {
            setIsErrorGHNThirdParty(false);
         }
      });
      setIsDisblePaymentMethod(tempDisablePaymentType);
   };

   const CalcTotalOrder = (items) => {
      let tempTotalOrder = 0;

      if (items.length > 0 && items[0].selectedService) {
         if (paymentType == 1) {
            items.map((item) => {
               tempTotalOrder +=
                  item.calculatorPrice +
                  item.selectedService.serviceInfoWithCOD.shipFee;
            });
         } else {
            items.map(
               (item) =>
                  (tempTotalOrder +=
                     item.calculatorPrice +
                     item.selectedService.serviceInfoWithPrePayment.shipFee)
            );
         }
         setTotalOrder(tempTotalOrder);
      } else {
         setTotalOrder(-1);
      }
   };
   const CalcAmountShipFee = () => {
      let amount = 0;
      itemsInCart.map((item) => {
         if (paymentType === 1) {
            amount += item.selectedService.serviceInfoWithCOD.shipFee;
         } else {
            amount += item.selectedService.serviceInfoWithPrePayment.shipFee;
         }
      });
      setAmountShipFee(amount);
      console.log(amount);
   };

   const handlePayment = () => {
      CalcAmountShipFee();

      if (paymentType === 0) {
         toast.error("Please choise a payment mothod!", {
            position: "top-center",
         });
      } else if (paymentType === 1) {
         handlePaymentbyCash();
      } else {
         handlePaymentMomo();
      }
   };

   const handlePaymentbyCash = async () => {
      let mapServiceInfo = {};
      setLoading(true);
      try {
         await itemsInCart.map((item) => {
            mapServiceInfo[item.id] = {
               serviceID: item.selectedService.service_id,
               serviceTypeID: item.selectedService.service_type_id,
            };
         });
         // console.log(obj.get("mapServiceInfo"));

         console.log(mapServiceInfo);

         const resPayment = await authAxios().post(
            endpoints["payment_cart"](1, address.id),
            mapServiceInfo
         );
         if (resPayment.data.code === "200") {
            Cookies.remove("cartItems");
            toast.success("Payment successful!", {
               position: "top-center",
            });
            router.push("/checkout/stateofpayment");
         } else {
            toast.error(resPayment.data.message, {
               position: "top-center",
            });
         }

         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   const handlePaymentMomo = async () => {
      const arrayInforPayment = [];
      itemsInCart.map((item) =>
         arrayInforPayment.push({
            agencyID: item.agencyID,
            serviceID: item.selectedService.service_id,
            serviceTypeID: item.selectedService.service_type_id,
         })
      );

      setLoading(true);
      try {
         const res = await authAxios().post(
            `${endpoints["momo_payment_info"]}?amountShipFee=${amountShipFee}`
         );

         if (res.data.data.payUrl) {
            // router.push(res.data.data.payUrl);
            setLoading(false);
            dispatch({ type: "ADD_ADDRESS_PAYMENT", payload: address.id });
            dispatch({
               type: "ADD_INFO_PAYMENT",
               payload: arrayInforPayment,
            });
         } else {
            toast.error(res.data.data.message);
         }
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   return (
      <Layout title="Payment">
         <div className="flex gap-4 items-center m-6">
            <div
               className="bg-blue-main text-white p-3 text-2xl rounded-lg cursor-pointer hover:shadow-lg hover:shadow-blue-main"
               onClick={() => router.back()}
            >
               <BiArrowBack />
            </div>
            <div className="font-semibold text-2xl">/ Checkout</div>
         </div>
         <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-6 dark:bg-dark-primary bg-light-primary rounded-lg p-4 h-fit">
               {isLoadCompleted ? (
                  <>
                     {itemsInCart
                        .sort((a, b) => (a.id > b.id ? -1 : 1))
                        .map((i) => (
                           <div key={i.id} className="mb-8">
                              {/* agency name */}
                              <div className="bg-dark-text dark:bg-dark-bg px-5 py-3 rounded-t-xl w-fit text-left font-medium flex gap-2 items-center hover:text-primary-color transition-all cursor-pointer border-t-2 border-l-2 border-r-2 z-25  border-primary-color">
                                 <BiStore className="text-2xl" />
                                 {i.name}
                              </div>
                              <div className="bg-dark-text dark:bg-dark-bg p-2  rounded-b-xl rounded-tr-xl border-b-2 border-t-2 border-l-2 border-r-2 border-primary-color shadow-lg">
                                 {/* items each agency */}
                                 <div>
                                    {i.cartItems
                                       .sort((a, b) => (a.id < b.id ? -1 : 1))
                                       .map((item) => (
                                          <div key={item.id}>
                                             <div className="grid grid-cols-12 items-center mx-2 my-4 font-medium text-left">
                                                <div className="col-span-2">
                                                   <div className="relative overflow-hidden rounded-lg aspect-square w-2/3">
                                                      <Image
                                                         src={
                                                            item.itemPost.avatar
                                                         }
                                                         alt="avatar"
                                                         layout="fill"
                                                      />
                                                   </div>
                                                </div>
                                                <div className="col-span-5">
                                                   {item.itemPost.name}
                                                </div>
                                                <div className="col-span-1">
                                                   x{item.quantity}
                                                </div>
                                                <div className="col-span-4 font-semibold text-right mr-6">
                                                   {(
                                                      item.quantity *
                                                      item.itemPost.unitPrice
                                                   ).toLocaleString("it-IT", {
                                                      style: "currency",
                                                      currency: "VND",
                                                   })}
                                                </div>
                                             </div>
                                             <div className="bg-light-primary dark:bg-dark-primary h-[2px] w-[90%] mx-auto"></div>
                                          </div>
                                       ))}
                                 </div>
                                 {/* service delivery */}
                                 {isErrorGHNThirdParty ? (
                                    <>
                                       <div className="py-8 m-6 bg-red-600 bg-opacity-20 border-2 rounded-xl border-red-600 font-semibold">
                                          Something wrong from delivery service,
                                          please try it later!
                                       </div>
                                    </>
                                 ) : (
                                    <>
                                       <div className="grid grid-cols-12 gap-4 my-4 justify-center">
                                          {/* selected delivery */}
                                          {i.services ? (
                                             <div
                                                className="col-span-12 bg-light-primary dark:bg-dark-primary rounded-xl p-4 mx-4 relative flex justify-between items-center cursor-pointer hover:shadow-lg hover:shadow-light-primary dark:hover:shadow-dark-primary"
                                                onClick={() => {
                                                   setIdOpenDeliveryServices(
                                                      i.agencyID
                                                   );
                                                }}
                                             >
                                                <div>
                                                   <div
                                                      key={i.selectedService}
                                                      className="text-left"
                                                   >
                                                      <div className="font-medium text-sm mb-1">
                                                         <span className="font-semibold">
                                                            Devilery service:
                                                         </span>{" "}
                                                         {
                                                            i.selectedService
                                                               .short_name
                                                         }
                                                      </div>
                                                      <div className="font-bold text-sm mb-1 ">
                                                         <span className="font-semibold">
                                                            Ship fee:{" "}
                                                         </span>
                                                         <span className="">
                                                            {i.selectedService
                                                               .serviceInfoWithCOD
                                                               .isSuccess === 1
                                                               ? `
                                                         ${i.selectedService.serviceInfoWithCOD.shipFee.toLocaleString(
                                                            "it-IT",
                                                            {
                                                               style: "currency",
                                                               currency: "VND",
                                                            }
                                                         )} (COD)`
                                                               : ""}
                                                            {i.selectedService
                                                               .serviceInfoWithCOD
                                                               .isSuccess ===
                                                               1 &&
                                                            i.selectedService
                                                               .serviceInfoWithPrePayment
                                                               .isSuccess === 1
                                                               ? " | "
                                                               : ""}
                                                            {i.selectedService
                                                               .serviceInfoWithPrePayment
                                                               .isSuccess === 1
                                                               ? `${i.selectedService.serviceInfoWithPrePayment.shipFee.toLocaleString(
                                                                    "it-IT",
                                                                    {
                                                                       style: "currency",
                                                                       currency:
                                                                          "VND",
                                                                    }
                                                                 )} (MOMO)`
                                                               : ""}
                                                         </span>
                                                      </div>
                                                      <div className="text-sm font-medium">
                                                         Expected Delivery Time:{" "}
                                                         <span className="font-bold">
                                                            {i.selectedService
                                                               .serviceInfoWithPrePayment
                                                               .isSuccess === 1
                                                               ? new Date(
                                                                    i.selectedService.serviceInfoWithPrePayment.expectedTimeDelivery
                                                                 ).toLocaleDateString(
                                                                    "en-GB"
                                                                 )
                                                               : ""}
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="text-4xl">
                                                   <BiChevronDown />
                                                </div>
                                             </div>
                                          ) : (
                                             <div className="font-semibold ">
                                                No address selected
                                             </div>
                                          )}
                                          <div
                                             className={`fixed top-0 right-0 w-full h-screen backdrop-blur-sm items-center justify-center z-20 ${
                                                idOpenDeliveryServices ===
                                                i.agencyID
                                                   ? "flex"
                                                   : "hidden"
                                             }`}
                                          >
                                             <div className="w-fit h-fit">
                                                <DeliveryService
                                                   agencyServices={i}
                                                   setIdOpenDeliveryServices={
                                                      setIdOpenDeliveryServices
                                                   }
                                                   address={address}
                                                   setItemsInCart={
                                                      setItemsInCart
                                                   }
                                                   itemsInCart={itemsInCart}
                                                />
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 )}
                                 {/* subtotal */}
                                 {i.services ? (
                                    <div className="mx-8 mb-4">
                                       <div className="flex justify-between items-center">
                                          <div className="font-medium">
                                             Ship fee:{" "}
                                          </div>
                                          <div className="text-right text-primary-color font-semibold text-lg">
                                             {paymentType === 1 &&
                                             i.selectedService
                                                .serviceInfoWithCOD
                                                .isSuccess === 1
                                                ? i.selectedService.serviceInfoWithCOD.shipFee.toLocaleString(
                                                     "it-IT",
                                                     {
                                                        style: "currency",
                                                        currency: "VND",
                                                     }
                                                  )
                                                : paymentType === 2 &&
                                                  i.selectedService
                                                     .serviceInfoWithPrePayment
                                                     .isSuccess === 1
                                                ? i.selectedService.serviceInfoWithPrePayment.shipFee.toLocaleString(
                                                     "it-IT",
                                                     {
                                                        style: "currency",
                                                        currency: "VND",
                                                     }
                                                  )
                                                : `
                                                ${
                                                   i.selectedService
                                                      .serviceInfoWithCOD
                                                      .isSuccess === 1
                                                      ? i.selectedService.serviceInfoWithCOD.shipFee.toLocaleString(
                                                           "it-IT",
                                                           {
                                                              style: "currency",
                                                              currency: "VND",
                                                           }
                                                        )
                                                      : ""
                                                }
                                                ${
                                                   i.selectedService
                                                      .serviceInfoWithCOD
                                                      .isSuccess === 1 &&
                                                   i.selectedService
                                                      .serviceInfoWithPrePayment
                                                      .isSuccess === 1
                                                      ? " | "
                                                      : ""
                                                }
                                                ${
                                                   i.selectedService
                                                      .serviceInfoWithPrePayment
                                                      .isSuccess === 1
                                                      ? i.selectedService.serviceInfoWithPrePayment.shipFee.toLocaleString(
                                                           "it-IT",
                                                           {
                                                              style: "currency",
                                                              currency: "VND",
                                                           }
                                                        )
                                                      : ""
                                                }`}
                                          </div>
                                       </div>
                                       <div className="flex justify-between items-center">
                                          <div className="font-medium">
                                             Subtotal without ship fee:
                                          </div>
                                          <div className="font-bold text-2xl text-blue-main">
                                             {i.calculatorPrice.toLocaleString(
                                                "it-IT",
                                                {
                                                   style: "currency",
                                                   currency: "VND",
                                                }
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                        ))}
                     {totalOrder === -1 ? (
                        <div className="bg-dark-text dark:bg-dark-bg p-6 rounded-xl text-xl font-semibold border-2 border-primary-color shadow-lg">
                           No Selected address, please create a new address!
                        </div>
                     ) : paymentType === 1 ? (
                        <>
                           <div className="text-3xl font-bold text-blue-main bg-dark-text dark:bg-dark-bg p-6 rounded-xl border-2 border-primary-color shadow-lg">
                              {totalOrder.toLocaleString("it-IT", {
                                 style: "currency",
                                 currency: "VND",
                              })}
                           </div>
                        </>
                     ) : paymentType === 2 ? (
                        <>
                           <div className="text-3xl font-bold text-blue-main bg-dark-text dark:bg-dark-bg p-6 rounded-xl border-2 border-primary-color shadow-lg">
                              {totalOrder.toLocaleString("it-IT", {
                                 style: "currency",
                                 currency: "VND",
                              })}
                           </div>
                        </>
                     ) : (
                        <div className="bg-dark-text dark:bg-dark-bg p-6 rounded-xl text-lg font-semibold border-2 border-primary-color shadow-lg">
                           Total will display when selected payment method
                        </div>
                     )}
                  </>
               ) : (
                  <div className="flex justify-center my-8">
                     <ClipLoader size={35} color="#FF8500" />
                  </div>
               )}
            </div>
            {/* right part */}
            <div className="col-span-6">
               <div className="dark:bg-dark-primary bg-light-primary rounded-lg p-4 mb-8">
                  <div className="text-lg font-semibold mb-4">
                     Information Delivery
                  </div>
                  {userInfo ? (
                     <>
                        {address !== undefined && address.id ? (
                           <>
                              <div className="mb-2 text-left">
                                 <label
                                    htmlFor="name"
                                    className="font-medium text-sm pl-2"
                                 >
                                    Name of Consignee
                                 </label>
                                 <input
                                    id="name"
                                    type="text"
                                    required
                                    value={address.customerName}
                                    disabled
                                    className="bg-dark-text dark:bg-dark-bg w-full p-4 rounded-lg font-medium disabled:bg-slate-50"
                                 />
                              </div>
                              <div className="mb-2 text-left">
                                 <label
                                    htmlFor="address"
                                    className="font-medium text-sm pl-2"
                                 >
                                    Full Address
                                 </label>
                                 <input
                                    type="text"
                                    name="address"
                                    required
                                    value={address.fullAddress}
                                    disabled
                                    className="bg-dark-text dark:bg-dark-bg w-full p-4 rounded-lg font-medium disabled:bg-slate-50"
                                 />
                              </div>
                              <div className="mb-2 text-left">
                                 <label
                                    htmlFor="phone"
                                    className="font-medium text-sm pl-2"
                                 >
                                    Phone Number
                                 </label>
                                 <input
                                    type="number"
                                    name="phone"
                                    required
                                    value={address.deliveryPhone}
                                    disabled
                                    className="bg-dark-text dark:bg-dark-bg w-full p-4 rounded-lg font-medium disabled:bg-slate-50"
                                 />
                              </div>
                              <div className="mb-2 text-left">
                                 <label
                                    htmlFor="description"
                                    className="font-medium text-sm pl-2"
                                 >
                                    Note
                                 </label>
                                 <input
                                    type="text"
                                    name="description"
                                    required
                                    value={address.description}
                                    disabled
                                    className="bg-dark-text dark:bg-dark-bg w-full p-4 rounded-lg font-medium disabled:bg-slate-50 "
                                 />
                              </div>
                              <div className="flex justify-center my-6">
                                 <button
                                    className="py-3 px-4 rounded-lg bg-blue-main text-white font-semibold hover:shadow-lg hover:shadow-blue-main"
                                    onClick={() => setIsOpenAddressBook(true)}
                                 >
                                    Choose other address in address book
                                 </button>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className="flex justify-center my-6">
                                 <button
                                    className="py-3 px-4 rounded-lg bg-blue-main text-white font-semibold hover:shadow-lg hover:shadow-blue-main"
                                    onClick={() => setIsOpenAddressBook(true)}
                                 >
                                    Please add an new address!
                                 </button>
                              </div>
                           </>
                        )}
                     </>
                  ) : (
                     <></>
                  )}
                  <div
                     className={`fixed top-0 right-0 w-full h-screen backdrop-blur-sm items-center justify-center z-20 ${
                        isOpenAddressBook ? "flex" : "hidden"
                     }`}
                  >
                     <div className="w-1/2 h-[40rem]">
                        <AddressBook
                           setIsOpenAddressBook={setIsOpenAddressBook}
                           setAddress={setAddress}
                           setIsOpenAddAddress={setIsOpenAddAddress}
                           isOpenAddAddress={isOpenAddAddress}
                        />
                     </div>
                  </div>
                  <div
                     className={`fixed top-0 right-0 w-full h-screen backdrop-blur-sm items-center justify-center z-20 ${
                        isOpenAddAddress ? "flex" : "hidden"
                     }`}
                  >
                     <div className="w-1/2 h-fit ">
                        <AddToAddressBook
                           setIsOpenAddAddress={setIsOpenAddAddress}
                        />
                     </div>
                  </div>
               </div>
               <div className=" dark:bg-dark-primary bg-light-primary rounded-lg py-8 ">
                  <div className="text-lg font-semibold">Payment Type</div>
                  <div className="flex justify-center gap-4 my-6">
                     <label
                        className={`${
                           isDisablePaymentMethod === 1 ||
                           isDisablePaymentMethod === 3
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                        }`}
                     >
                        <input
                           type="radio"
                           className="peer sr-only"
                           name="pricing"
                           onChange={() => {
                              setPaymentType(1);
                           }}
                           disabled={
                              isDisablePaymentMethod === 1 ||
                              isDisablePaymentMethod === 3
                                 ? true
                                 : false
                           }
                        />
                        <div
                           className={`rounded-lg p-2 ring-4 transition-all hover:shadow ring-transparent peer-checked:ring-blue-main `}
                        >
                           <div className="relative overflow-hidden rounded-lg w-20 h-20">
                              <Image
                                 src={
                                    isDisablePaymentMethod === 1 ||
                                    isDisablePaymentMethod === 3
                                       ? cashDisabled
                                       : cashpaymentimage
                                 }
                                 alt=""
                                 layout="fill"
                                 className="object-cover"
                              />
                           </div>
                        </div>
                     </label>
                     <label
                        className={`${
                           isDisablePaymentMethod === 2 ||
                           isDisablePaymentMethod === 3
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                        }`}
                     >
                        <input
                           type="radio"
                           className="peer sr-only"
                           name="pricing"
                           disabled={
                              isDisablePaymentMethod === 2 ||
                              isDisablePaymentMethod === 3
                                 ? true
                                 : false
                           }
                           onChange={() => {
                              setPaymentType(2);
                           }}
                        />
                        <div className=" rounded-lg p-2 ring-4 ring-transparent transition-all hover:shadow peer-checked:ring-blue-main">
                           <div className="relative overflow-hidden w-20 h-20 rounded-lg">
                              <Image
                                 src={
                                    isDisablePaymentMethod === 2 ||
                                    isDisablePaymentMethod === 3
                                       ? momoDisabled
                                       : momopaymentimage
                                 }
                                 alt=""
                                 layout="fill"
                                 className="object-cover"
                              />
                           </div>
                        </div>
                     </label>
                  </div>
                  <button
                     className="py-4 px-10 mx-8 h-fit bg-blue-main rounded-lg font-semibold text-white hover:shadow-blue-main hover:shadow-lg w-fit disabled:bg-gray-400 disabled:hover:shadow-gray-400 disabled:cursor-not-allowed"
                     disabled={address.id ? false : true}
                     onClick={handlePayment}
                  >
                     {address.id
                        ? paymentType === 1
                           ? " Payment by cash on delivery (COD)"
                           : paymentType === 2
                           ? " Payment by Momo"
                           : isDisablePaymentMethod === 3
                           ? "Something is wrong with the cart or the GHN shipping service, please try again later!"
                           : "Please choice your payment method"
                        : "Please choose address before payment!"}
                  </button>
               </div>
            </div>
         </div>

         {loading ? <Loader /> : <></>}
         <Toaster />
      </Layout>
   );
};

// export default Payment;
export default dynamic(() => Promise.resolve(Payment), { ssr: false });
