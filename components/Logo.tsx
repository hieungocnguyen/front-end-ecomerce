/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = (props: any) => {
   const { theme, setTheme } = useTheme();
   const [lightMode, setLightMode] = useState(false);

   useEffect(() => {
      if (theme == "light") {
         setLightMode(true);
      } else {
         setLightMode(false);
      }
   }, [theme]);

   if (lightMode) {
      return (
         <svg
            height={30}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1816.18 409.97"
         >
            <polygon
               points="420.3 302.19 417.11 302.19 347.83 133.27 266.17 133.27 266.17 406.11 330.38 406.11 330.38 237.58 332.64 237.58 398.19 404.38 439.22 404.38 504.76 238.52 507.03 238.52 507.03 406.11 571.24 406.11 571.24 133.27 489.58 133.27 420.3 302.19"
               fill="#212b36"
            />
            <path
               d="M766.81,216.73A91.64,91.64,0,0,0,738,203.41a134.6,134.6,0,0,0-36.11-4.59q-27.43,0-47,8.46t-30.64,23.18a71.07,71.07,0,0,0-13.79,33.37L670.63,266a24.64,24.64,0,0,1,10-15.45q7.86-5.59,20.78-5.6,12,0,19.05,5.6t7.06,15.85V267a11.07,11.07,0,0,1-4.86,9.65q-4.86,3.4-15.52,5.2T679,285.28a161.6,161.6,0,0,0-29.31,5.13,79,79,0,0,0-24.25,11.12,51.4,51.4,0,0,0-16.52,19.05q-6,11.73-6,28.78,0,20.25,8.73,33.63a53.08,53.08,0,0,0,23.84,20q15.12,6.6,34.71,6.59A85.22,85.22,0,0,0,695.87,406a56.59,56.59,0,0,0,19.85-10.79,58.56,58.56,0,0,0,13.92-17.59h1.6v28.51h61.28V267q0-16.26-6.72-28.91A61.55,61.55,0,0,0,766.81,216.73Zm-38.9,116.64a30.69,30.69,0,0,1-5.06,17.52,34.87,34.87,0,0,1-13.52,11.79,41.63,41.63,0,0,1-19,4.26q-11.19,0-18.45-5.33t-7.26-15.45a19.61,19.61,0,0,1,3.4-11.53,24.38,24.38,0,0,1,9.86-7.92,58,58,0,0,1,15.65-4.53q4.53-.66,9.46-1.47t9.59-1.86q4.67-1.07,8.59-2.27a38.2,38.2,0,0,0,6.73-2.66Z"
               fill="#212b36"
            />
            <path
               d="M945.32,198.68a46.33,46.33,0,0,0-29.44,9.93q-12.66,9.91-18.25,30.17H895.5v-37.3H832.22V406.11h65.14V295q0-12.25,5.27-21.38a37.25,37.25,0,0,1,14.52-14.25A42.27,42.27,0,0,1,938,254.24a110.66,110.66,0,0,1,13.39.93,61.94,61.94,0,0,1,12.19,2.53V201.08a57.78,57.78,0,0,0-8.93-1.8A75.22,75.22,0,0,0,945.32,198.68Z"
               fill="#212b36"
            />
            <polygon
               points="1189.65 201.48 1115.85 201.48 1058.29 274.75 1055.36 274.75 1055.36 133.27 990.22 133.27 990.22 406.11 1055.36 406.11 1055.36 344.68 1068.55 328.72 1117.31 406.11 1192.58 406.11 1116.99 290.67 1189.65 201.48"
               fill="#212b36"
            />
            <path
               d="M1369.5,225.73a85.92,85.92,0,0,0-31.31-20.12,113,113,0,0,0-40-6.79q-30.92,0-53.69,13.25a90.87,90.87,0,0,0-35.3,37q-12.52,23.77-12.53,55.48,0,32.66,12.46,56.29a86.43,86.43,0,0,0,35.7,36.37Q1268.12,410,1300.23,410q26.77,0,47.16-8.19t33-23a73.94,73.94,0,0,0,16.32-35L1336.86,342a29.23,29.23,0,0,1-7.59,11.46,33.66,33.66,0,0,1-12.12,7.06,48.66,48.66,0,0,1-15.72,2.4q-12.53,0-21.59-5.2a35.37,35.37,0,0,1-14-14.59q-4.93-9.39-4.93-21.91v-1.73h136.41V303.26q0-25.17-7.32-44.69A91.91,91.91,0,0,0,1369.5,225.73Zm-108.52,56a36.7,36.7,0,0,1,19-31,41.91,41.91,0,0,1,38.7-.27,34.12,34.12,0,0,1,13.12,12.72,36.69,36.69,0,0,1,4.93,18.52Z"
               fill="#212b36"
            />
            <path
               d="M1540.16,356.15q-2.13.54-6.33,1.27a46,46,0,0,1-7.93.73,23.44,23.44,0,0,1-8.92-1.53,10.87,10.87,0,0,1-5.66-5.2,20.69,20.69,0,0,1-1.94-9.66V249.44h36.91v-48h-36.91v-49h-65.14v49h-27v48h27V349q-.27,20.78,8.32,34.5t24.92,20.18q16.32,6.47,39.23,5.4a111.36,111.36,0,0,0,20.18-2.53q8.46-2,13.13-3.33Z"
               fill="#212b36"
            />
            <path
               d="M639.25,78.87c0-30.77,61.9-78.41,61.9-45,0,4.12-2.25,6-6.76,6-6,0-23.63,18-28.88,29.26-3.75,7.88-5.25,12.76-5.25,15.38,0,10.51,31.88-17.63,41.64-30.76,27-36,10.5-41.64-1.5-48l6-.75c16.13-1.87,21.76,16.51,21.76,25.51,0,30.76-49.9,73.91-65.28,73.91C659.13,104.38,639.25,87.12,639.25,78.87Z"
               fill="#2065d1"
            />
            <path
               d="M763.42,33.1q3.95,0,4.5,6.75c.38,4.5-6.38,14.63-33,47.65-3.38,4.12-66.4,83.28-61.53,83.28.75,0,16.88-17.26,36.39-38.27C742.41,97.25,820.44,6.84,858.71,6.84c6,0,9.75,3,9.75,9.75,0,15-42,74.28-29.63,74.28C850.45,90.87,891,65,896.6,65c8.63,0-38.64,39-57,39-7.13,0-19.51-12.38-19.51-22.88,0-10.13,8.25-24.39,27.38-49.9,6.38-8.25,10.88-15,10.88-16.13,0-.37-9,4.13-9.38,4.5C832.07,28.22,802.81,54.48,757,102.5c-69,72-94.54,97.17-97.91,97.17S644.5,187.29,644.5,182C644.5,158,748.79,33.1,763.42,33.1Z"
               fill="#2065d1"
            />
            <path
               d="M938.24,17.34c18-5.25,30.76,4.5,30.76,13.51,0,13.5-31.51,46.52-48.77,41.64-3.75-.75-5.25.38-7.87,6.75-6.38,14.63-2.63,21.39,12.75,21.39,32.26,0,67.53-42.77,67.53-32.64,0,1.87-1.13,4.88-3.38,8.63-13.5,22.13-45.39,40.51-66,40.51-6.37,0-12-.75-24.38-13.88C890.6,94.62,889.1,92,889.1,83.74,889.1,61.23,916.86,23.72,938.24,17.34ZM918,65.36c0,1.88,10.13-2.25,16.88-6.75,5.26-3.38,18.76-20.64,18.76-24C953.62,23.72,918,56,918,65.36Z"
               fill="#2065d1"
            />
            <path
               d="M976.5,87.87c0-10.5,49.52-69.4,58.15-69.4,3.75,0,7.5,5.25,7.5,9.38s-34.51,46.52-34.51,48.39c0,.38,1.12-.37,2.25-1.12,5.25-3.38,92.66-73.91,122.68-75,4.5-.37,7.87.38,7.87,4.88,0,13.88-54.77,88.16-30.76,88.16,15,0,55.52-31.51,55.52-26.26,0,3.38-27.76,28.89-38.64,34.89-27.76,16.13-40.89-12.38-40.89-22.13-.37-14.63,13.88-37.52,23.26-50.27,15.76-20.64,15.76-20.64,4.88-15-36.39,18.76-120.43,90.79-120.43,90.79C988.88,105.13,976.5,92.37,976.5,87.87Z"
               fill="#2065d1"
            />
            <path
               d="M1766,255.71l45.82,25.06a8.4,8.4,0,0,1,0,14.74L1766,320.57a8.39,8.39,0,0,0-3.34,3.34l-25.06,45.83a8.4,8.4,0,0,1-14.74,0l-25.06-45.83a8.39,8.39,0,0,0-3.34-3.34l-45.83-25.06a8.4,8.4,0,0,1,0-14.74l45.83-25.06a8.39,8.39,0,0,0,3.34-3.34l25.06-45.82a8.4,8.4,0,0,1,14.74,0l25.06,45.82A8.39,8.39,0,0,0,1766,255.71Z"
               fill="#ffab00"
            />
            <path
               d="M121.73,249.25l45.83,25.06a8.4,8.4,0,0,1,0,14.74l-45.83,25.06a8.39,8.39,0,0,0-3.34,3.34L93.33,363.27a8.4,8.4,0,0,1-14.74,0L53.53,317.45a8.39,8.39,0,0,0-3.34-3.34L4.37,289.05a8.4,8.4,0,0,1,0-14.74l45.82-25.06a8.39,8.39,0,0,0,3.34-3.34l25.06-45.82a8.4,8.4,0,0,1,14.74,0l25.06,45.82A8.39,8.39,0,0,0,121.73,249.25Z"
               fill="#ffab00"
            />
         </svg>
      );
   } else {
      return (
         <svg
            height={30}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1816.18 409.97"
         >
            <polygon
               points="420.3 302.19 417.11 302.19 347.83 133.27 266.17 133.27 266.17 406.11 330.38 406.11 330.38 237.58 332.64 237.58 398.19 404.38 439.22 404.38 504.76 238.52 507.03 238.52 507.03 406.11 571.24 406.11 571.24 133.27 489.58 133.27 420.3 302.19"
               fill="#fff"
            />
            <path
               d="M766.81,216.73A91.64,91.64,0,0,0,738,203.41a134.6,134.6,0,0,0-36.11-4.59q-27.43,0-47,8.46t-30.64,23.18a71.07,71.07,0,0,0-13.79,33.37L670.63,266a24.64,24.64,0,0,1,10-15.45q7.86-5.59,20.78-5.6,12,0,19.05,5.6t7.06,15.85V267a11.07,11.07,0,0,1-4.86,9.65q-4.86,3.4-15.52,5.2T679,285.28a161.6,161.6,0,0,0-29.31,5.13,79,79,0,0,0-24.25,11.12,51.4,51.4,0,0,0-16.52,19.05q-6,11.73-6,28.78,0,20.25,8.73,33.63a53.08,53.08,0,0,0,23.84,20q15.12,6.6,34.71,6.59A85.22,85.22,0,0,0,695.87,406a56.59,56.59,0,0,0,19.85-10.79,58.56,58.56,0,0,0,13.92-17.59h1.6v28.51h61.28V267q0-16.26-6.72-28.91A61.55,61.55,0,0,0,766.81,216.73Zm-38.9,116.64a30.69,30.69,0,0,1-5.06,17.52,34.87,34.87,0,0,1-13.52,11.79,41.63,41.63,0,0,1-19,4.26q-11.19,0-18.45-5.33t-7.26-15.45a19.61,19.61,0,0,1,3.4-11.53,24.38,24.38,0,0,1,9.86-7.92,58,58,0,0,1,15.65-4.53q4.53-.66,9.46-1.47t9.59-1.86q4.67-1.07,8.59-2.27a38.2,38.2,0,0,0,6.73-2.66Z"
               fill="#fff"
            />
            <path
               d="M945.32,198.68a46.33,46.33,0,0,0-29.44,9.93q-12.66,9.91-18.25,30.17H895.5v-37.3H832.22V406.11h65.14V295q0-12.25,5.27-21.38a37.25,37.25,0,0,1,14.52-14.25A42.27,42.27,0,0,1,938,254.24a110.66,110.66,0,0,1,13.39.93,61.94,61.94,0,0,1,12.19,2.53V201.08a57.78,57.78,0,0,0-8.93-1.8A75.22,75.22,0,0,0,945.32,198.68Z"
               fill="#fff"
            />
            <polygon
               points="1189.65 201.48 1115.85 201.48 1058.29 274.75 1055.36 274.75 1055.36 133.27 990.22 133.27 990.22 406.11 1055.36 406.11 1055.36 344.68 1068.55 328.72 1117.31 406.11 1192.58 406.11 1116.99 290.67 1189.65 201.48"
               fill="#fff"
            />
            <path
               d="M1369.5,225.73a85.92,85.92,0,0,0-31.31-20.12,113,113,0,0,0-40-6.79q-30.92,0-53.69,13.25a90.87,90.87,0,0,0-35.3,37q-12.52,23.77-12.53,55.48,0,32.66,12.46,56.29a86.43,86.43,0,0,0,35.7,36.37Q1268.12,410,1300.23,410q26.77,0,47.16-8.19t33-23a73.94,73.94,0,0,0,16.32-35L1336.86,342a29.23,29.23,0,0,1-7.59,11.46,33.66,33.66,0,0,1-12.12,7.06,48.66,48.66,0,0,1-15.72,2.4q-12.53,0-21.59-5.2a35.37,35.37,0,0,1-14-14.59q-4.93-9.39-4.93-21.91v-1.73h136.41V303.26q0-25.17-7.32-44.69A91.91,91.91,0,0,0,1369.5,225.73Zm-108.52,56a36.7,36.7,0,0,1,19-31,41.91,41.91,0,0,1,38.7-.27,34.12,34.12,0,0,1,13.12,12.72,36.69,36.69,0,0,1,4.93,18.52Z"
               fill="#fff"
            />
            <path
               d="M1540.16,356.15q-2.13.54-6.33,1.27a46,46,0,0,1-7.93.73,23.44,23.44,0,0,1-8.92-1.53,10.87,10.87,0,0,1-5.66-5.2,20.69,20.69,0,0,1-1.94-9.66V249.44h36.91v-48h-36.91v-49h-65.14v49h-27v48h27V349q-.27,20.78,8.32,34.5t24.92,20.18q16.32,6.47,39.23,5.4a111.36,111.36,0,0,0,20.18-2.53q8.46-2,13.13-3.33Z"
               fill="#fff"
            />
            <path
               d="M639.25,78.87c0-30.77,61.9-78.41,61.9-45,0,4.12-2.25,6-6.76,6-6,0-23.63,18-28.88,29.26-3.75,7.88-5.25,12.76-5.25,15.38,0,10.51,31.88-17.63,41.64-30.76,27-36,10.5-41.64-1.5-48l6-.75c16.13-1.87,21.76,16.51,21.76,25.51,0,30.76-49.9,73.91-65.28,73.91C659.13,104.38,639.25,87.12,639.25,78.87Z"
               fill="#2065d1"
            />
            <path
               d="M763.42,33.1q3.95,0,4.5,6.75c.38,4.5-6.38,14.63-33,47.65-3.38,4.12-66.4,83.28-61.53,83.28.75,0,16.88-17.26,36.39-38.27C742.41,97.25,820.44,6.84,858.71,6.84c6,0,9.75,3,9.75,9.75,0,15-42,74.28-29.63,74.28C850.45,90.87,891,65,896.6,65c8.63,0-38.64,39-57,39-7.13,0-19.51-12.38-19.51-22.88,0-10.13,8.25-24.39,27.38-49.9,6.38-8.25,10.88-15,10.88-16.13,0-.37-9,4.13-9.38,4.5C832.07,28.22,802.81,54.48,757,102.5c-69,72-94.54,97.17-97.91,97.17S644.5,187.29,644.5,182C644.5,158,748.79,33.1,763.42,33.1Z"
               fill="#2065d1"
            />
            <path
               d="M938.24,17.34c18-5.25,30.76,4.5,30.76,13.51,0,13.5-31.51,46.52-48.77,41.64-3.75-.75-5.25.38-7.87,6.75-6.38,14.63-2.63,21.39,12.75,21.39,32.26,0,67.53-42.77,67.53-32.64,0,1.87-1.13,4.88-3.38,8.63-13.5,22.13-45.39,40.51-66,40.51-6.37,0-12-.75-24.38-13.88C890.6,94.62,889.1,92,889.1,83.74,889.1,61.23,916.86,23.72,938.24,17.34ZM918,65.36c0,1.88,10.13-2.25,16.88-6.75,5.26-3.38,18.76-20.64,18.76-24C953.62,23.72,918,56,918,65.36Z"
               fill="#2065d1"
            />
            <path
               d="M976.5,87.87c0-10.5,49.52-69.4,58.15-69.4,3.75,0,7.5,5.25,7.5,9.38s-34.51,46.52-34.51,48.39c0,.38,1.12-.37,2.25-1.12,5.25-3.38,92.66-73.91,122.68-75,4.5-.37,7.87.38,7.87,4.88,0,13.88-54.77,88.16-30.76,88.16,15,0,55.52-31.51,55.52-26.26,0,3.38-27.76,28.89-38.64,34.89-27.76,16.13-40.89-12.38-40.89-22.13-.37-14.63,13.88-37.52,23.26-50.27,15.76-20.64,15.76-20.64,4.88-15-36.39,18.76-120.43,90.79-120.43,90.79C988.88,105.13,976.5,92.37,976.5,87.87Z"
               fill="#2065d1"
            />
            <path
               d="M1766,255.71l45.82,25.06a8.4,8.4,0,0,1,0,14.74L1766,320.57a8.39,8.39,0,0,0-3.34,3.34l-25.06,45.83a8.4,8.4,0,0,1-14.74,0l-25.06-45.83a8.39,8.39,0,0,0-3.34-3.34l-45.83-25.06a8.4,8.4,0,0,1,0-14.74l45.83-25.06a8.39,8.39,0,0,0,3.34-3.34l25.06-45.82a8.4,8.4,0,0,1,14.74,0l25.06,45.82A8.39,8.39,0,0,0,1766,255.71Z"
               fill="#ffab00"
            />
            <path
               d="M121.73,249.25l45.83,25.06a8.4,8.4,0,0,1,0,14.74l-45.83,25.06a8.39,8.39,0,0,0-3.34,3.34L93.33,363.27a8.4,8.4,0,0,1-14.74,0L53.53,317.45a8.39,8.39,0,0,0-3.34-3.34L4.37,289.05a8.4,8.4,0,0,1,0-14.74l45.82-25.06a8.39,8.39,0,0,0,3.34-3.34l25.06-45.82a8.4,8.4,0,0,1,14.74,0l25.06,45.82A8.39,8.39,0,0,0,121.73,249.25Z"
               fill="#ffab00"
            />
         </svg>
      );
   }
};
export default Logo;
