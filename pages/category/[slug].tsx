import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProductItem from "../../components/ProductItem";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import API, { endpoints } from "../../API";
import { Slider } from "@mui/material";
import Image from "next/image";
import emptyBox from "../../public/empty-box.png";
import toast from "react-hot-toast";

const CategoryPage = ({ categories, category }) => {
   const [salePosts, setSalePosts] = useState([]);
   const router = useRouter();
   const [numberPage, setNumberPage] = useState(1);
   const [totalPage, setTotalPage] = useState(1);
   const { slug } = router.query;
   const { locale } = useRouter();

   const loadPosts = async () => {
      try {
         const resPosts = await API.post(endpoints["search_salePost"], {
            categoryID: Number(slug),
            page: numberPage,
         });
         setSalePosts(resPosts.data.data.listResult);
         setTotalPage(resPosts.data.data.totalPage);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      loadPosts();
   }, [slug, numberPage]);

   return (
      <Layout title="Search Page">
         <SearchBar categories={categories} setNumberPage={setNumberPage} />
         <div className="text-3xl my-8 font-semibold">
            {locale == "vi" ? category.nameVi : category.name}
         </div>
         <div className="">
            {salePosts.length > 0 ? (
               <div className="grid grid-cols-4 gap-8 mb-8">
                  {salePosts.map((post) => (
                     <ProductItem
                        key={post.id}
                        product={post}
                        inCompare={false}
                     />
                  ))}
               </div>
            ) : (
               <div className="col-span-6">
                  <div className="relative overflow-hidden aspect-square w-1/4 mx-auto">
                     <Image
                        src={emptyBox}
                        alt="empty"
                        layout="fill"
                        className="object-cover"
                     />
                  </div>
               </div>
            )}
         </div>
         {/* paginate */}
         <div
            className="flex gap-4
                      justify-center mt-8"
         >
            {totalPage > 1 &&
               Array.from(Array(totalPage), (e, i) => {
                  return (
                     <div
                        key={i}
                        className={`w-8 h-8 rounded-lg border-2 border-primary-color flex justify-center items-center cursor-pointer paginator font-semibold ${
                           numberPage === i + 1
                              ? "bg-primary-color text-white"
                              : ""
                        } `}
                        onClick={(e) => {
                           setNumberPage(i + 1);
                           window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                           });
                        }}
                     >
                        {i + 1}
                     </div>
                  );
               })}
         </div>
      </Layout>
   );
};

export default CategoryPage;
export const getServerSideProps = async (context) => {
   const res = await API.get(endpoints["category_all"]);
   const categories = await res.data.data;

   // request category detail
   const id = context.params.slug;
   const resCategory = await API.get(
      endpoints["get_category_by_categoryID"](id)
   );
   const category = await resCategory.data.data;

   return { props: { categories, category } };
};
