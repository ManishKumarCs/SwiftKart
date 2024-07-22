import React from 'react';
import {Link} from 'react-router-dom'
import { MdOutlineArrowBack } from "react-icons/md";

function BackButton({to}){

return(
  <Link className="inline-block flex self-start" to={to}>
     <MdOutlineArrowBack className="text-5xl my-1 border-2 border-rose-500 rounded-full p-2" /></Link>
);

}
const efficientButton = React.memo(BackButton);
export default efficientButton;