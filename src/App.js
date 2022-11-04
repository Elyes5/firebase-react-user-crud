import './App.css';
import { db } from './firebase-config';
import { useState,useEffect,useContext } from 'react';
import { collection,getDocs } from 'firebase/firestore'
import Card from 'react-bootstrap/Card';
import ModalExample from './ModalExample';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import InputToggle from './InputToggle';
import ThemeContextProvider from './ThemeContext';
import { ThemeContext } from './ThemeContext';
function MainComponent({getUsers,users}){
  const {theme} = useContext(ThemeContext)
  return (

      <div className={theme ? "bg-light w-100 min-h-100-vh" : "bg-dark-blue min-h-100-vh"}>
  
        <div className="d-flex w-100 align-items-center justify-content-between">
        
        <ModalExample addUserRealTime={() => getUsers()}/>
       
        <InputToggle />
  
        </div>
        <h5 className={theme ? "d-flex justify-content-center align-items-center text-dark" : "d-flex justify-content-center align-items-center text-light"}>
          Done with <i class="devicon-firebase-plain colored"></i> <i class="devicon-react-original colored"></i> <i class="devicon-bootstrap-plain colored"></i>
        </h5>
        {
        users.length > 0 ?( 
        <div>
        {
        
        users.map((user) => {
          
          return(<div  key={user.id} className="me-5 ms-5 mt-2">
            <UserCard  name={user.name} age={user.age} id={user.id} getUsers={()=>getUsers()}></UserCard>
          </div>)
        })}
      </div>)
      :
      (<div className="mt-2">
          <NoUserCard/>
      </div>)}
      
      </div>

    );
}
function NoUserCard(){
const {theme} = useContext(ThemeContext)
return(
<div>
  <Card className="ms-5 me-5 overflow-auto">
    <Card.Body className={theme ? "d-flex justify-content-center text-dark elem-light" : 'elem-dark-blue d-flex justify-content-center text-light border border-light rounded'}>
      <div>
        <h1>No Users !</h1>
      </div></Card.Body>
  </Card>
</div>
)
}
function UserCard({name,age,id,getUsers}) {
  const {theme} = useContext(ThemeContext)
  return (
    <Card className={!theme ? "border border-light overflow-auto" : "border border-secondary overflow-auto rounded"}>
      <Card.Header className={theme ? "d-flex justify-content-end" : "d-flex justify-content-end elem-dark-blue-lighter"} >
        
      
        <ModalUpdate id={id} name={name} age={age} getUsers={getUsers}/>  
        <ModalDelete id={id} getUsers={getUsers}/>
      </Card.Header>
      <Card.Body className={theme ? 'text-dark elem-light' : 'elem-dark-blue text-light'}>
        <h1>
          Name : {name}
        </h1>
        <h4>
          Age : {age}
        </h4>
      </Card.Body>
    </Card>
  );
}
function App() {
const [users,setUsers] = useState([]);
const getUsers = async () =>{
  const data = await getDocs(usersCollectionRef);
  setUsers(data.docs.map((doc) => ({...doc.data(),id : doc.id})))
}
const usersCollectionRef = collection(db,"users")
useEffect(() =>{
  getUsers();
},[])  
return(
  <ThemeContextProvider>
  <MainComponent getUsers={() => getUsers()} users={users}/>
  </ThemeContextProvider>
)
}

export default App;
