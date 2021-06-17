import React from 'react';
import { Link } from 'react-router-dom';
import LoadingImage from './loading.jpg';

class Isitabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded : false,
            persons : [],
            isError : false,
        }
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_APIBASEURL}/api/person`)
        .then(res=>res.json())
        .then(
            (result)=>{
                this.setState({
                    isLoaded: true,
                    persons : result,
                })
            },
            (error)=>{
                console.log(error);
                this.setState({
                    isError: true,
                    isLoaded: true
                })
            }
        )
    }

    render(){
        const {persons,isLoaded,isError} = this.state;

        if(isLoaded){
            // sudah Loading
            if(isError){
                return(
                    <tr>
                        <td colSpan="7" className="text-center">

                            {/* <img alt="loading..." className="mx-auto" src={LoadingImage} style={{maxWidth: '200px'}} /> */}
                            <p className="text-center mx-auto text-lg font-semibold mb-3">Error</p>

                        </td>
                    </tr>
                )
            }else{
                return(
                    persons.filter((val)=>{
                        if(this.props.search === ""){
                            return val
                        }else if(val.name.toLowerCase().includes(this.props.search.toLowerCase())){
                            return val
                        }
                    }).map((item,index)=>
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-center">{index+1} {this.state.test}</td>
                            <td className="py-3 px-6 text-center">{item.person_id}</td>
                            <td className="py-3 px-6 text-center">{item.name}</td>
                            <td className="py-3 px-6 text-center">{item.gender}</td>
                            <td className="py-3 px-6 text-center">{item.age}</td>
                            <td className="py-3 px-6 text-center">{item.conditition}</td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <Link to={"tracker/"+item.person_id}>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </Link>
                                    {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div> */}
                                </div>
                            </td>
                        </tr>
                    )
                )
            }
        }else{
            // Belum Loading
            return(
                <tr>
                    <td colSpan="7" className="text-center">

                        <img alt="loading..." className="mx-auto" src={LoadingImage} style={{maxWidth: '200px'}} />
                        <p className="text-center mx-auto text-lg font-semibold mb-3">Loading...</p>

                    </td>
                </tr>
            )
        }
    }
}

class Table extends React.Component{
    
    render(){
        return(
                <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-center">No</th>
                                <th className="py-3 px-6 text-center">ID</th>
                                <th className="py-3 px-6 text-center">Name</th>
                                <th className="py-3 px-6 text-center">Gender</th>
                                <th className="py-3 px-6 text-center">Age</th>
                                <th className="py-3 px-6 text-center">Condition</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            <Isitabel search={this.props.search} />
                        </tbody>
                    </table>
                </div>
        )
    }
}

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search : ''
        }
        this.changeSearch = this.changeSearch.bind(this);
    }

    changeSearch(val){
        this.setState(
            {
                search : val.target.value
            }
        )
    }

    render(){
        return(
            <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center pt-14 bg-gray-100 font-sans overflow-hidden">
                <h1 className="text-4xl mt-2 text-center mb-5 font-bold">Dashboard</h1>
                <div>
                    <Link to="/logout">
                        <button className="bg-red-400 hover:bg-red-600 rounded px-4 py-2 mb-3 text-white">
                            Logout
                        </button>
                    </Link>
                </div>
                <div className="container mx-auto">
                    <div className="flex">
                        <input onChange={this.changeSearch} value={this.state.search} type="text" className="w-full font-light focus:outline-none mx-auto block border p-3 text-md text-center" placeholder="Search" />
                    </div>
                    {/* Table */}
                    <Table search={this.state.search} />
                    {/* End Table */}
                </div>
            </div>
        )
    }

}

export default Dashboard;