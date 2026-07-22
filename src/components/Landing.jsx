import '../App.css'
import Header from './ui/header';
import Footer from './ui/Footer';
import { useState } from 'react';
import ConfirmLogOut from './ui/ConfirmLogout';
import { Outlet } from 'react-router-dom';


function Landing() {
const [showLC, setShowLC] = useState(false) //LogOut confirm box state
const [drawerOpen,setDrawerOpen] = useState(false)
{/*fetching data moved to other components*/}
 


return (
	<div className="h-full">
		<Header setShowLC = {setShowLC} drawerOpen ={drawerOpen} setDrawerOpen = {setDrawerOpen}/>
		{showLC && <ConfirmLogOut setShowLC = {setShowLC} showLC = {showLC}/>}
		<Outlet />
		<Footer />
	</div>


);

}

export default Landing





//Old Jikan version API


//const url = "https://api.jikan.moe/v4/seasons/now?limit=15"

// fetch(url)
// 	.then(response => response.json())
// 	.then(response => {
// 	  console.log(response);
// 	  setData(response.data);
// 	})
// 	.catch(err => console.error(err)); 


//Fetching and mapping logic first draft

	


// <>
//     <h1>Anime List Bitch</h1>
//     {data? data.data.map((item) => ( 
//     <div className="container">
//       <h1>{item.title}</h1>
//       <p>{item.synopsis}</p>
//       <img src={item.image} alt="{item.title}" />
//     </div>
//   )
// )
// : <h1>Loading</h1>
// }
//   </>






// {data && data.data ? (
//   data.data.map((item) => (
//     <div className="container" key={item.id}>
//       <h2>{item.title}</h2>
//       <p>{item.synopsis}</p>
//       <img src={item.image} alt={item.title} />
//     </div>
//   ))
// ) : (
//   <p>Loading...</p>
// )}