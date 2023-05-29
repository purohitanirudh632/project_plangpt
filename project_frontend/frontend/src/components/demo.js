import React, { useEffect, useState } from "react";
import axios from "axios"
import moment from "moment";
function Demo(){
    const [data,setData] = useState("");
    const [chats,setChats] = useState([]);
    const onChangeHandler = (e)=>{
        setData(e.target.value);
    };

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/response/request/")
        .then((res)=>{
            setChats(res.data);
            console.log(chats);
        })
    })

    const [ items, setItem] = useState([])

    const submitHandler=()=>{

        setItem( values => [ ...values, {"type" : "request", "data" : data}] )

        axios.post("http://127.0.0.1:8000/api/response/request/",{
            "input_text" : data
        })
        .then((res)=>{
            setItem( values => [ ...values, { "type" : "response", "data": res.data.output_text, "time": res.data.updated_at} ])
            
        })
        setData("");
    }

    const checkkey = (e)=>{
        if(e.key=="Enter"){
            submitHandler();
        }
    }

    return (
        <div className="container" id="container1">
            <div id="mainbox">
                <input type="text" placeholder="Enter your message" value = {data} onChange={onChangeHandler} onKeyDown={checkkey}/>
                 <button  id="button2" type="submit" onClick={submitHandler}>send</button>
            </div>

                { items && items.map((item) => {
                        const utcDate = new Date(item.time);  // Creating a new Date object from the UTC string
                        const istDateString = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }); // Getting the IST date string in desired format

                        const istTimeString = istDateString.split(', ')[1];  // Extracting the time string from the IST date string

                        console.log(istTimeString);
                    return (
                        item.type == "response" 
                        ?<><div className="row"><div className="col-7"> </div><div className="p-3 w-30 col-5 rounded mb-0 text-left bg-success text-white">{item.data}</div></div><div></div>
                        <div className="row"><div className="col-11"> </div><div className="p-0 w-10 col-1 rounded mt-0 mb-3 text-left bg-light text-black">{istTimeString}</div></div><div></div>
                        </>
                        : <div className="p-2 w-25 rounded mb-2 text-left bg-secondary text-white">{item.data}</div>
                        )
                })}


        </div>
    );
}

export default Demo;