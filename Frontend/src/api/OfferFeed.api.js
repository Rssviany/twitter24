import axiosInstance from "./AxiosInstance"


export const allOffers=()=>{
    return axiosInstance.get('/get_offers');
}
export const allOffersByCity = (city) => {
  return axiosInstance.get(`/offers_by_city?city=${city}`);
};
export const allMyOffers=()=>{
    return axiosInstance.get('/get_my_offers');
}